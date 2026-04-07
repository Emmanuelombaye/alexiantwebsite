$f = 'e:\Ombaye1\alexiant\web\src\app\mortgage\page.tsx'
$c = Get-Content $f -Raw

# Replace the map iterator
$c = $c -replace '\[1,2,3\]\.map\(i =>', '[0,1,2].map((_, i) =>'

# Replace the single pravatar URL (already replaced with first image) with indexed array
$imgs = @(
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=100&h=100',
    'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?auto=format&fit=crop&q=80&w=100&h=100',
    'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&q=80&w=100&h=100'
)

$old = 'src={`' + $imgs[0] + '`}'
$new = 'src={[' + '"' + $imgs[0] + '",' + '"' + $imgs[1] + '",' + '"' + $imgs[2] + '"' + '][i]}'
$c = $c -replace [regex]::Escape($old), $new

Set-Content $f $c -Encoding UTF8
Write-Host "done"
