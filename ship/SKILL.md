---
name: ship
description: "Production release management and deployment gatekeeper skill. Enforces pre-flight smoke tests, version bumps, changelog updates, edge deployment verification (e.g. Cloudflare Pages), and rollback readiness."
version: 1.0.0
---

# Release Management & Pre-Flight Gatekeeper (ship)

Guarantees production release integrity through automated pre-flight checks, reproducible builds, and verified live deployments.

## Pre-Flight Checklist

Before tagging or deploying any production release:

1. **Code & Syntax Verification**:
   - Run Node syntax checks or linting on modified `.mjs`, `.js`, and `.html` files.
   - Verify that no debug tokens, mock credentials, or temporary console logs are exposed.

2. **Asset Build & Synchronization**:
   - Execute the project build script (e.g. `npm run build`) to ensure assets are fresh in `dist/`.
   - Verify Service Worker cache version is bumped if assets or navigation behaviors changed.

3. **Changelog & Documentation**:
   - Record user-facing changes in `CHANGELOG.md` or release notes.
   - Confirm Scribe has synchronized Obsidian engineering journals with the new commits.

4. **Edge Deployment & Verification**:
   - Trigger deployment pipeline (e.g. `npm run deploy` via `scripts/deploy.mjs`).
   - Run automated HTTP health checks on live domain(s) (e.g. `test.clickncomply.shop`, `clickncomply.pages.dev`).
   - Confirm HTTP 200 response and correct headers.

5. **Rollback Readiness**:
   - Note the previous commit hash in case an immediate rollback is needed.
