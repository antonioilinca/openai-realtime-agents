import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { cn } from "../cn";

function useClassName(...values: Parameters<typeof cn>) {
  return cn(...values);
}

describe("cn utility", () => {
  it("concatenates truthy classes", () => {
    const { result } = renderHook(() => useClassName("a", false && "b", "c"));
    expect(result.current).toBe("a c");
  });
});
