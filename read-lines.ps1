$lines = Get-Content 'e:\Ombaye1\alexiant\web\src\app\page.tsx'
for($i=400;$i -le 415;$i++){Write-Host "$i|$($lines[$i])"}
