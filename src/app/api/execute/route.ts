import { NextRequest, NextResponse } from "next/server";
import { spawn } from "child_process";

interface ExecutePayload {
  code: string;
  tests?: { code: string; description?: string }[];
  userCode?: string;
  lessonId?: string;
}

const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_URL;

async function runThroughPythonBackend(payload: ExecutePayload) {
  const response = await fetch(`${PYTHON_BACKEND_URL}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code: payload.code,
      tests: payload.tests,
      user_code: payload.userCode,
      lesson_id: payload.lessonId,
    }),
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}

async function runLocally(payload: ExecutePayload) {
  const pythonScript = `
import json
import sys
import io
import contextlib
import traceback
import builtins

payload = json.loads(${JSON.stringify(JSON.stringify(payload))})
code = payload.get('code', '')
tests = payload.get('tests') or []
user_code = payload.get('user_code') or payload.get('userCode') or code

allowed_builtins = {
    'abs', 'min', 'max', 'sum', 'len', 'range', 'print', 'enumerate', 'round',
    'sorted', 'str', 'int', 'float', 'bool', 'list', 'dict', 'set', 'tuple',
    'zip', 'all', 'any'
}

safe_builtins = {name: getattr(builtins, name) for name in allowed_builtins if hasattr(builtins, name)}
execution_globals = {"__builtins__": safe_builtins}
execution_locals = execution_globals

stdout_buffer = io.StringIO()
result = {
    'success': False,
    'output': '',
    'tests': [],
}

def friendly_error_message(exc: BaseException) -> str:
    if isinstance(exc, SyntaxError):
        msg = exc.msg or 'Vérifie la syntaxe de ta ligne.'
        if 'expected' in msg and ':' in msg:
            return "Tu as peut-être oublié les deux-points à la fin de ta condition ou de ta boucle."
        return msg
    if isinstance(exc, NameError):
        return "Tu utilises un nom qui n'existe pas encore. As-tu créé la variable avant de l'utiliser ?"
    if isinstance(exc, TypeError):
        return "Type inattendu : vérifie que tu combines bien texte et nombres avec des virgules ou des conversions."
    if isinstance(exc, ZeroDivisionError):
        return "On ne peut pas diviser par zéro, pense à tester cette situation."
    return str(exc)

try:
    with contextlib.redirect_stdout(stdout_buffer):
        exec(code, execution_globals, execution_locals)
    execution_globals['__captured_output__'] = stdout_buffer.getvalue()
    execution_globals['__user_code__'] = user_code
    result['output'] = execution_globals['__captured_output__']
    success = True
    for index, test in enumerate(tests):
        try:
            exec(test.get('code', ''), execution_globals, execution_locals)
            result['tests'].append({'index': index, 'description': test.get('description'), 'status': 'passed'})
        except AssertionError as assertion_error:
            success = False
            result['tests'].append({
                'index': index,
                'description': test.get('description'),
                'status': 'failed',
                'message': str(assertion_error) or 'Un test a échoué.'
            })
            break
        except Exception as test_error:
            success = False
            result['tests'].append({
                'index': index,
                'description': test.get('description'),
                'status': 'failed',
                'message': friendly_error_message(test_error)
            })
            break
    result['success'] = success
except Exception as execution_error:
    result['success'] = False
    result['friendly_message'] = friendly_error_message(execution_error)
    result['error_type'] = execution_error.__class__.__name__
    result['error_message'] = ''.join(traceback.format_exception(execution_error))
    result['output'] = stdout_buffer.getvalue()
else:
    if result['success']:
        result['friendly_message'] = 'Les tests sont validés, bravo !'

print(json.dumps(result))
`; // end of python script

  return new Promise<NextResponse>((resolve, reject) => {
    const child = spawn("python3", ["-c", pythonScript]);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (data) => {
      stdout += data.toString();
    });

    child.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    child.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(stderr || `Python process exited with code ${code}`));
        return;
      }
      try {
        const parsed = JSON.parse(stdout);
        resolve(NextResponse.json(parsed));
      } catch (error) {
        reject(error);
      }
    });
  });
}

export async function POST(request: NextRequest) {
  try {
    const payload = (await request.json()) as ExecutePayload;
    if (!payload?.code) {
      return NextResponse.json(
        { success: false, error: "missing_code", friendly_message: "Aucun code reçu." },
        { status: 400 },
      );
    }

    if (PYTHON_BACKEND_URL) {
      return await runThroughPythonBackend(payload);
    }

    return await runLocally(payload);
  } catch (error: any) {
    console.error("Python execution error", error);
    return NextResponse.json(
      {
        success: false,
        error: "execution_error",
        friendly_message:
          "Le bac à sable Python est momentanément indisponible. Réessaie dans quelques secondes.",
        error_message: error?.message,
      },
      { status: 500 },
    );
  }
}
