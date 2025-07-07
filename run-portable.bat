@echo off
echo 🚀 AI Website Builder - Portable Node.js Version
echo ===============================================

cd /d "%~dp0"

echo.
echo Using portable Node.js...
node-v20.11.0-win-x64\node.exe -e "console.log('✅ Node.js version:', process.version)"

echo.
echo Installing remaining dependencies...
node-v20.11.0-win-x64\npm.cmd install --legacy-peer-deps --force

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

echo Trying to start Next.js development server...
echo.

REM Try different methods to start the server
echo Method 1: Using npx...
node-v20.11.0-win-x64\npx.cmd --yes next@15.1.0 dev

echo.
echo If that didn't work, trying method 2...
node-v20.11.0-win-x64\npm.cmd run dev

echo.
echo If nothing worked, you can try the demo.html file instead!
echo Just double-click demo.html in your file explorer.
pause
