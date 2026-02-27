# This script creates a proper deployment zip for Hostinger
Write-Host "Creating Hostinger deployment zip..."

# First, make sure we have a fresh build
Write-Host "Running next build..."
npm run build

# Remove old zip if it exists
if (Test-Path "hostinger-deploy.zip") {
    Remove-Item "hostinger-deploy.zip" -Force
}

# The files and folders needed for a Hostinger Node.js deployment
$filesToZip = @(
    ".next",
    "public",
    "package.json",
    "package-lock.json",
    "next.config.ts",
    ".env"
)

# Check which files actually exist to avoid errors
$existingFiles = @()
foreach ($file in $filesToZip) {
    if (Test-Path $file) {
        $existingFiles += $file
    }
    else {
        Write-Host "Warning: $file not found, skipping..." -ForegroundColor Yellow
    }
}

Write-Host "Zipping files... This may take a minute or two."
Compress-Archive -Path $existingFiles -DestinationPath "hostinger-deploy.zip" -Force

Write-Host "✅ Done! You can now upload 'hostinger-deploy.zip' to Hostinger." -ForegroundColor Green
Write-Host "IMPORTANT: Before extracting on Hostinger, delete the old '.next' folder in your File Manager!" -ForegroundColor Red
