# 🆓 FREE AI APIs Setup Guide

## Quick Setup (5 minutes each)

### 1. 🚀 **GROQ (FASTEST & FREE)**
- Go to: https://console.groq.com/
- Sign up with email
- Go to "API Keys" 
- Create new key
- Copy and add to `.env.local`:
```
GROQ_API_KEY=gsk_your_key_here
```
**✅ BEST OPTION: Super fast, completely free, great for websites**

### 2. 🤗 **Hugging Face (FREE)**
- Go to: https://huggingface.co/settings/tokens
- Sign up with email
- Create "Read" token
- Copy and add to `.env.local`:
```
HUGGINGFACE_API_KEY=hf_your_token_here
```

### 3. 🧠 **Anthropic Claude (FREE)**
- Go to: https://console.anthropic.com/
- Sign up with email
- Get $5 free credits
- Copy API key to `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-your_key_here
```

## Current Status
- ✅ Gemini: Working but sometimes fails
- ✅ Advanced Demo: Always works as fallback
- 🆕 Groq: Add this for super fast generation
- 🆕 Hugging Face: Add this for free generation
- 🆕 Claude: Add this for high-quality generation

## How It Works
The app tries APIs in this order:
1. Gemini (if key exists)
2. **Groq (if key exists) ← ADD THIS**
3. Claude (if key exists)
4. Hugging Face (if key exists)
5. OpenAI (if key exists)
6. Advanced Demo (always works)

## Recommendation
**Just add GROQ_API_KEY** - it's the fastest and most reliable free option!
