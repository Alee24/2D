$file = "c:\Users\Metto\Desktop\Codes\2D\src\data\coworkingData.ts"
$lines = Get-Content $file
# Find the line with ]; after the single Mombasa location block (line 267 = index 266)
# Find first ]; after line 266, then find the SECOND "export const testimonials"
# Strategy: keep lines 1..267, then skip to where the REAL testimonials export is

$keepUntil = 268  # lines 1-268 (the ];\n after mombasa location)
$startFrom = $null

for ($i = 268; $i -lt $lines.Count; $i++) {
    if ($lines[$i] -match "^export const testimonials") {
        $startFrom = $i
        break
    }
}

if ($startFrom -ne $null) {
    $newContent = $lines[0..($keepUntil-1)] + "" + $lines[$startFrom..($lines.Count-1)]
    Set-Content -Path $file -Value $newContent -NoNewline
    Write-Host "Done. Removed lines $keepUntil to $($startFrom-1). File now has $($newContent.Count) lines."
} else {
    Write-Host "Could not find testimonials export after line 268"
}
