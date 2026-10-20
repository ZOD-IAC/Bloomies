# Dependency security review — 2026-10-20

## Current state

A version-scoped compatibility override removes the vulnerable development-tool chain. The full `npm audit` and the production-only audit report **zero vulnerabilities** after this change. The original finding was five high entries in one chain, not five separate critical vulnerabilities.

The upstream braces advisory still lists no patched version. This change removes that dependency from the installed graph; it does not claim to patch upstream braces, suppress audit findings, downgrade Next.js or disable lint rules.

## Remediation

```json
"overrides": {
  "@next/eslint-plugin-next@16.4.2": {
    "fast-glob": "npm:tinyglobby@0.2.17"
  }
}
```

The installed Next.js plugin has one `fast-glob` import, in `dist/utils/get-root-dirs.js`. It uses only the named CommonJS `globSync(pattern, { onlyDirectories: true })` API after normalizing backslashes. `tinyglobby@0.2.17` supports that API and is already installed through the TypeScript lint tooling. A nested npm alias supplies this existing maintained implementation for that exact consumer/version. Other consumers are unaffected. The package lock records the exact replacement and integrity hashes.

This removes `fast-glob`'s original `micromatch` → `braces` dependency path while preserving the official `eslint-config-next` and Next.js plugin. No fork, local node_modules patch, audit exclusion or new runtime dependency is used.

## Validation and maintenance

`tests/lint-compatibility.test.ts` exercises the actual Next.js root-directory helper with default, absolute, wildcard, brace-alternative, array and Windows-style paths, including directory-only filtering. It also verifies that the official Next.js no-img-element rule still detects an unoptimized image. The complete lint, type checks, tests and production build are run with the replacement installed.

The alias is deliberately scoped to plugin **16.4.2**. Reinspect the plugin's glob usage, run the compatibility tests and both audits before changing its version or extending the override. Remove the override once a compatible upstream Next.js release removes the vulnerable chain. `tinyglobby` is not being asserted to implement the entire fast-glob API for arbitrary consumers.

The independent ESLint 9 deprecation warning may remain: the installed React lint plugin's peer range does not yet permit ESLint 10. This warning is separate from the five resolved vulnerability findings. Do not force an incompatible major upgrade just to remove a deprecation message.

## Local update

```bash
git pull origin main
npm ci
npm audit
npm run audit:production
```

Do not use `npm audit fix --force`. Keep the manifest and lockfile together.

Primary references:

- https://github.com/advisories/GHSA-vfj7-8cjw-p6xm
- https://github.com/SuperchupuDev/tinyglobby
- https://docs.npmjs.com/cli/v11/configuring-npm/package-json/#overrides
