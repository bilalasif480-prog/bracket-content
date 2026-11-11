# Task board

The PM owns this file. Agents read their own rows and append to the Log.
One row per task. Newest requests at the top of Open.

Status: `queued` → `running` → `done` | `blocked` | `needs-approval`

## Open

| id | business | agent | task | status | needs from | updated |
|---|---|---|---|---|---|---|
| T-20261111-03 | rental-app | research | Find Apple's current iOS 27 design language (materials, type, colour, tab bar, nav, sheets, controls, icons) from official sources → `clients/rental-app/research/ios27-style.md` | running | — | 2026-11-11 |
| T-20261111-04 | rental-app | bracket-designer | Restyle all 50 rental-app artboards to the iOS 27 look from T-03, same screens and links → update canvas + `design/rental-app-design.md` | queued | T-03 | 2026-11-11 |

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
