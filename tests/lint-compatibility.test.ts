import { test } from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { mkdirSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { ESLint } from "eslint";

const require = createRequire(import.meta.url);
// Lock the test to the actual helper used by the scoped Next.js lint override.
const { getRootDirs } = require(
  join(
    dirname(require.resolve("@next/eslint-plugin-next")),
    "utils/get-root-dirs.js",
  ),
) as {
  getRootDirs: (context: {
    cwd: string;
    settings: { next?: { rootDir?: string | string[] } };
  }) => string[];
};
test("Next lint root discovery keeps default, absolute, glob, brace and Windows-style paths working", () => {
  const root = mkdtempSync(join(tmpdir(), "bloomies-lint-"));
  try {
    const web = join(root, "apps", "web");
    const admin = join(root, "apps", "admin");
    mkdirSync(web, { recursive: true });
    mkdirSync(admin, { recursive: true });
    writeFileSync(join(root, "apps", "notes.txt"), "not a directory");
    const roots = (rootDir?: string | string[]) =>
      getRootDirs({ cwd: root, settings: rootDir ? { next: { rootDir } } : {} })
        .map((p) => resolve(p))
        .sort();
    assert.deepEqual(roots(), [resolve(root)]);
    assert.deepEqual(roots(web), [resolve(web)]);
    assert.deepEqual(
      roots(join(root, "apps", "*")),
      [resolve(admin), resolve(web)].sort(),
    );
    assert.deepEqual(
      roots(join(root, "apps", "{web,admin}")),
      [resolve(admin), resolve(web)].sort(),
    );
    assert.deepEqual(
      roots([web, admin]),
      [resolve(admin), resolve(web)].sort(),
    );
    assert.deepEqual(roots(web.replaceAll("/", "\\")), [resolve(web)]);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
test("official Next.js lint rules still detect unoptimized product images", async () => {
  const eslint = new ESLint();
  const [result] = await eslint.lintText(
    'export default function Example(){return <img src="/gift.png" alt="Gift"/>}',
    { filePath: "src/components/lint-compatibility-fixture.tsx" },
  );
  assert.ok(
    result.messages.some(
      (message) => message.ruleId === "@next/next/no-img-element",
    ),
  );
});
