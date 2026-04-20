param()

# SessionStart hook: walk up from CWD looking for CLAUDE.md, read it,
# and inject it as additionalContext so Claude cannot start a session
# without seeing it. Silent no-op if no CLAUDE.md is found.

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

$cwd = $data.cwd
if ([string]::IsNullOrWhiteSpace($cwd)) {
    $cwd = (Get-Location).Path
}

$current = $null
try {
    $current = Get-Item -LiteralPath $cwd -ErrorAction Stop
} catch {
    exit 0
}

$found = $null
while ($current) {
    $candidate = Join-Path $current.FullName 'CLAUDE.md'
    if (Test-Path -LiteralPath $candidate -PathType Leaf) {
        $found = $candidate
        break
    }
    $current = $current.Parent
}

if (-not $found) {
    exit 0
}

try {
    $content = Get-Content -LiteralPath $found -Raw -ErrorAction Stop
} catch {
    exit 0
}

$header = "=== CLAUDE.md (auto-loaded by SessionStart hook from $found) ===`n`n"
$payload = @{
    hookSpecificOutput = @{
        hookEventName     = 'SessionStart'
        additionalContext = "$header$content"
    }
} | ConvertTo-Json -Depth 20 -Compress

Write-Output $payload
exit 0
