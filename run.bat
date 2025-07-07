@echo off
echo 🚀 AI Website Builder - Quick Start
echo ================================

echo.
echo Checking if Node.js is installed...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to https://nodejs.org/
    echo 2. Download the LTS version
    echo 3. Run the installer
    echo 4. Restart this script
    echo.
    pause
    exit /b 1
)

echo ✅ Node.js is installed!
echo.

echo Installing dependencies...
npm install

echo.
echo Setting up environment file...
if not exist .env.local (
    copy .env.example .env.local
    echo ✅ Created .env.local file
) else (
    echo ✅ .env.local already exists
)

echo.
echo 🎉 Setup complete!
echo.
echo The app works in DEMO MODE without any API keys!
echo For real AI generation, add API keys to .env.local
echo.
echo Starting the development server...
echo Open http://localhost:3000 in your browser
echo.

npm run dev
