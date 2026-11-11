# Task board

The PM owns this file. Agents read their own rows and append to the Log.
One row per task. Newest requests at the top of Open.

Status: `queued` → `running` → `done` | `blocked` | `needs-approval`

## Open

| id | business | agent | task | status | needs from | updated |
|---|---|---|---|---|---|---|
| — | — | — | (none yet) | — | — | — |

## Done (newest first)

| id | business | agent | task | result | finished |
|---|---|---|---|---|---|
| — | — | — | — | — | — |

## Log

(Agents append one line per run: `YYYY-MM-DD HH:MM <agent> <task-id> — what happened`.)
