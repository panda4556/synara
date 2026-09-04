[CmdletBinding()]
param(
  [string]$OutputPath = "",
  [int]$BatchCharacterLimit = 900,
  [int]$BatchItemLimit = 14,
  [int]$MaxCandidates = 0
)

$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
if (-not $OutputPath) {
  $OutputPath = Join-Path $repoRoot "apps/web/src/localization/zh-CN.generated.json"
}

$preservedTerms = [System.Collections.Generic.HashSet[string]]::new(
  [string[]]@(
    "ACP",
    "API",
    "ChatGPT",
    "Claude",
    "Claude Code",
    "Codex",
    "Cursor",
    "Devin",
    "Devin CLI",
    "Factory Droid",
    "Git",
    "GitHub",
    "Grok",
    "HTTP",
    "HTTPS",
    "JSON",
    "Kilo",
    "MCP",
    "OpenCode",
    "Pi",
    "Synara",
    "URL",
    "VS Code",
    "WebSocket",
    "Windows",
    "WSL",
    "Xcode"
  ),
  [System.StringComparer]::Ordinal
)

function Test-SkipCandidate([string]$Value) {
  if ($preservedTerms.Contains($Value)) { return $true }
  if ($Value -match '^(?:[A-Za-z]:\\|/|\\|\.{1,2}/)') { return $true }
  if ($Value -match '^(?:GET|POST|PUT|PATCH|DELETE)\s+/') { return $true }
  if ($Value -match '^[a-z0-9_.-]+@[a-z0-9_.-]+$') { return $true }
  if ($Value -match '^(?:npm|npx|bun|git|gh|codex|claude|cursor-agent|opencode|devin|grok|droid|agy)\s+[-\w]') {
    return $true
  }
  if ($Value -cmatch '^[A-Z0-9_]{3,}$' -and $Value -notin @("ALL", "OFF", "ON", "ERROR")) {
    return $true
  }
  return $false
}

function New-BingTranslatorSession {
  $sessionRequest = @{
    Uri = "https://www.bing.com/translator?from=en&to=zh-Hans&setlang=zh-cn"
    SessionVariable = "webSession"
    TimeoutSec = 30
  }
  $page = Invoke-WebRequest @sessionRequest

  $igMatch = [regex]::Match($page.Content, 'IG:"([A-F0-9]+)"')
  $tokenMatch = [regex]::Match(
    $page.Content,
    'params_AbusePreventionHelper\s*=\s*\[(\d+),"([^"]+)"'
  )
  if (-not $igMatch.Success -or -not $tokenMatch.Success) {
    throw "Bing Translator did not expose a usable session token."
  }

  return [pscustomobject]@{
    Session = $webSession
    Uri = "https://www.bing.com/ttranslatev3?isVertical=1&IG=$($igMatch.Groups[1].Value)&IID=translator.5028.1"
    Key = $tokenMatch.Groups[1].Value
    Token = $tokenMatch.Groups[2].Value
  }
}

function Invoke-BingTranslation([pscustomobject]$Translator, [string]$Text) {
  $translationRequest = @{
    Uri = $Translator.Uri
    WebSession = $Translator.Session
    Method = "Post"
    ContentType = "application/x-www-form-urlencoded"
    Body = @{
      fromLang = "en"
      text = $Text
      to = "zh-Hans"
      token = $Translator.Token
      key = $Translator.Key
      tryFetchingGenderDebiasedTranslations = "true"
    }
    TimeoutSec = 45
  }
  $response = Invoke-RestMethod @translationRequest

  if ($response.ShowCaptcha) {
    throw "Bing Translator requested a CAPTCHA."
  }
  if ($null -eq $response -or $null -eq $response[0].translations) {
    $responseShape = $response | ConvertTo-Json -Compress -Depth 5
    throw "Bing Translator returned an unexpected response: $responseShape"
  }
  $translation = $response[0].translations[0].text
  if (-not $translation) {
    throw "Bing Translator returned no translation."
  }
  return [string]$translation
}

function Convert-Batch([pscustomobject]$Translator, [object[]]$Batch) {
  $sourceLines = for ($index = 0; $index -lt $Batch.Count; $index += 1) {
    "__SYNARA$($index.ToString('D6'))__ $($Batch[$index])"
  }
  $translatedText = Invoke-BingTranslation $Translator ($sourceLines -join "`n")
  $matches = [regex]::Matches(
    $translatedText,
    '(?ms)__SYNARA(\d{6})__\s*(.*?)(?=__SYNARA\d{6}__|\z)'
  )

  $translated = @{}
  foreach ($match in $matches) {
    $index = [int]$match.Groups[1].Value
    $value = $match.Groups[2].Value.Trim()
    if ($index -ge 0 -and $index -lt $Batch.Count -and $value) {
      $translated[$index] = $value
    }
  }
  return $translated
}

function Write-TranslationFile(
  [System.Collections.Generic.SortedDictionary[string, string]]$Translations,
  [string]$Path
) {
  $outputDirectory = Split-Path -Parent $Path
  [System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null
  $jsonOptions = [System.Text.Json.JsonSerializerOptions]::new()
  $jsonOptions.WriteIndented = $true
  $jsonOptions.Encoder = [System.Text.Encodings.Web.JavaScriptEncoder]::UnsafeRelaxedJsonEscaping
  $json = [System.Text.Json.JsonSerializer]::Serialize($Translations, $jsonOptions)
  [System.IO.File]::WriteAllText($Path, "$json`n", [System.Text.UTF8Encoding]::new($false))
}

Push-Location $repoRoot
try {
  $candidateLines = & node "scripts/extract-localization-candidates.mjs" 1 2>$null
  if ($LASTEXITCODE -ne 0) {
    throw "Failed to extract localization candidates."
  }

  $candidateSet = [System.Collections.Generic.HashSet[string]]::new(
    [System.StringComparer]::Ordinal
  )
  foreach ($line in $candidateLines) {
    $parts = $line -split "`t", 3
    if ($parts.Count -lt 1) { continue }
    $value = $parts[0] | ConvertFrom-Json
    if (-not (Test-SkipCandidate $value)) {
      [void]$candidateSet.Add([string]$value)
    }
  }

  $candidates = @($candidateSet | Sort-Object)
  if ($MaxCandidates -gt 0) {
    $candidates = @($candidates | Select-Object -First $MaxCandidates)
  }

  $translations = [System.Collections.Generic.SortedDictionary[string, string]]::new(
    [System.StringComparer]::Ordinal
  )
  if (Test-Path -LiteralPath $OutputPath) {
    $savedTranslations = Get-Content -Raw -LiteralPath $OutputPath | ConvertFrom-Json -AsHashtable
    foreach ($entry in $savedTranslations.GetEnumerator()) {
      $translations[[string]$entry.Key] = [string]$entry.Value
    }
  }
  $candidates = @($candidates | Where-Object { -not $translations.ContainsKey($_) })
  Write-Host "Translating $($candidates.Count) UI strings ($($translations.Count) already saved)..."

  if ($candidates.Count -eq 0) {
    Write-TranslationFile $translations $OutputPath
    Write-Host "Wrote $($translations.Count) translations to $OutputPath"
    return
  }

  $batches = [System.Collections.Generic.List[object]]::new()
  $current = [System.Collections.Generic.List[string]]::new()
  $currentLength = 0
  foreach ($candidate in $candidates) {
    $lineLength = $candidate.Length + 24
    if (
      $current.Count -gt 0 -and
      ($current.Count -ge $BatchItemLimit -or $currentLength + $lineLength -gt $BatchCharacterLimit)
    ) {
      $batches.Add($current.ToArray())
      $current = [System.Collections.Generic.List[string]]::new()
      $currentLength = 0
    }
    $current.Add($candidate)
    $currentLength += $lineLength
  }
  if ($current.Count -gt 0) {
    $batches.Add($current.ToArray())
  }

  $translator = New-BingTranslatorSession
  for ($batchIndex = 0; $batchIndex -lt $batches.Count; $batchIndex += 1) {
    $batch = [object[]]$batches[$batchIndex]
    $translated = $null
    for ($attempt = 1; $attempt -le 3; $attempt += 1) {
      try {
        $translated = Convert-Batch $translator $batch
        break
      } catch {
        if ($attempt -eq 3) { throw }
        $translator = New-BingTranslatorSession
      }
    }

    for ($index = 0; $index -lt $batch.Count; $index += 1) {
      $source = [string]$batch[$index]
      $target = $translated[$index]
      if (-not $target) {
        $single = Convert-Batch $translator @($source)
        $target = $single[0]
      }
      if (-not $target) {
        throw "No translation returned for: $source"
      }
      $translations[$source] = [string]$target
    }
    Write-TranslationFile $translations $OutputPath

    $progress = @{
      Activity = "Generating Simplified Chinese translations"
      Status = "Batch $($batchIndex + 1) of $($batches.Count)"
      PercentComplete = (($batchIndex + 1) / $batches.Count) * 100
    }
    Write-Progress @progress
  }
  Write-Progress -Activity "Generating Simplified Chinese translations" -Completed

  Write-TranslationFile $translations $OutputPath
  Write-Host "Wrote $($translations.Count) translations to $OutputPath"
} finally {
  Pop-Location
}
