# Vercel Environment Variables Uploader for Project: alexiantrealestate
# =========================================================================
# This script uses the Vercel REST API to push environment variables.
# As required, it includes a placeholder for the VERCEL_TOKEN and then triggers redeployment.

# Configuration
$PROJECT_NAME = "alexiantrealestate"
$VERCEL_TOKEN = "$env:VERCEL_TOKEN" # Attempts to use VERCEL_TOKEN if already in environment

if (!$VERCEL_TOKEN -or $VERCEL_TOKEN -eq "PASTE_TOKEN_HERE") {
    Write-Host "⚠️  VERCEL_TOKEN is not set. Please provide it or ensure it's in the environment variables." -ForegroundColor Yellow
    # Fallback/Placeholder so the script structure is complete as requested
    $VERCEL_TOKEN = "PASTE_TOKEN_HERE" 
}

# Define variables as requested (Actual project vars found in .env.local + user requested test vars)
$ENV_VARS = @{
    "ADMIN_PORTAL_PASSWORD" = "@AlexiantKenya!132323"
    "NEXT_PUBLIC_SUPABASE_URL" = "https://chdpzfeuxcphzpyahrlh.supabase.co"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY" = "sb_publishable_th7FBWaXXF80NXaxfeUs0g_RETqK590"
    "NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET" = "property-images"
    "API_KEY" = "12345"
    "DB_URL" = "mysql://root:password@localhost:3306/mydb"
}

# Vercel API Endpoint
$API_URL = "https://api.vercel.com/v10/projects/$PROJECT_NAME/env?upsert=true"

# Loop through and send POST requests
foreach ($key in $ENV_VARS.Keys) {
    $value = $ENV_VARS[$key]
    Write-Host "Uploading $key to Vercel..." -NoNewline
    
    $body = @{
        "key" = $key
        "value" = $value
        "type" = "encrypted"
        "target" = @("production")
    } | ConvertTo-Json

    try {
        $response = Invoke-RestMethod -Uri $API_URL -Method Post -Headers @{
            "Authorization" = "Bearer $VERCEL_TOKEN"
            "Content-Type" = "application/json"
        } -Body $body
        
        Write-Host " [Success]" -ForegroundColor Green
    } catch {
        Write-Host " [Failed]" -ForegroundColor Red
        Write-Error $_.Exception.Message
    }
}

# Redepoy the project following variables push
Write-Host "`n🚀 Triggering production deployment via Vercel CLI..." -ForegroundColor Cyan
vercel --prod
