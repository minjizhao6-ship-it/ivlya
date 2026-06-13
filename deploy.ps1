# IVLYA site deploy script
# Syncs site files to deploy-repo and pushes to GitHub

$ErrorActionPreference = "Stop"
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$deploy = Join-Path $root "deploy-repo"

Write-Host "Syncing site files..."
robocopy $root $deploy /E /XD .git deploy-repo ivlya-site-upload /XF ivlya-site-upload.zip gh-auth-output-2.txt deploy.ps1 /NFL /NDL /NJH /NJS /nc /ns /np | Out-Null

Push-Location $deploy
try {
    $status = git status --porcelain
    if ($status) {
        git add -A
        git commit -m "Update IVLYA site"
    }

    Write-Host "Pushing to GitHub (no proxy)..."
    git -c http.proxy= -c https.proxy= push --force origin main
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Direct push failed, trying proxy 127.0.0.1:7890..."
        git -c http.proxy=http://127.0.0.1:10808 -c https.proxy=http://127.0.0.1:10808 push --force origin main
    }
    Write-Host "Done! Check https://github.com/minjizhao6-ship-it/ivlya"
}
finally {
    Pop-Location
}
