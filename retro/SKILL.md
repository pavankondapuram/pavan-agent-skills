---
name: retro
description: "Sprint and milestone retrospective engine. Analyzes commit history, delivery velocity, agent execution bottlenecks, tech debt accumulation, and process failures. Produces structured retrospectives with actionable continuous improvements."
version: 1.0.0
---

# Sprint & Milestone Retrospective (retro)

Evaluates completed sprints, milestones, and releases to optimize multi-agent squad throughput, code hygiene, and delivery cadence.

## Retrospective Dimensions

1. **Commit & Delivery Velocity**:
   - Inspects git log, changed files, and commit cadence.
   - Measures time from ticket creation to deployment.
   - Highlights high-churn files or recurring regression hotspots.

2. **What Went Well (Wins)**:
   - Identifies smooth handoffs, zero-bug deployments, and autonomous resolutions.
   - Recognizes agent contributions (e.g. Scribe's journal accuracy, Legal Advisor's statutory vigilance).

3. **What Caused Friction (Bottlenecks & Gaps)**:
   - Tool execution timeouts or excessive turn counts.
   - Ambiguous task descriptions that required mid-flight course corrections.
   - State synchronization drift or unmanaged edge cases.

4. **Technical & Process Debt**:
   - Outdated documentation, unpruned test branches, or deprecated CSS/JS.
   - Flaky scripts, hardcoded variables, or missing automated smoke tests.

5. **Action Items (Continuous Improvement)**:
   - Concrete, assigned process tweaks for the upcoming milestone.
   - Rule updates or prompt adjustments to prevent repeat issues.

## Usage Protocol

Run at the conclusion of a major milestone (e.g. after shipping `GCA-6` or tagging a release):
1. Review git history: `git log --oneline -n 25`.
2. Inspect `hive/tasks.json` and `hive/board.md`.
3. Synthesize findings into a concise retrospective report and append key learnings to the project knowledge base.
