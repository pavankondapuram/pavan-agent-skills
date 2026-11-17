---
name: evidence-collation
description: |
  Collate, optimize, and standardize visual and video evidence from E2E browser tests
  and synthetic persona audits. Standardizes all video recordings strictly into high-efficiency
  VP9 WebM format with synchronized screenshots and structured JSON manifests.
allowed-tools:
  - Bash
  - ReadFile
  - WriteFile
---

# Evidence Collation Skill

This skill standardizes visual and video evidence captured during autonomous End-to-End (E2E) browser testing and synthetic customer simulations for the ClickNComply GST SaaS platform.

## Format Standard: VP9 WebM

All video evidence must be collated and delivered in **VP9 WebM format**:
- **Video Codec**: `libvpx-vp9`
- **Container**: `.webm`
- **Compression Mode**: Constrained Quality (`-crf 30 -b:v 0`)
- **Encoding Speed / Concurrency**: `-cpu-used 4 -row-mt 1` (multithreaded row-based encoding, yielding ~70% size reduction at >7x real-time speed)
- **Audio Codec**: `libopus -b:a 96k` (when audio is present) or `-an` (for silent browser walkthroughs)
- **Capture Resolution**: Full HD desktop viewport (`1440x900`)

## Standard Directories

- **Raw Captures**: `Mock test data/e2e-evidence/videos/`
- **Optimized VP9 Videos**: `Mock test data/e2e-evidence/videos/vp9/<scenario>_vp9.webm`
- **Screenshots**: `Mock test data/e2e-evidence/screenshots/<step>_<description>.png`
- **Evidence Manifest**: `Mock test data/e2e-evidence/evidence-manifest.json`

## Invocation

To collate and transcode all browser session recordings into VP9 WebM:

```bash
npm run evidence:collate
```

Or via direct script:

```bash
node scripts/collateEvidence.mjs
```

## Manifest Specification

The collation engine writes `evidence-manifest.json` containing:
- Timestamp of collation run
- `formatStandard`: `VP9 WebM (CRF 30, cpu-used 4, row-mt 1)`
- Per-video metadata: original size (KB), VP9 size (KB), reduction percentage, transcode time, and relative path
- Correlated step-by-step screenshots
