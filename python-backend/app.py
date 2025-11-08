from __future__ import annotations

import builtins
import contextlib
import io
import json
import traceback
from typing import Any, Dict, List

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

app = FastAPI(title="Codex Python Day Camp Sandbox", version="1.0.0")

ALLOWED_BUILTINS = {
    "abs",
    "min",
    "max",
    "sum",
    "len",
    "range",
    "print",
    "enumerate",
    "round",
    "sorted",
    "str",
    "int",
    "float",
    "bool",
    "list",
    "dict",
    "set",
    "tuple",
    "zip",
    "all",
    "any",
}

SAFE_BUILTINS = {name: getattr(builtins, name) for name in ALLOWED_BUILTINS if hasattr(builtins, name)}


class CodeTest(BaseModel):
    code: str = Field(..., description="Code Python à exécuter pour valider la réponse")
    description: str | None = Field(
        None, description="Indication affichée à l'utilisateur pour ce test"
    )


class ExecuteRequest(BaseModel):
    code: str
    tests: List[CodeTest] = Field(default_factory=list)
    user_code: str | None = None
    lesson_id: str | None = None


class ExecuteResponse(BaseModel):
    success: bool
    output: str
    tests: List[Dict[str, Any]]
    friendly_message: str | None = None
    error_type: str | None = None
    error_message: str | None = None
    traceback: str | None = None


def friendly_error_message(exc: BaseException) -> str:
    if isinstance(exc, SyntaxError):
        msg = exc.msg or "Vérifie la syntaxe de ta ligne."
        if "expected" in msg and ":" in msg:
            return "Tu as peut-être oublié les deux-points à la fin de ta condition ou de ta boucle."
        return msg
    if isinstance(exc, NameError):
        return "Tu utilises un nom qui n'existe pas encore. As-tu créé la variable avant de l'utiliser ?"
    if isinstance(exc, TypeError):
        return "Type inattendu : combine le texte et les nombres avec des virgules ou des conversions (str())."
    if isinstance(exc, ZeroDivisionError):
        return "Division impossible par zéro : pense à vérifier cette situation."
    return str(exc)


@app.post("/execute", response_model=ExecuteResponse)
async def execute_code(request: ExecuteRequest) -> ExecuteResponse:
    if not request.code:
        raise HTTPException(status_code=400, detail="Aucun code reçu")

    globals_dict: Dict[str, Any] = {"__builtins__": SAFE_BUILTINS.copy()}
    locals_dict = globals_dict
    stdout_buffer = io.StringIO()

    result: Dict[str, Any] = {"success": False, "output": "", "tests": []}

    try:
        with contextlib.redirect_stdout(stdout_buffer):
            exec(request.code, globals_dict, locals_dict)
        captured_output = stdout_buffer.getvalue()
        globals_dict["__captured_output__"] = captured_output
        globals_dict["__user_code__"] = request.user_code or request.code
        result["output"] = captured_output

        for index, test in enumerate(request.tests):
            try:
                exec(test.code, globals_dict, locals_dict)
                result["tests"].append(
                    {
                        "index": index,
                        "description": test.description,
                        "status": "passed",
                    }
                )
            except AssertionError as assertion_error:
                result["tests"].append(
                    {
                        "index": index,
                        "description": test.description,
                        "status": "failed",
                        "message": str(assertion_error) or "Un test a échoué.",
                    }
                )
                result["friendly_message"] = str(assertion_error) or "Un test n'a pas passé la validation."
                break
            except Exception as test_error:
                result["tests"].append(
                    {
                        "index": index,
                        "description": test.description,
                        "status": "failed",
                        "message": friendly_error_message(test_error),
                    }
                )
                result["friendly_message"] = friendly_error_message(test_error)
                break
        else:
            result["success"] = True
            result["friendly_message"] = "Les tests sont validés, bravo !"
    except Exception as execution_error:
        result["output"] = stdout_buffer.getvalue()
        result["success"] = False
        result["error_type"] = execution_error.__class__.__name__
        result["error_message"] = friendly_error_message(execution_error)
        result["traceback"] = "".join(traceback.format_exception(execution_error))
        if "friendly_message" not in result or not result["friendly_message"]:
            result["friendly_message"] = friendly_error_message(execution_error)

    return ExecuteResponse(**result)


@app.get("/health")
async def healthcheck() -> Dict[str, str]:
    return {"status": "ok"}
