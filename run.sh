#!/bin/bash

echo "🚀 AI Website Builder - Quick Start"
echo "================================"
echo

echo "Checking if Node.js is installed..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo
    echo "Please install Node.js first:"
    echo "1. Go to https://nodejs.org/"
    echo "2. Download the LTS version"
    echo "3. Install it"
    echo "4. Run this script again"
    echo
    exit 1
fi

echo "✅ Node.js is installed!"
echo

echo "Installing dependencies..."
npm install

echo
echo "Setting up environment file..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "✅ Created .env.local file"
else
    echo "✅ .env.local already exists"
fi

echo
echo "🎉 Setup complete!"
echo
echo "The app works in DEMO MODE without any API keys!"
echo "For real AI generation, add API keys to .env.local"
echo
echo "Starting the development server..."
echo "Open http://localhost:3000 in your browser"
echo

npm run dev
