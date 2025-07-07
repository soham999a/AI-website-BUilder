# 🚀 Quick Setup Guide

## Step 1: Install Node.js

If you don't have Node.js installed:

### Windows:
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the LTS version
3. Run the installer and follow the prompts

### Mac:
```bash
# Using Homebrew (recommended)
brew install node

# Or download from nodejs.org
```

### Linux:
```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt-get install -y nodejs

# Or use your package manager
```

## Step 2: Install Dependencies

Open terminal/command prompt in the project folder and run:

```bash
npm install
```

## Step 3: Set Up Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your API keys:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Getting OpenAI API Key (Optional - works without it):
1. Go to [platform.openai.com](https://platform.openai.com/)
2. Sign up/login
3. Go to API Keys section
4. Create a new API key
5. Copy and paste it in `.env.local`

**Note**: The app works without an API key using demo mode!

## Step 4: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Step 5: Start Building!

1. Go to the dashboard
2. Enter a project name
3. Describe your website
4. Click "Generate Website"
5. See the magic happen! ✨

## Troubleshooting

### Port 3000 is already in use:
```bash
npm run dev -- -p 3001
```

### Permission errors on Mac/Linux:
```bash
sudo npm install
```

### Clear npm cache:
```bash
npm cache clean --force
```

## What's Next?

- Add your OpenAI API key for real AI generation
- Customize the UI components
- Add more AI models
- Deploy to Vercel for free!

Happy building! 🎉
