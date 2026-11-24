param (
    [switch]$Push,
    [string]$Message = "learn(agent): update skills [skip ci]"
)

$RepoRoot = Split-Path -Parent $PSScriptRoot
$UserHome = $env:USERPROFILE

if ($Push) {
    node "$PSScriptRoot\syncSkills.mjs" --push "$Message"
} else {
    node "$PSScriptRoot\syncSkills.mjs"
}
