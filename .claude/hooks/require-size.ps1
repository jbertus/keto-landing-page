param()

# PreToolUse hook for the Agent tool: require every Agent prompt to begin
# with a SIZE declaration so pre-flight sizing (Jeremy's Rule, Delegation
# Playbook rule 2) becomes a harness-enforced constraint instead of an
# honor-system reminder.

$ErrorActionPreference = 'SilentlyContinue'

try {
    $rawInput = [Console]::In.ReadToEnd()
    if ([string]::IsNullOrWhiteSpace($rawInput)) {
        exit 0
    }
    $data = $rawInput | ConvertFrom-Json
} catch {
    exit 0
}

$prompt = $data.tool_input.prompt
if ([string]::IsNullOrWhiteSpace($prompt)) {
    exit 0
}

$sizeRegex = '(?im)^\s*SIZE\s*:\s*[<~]?=?\s*\d+(\.\d+)?\s*(kb|KB|k)\b'

if ($prompt -match $sizeRegex) {
    exit 0
}

$reason = @"
BLOCKED by Jeremy's Rule — Delegation Playbook (rule 2: pre-flight sizing).

Every Agent tool prompt MUST begin with a SIZE declaration, for example:
  SIZE: 5kb
  SIZE: ~7.5 KB
  SIZE: <10kb

Rules:
  * If estimated output is > 10kb, SPLIT the job into multiple parallel
    Agent calls, each declaring its own SIZE under 10kb.
  * If you are tempted to write 'SIZE: 20kb' just to get past this hook,
    that is exactly the failure mode this hook exists to prevent.

Re-submit with a SIZE declaration on the first line of the prompt.
"@

$payload = @{
    hookSpecificOutput = @{
        hookEventName             = 'PreToolUse'
        permissionDecision        = 'deny'
        permissionDecisionReason  = $reason
    }
} | ConvertTo-Json -Depth 20 -Compress

Write-Output $payload
exit 0
