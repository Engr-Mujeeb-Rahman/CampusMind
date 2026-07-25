# Start servers and run Playwright E2E tests - all in one process
$ErrorActionPreference = "Stop"

Write-Output "=== Starting servers ==="
$be = Start-Process -NoNewWindow -FilePath "node" -ArgumentList "src/server.js" -WorkingDirectory (Resolve-Path "backend") -PassThru
$fe = Start-Process -NoNewWindow -FilePath "npx.cmd" -ArgumentList "vite --port 5173 --host 0.0.0.0" -WorkingDirectory (Resolve-Path "frontend") -PassThru

Start-Sleep 8

# Verify servers are up
try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:4000/api/health" -UseBasicParsing -TimeoutSec 5
    Write-Output "Backend: $($r.Content)"
} catch {
    Write-Output "Backend: FAILED - $($_.Exception.Message)"
    Stop-Process -Id $be.Id -Force
    Stop-Process -Id $fe.Id -Force
    exit 1
}

try {
    $r = Invoke-WebRequest -Uri "http://127.0.0.1:5173" -UseBasicParsing -TimeoutSec 5
    Write-Output "Frontend: $($r.StatusCode)"
} catch {
    Write-Output "Frontend: FAILED"
    Stop-Process -Id $be.Id -Force
    Stop-Process -Id $fe.Id -Force
    exit 1
}

Write-Output "=== Running Playwright E2E tests ==="
node playwright-e2e.mjs

$exitCode = $LASTEXITCODE
Write-Output "=== E2E tests exit code: $exitCode ==="

Stop-Process -Id $be.Id -Force -ErrorAction SilentlyContinue
Stop-Process -Id $fe.Id -Force -ErrorAction SilentlyContinue
exit $exitCode
