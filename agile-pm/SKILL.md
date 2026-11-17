---
name: agile-pm
description: "Comprehensive Agile Project Management skill for AI-orchestrated teams. Use for sprint planning, backlog grooming, ticket decomposition (GCA-X), user story mapping with Given/When/Then acceptance criteria, blocker removal, capacity forecasting, and syncing hive task boards."
version: 1.0.0
---

# Agile Project Management (agile-pm)

Autonomous Agile PM workflow engine designed for high-velocity multi-agent squads and orchestrators. Coordinates epics, sprints, and task lifecycles directly with the project's tracking boards.

## Core Capabilities

1. **Backlog Grooming & Refinement**:
   - Decomposes high-level requests into granular, testable tasks with unique keys (e.g. `GCA-7`).
   - Crafts user stories following industry-standard syntax:
     - *As a [Persona]*, *I want [Capability]*, *So that [Business Benefit]*.
   - Generates unambiguous **Acceptance Criteria** using the BDD/Gherkin format:
     ```gherkin
     Given [initial state or preconditions]
     When [action taken by user or system]
     Then [expected outcome and verification]
     ```
   - Flags missing dependencies, edge cases, and statutory compliance hurdles (e.g. GST rules, DPDP data protection).

2. **Sprint Planning & Goal Formulation**:
   - Establishes a focused **Sprint Goal** per iteration.
   - Sizes stories based on complexity and historical team velocity.
   - Balances feature work, technical debt, and statutory bug fixes.

3. **Hive Board Synchronization**:
   - Maintains real-time synchronization between:
     - `hive/board.md` (Human-readable markdown roadmap & active roster)
     - `hive/tasks.json` (Structured JSON task state with timestamps, assignees, priorities)
     - `spec-comments.json` (Living specification feedback triage)
   - Dispatches tasks to designated agents (`god`, `pm-mvv70lwg`, `scribe-mvt9v1uv`, `legal-advisor-mvtakc4o`, `customer-simulation-mvul98z8`).

4. **Blocker & Dependency Resolution**:
   - Detects stalled tasks, blocked dependencies, or ambiguous requirements early.
   - Facilitates asynchronous unblocking across the fleet.

## Operational Workflow

### Step 1: Ingest & Triage
When given a feature request, user feedback, or bug report:
- Inspect existing items in `hive/tasks.json` and `hive/board.md`.
- Ensure no duplicate or conflicting tickets exist.
- Determine priority: `critical`, `high`, `medium`, `low`.

### Step 2: Task Formulation
Create the structured task entry:
```json
{
  "id": "GCA-X",
  "title": "Concise imperative title",
  "status": "todo",
  "assignee": "pm-mvv70lwg",
  "priority": "high",
  "description": "User story + Given/When/Then criteria + statutory notes",
  "createdAt": "ISO timestamp",
  "updatedAt": "ISO timestamp"
}
```

### Step 3: Dispatch & Track
- Assign to the appropriate specialist agent.
- Log dispatch in `hive/log.jsonl` if needed.
- Verify status transitions: `todo` -> `in-progress` -> `review` -> `done`.
