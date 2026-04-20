# Installing Jeremy's Rule Hooks (Windows, user-level)

These hooks enforce **Jeremy's Rule — Delegation Playbook** at the harness level so Claude cannot skip them. Install once at user-level and they apply to **every Claude Code session on this machine**, across `keto-contractor-app`, `keto-landing-page`, `creative-content-machine`, and any other repo.

## What you get

| Hook | Event | Effect |
|---|---|---|
| `load-claude-md.ps1` | `SessionStart` | Walks up from CWD, finds nearest `CLAUDE.md`, auto-injects it into Claude's context before the session begins. No more "forgot to read CLAUDE.md." |
| `require-size.ps1` | `PreToolUse` (Agent/Task) | Hard-blocks any Agent spawn whose prompt does not start with `SIZE: <kb>kb`. Forces pre-flight sizing as a constraint, not a checkbox. |

## Install (PowerShell, one-time, from any of the 3 repos)

Run from the root of whichever repo you've pulled (e.g. `D:\keto-contractor-app`, `D:\keto-landing-page`, `D:\creative-content-machine`):

```powershell
# 1. Create hooks dir at user-level
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.claude\hooks" | Out-Null

# 2. Copy the two hook scripts from this repo into user-level hooks dir
Copy-Item -Force ".\.claude\hooks\load-claude-md.ps1" "$env:USERPROFILE\.claude\hooks\load-claude-md.ps1"
Copy-Item -Force ".\.claude\hooks\require-size.ps1"  "$env:USERPROFILE\.claude\hooks\require-size.ps1"

# 3. Merge the hook config into your user-level settings
if (-not (Test-Path "$env:USERPROFILE\.claude\settings.json")) {
  Copy-Item ".\.claude\settings.user-template.json" "$env:USERPROFILE\.claude\settings.json"
  Write-Host "Installed fresh user-level settings.json"
} else {
  Write-Host "EXISTING user settings.json detected. Open it and merge the 'hooks' block from settings.user-template.json manually."
  Write-Host "Template location: .\.claude\settings.user-template.json"
}
```

## Verify

1. Start a new Claude Code session in the repo:
   ```powershell
   claude
   ```
2. Look for `=== CLAUDE.md (auto-loaded by SessionStart hook ...) ===` at the top of context.
3. Ask Claude to spawn an agent **without** a SIZE declaration — should be blocked.
4. Ask Claude to spawn an agent **with** `SIZE: 5kb` at the top of the prompt — should go through.

## Debugging

```powershell
claude --debug
```

Common issues:
- **ExecutionPolicy blocks scripts:** `-ExecutionPolicy Bypass` in the hook command should handle this. If not, run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned` once.
- **Hook not firing:** confirm `$env:USERPROFILE\.claude\settings.json` exists and contains the `hooks` block.
- **CLAUDE.md not injecting:** confirm `CLAUDE.md` exists somewhere up the directory tree from CWD.
- **Matcher mismatch:** PreToolUse matcher is `Agent|Task`. Update if Claude Code renames the agent-spawning tool.

## Uninstall

Remove the `hooks` block from `$env:USERPROFILE\.claude\settings.json` and delete `$env:USERPROFILE\.claude\hooks\*.ps1`.

## Why user-level

One install covers every repo and every future repo on this machine. The sizing discipline is Claude-wide, not repo-specific.

## Updating

If the hook scripts get updated in any repo, re-run step 2 of the install to copy the new versions over.
