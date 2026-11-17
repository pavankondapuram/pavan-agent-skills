---
name: plan-review
description: "Multi-perspective plan, PRD, and architecture review skill. Use to stress-test requirements, challenge premises, catch edge cases, and eliminate scope ambiguity before implementation begins across CEO/Founder, Engineering, and UX dimensions."
version: 1.0.0
---

# Plan & PRD Review (plan-review)

Strategic review gauntlet that interrogates feature plans, architectural proposals, and specifications before code is written.

## Review Perspectives

### 1. Founder / CEO Mode (Strategy & Value)
- **Problem Truth**: Does this solve a genuine, acute user pain point or create busywork?
- **Scope Calibration**:
  - *Selective Expansion*: Should we add a small complementary touch that makes this 10x more delightful?
  - *Aggressive Pruning*: What can be stripped away without hurting the core outcome?
- **Commercial Alignment**: Does this strengthen our defensibility, viral distribution, or customer retention (e.g. Vendor Compliance Rating flywheel)?

### 2. Tech Lead / Architecture Mode (Feasibility & Reliability)
- **Data Integrity**: Are schema changes backward-compatible? Is the local/remote state synchronization resilient to network interruptions?
- **Edge Cases & Failure Modes**: What happens when APIs timeout, user uploads corrupt CSVs/JSONs, or credentials expire?
- **Performance & Scalability**: Does this introduce unnecessary memory bloat, unindexed lookups, or unneeded polling loops?

### 3. UX & Product Design Mode (Ergonomics & Clarity)
- **Information Hierarchy**: Can a CA or accountant complete this flow with minimal cognitive friction?
- **Cognitive Load**: Are errors explanatory with actionable fixes rather than generic codes?
- **RBAC Boundaries**: Are confidential actions properly restricted per persona (CA Partner vs Staff Accountant vs Client vs Vendor)?

## Output Structure

When executing a plan review, produce a structured markdown artifact:
1. **Executive Verdict**: `APPROVE`, `APPROVE WITH MODIFICATIONS`, or `RETHINK`.
2. **Key Findings by Perspective**:
   - Founder/Strategy observations
   - Technical/Architectural flags
   - UX/Ergonomic catches
3. **Actionable Checklist**: Direct, numbered adjustments to incorporate into the final execution plan.
