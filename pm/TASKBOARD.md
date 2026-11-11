# Task board

The PM owns this file. Agents read their own rows and append to the Log.
One row per task. Newest requests at the top of Open.

Status: `queued` → `running` → `done` | `blocked` | `needs-approval`

## Open

| id | business | agent | task | status | needs from | updated |
|---|---|---|---|---|---|---|
| T-20261111-01 | rental-app | research | Research how rental apps (tenant applications with salary/doc upload, owner listings) structure every screen → `clients/rental-app/research/screens.md`. Done = screen inventory for tenant + owner + shared, with patterns and Kuwait notes, every claim linked | done | — | 2026-11-11 |
| T-20261111-02 | rental-app | bracket-designer | Design the full app on a design canvas from T-01 → `design/rental-app-design.md`. Done = every screen from the inventory as a linked artboard, no invented data | running | — | 2026-11-11 |

## Done (newest first)

| id | business | agent | task | result | finished |
|---|---|---|---|---|---|
| — | — | — | — | — | — |

## Log

(Agents append one line per run: `YYYY-MM-DD HH:MM <agent> <task-id> — what happened`.)
2026-11-11 19:13 research T-20261111-01 — wrote clients/rental-app/research/screens.md: 44 screens (tenant 17, owner 17, shared 10), application fields, owner review, UX patterns, sourced Kuwait notes; 26 sources
