# Task board

The PM owns this file. Agents read their own rows and append to the Log.
One row per task. Newest requests at the top of Open.

Status: `queued` → `running` → `done` | `blocked` | `needs-approval`

## Open

| id | business | agent | task | status | needs from | updated |
|---|---|---|---|---|---|---|
| — | — | — | (none) | — | — | — |

## Done (newest first)

| id | business | agent | task | result | finished |
|---|---|---|---|---|---|
| T-20261111-02 | rental-app | bracket-designer | Design the full app on a design canvas from T-01 | `design/rental-app-design.md` — canvas, 50 artboards, 11 open questions | 2026-11-11 |
| T-20261111-01 | rental-app | research | Research how rental apps (tenant applications with salary/doc upload, owner listings) structure every screen | `clients/rental-app/research/screens.md` — 44 screens, 26 sources | 2026-11-11 |

## Log

(Agents append one line per run: `YYYY-MM-DD HH:MM <agent> <task-id> — what happened`.)
2026-11-11 19:13 research T-20261111-01 — wrote clients/rental-app/research/screens.md: 44 screens (tenant 17, owner 17, shared 10), application fields, owner review, UX patterns, sourced Kuwait notes; 26 sources
2026-11-11 19:25 bracket-designer T-20261111-02 — built Design canvas "Rental app design" (https://claude.ai/artifact/TNDb3yAidZvqYjzvzyxQx7): 50 linked phone artboards covering all 44 inventory screens in 7 rows, look "Teal & Sand"; wrote design/rental-app-design.md with screen list, flows and 11 open questions
2026-11-11 19:30 pm — rental-app: research + full design done; waiting on Bilal for open questions
2026-11-11 20:10 pm — iOS 27 restyle was for Mousa A/C (not rental-app); T-03/T-04 dropped, done directly on a new Mousa canvas
