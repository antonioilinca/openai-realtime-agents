import { beforeEach, describe, expect, it } from "vitest";

import { resolveApiBase } from "./api";

describe("resolveApiBase", () => {
  const originalEnv = process.env.NEXT_PUBLIC_API_URL;
  const originalWindow = globalThis.window;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_API_URL = originalEnv;
    if (originalWindow) {
      Object.defineProperty(globalThis, "window", {
        configurable: true,
        enumerable: true,
        value: originalWindow,
        writable: true,
      });
    }
  });

  it("prioritises NEXT_PUBLIC_API_URL and normalises missing /api", () => {
    process.env.NEXT_PUBLIC_API_URL = "http://backend:9000";
    expect(resolveApiBase()).toBe("http://backend:9000/api");
  });

  it("respects explicit /api suffix", () => {
    process.env.NEXT_PUBLIC_API_URL = "https://lexora.example/api";
    expect(resolveApiBase()).toBe("https://lexora.example/api");
  });

  it("falls back to window location for relative env values", () => {
    process.env.NEXT_PUBLIC_API_URL = "/api";
    const mockLocation = {
      protocol: "https:",
      hostname: "lexora.fr",
      port: "",
    } as unknown as Location;
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      enumerable: true,
      value: { location: mockLocation },
      writable: true,
    });

    expect(resolveApiBase()).toBe("https://lexora.fr/api");
  });

  it("uses localhost:8000 when running the frontend on port 3000", () => {
    process.env.NEXT_PUBLIC_API_URL = "";
    const mockLocation = {
      protocol: "http:",
      hostname: "localhost",
      port: "3000",
    } as unknown as Location;

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      enumerable: true,
      value: { location: mockLocation },
      writable: true,
    });

    expect(resolveApiBase()).toBe("http://localhost:8000/api");
  });

  it("defaults to localhost:8000/api when no browser context is present", () => {
    process.env.NEXT_PUBLIC_API_URL = "";
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      enumerable: true,
      value: undefined,
      writable: true,
    });

    expect(resolveApiBase()).toBe("http://localhost:8000/api");

    Object.defineProperty(globalThis, "window", {
      configurable: true,
      enumerable: true,
      value: originalWindow,
      writable: true,
    });
  });
});
