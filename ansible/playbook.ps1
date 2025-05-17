# Configurações
$appDir = Split-Path -Parent $PSScriptRoot
$backendDir = Join-Path $appDir "backend"
$frontendDir = Join-Path $appDir "frontend"
$dbName = "crud_app_dev"
$dbUser = "root"
$dbPassword = ""

# Função para verificar se um comando existe
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Verificar pré-requisitos
Write-Host "Verificando pre-requisitos..." -ForegroundColor Green

# Verificar Node.js
if (-not (Test-Command "node")) {
    Write-Host "Node.js nao encontrado. Por favor, instale o Node.js." -ForegroundColor Red
    exit 1
}

# Verificar npm
if (-not (Test-Command "npm")) {
    Write-Host "npm nao encontrado. Por favor, instale o npm." -ForegroundColor Red
    exit 1
}

# Verificar XAMPP
$xamppPath = "C:\xampp"
if (-not (Test-Path $xamppPath)) {
    Write-Host "XAMPP nao encontrado. Por favor, instale o XAMPP." -ForegroundColor Red
    exit 1
}

# Configurar variáveis de ambiente do backend
$backendEnv = @"
NODE_ENV=development
PORT=3000
DB_USERNAME=$dbUser
DB_PASSWORD=$dbPassword
DB_NAME=$dbName
DB_HOST=localhost
"@
Set-Content -Path (Join-Path $backendDir ".env") -Value $backendEnv

# Configurar variáveis de ambiente do frontend
$frontendEnv = @"
VITE_API_URL=http://localhost:3000
"@
Set-Content -Path (Join-Path $frontendDir ".env") -Value $frontendEnv

# Instalar dependências do backend
Write-Host "Instalando dependencias do backend..." -ForegroundColor Green
Set-Location $backendDir
npm install

# Instalar dependências do frontend
Write-Host "Instalando dependencias do frontend..." -ForegroundColor Green
Set-Location $frontendDir
npm install

# Iniciar aplicação
Write-Host "Iniciando aplicacao..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendDir'; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendDir'; npm run dev"

Write-Host "Configuracao concluida!" -ForegroundColor Green
Write-Host "Backend rodando em: http://localhost:3000" -ForegroundColor Cyan
Write-Host "Frontend rodando em: http://localhost:5173" -ForegroundColor Cyan 