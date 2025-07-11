# Cleanup Script - Remove Old Component Files
# This script removes duplicate component files that have been moved to organized folders

Write-Host "🧹 Cleaning up old component files..." -ForegroundColor Yellow

# Files to remove (duplicates that have been moved to proper folders)
$filesToRemove = @(
    "src\components\MarqueeBackground.tsx",
    "src\components\MarqueeTailwind.tsx", 
    "src\components\MomentsList.tsx",
    "src\components\ParallaxHero.tsx",
    "src\components\PlantButton.tsx",
    "src\components\SlidingText.tsx",
    "src\components\StickyHeader.tsx",
    "src\components\Testimonial.tsx",
    "src\components\FloatingImage.tsx",
    "src\components\Footer.tsx",
    "src\components\LenisWrapper.tsx",
    "src\components\AnimatedEnvelope.tsx",
    "src\components\HeroSplitImage.tsx"
)

foreach ($file in $filesToRemove) {
    $fullPath = Join-Path $PSScriptRoot $file
    if (Test-Path $fullPath) {
        Remove-Item $fullPath -Force
        Write-Host "✅ Removed: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠️  File not found: $file" -ForegroundColor Gray
    }
}

Write-Host "🎉 Cleanup completed!" -ForegroundColor Green
