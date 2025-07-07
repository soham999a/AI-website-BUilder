# 🚀 Deployment Guide - 100% Free!

## Deploy to Vercel (Recommended - FREE)

Vercel is perfect for Next.js apps and offers generous free tier.

### Method 1: GitHub Integration (Easiest)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-website-builder.git
   git push -u origin main
   ```

2. **Deploy with Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Add environment variables in Vercel dashboard
   - Deploy! 🎉

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Add environment variables**:
   ```bash
   vercel env add OPENAI_API_KEY
   ```

## Deploy to Netlify (Alternative - FREE)

1. **Build the project**:
   ```bash
   npm run build
   npm run export
   ```

2. **Deploy to Netlify**:
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder
   - Or connect your GitHub repository

## Environment Variables for Production

Add these in your deployment platform:

```env
OPENAI_API_KEY=your_openai_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

## Free Hosting Options

### 1. Vercel (Recommended)
- ✅ Perfect for Next.js
- ✅ Automatic deployments
- ✅ Custom domains
- ✅ Edge functions
- **Limits**: 100GB bandwidth/month

### 2. Netlify
- ✅ Great for static sites
- ✅ Form handling
- ✅ Custom domains
- **Limits**: 100GB bandwidth/month

### 3. Railway
- ✅ Full-stack apps
- ✅ Database hosting
- ✅ $5 free credit monthly
- **Limits**: Based on usage

### 4. Render
- ✅ Free tier available
- ✅ Auto-deploy from Git
- **Limits**: 750 hours/month

## Custom Domain (Optional)

### Free Options:
- **Freenom**: Free domains (.tk, .ml, .ga)
- **GitHub Pages**: username.github.io
- **Vercel**: yourapp.vercel.app

### Paid Options:
- **Namecheap**: ~$10/year
- **Google Domains**: ~$12/year
- **Cloudflare**: ~$10/year

## Performance Optimization

Before deploying:

1. **Optimize images**:
   ```bash
   npm install next-optimized-images
   ```

2. **Enable compression**:
   ```javascript
   // next.config.js
   module.exports = {
     compress: true,
   }
   ```

3. **Add analytics** (optional):
   ```bash
   npm install @vercel/analytics
   ```

## Monitoring (Free)

- **Vercel Analytics**: Built-in
- **Google Analytics**: Free
- **Plausible**: Privacy-focused
- **Umami**: Self-hosted

## SSL Certificate

All modern hosting platforms provide free SSL certificates automatically!

## Backup Strategy

1. **Code**: GitHub (free private repos)
2. **Database**: Supabase automatic backups
3. **Environment**: Document in README

## Cost Breakdown

| Service | Free Tier | Paid Plans Start |
|---------|-----------|------------------|
| Vercel | 100GB bandwidth | $20/month |
| Netlify | 100GB bandwidth | $19/month |
| Supabase | 500MB database | $25/month |
| OpenAI API | $5 credit | Pay-per-use |
| **Total** | **$0-5/month** | **$64+/month** |

## Production Checklist

- [ ] Environment variables configured
- [ ] Database connected
- [ ] API keys secured
- [ ] Error monitoring setup
- [ ] Analytics configured
- [ ] Custom domain (optional)
- [ ] SSL certificate active
- [ ] Performance optimized

## Support

If you run into issues:
1. Check the deployment logs
2. Verify environment variables
3. Test locally first
4. Check the hosting platform docs

Happy deploying! 🚀
