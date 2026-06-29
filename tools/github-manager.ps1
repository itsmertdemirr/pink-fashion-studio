[CmdletBinding()]
param(
    [ValidateSet("Publish", "Update")]
    [string]$Mode = "Publish"
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"
$ProgressPreference = "SilentlyContinue"

$ProjectRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$LogPath = Join-Path $ProjectRoot "github-upload.log"
$DefaultRepositoryName = "pink-fashion-studio"
$RepositoryDescription = "Mobile friendly HTML fashion dress-up game made for Sude."

function Write-Step([string]$Message) {
    Write-Host ""
    Write-Host "==> $Message" -ForegroundColor Cyan
}

function Write-Ok([string]$Message) {
    Write-Host "[OK] $Message" -ForegroundColor Green
}

function Write-WarningMessage([string]$Message) {
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Test-Command([string]$Name) {
    return [bool](Get-Command $Name -ErrorAction SilentlyContinue)
}

function Invoke-External {
    [CmdletBinding()]
    param(
        [Parameter(Mandatory = $true)]
        [string]$FilePath,
        [string[]]$Arguments = @(),
        [ValidateSet("Show", "Capture", "Discard")]
        [string]$OutputMode = "Show",
        [switch]$AllowFailure
    )

    $oldPreference = $ErrorActionPreference
    $output = @()
    $exitCode = 1

    try {
        $ErrorActionPreference = "Continue"
        $output = @(& $FilePath @Arguments 2>&1)
        $exitCode = $LASTEXITCODE
        if ($null -eq $exitCode) {
            $exitCode = 1
        }
    }
    finally {
        $ErrorActionPreference = $oldPreference
    }

    if ($OutputMode -eq "Show") {
        foreach ($line in $output) {
            Write-Host ([string]$line)
        }
    }

    if ((-not $AllowFailure) -and ($exitCode -ne 0)) {
        $commandText = (($FilePath + " " + ($Arguments -join " ")).Trim())
        $detail = (($output | ForEach-Object { [string]$_ }) -join [Environment]::NewLine)
        if ([string]::IsNullOrWhiteSpace($detail)) {
            throw "Command failed with exit code ${exitCode}: $commandText"
        }
        throw "Command failed with exit code ${exitCode}: $commandText`n$detail"
    }

    return [pscustomobject]@{
        ExitCode = [int]$exitCode
        Output = @($output | ForEach-Object { [string]$_ })
    }
}

function Refresh-Path {
    $machinePath = [Environment]::GetEnvironmentVariable("Path", "Machine")
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    $env:Path = "$machinePath;$userPath"
}

function Install-WithWinget([string]$Id, [string]$DisplayName) {
    if (-not (Test-Command "winget")) {
        throw "$DisplayName is missing and winget is not available. Install App Installer from Microsoft Store and run again."
    }

    Write-Step "Installing $DisplayName"
    [void](Invoke-External -FilePath "winget" -Arguments @(
        "install", "--id", $Id, "--exact", "--source", "winget",
        "--accept-package-agreements", "--accept-source-agreements", "--silent"
    ))
    Refresh-Path
}

function Ensure-Dependencies {
    if (-not (Test-Command "git")) {
        Install-WithWinget -Id "Git.Git" -DisplayName "Git"
    }
    if (-not (Test-Command "gh")) {
        Install-WithWinget -Id "GitHub.cli" -DisplayName "GitHub CLI"
    }

    if (-not (Test-Command "git")) {
        throw "Git installation could not be completed."
    }
    if (-not (Test-Command "gh")) {
        throw "GitHub CLI installation could not be completed."
    }

    $gitVersion = Invoke-External -FilePath "git" -Arguments @("--version") -OutputMode "Capture"
    $ghVersion = Invoke-External -FilePath "gh" -Arguments @("--version") -OutputMode "Capture"
    Write-Ok (($gitVersion.Output | Select-Object -First 1) -join " ")
    Write-Ok (($ghVersion.Output | Select-Object -First 1) -join " ")
}

function Ensure-GitHubLogin {
    Write-Step "Checking GitHub account"
    $status = Invoke-External -FilePath "gh" -Arguments @(
        "auth", "status", "--hostname", "github.com"
    ) -OutputMode "Discard" -AllowFailure

    if ($status.ExitCode -ne 0) {
        Write-Host "A browser window will open for secure GitHub login." -ForegroundColor Magenta
        [void](Invoke-External -FilePath "gh" -Arguments @(
            "auth", "login", "--hostname", "github.com",
            "--git-protocol", "https", "--web", "--scopes", "repo,workflow"
        ))
    }

    [void](Invoke-External -FilePath "gh" -Arguments @(
        "auth", "setup-git", "--hostname", "github.com"
    ) -OutputMode "Discard")

    $userResult = Invoke-External -FilePath "gh" -Arguments @(
        "api", "user", "--jq", ".login"
    ) -OutputMode "Capture"

    $login = (($userResult.Output | Select-Object -First 1) -as [string])
    if ($null -ne $login) {
        $login = $login.Trim()
    }
    if ([string]::IsNullOrWhiteSpace($login)) {
        throw "GitHub username could not be read."
    }

    Write-Ok "GitHub account: $login"
    return $login
}

function Assert-ProjectFiles {
    $requiredFiles = @(
        "index.html",
        "assets/css/styles.css",
        "assets/js/app.js",
        ".github/workflows/pages.yml"
    )

    foreach ($relativePath in $requiredFiles) {
        $fullPath = Join-Path $ProjectRoot $relativePath
        if (-not (Test-Path $fullPath -PathType Leaf)) {
            throw "Required project file is missing: $relativePath"
        }
    }

    Write-Ok "Project files verified."
}

function Get-GitConfigValue([string]$Key) {
    $result = Invoke-External -FilePath "git" -Arguments @(
        "config", "--get", $Key
    ) -OutputMode "Capture" -AllowFailure

    if ($result.ExitCode -ne 0) {
        return $null
    }

    $value = (($result.Output | Select-Object -First 1) -as [string])
    if ($null -eq $value) {
        return $null
    }
    return $value.Trim()
}

function Ensure-GitIdentity([string]$Login) {
    $name = Get-GitConfigValue -Key "user.name"
    $email = Get-GitConfigValue -Key "user.email"

    if ([string]::IsNullOrWhiteSpace($name)) {
        [void](Invoke-External -FilePath "git" -Arguments @(
            "config", "user.name", "Mert Demir"
        ) -OutputMode "Discard")
    }

    if ([string]::IsNullOrWhiteSpace($email)) {
        [void](Invoke-External -FilePath "git" -Arguments @(
            "config", "user.email", "$Login@users.noreply.github.com"
        ) -OutputMode "Discard")
    }
}

function Invoke-Git {
    [void](Invoke-External -FilePath "git" -Arguments @($args))
}

function Get-GitRemoteNames {
    $result = Invoke-External -FilePath "git" -Arguments @("remote") -OutputMode "Capture" -AllowFailure
    if ($result.ExitCode -ne 0) {
        return @()
    }
    return @($result.Output | ForEach-Object { ([string]$_).Trim() } | Where-Object { $_ })
}

function Test-GitRemote([string]$Name) {
    return ((Get-GitRemoteNames) -contains $Name)
}

function Get-OriginRepository {
    if (-not (Test-GitRemote -Name "origin")) {
        return $null
    }

    $result = Invoke-External -FilePath "git" -Arguments @(
        "remote", "get-url", "origin"
    ) -OutputMode "Capture" -AllowFailure

    if ($result.ExitCode -ne 0) {
        return $null
    }

    $origin = (($result.Output | Select-Object -First 1) -as [string])
    if ([string]::IsNullOrWhiteSpace($origin)) {
        return $null
    }
    $origin = $origin.Trim()

    if ($origin -match "github[.]com[/:](?<owner>[^/]+)/(?<repo>[^/]+?)(?:[.]git)?$") {
        return "$($Matches.owner)/$($Matches.repo)"
    }

    return $null
}

function Initialize-Repository([string]$Login) {
    if (-not (Test-Path (Join-Path $ProjectRoot ".git"))) {
        Write-Step "Creating local Git repository"
        Invoke-Git init
    }

    Ensure-GitIdentity -Login $Login
    Invoke-Git branch -M main
}

function Commit-Changes([string]$Message) {
    Invoke-Git add --all

    $diff = Invoke-External -FilePath "git" -Arguments @(
        "diff", "--cached", "--quiet"
    ) -OutputMode "Discard" -AllowFailure

    if ($diff.ExitCode -eq 0) {
        $head = Invoke-External -FilePath "git" -Arguments @(
            "rev-parse", "--verify", "HEAD"
        ) -OutputMode "Discard" -AllowFailure

        if ($head.ExitCode -eq 0) {
            Write-Ok "No new changes. Existing commit will be used."
            return $false
        }
    }
    elseif ($diff.ExitCode -ne 1) {
        throw "Git change check failed with exit code $($diff.ExitCode)."
    }

    Invoke-Git commit -m $Message
    Write-Ok "Changes committed."
    return $true
}

function Get-RepositoryName {
    $savedRemote = Get-OriginRepository
    if ($savedRemote) {
        return ($savedRemote -split "/", 2)[1]
    }

    $answer = Read-Host "Repository name [$DefaultRepositoryName]"
    if ([string]::IsNullOrWhiteSpace($answer)) {
        $answer = $DefaultRepositoryName
    }
    $answer = $answer.Trim()

    if ($answer -notmatch "^[A-Za-z0-9._-]+$") {
        throw "Repository name may contain only letters, numbers, dot, dash and underscore."
    }

    return $answer
}

function Test-RemoteRepository([string]$FullName) {
    $result = Invoke-External -FilePath "gh" -Arguments @(
        "repo", "view", $FullName, "--json", "nameWithOwner", "--jq", ".nameWithOwner"
    ) -OutputMode "Discard" -AllowFailure
    return ($result.ExitCode -eq 0)
}

function Connect-OrCreateRemote([string]$Login, [string]$RepositoryName) {
    $fullName = "$Login/$RepositoryName"
    $remoteUrl = "https://github.com/$fullName.git"

    if (Test-RemoteRepository -FullName $fullName) {
        Write-Step "Connecting to existing GitHub repository: $fullName"

        if (Test-GitRemote -Name "origin") {
            Invoke-Git remote set-url origin $remoteUrl
        }
        else {
            Invoke-Git remote add origin $remoteUrl
        }

        $remoteMain = Invoke-External -FilePath "git" -Arguments @(
            "ls-remote", "--exit-code", "--heads", "origin", "main"
        ) -OutputMode "Discard" -AllowFailure

        if ($remoteMain.ExitCode -eq 0) {
            Invoke-Git fetch origin main
            $mergeBase = Invoke-External -FilePath "git" -Arguments @(
                "merge-base", "HEAD", "origin/main"
            ) -OutputMode "Discard" -AllowFailure

            if ($mergeBase.ExitCode -ne 0) {
                throw "The remote repository has an unrelated history. Use another repository name or empty the existing repository."
            }
        }
    }
    else {
        Write-Step "Creating GitHub repository: $fullName"

        if (Test-GitRemote -Name "origin") {
            Invoke-Git remote remove origin
        }

        [void](Invoke-External -FilePath "gh" -Arguments @(
            "repo", "create", $fullName, "--public",
            "--description", $RepositoryDescription,
            "--source", $ProjectRoot, "--remote", "origin"
        ))
    }

    return $fullName
}

function Push-Main([string]$FullName) {
    Write-Step "Pushing files to GitHub"
    $push = Invoke-External -FilePath "git" -Arguments @(
        "push", "--set-upstream", "origin", "main"
    ) -AllowFailure

    if ($push.ExitCode -ne 0) {
        throw "Git push failed. Check repository: https://github.com/$FullName"
    }

    Write-Ok "Main branch pushed to GitHub."
}

function Enable-Pages([string]$FullName) {
    Write-Step "Configuring GitHub Pages"

    $status = Invoke-External -FilePath "gh" -Arguments @(
        "api", "repos/$FullName/pages"
    ) -OutputMode "Discard" -AllowFailure

    if ($status.ExitCode -eq 0) {
        $update = Invoke-External -FilePath "gh" -Arguments @(
            "api", "--method", "PUT", "repos/$FullName/pages", "-f", "build_type=workflow"
        ) -OutputMode "Discard" -AllowFailure

        if ($update.ExitCode -eq 0) {
            Write-Ok "GitHub Pages is configured for GitHub Actions."
        }
        else {
            Write-WarningMessage "Pages already exists, but its build type could not be updated automatically."
        }
    }
    else {
        $create = Invoke-External -FilePath "gh" -Arguments @(
            "api", "--method", "POST", "repos/$FullName/pages", "-f", "build_type=workflow"
        ) -OutputMode "Discard" -AllowFailure

        if ($create.ExitCode -eq 0) {
            Write-Ok "GitHub Pages enabled."
        }
        else {
            Write-WarningMessage "Pages API setup was not completed. The pushed workflow may still activate it."
            Write-WarningMessage "If needed, open GitHub Settings, Pages and select GitHub Actions."
        }
    }
}

function Show-Result([string]$FullName) {
    $repoUrl = "https://github.com/$FullName"
    $parts = $FullName -split "/", 2
    $pagesUrl = "https://$($parts[0]).github.io/$($parts[1])/"

    $pagesResult = Invoke-External -FilePath "gh" -Arguments @(
        "api", "repos/$FullName/pages", "--jq", ".html_url"
    ) -OutputMode "Capture" -AllowFailure

    if ($pagesResult.ExitCode -eq 0) {
        $apiUrl = (($pagesResult.Output | Select-Object -First 1) -as [string])
        if (-not [string]::IsNullOrWhiteSpace($apiUrl)) {
            $pagesUrl = $apiUrl.Trim()
        }
    }

    Write-Host ""
    Write-Host "========================================================" -ForegroundColor DarkMagenta
    Write-Host "UPLOAD COMPLETED" -ForegroundColor Green
    Write-Host "Repository : $repoUrl"
    Write-Host "Game       : $pagesUrl"
    Write-Host "Actions    : $repoUrl/actions"
    Write-Host "========================================================" -ForegroundColor DarkMagenta

    try {
        Start-Process $repoUrl
    }
    catch {}

    try {
        Start-Process "$repoUrl/actions"
    }
    catch {}
}

$locationPushed = $false
$transcriptStarted = $false

try {
    Start-Transcript -Path $LogPath -Append | Out-Null
    $transcriptStarted = $true

    Push-Location $ProjectRoot
    $locationPushed = $true

    Write-Host "Pink Fashion Studio - GitHub Auto Publisher v1.0.3" -ForegroundColor Magenta
    Write-Host "Developer: Mert Demir | Made for Sude"

    Ensure-Dependencies
    Assert-ProjectFiles
    $login = Ensure-GitHubLogin
    Initialize-Repository -Login $login

    if ($Mode -eq "Publish") {
        $repositoryName = Get-RepositoryName
        [void](Commit-Changes -Message "Initial release: Pink Fashion Studio")
        $fullName = Connect-OrCreateRemote -Login $login -RepositoryName $repositoryName
    }
    else {
        $fullName = Get-OriginRepository
        if (-not $fullName) {
            throw "This folder is not connected to GitHub. Run BASLAT_GITHUB_YUKLE.bat first."
        }

        $updateMessage = "Update Pink Fashion Studio - " + (Get-Date -Format "yyyy-MM-dd HH:mm")
        [void](Commit-Changes -Message $updateMessage)
    }

    Push-Main -FullName $fullName
    Enable-Pages -FullName $fullName
    Show-Result -FullName $fullName

    if ($locationPushed) {
        Pop-Location
        $locationPushed = $false
    }
    if ($transcriptStarted) {
        Stop-Transcript | Out-Null
        $transcriptStarted = $false
    }

    exit 0
}
catch {
    if ($locationPushed) {
        try {
            Pop-Location -ErrorAction SilentlyContinue
        }
        catch {}
    }

    Write-Host ""
    Write-Host "[ERROR] $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Log file: $LogPath" -ForegroundColor Yellow

    if ($transcriptStarted) {
        try {
            Stop-Transcript | Out-Null
        }
        catch {}
    }

    exit 1
}
