# Dependency audit review — 2026-10-20

## Current verified state

- `npm audit`: 5 **high**, 0 critical; all five are entries in one development-tool dependency chain.
- `npm audit --omit=dev`: **0 vulnerabilities** at the time of review.
- Chain: `eslint-config-next@16.4.2` → `@next/eslint-plugin-next@16.4.2` → `fast-glob@3.3.1` → `micromatch@4.0.8` → `braces@3.0.3`.
- Advisory: https://github.com/advisories/GHSA-vfj7-8cjw-p6xm . It concerns stack exhaustion from deeply nested brace patterns. The reviewed advisory lists no patched version.
- Registry checks at review time: `braces@3.0.3` is latest, as are `eslint-config-next@16.4.2` and `@next/eslint-plugin-next@16.4.2`. Upgrading these to the latest stable version does not remove the chain.

## Scope and decision

The identified dependency is used by lint tooling to process Next.js root-directory glob settings. It is not in the production dependency tree, and the storefront does not accept user-provided glob patterns. This limits the demonstrated exposure; it does not erase the upstream finding or imply that every possible build environment is safe.

Do not use `npm audit fix --force`. The proposed change downgrades `eslint-config-next` to 14.2.35 while the application uses Next.js 16 and ESLint flat configuration. Do not hide the report with audit exclusions, substitute an incompatible brace-expansion library, or create a local fork solely to obtain a clean scanner result. Keep framework-specific lint rules enabled.

The independent `eslint@9.39.5` deprecation/support warning remains. The registry's latest ESLint is 10.13.0, but the installed `eslint-plugin-react@7.37.5` declares compatibility only through ESLint 9. A forced major upgrade is not justified. Upgrade the lint toolchain together when compatible upstream releases are available.

No dependency version was changed for this review. This repository still has the full-tree development findings above. The production-only audit is an additional scope check, not a replacement for the full audit.

## Follow-up

Run both audits after dependency updates. Recheck the advisory and compatible Next.js/ESLint releases, then update the manifest and lockfile together and run lint, TypeScript checks, tests and the production build. Do not expose build/lint tools to untrusted patterns.
