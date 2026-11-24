# Génère les icônes PWA (radar à 12 branches) dans icons/.
# Usage : powershell -ExecutionPolicy Bypass -File tools/make-icons.ps1
Add-Type -AssemblyName System.Drawing

$outDir = Join-Path (Split-Path $PSScriptRoot -Parent) 'icons'
New-Item -ItemType Directory -Force $outDir | Out-Null

function New-Icon([int]$size, [double]$radiusRatio, [string]$file) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.Clear([System.Drawing.ColorTranslator]::FromHtml('#0f172a'))

  $cx = $size / 2.0; $cy = $size / 2.0
  $R = $size * $radiusRatio
  $n = 12

  function Get-Poly([double[]]$radii) {
    $pts = for ($i = 0; $i -lt $n; $i++) {
      $a = 2 * [Math]::PI * $i / $n - [Math]::PI / 2
      New-Object System.Drawing.PointF ([float]($cx + $radii[$i] * [Math]::Cos($a))), ([float]($cy + $radii[$i] * [Math]::Sin($a)))
    }
    return ,$pts
  }

  # Anneaux concentriques
  $ringPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(70, 148, 163, 184)), ([float]($size * 0.008))
  foreach ($f in 0.34, 0.67, 1.0) {
    $g.DrawPolygon($ringPen, (Get-Poly (@($R * $f) * $n)))
  }
  # Axes
  for ($i = 0; $i -lt $n; $i++) {
    $a = 2 * [Math]::PI * $i / $n - [Math]::PI / 2
    $g.DrawLine($ringPen, [float]$cx, [float]$cy, [float]($cx + $R * [Math]::Cos($a)), [float]($cy + $R * [Math]::Sin($a)))
  }
  # Profil (valeurs fixes, irrégulières)
  $vals = 0.95, 0.55, 0.40, 0.70, 0.30, 0.85, 0.60, 0.45, 0.25, 0.50, 0.35, 0.65
  $radii = $vals | ForEach-Object { $R * $_ }
  $poly = Get-Poly $radii
  $fill = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(110, 212, 163, 115))
  $g.FillPolygon($fill, $poly)
  $pen = New-Object System.Drawing.Pen ([System.Drawing.ColorTranslator]::FromHtml('#d4a373')), ([float]($size * 0.018))
  $pen.LineJoin = 'Round'
  $g.DrawPolygon($pen, $poly)
  # Point central
  $dot = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#d4a373'))
  $d = $size * 0.035
  $g.FillEllipse($dot, [float]($cx - $d), [float]($cy - $d), [float](2 * $d), [float](2 * $d))

  $g.Dispose()
  $bmp.Save((Join-Path $outDir $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
  Write-Host "ok $file ($size px)"
}

New-Icon 192  0.40 'icon-192.png'
New-Icon 512  0.40 'icon-512.png'
New-Icon 512  0.30 'icon-maskable-512.png'   # zone de sécurité : contenu dans les 80 % centraux
New-Icon 180  0.40 'apple-touch-icon.png'
