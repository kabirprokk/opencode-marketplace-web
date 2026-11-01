import assert from "node:assert/strict";
import test from "node:test";
// @ts-expect-error Node's built-in type-stripping runner requires the .ts extension.
import { fetchLiveRegistry, parseRegistry } from "./registry.ts";

const validRegistry = {
  version: 1,
  updated: "2026-11-01",
  packages: [{
    name: "sample-skill",
    type: "skill",
    version: "1.0.0",
    description: "A sample package",
    author: "community",
    repo: "https://github.com/community/sample-skill",
    install: "git",
    tags: ["sample"],
    license: "MIT",
  }],
};

test("parseRegistry accepts a valid registry snapshot", () => {
  assert.deepEqual(parseRegistry(validRegistry), validRegistry);
});

test("parseRegistry rejects malformed package entries", () => {
  assert.equal(parseRegistry({ ...validRegistry, packages: [{ name: "bad" }] }), null);
});

test("parseRegistry rejects package types unsupported by the directory", () => {
  assert.equal(parseRegistry({
    ...validRegistry,
    packages: [{ ...validRegistry.packages[0], type: "unknown" }],
  }), null);
});

test("fetchLiveRegistry requests uncached live data", async () => {
  let request: Request | undefined;
  const registry = await fetchLiveRegistry(async (_input, init) => {
    request = new Request("https://registry.test/registry.json", init);
    return new Response(JSON.stringify(validRegistry), { status: 200 });
  });

  assert.deepEqual(registry, validRegistry);
  assert.equal(request?.cache, "no-store");
  assert.ok(request?.signal);
});

test("fetchLiveRegistry rejects invalid live data so callers can retain the snapshot", async () => {
  await assert.rejects(
    fetchLiveRegistry(async () => new Response(JSON.stringify({ packages: [] }), { status: 200 })),
    /invalid registry/i,
  );
});
