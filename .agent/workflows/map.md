---
description: Manage MAP project phases (MAP-1 through MAP-8)
---

# MAP Project Manager Workflow

This workflow helps organize and track progress across all MAP phases.

## When invoked, do the following:

1. **Read the status file** at `MAP_STATUS.md` in the project root to understand current progress.

2. **Ask the user** which MAP phase they want to work on (1-8), or if they want a status overview.

3. **For a new MAP phase**, follow this process:
   - Ask the user to provide the spec/requirements (usually a markdown file or pasted content)
   - Review the codebase to identify what's already done vs. what remains
   - Create an implementation plan as an artifact
   - Wait for user approval before coding
   - Implement the changes
   - Verify with browser testing
   - Commit with message format: `Complete MAP-X: <summary>`
   // turbo
   - Push to GitHub
   - Update `MAP_STATUS.md` with completion status

4. **Update the status file** after completing work:
   ```markdown
   ## MAP-X: <Title>
   - Status: ✅ Complete | 🔄 In Progress | ⏳ Not Started
   - Completed: <date>
   - Key files: <list main files touched>
   ```

## MAP Phase Overview (update as specs are provided):

| Phase | Title | Description |
|-------|-------|-------------|
| MAP-1 | Infrastructure & UI Library | Project init, Tailwind, components, routing |
| MAP-2 | TBD | Waiting for spec |
| MAP-3 | TBD | Waiting for spec |
| MAP-4 | TBD | Waiting for spec |
| MAP-5 | TBD | Waiting for spec |
| MAP-6 | TBD | Waiting for spec |
| MAP-7 | TBD | Waiting for spec |
| MAP-8 | TBD | Waiting for spec |
