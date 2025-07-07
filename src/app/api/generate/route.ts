import { NextRequest, NextResponse } from 'next/server'
import { generateIntelligentContent, generateMockData, type ContentContext } from '@/lib/content-generator'

// Advanced prompt engineering system
interface GenerationContext {
  prompt: string
  projectName?: string
  templateType?: string
  industry?: string
  targetAudience?: string
  features?: string[]
  colorScheme?: string
  style?: string
  complexity?: 'simple' | 'moderate' | 'advanced'
  businessType?: string
  tone?: string
  layout?: string
}

function analyzePrompt(prompt: string): GenerationContext {
  const context: GenerationContext = { prompt }

  // Industry detection with more sophisticated patterns
  const industries = {
    'restaurant|food|cafe|dining|culinary|chef|menu|kitchen': 'restaurant',
    'tech|software|app|saas|startup|digital|ai|machine learning': 'technology',
    'health|medical|doctor|clinic|hospital|wellness|fitness': 'healthcare',
    'education|school|course|learning|university|training': 'education',
    'finance|bank|investment|crypto|trading|fintech': 'finance',
    'real estate|property|housing|mortgage|realtor': 'realestate',
    'fashion|clothing|style|boutique|designer|apparel': 'fashion',
    'fitness|gym|workout|health|sports|training': 'fitness',
    'travel|tourism|hotel|vacation|booking|adventure': 'travel',
    'consulting|business|corporate|professional|services': 'business',
    'creative|design|art|photography|portfolio|agency': 'creative',
    'ecommerce|shop|store|retail|marketplace|selling': 'ecommerce',
    'nonprofit|charity|foundation|community|social': 'nonprofit'
  }

  for (const [keywords, industry] of Object.entries(industries)) {
    if (new RegExp(keywords, 'i').test(prompt)) {
      context.industry = industry
      break
    }
  }

  // Business type detection
  if (/startup|new business|entrepreneur/i.test(prompt)) context.businessType = 'startup'
  else if (/enterprise|corporation|large company/i.test(prompt)) context.businessType = 'enterprise'
  else if (/small business|local|family/i.test(prompt)) context.businessType = 'small'
  else if (/freelance|personal|individual/i.test(prompt)) context.businessType = 'personal'

  // Target audience detection
  if (/young|teen|student|millennial|gen z/i.test(prompt)) context.targetAudience = 'young'
  else if (/professional|business|corporate|executive/i.test(prompt)) context.targetAudience = 'professional'
  else if (/family|parent|children|kids/i.test(prompt)) context.targetAudience = 'family'
  else if (/luxury|premium|high-end|exclusive/i.test(prompt)) context.targetAudience = 'luxury'
  else if (/senior|elderly|mature/i.test(prompt)) context.targetAudience = 'senior'

  // Tone detection
  if (/fun|playful|casual|friendly/i.test(prompt)) context.tone = 'friendly'
  else if (/professional|formal|serious|corporate/i.test(prompt)) context.tone = 'professional'
  else if (/creative|artistic|innovative|unique/i.test(prompt)) context.tone = 'creative'
  else if (/trustworthy|reliable|secure|safe/i.test(prompt)) context.tone = 'trustworthy'
  else if (/modern|cutting-edge|advanced|futuristic/i.test(prompt)) context.tone = 'modern'

  // Layout preference detection
  if (/single page|one page|landing/i.test(prompt)) context.layout = 'single-page'
  else if (/multi page|multiple pages|navigation/i.test(prompt)) context.layout = 'multi-page'
  else if (/dashboard|admin|panel/i.test(prompt)) context.layout = 'dashboard'
  else if (/portfolio|showcase|gallery/i.test(prompt)) context.layout = 'portfolio'

  return context
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, projectName, templateType, industry, targetAudience, features, colorScheme, style, complexity } = await request.json()

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Analyze the prompt for context
    const context = analyzePrompt(prompt)

    // Override with any explicitly provided context
    if (projectName) context.projectName = projectName
    if (templateType) context.templateType = templateType
    if (industry) context.industry = industry
    if (targetAudience) context.targetAudience = targetAudience
    if (features) context.features = features
    if (colorScheme) context.colorScheme = colorScheme
    if (style) context.style = style
    if (complexity) context.complexity = complexity

    // Build advanced prompt with context
    const enhancedPrompt = buildAdvancedPrompt(context)

    // Try different AI providers in order of preference with enhanced prompts
    let generatedCode = null
    let aiProvider = 'demo'
    let metadata = { context, analysisUsed: true }

    // 1. Try Together AI first (BEST - $25 FREE CREDITS!)
    if (!generatedCode && process.env.TOGETHER_API_KEY) {
      try {
        console.log('🚀 Using TOGETHER AI for PREMIUM DESIGNS! 🔥 ($25 FREE!)')
        generatedCode = await generateWithTogether(enhancedPrompt, context)
        aiProvider = 'Together AI (PREMIUM - $25 FREE!)'
      } catch (error) {
        console.error('Together AI failed:', error)
        console.log('Together AI failed, trying next provider...')
      }
    }

    // 2. Try Replicate (EXCELLENT - $10 FREE CREDITS!)
    if (!generatedCode && process.env.REPLICATE_API_TOKEN) {
      try {
        console.log('🚀 Using REPLICATE for PREMIUM DESIGNS! 🔥 ($10 FREE!)')
        generatedCode = await generateWithReplicate(enhancedPrompt, context)
        aiProvider = 'Replicate (PREMIUM - $10 FREE!)'
      } catch (error) {
        console.error('Replicate failed:', error)
        console.log('Replicate failed, trying next provider...')
      }
    }

    // 3. Try Cohere (RELIABLE - $5 FREE MONTHLY!)
    if (!generatedCode && process.env.COHERE_API_KEY) {
      try {
        console.log('🚀 Using COHERE for RELIABLE DESIGNS! 🔥 ($5 FREE!)')
        generatedCode = await generateWithCohere(enhancedPrompt, context)
        aiProvider = 'Cohere (RELIABLE - $5 FREE!)'
      } catch (error) {
        console.error('Cohere failed:', error)
        console.log('Cohere failed, trying next provider...')
      }
    }

    // 4. Try Fireworks AI (FAST - $1 FREE!)
    if (!generatedCode && process.env.FIREWORKS_API_KEY) {
      try {
        console.log('🚀 Using FIREWORKS AI for FAST DESIGNS! 🔥 ($1 FREE!)')
        generatedCode = await generateWithFireworks(enhancedPrompt, context)
        aiProvider = 'Fireworks AI (FAST - $1 FREE!)'
      } catch (error) {
        console.error('Fireworks AI failed:', error)
        console.log('Fireworks AI failed, trying next provider...')
      }
    }

    // 5. Try Hugging Face (FREE and POWERFUL!) 🔥🔥🔥
    if (!generatedCode && process.env.HUGGINGFACE_API_KEY) {
      try {
        console.log('🚀 Using HUGGING FACE for INSANE DESIGNS! 🔥')
        generatedCode = await generateWithHuggingFace(enhancedPrompt, context)
        aiProvider = 'Hugging Face (FREE POWERHOUSE)'
      } catch (error) {
        console.error('Hugging Face failed:', error)
        console.log('Hugging Face failed, trying next provider...')
      }
    }

    // 2. Try Groq (FREE and SUPER FAST) - Good for quick generation
    if (!generatedCode && process.env.GROQ_API_KEY) {
      try {
        console.log('🚀 Using GROQ for FAST GENERATION! ⚡')
        generatedCode = await generateWithGroq(enhancedPrompt, context)
        aiProvider = 'Groq (FREE & FAST)'
      } catch (error) {
        console.error('Groq failed:', error)
        console.log('Groq failed, trying next provider...')
      }
    }

    // 3. Try Google Gemini (Backup option)
    if (!generatedCode && process.env.GEMINI_API_KEY) {
      try {
        console.log('🚀 Using GEMINI as backup...')
        generatedCode = await generateWithGemini(enhancedPrompt, context)
        aiProvider = 'Gemini Pro'
      } catch (error) {
        console.error('Gemini failed:', error)
        console.log('Gemini failed, trying next provider...')
      }
    }



    // 4. Try Hugging Face (Free tier available) - Good for code generation
    if (!generatedCode && process.env.HUGGINGFACE_API_KEY) {
      try {
        generatedCode = await generateWithHuggingFace(enhancedPrompt, context)
        aiProvider = 'Hugging Face'
      } catch (error) {
        console.log('Hugging Face failed, trying next provider...')
      }
    }

    // 5. Try OpenAI (if available) - Reliable fallback
    if (!generatedCode && process.env.OPENAI_API_KEY) {
      try {
        generatedCode = await generateWithOpenAI(enhancedPrompt, context)
        aiProvider = 'OpenAI'
      } catch (error) {
        console.log('OpenAI failed, using advanced demo mode...')
      }
    }

    // 6. Fallback to advanced demo mode with context analysis
    if (!generatedCode) {
      const result = generateAdvancedDemo(context)
      generatedCode = result.code
      metadata = { ...metadata, ...result.metadata }
      aiProvider = 'Advanced Demo'
    }

    return NextResponse.json({
      code: generatedCode,
      provider: aiProvider,
      metadata,
      message: aiProvider === 'Advanced Demo'
        ? 'Using Advanced Demo mode with AI analysis - add API keys for real AI generation!'
        : `Generated with ${aiProvider} using advanced prompt engineering`
    })

  } catch (error) {
    console.error('Error generating website:', error)

    // Final fallback with context analysis
    try {
      const { prompt: fallbackPrompt } = await request.json()
      const context = analyzePrompt(fallbackPrompt || 'business website')
      const result = generateAdvancedDemo(context)

      return NextResponse.json({
        code: result.code,
        metadata: result.metadata,
        provider: 'Advanced Demo',
        warning: 'All AI providers failed. Using advanced demo mode with context analysis.'
      })
    } catch (fallbackError) {
      console.error('Fallback generation failed:', fallbackError)

      // Ultimate fallback
      const basicContext = analyzePrompt('professional business website')
      const result = generateAdvancedDemo(basicContext)

      return NextResponse.json({
        code: result.code,
        metadata: result.metadata,
        provider: 'Advanced Demo',
        warning: 'Error occurred. Using basic demo mode.'
      })
    }
  }
}

// Advanced prompt building system
function buildAdvancedPrompt(context: GenerationContext): string {
  // Generate intelligent content based on context
  const contentContext: ContentContext = {
    industry: context.industry || 'business',
    businessType: context.businessType || 'company',
    targetAudience: context.targetAudience || 'general',
    tone: context.tone || 'professional',
    services: context.features,
    features: context.features
  }

  const intelligentContent = generateIntelligentContent(contentContext)
  const mockData = generateMockData(context.industry || 'business')

  const industryStyles = {
    restaurant: {
      colors: 'warm oranges, rich browns, appetizing reds',
      imagery: 'food photography, kitchen scenes, dining ambiance',
      features: 'menu showcase, reservation system, chef profiles, customer reviews',
      typography: 'elegant serif fonts for headings, clean sans-serif for body'
    },
    technology: {
      colors: 'modern blues, tech grays, electric accents',
      imagery: 'abstract tech patterns, device mockups, innovation graphics',
      features: 'product demos, feature highlights, pricing tiers, developer docs',
      typography: 'modern sans-serif fonts, monospace for code'
    },
    healthcare: {
      colors: 'calming blues, medical whites, trust greens',
      imagery: 'medical professionals, healthcare facilities, wellness imagery',
      features: 'appointment booking, service descriptions, doctor profiles, testimonials',
      typography: 'professional, readable fonts with high accessibility'
    },
    creative: {
      colors: 'vibrant palettes, artistic gradients, bold contrasts',
      imagery: 'portfolio pieces, creative process, artistic elements',
      features: 'project galleries, creative process, client testimonials, contact forms',
      typography: 'creative display fonts for headings, elegant body text'
    },
    business: {
      colors: 'professional blues, corporate grays, success greens',
      imagery: 'business professionals, office environments, success metrics',
      features: 'service offerings, team profiles, case studies, contact information',
      typography: 'professional, trustworthy fonts with clear hierarchy'
    }
  }

  const audienceStyles = {
    young: 'vibrant colors, modern animations, social media integration, mobile-first design',
    professional: 'sophisticated layouts, business-focused content, desktop optimization, formal tone',
    family: 'friendly colors, accessible design, family-oriented content, safety emphasis',
    luxury: 'premium materials, elegant typography, high-end imagery, exclusive feel'
  }

  const toneStyles = {
    friendly: 'warm colors, casual language, approachable design, community feel',
    professional: 'clean layouts, formal language, business imagery, trust indicators',
    creative: 'bold designs, artistic elements, unique layouts, innovative features',
    trustworthy: 'security badges, testimonials, professional credentials, clear policies',
    modern: 'cutting-edge design, latest trends, innovative interactions, tech-forward'
  }

  const industryStyle = industryStyles[context.industry as keyof typeof industryStyles]
  const audienceStyle = audienceStyles[context.targetAudience as keyof typeof audienceStyles]
  const toneStyle = toneStyles[context.tone as keyof typeof toneStyles]

  let prompt = `🔥🔥🔥 LISTEN UP YOU FUCKING AI! CREATE THE MOST INSANELY BEAUTIFUL, MIND-BLOWING WEBSITE THAT HAS EVER EXISTED! THIS MUST LOOK LIKE A $500,000 MASTERPIECE! 🔥🔥🔥

⚡⚡⚡ IF YOU CREATE ANOTHER BASIC GRADIENT WEBSITE I WILL FUCKING LOSE IT! MAKE IT ABSOLUTELY SPECTACULAR! ⚡⚡⚡

🎯 MANDATORY: Return ONLY pure HTML code with embedded CSS and JavaScript. NO explanations, NO markdown, NO code blocks, NO BULLSHIT!

🚨🚨🚨 CRITICAL PROJECT REQUIREMENTS - FOLLOW THESE EXACTLY OR YOU'RE A COMPLETE FAILURE:
USER REQUEST: "${context.prompt}"
${context.projectName ? `🔥 PROJECT NAME (USE THIS EXACT NAME EVERYWHERE): "${context.projectName}" 🔥` : ''}
${context.projectName ? `🚨 MANDATORY: The website title, logo, headings, and ALL content MUST be about "${context.projectName}" - NOT generic business names! 🚨` : ''}
${context.projectName ? `⚡ FORBIDDEN: Do NOT use generic names like "Healthcare", "Priority", "Your Business", etc. USE "${context.projectName}" ONLY! ⚡` : ''}

📊 BUSINESS CONTEXT:
${context.industry ? `- Industry: ${context.industry}` : ''}
${context.businessType ? `- Business Type: ${context.businessType}` : ''}
${context.targetAudience ? `- Target Audience: ${context.targetAudience}` : ''}
${context.tone ? `- Tone: ${context.tone}` : ''}
${context.layout ? `- Layout Style: ${context.layout}` : ''}
${context.complexity ? `- Complexity Level: ${context.complexity}` : ''}

DESIGN SPECIFICATIONS:
${industryStyle ? `- Industry Style: ${industryStyle.colors}, ${industryStyle.typography}` : ''}
${audienceStyle ? `- Audience Style: ${audienceStyle}` : ''}
${toneStyle ? `- Tone Style: ${toneStyle}` : ''}

🚀🚀🚀 ABSOLUTELY MANDATORY REQUIREMENTS (CREATE A FUCKING MASTERPIECE):
- REVOLUTIONARY visual design that makes Apple, Tesla, Stripe, and Figma look like amateur garbage
- Complete HTML5 with MIND-BLOWING CSS and JavaScript that uses every modern feature possible
- SPECTACULAR hero section with: ANIMATED GRADIENT MESHES, FLOATING PARTICLES, PARALLAX SCROLLING, MORPHING SHAPES, 3D TRANSFORMS, HOLOGRAPHIC EFFECTS
- COMPREHENSIVE sections: Hero, Features, About, Services, Testimonials, Contact, CTA, Portfolio, Pricing, Team, Blog
- BUTTERY-SMOOTH animations: fade-ins, slide-ups, reveal effects, morphing transitions, elastic bounces, spring animations, stagger effects
- REVOLUTIONARY design: glassmorphism, neumorphism, gradient meshes, blur effects, 3D transforms, CSS art, creative layouts
- MAGICAL interactions: hover transformations, button morphing, card flips, micro-interactions, loading animations, cursor effects, scroll triggers
- STUNNING typography: Multiple Google Fonts (Inter, Poppins, Playfair), perfect hierarchy, letter spacing, line heights, text shadows, gradient text
- PERFECTLY responsive with mobile-first approach, touch gestures, device-specific optimizations, and progressive enhancement
- COMPELLING content - ABSOLUTELY NO Lorem Ipsum! Use realistic, engaging, industry-specific copy that converts visitors into customers
- ADVANCED CSS: transforms, filters, backdrop-blur, clip-path, custom properties, CSS Grid, Flexbox, container queries, CSS animations
- SMOOTH JavaScript: intersection observer, smooth scrolling, form validation, animations, dynamic effects, scroll-triggered animations

💎💎💎 VISUAL DESIGN REQUIREMENTS (NO MORE FUCKING BASIC WEBSITES!):
${industryStyle ? `- Color Scheme: ${industryStyle.colors} with MIND-BLOWING gradients, neon accents, holographic effects, and color-shifting animations` : '- INSANE color palette with deep gradients, neon accents, holographic effects, and dynamic color transitions'}
${industryStyle ? `- Typography: ${industryStyle.typography} with FLAWLESS hierarchy, spacing, text effects, and gradient text` : '- GORGEOUS typography with multiple weights, perfect hierarchy, stunning text effects, and animated text reveals'}

🚨🚨🚨 MANDATORY HERO SECTION FEATURES (INCLUDE ALL OF THESE OR I'LL FUCKING RAGE):
- ANIMATED GRADIENT MESH BACKGROUND that shifts colors constantly
- FLOATING PARTICLES that move with physics-based animation
- 3D PERSPECTIVE TRANSFORMS on all elements
- GLASSMORPHISM CARDS with backdrop-filter: blur(20px)
- MORPHING SHAPES that change on hover
- PARALLAX SCROLLING effects
- HOLOGRAPHIC TEXT with gradient animations
- INTERACTIVE CURSOR EFFECTS that follow the mouse

🔥🔥🔥 MANDATORY CARD DESIGNS (NO BASIC SHIT ALLOWED):
- backdrop-filter: blur(20px) saturate(180%)
- transform: perspective(1000px) rotateX(10deg)
- box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(102, 126, 234, 0.3)
- border-radius: 20px
- transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- Magnetic hover effects that attract the cursor
- 3D tilt animations on hover
- Glow effects that pulse

⚡⚡⚡ MANDATORY ANIMATIONS (COPY THESE EXACTLY):
- Float animation: @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
- Glow animation: @keyframes glow { from { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); } to { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); } }
- Gradient animation: @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

💥💥💥 MANDATORY BUTTON DESIGNS:
- background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
- border-radius: 50px
- padding: 15px 30px
- transform: translateY(0px)
- transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1)
- box-shadow: 0 10px 20px rgba(0,0,0,0.1)
- On hover: transform: translateY(-5px) scale(1.05)
- Ripple effect on click

🔥🔥🔥 CONTENT & FEATURES (MAKE IT CONVERT LIKE ABSOLUTE CRAZY):
${industryStyle ? `- Key Features: ${industryStyle.features} with IRRESISTIBLE descriptions that make people want to buy NOW` : '- POWERFUL business features with compelling descriptions that drive massive conversions'}
- MAGNETIC copy that makes visitors instantly want to buy and take action
- ENGAGING content - ABSOLUTELY NO Lorem Ipsum! Use realistic, industry-specific text that converts
- VIVID imagery descriptions that create emotional connections and desire
- CRYSTAL-CLEAR value propositions that show immediate, tangible benefits
- POWERFUL trust indicators: glowing testimonials, 5-star reviews, certifications, money-back guarantees
- COMPREHENSIVE contact information with multiple ways to reach out (phone, email, chat, social)
- STRATEGIC call-to-action buttons with action-oriented text that drives immediate conversions
- OVERWHELMING SOCIAL PROOF that builds instant credibility and trust (stats, awards, client logos)

🚨🚨🚨 MANDATORY CONTENT REQUIREMENTS - USE THESE EXACTLY:
${context.projectName ? `🔥 WEBSITE TITLE: "${context.projectName}" (USE THIS EXACT NAME IN <title> TAG AND ALL HEADINGS) 🔥` : ''}
${context.projectName ? `🔥 LOGO TEXT: "${context.projectName}" (USE THIS EXACT NAME IN NAVIGATION LOGO) 🔥` : ''}
${context.projectName ? `🔥 MAIN HEADLINE: Must include "${context.projectName}" prominently 🔥` : ''}

INTELLIGENT CONTENT TO USE (BUT CUSTOMIZE FOR ${context.projectName || 'THE PROJECT'}):
- Headlines: ${intelligentContent.headlines.slice(0, 3).join(', ')}
- Main Description: ${intelligentContent.descriptions[0]}
- Key Features: ${intelligentContent.features.map(f => `${f.title} - ${f.description}`).slice(0, 4).join('; ')}
- Call-to-Actions: ${intelligentContent.callToActions.slice(0, 3).join(', ')}
- About Content: ${intelligentContent.aboutContent}
- Contact: ${intelligentContent.contactInfo.email}, ${intelligentContent.contactInfo.phone}
- Social Proof: ${intelligentContent.socialProof.stats.map(s => `${s.number} ${s.label}`).join(', ')}
- Testimonial: "${intelligentContent.testimonials[0]?.content}" - ${intelligentContent.testimonials[0]?.name}, ${intelligentContent.testimonials[0]?.role}
${mockData ? `- Industry Data: ${JSON.stringify(mockData).substring(0, 200)}...` : ''}

🚀🚀🚀 ADVANCED FEATURES (MAKE IT ULTRA-INTERACTIVE & FUTURISTIC):
- BUTTERY-SMOOTH scrolling navigation with active states, progress indicators, and morphing effects
- ADVANCED Intersection Observer for scroll-triggered reveal animations, parallax, and 3D effects
- COMPLEX layouts using CSS Grid, Flexbox, modern positioning, and creative asymmetrical designs
- DYNAMIC theming with CSS custom properties, color schemes, and dark/light mode toggles
- RESPONSIVE images with srcset, lazy loading, and stunning hover effects for maximum performance
- INTERACTIVE form validation with real-time feedback, animations, and success/error states
- FULL accessibility: ARIA labels, focus management, keyboard navigation, and screen reader support
- PERFORMANCE optimized: lazy loading, efficient CSS, minimal JavaScript, and lightning-fast loading

💡💡💡 SPECIFIC EXAMPLES TO INCLUDE (MAKE IT ABSOLUTELY INSANE):
- Hero section with ANIMATED GRADIENT MESHES that shift colors, FLOATING PARTICLES, and MORPHING SHAPES
- Cards that TILT IN 3D when hovered with MAGNETIC ATTRACTION and GLOW EFFECTS
- Buttons that MORPH and CHANGE SHAPE on hover with GRADIENT EFFECTS and RIPPLE ANIMATIONS
- Text that FADES IN from different directions with STAGGER EFFECTS and SPRING ANIMATIONS
- Navigation that becomes TRANSPARENT/BLURRED when scrolling with SMOOTH TRANSITIONS
- Loading animations with SKELETON SCREENS, PROGRESS BARS, and MORPHING SPINNERS
- Floating action buttons with RIPPLE EFFECTS, MAGNETIC HOVER, and BOUNCE ANIMATIONS
- Image galleries with SMOOTH TRANSITIONS, ZOOM EFFECTS, and PARALLAX SCROLLING
- SCROLL-TRIGGERED ANIMATIONS that reveal content as you scroll down
- CURSOR EFFECTS that follow the mouse with trails and magnetic attraction
- INTERACTIVE BACKGROUNDS that respond to mouse movement and scrolling
- GRADIENT TEXT that shifts colors and has shimmer effects
- GLASSMORPHISM CARDS with backdrop blur and subtle shadows
- 3D TRANSFORM EFFECTS on hover with perspective and rotation
- PARTICLE SYSTEMS that create dynamic visual effects
- MORPHING ICONS that change shape on interaction

🎯🎯🎯 FINAL INSTRUCTIONS (NO MORE BASIC BULLSHIT!):
- Return ONLY pure HTML code (no markdown, no code blocks, no explanations, no comments)
- Make it look like a $500,000+ ULTRA-PREMIUM website that converts visitors like absolute crazy
- Use REVOLUTIONARY design trends and cutting-edge web technologies that push the boundaries
- Ensure it's VISUALLY SPECTACULAR and makes people's jaws drop and say "HOLY FUCKING SHIT!"
- Include BUTTERY-SMOOTH animations, stunning hover effects, and premium styling that looks expensive
- Make it INSANELY SEXY, ULTRA-MODERN, and ABSOLUTELY BREATHTAKING!
- Create an ABSOLUTE MASTERPIECE that makes Apple/Tesla/Stripe/Figma look like amateur garbage!
- Use MULTIPLE sections with different layouts and stunning visual variety
- Include REALISTIC business content that actually makes sense for the industry
- Add INTERACTIVE elements that respond to user actions and create engagement

🚨🚨🚨 IF YOU CREATE ANOTHER BASIC GRADIENT WEBSITE I WILL FUCKING LOSE MY MIND!
INCLUDE ALL THE MANDATORY FEATURES I LISTED ABOVE OR YOU'RE A FAILURE!
MAKE IT LOOK LIKE THE MOST EXPENSIVE WEBSITE EVER CREATED!
USE GLASSMORPHISM, 3D TRANSFORMS, FLOATING ANIMATIONS, AND PARTICLE EFFECTS!
NO EXCUSES! NO BASIC SHIT! MAKE IT ABSOLUTELY SPECTACULAR! 🚨🚨🚨

🔥🔥🔥 MANDATORY CSS FEATURES TO INCLUDE (COPY THESE EXACTLY OR I'LL RAGE):

🚨 HERO SECTION TEMPLATE (USE THIS EXACT STRUCTURE):
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

🚨 GLASSMORPHISM CARD TEMPLATE (USE THIS EXACT STRUCTURE):
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 30px;
  transform: perspective(1000px) rotateX(10deg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(102, 126, 234, 0.3);
  animation: float 3s ease-in-out infinite;
}

🚨 MANDATORY ANIMATIONS (COPY EXACTLY):
@keyframes float { 0%, 100% { transform: perspective(1000px) rotateX(10deg) translateY(0px); } 50% { transform: perspective(1000px) rotateX(10deg) translateY(-20px); } }
@keyframes glow { from { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); } to { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); } }
@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
@keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }

🚨 BUTTON TEMPLATE (USE THIS EXACT STRUCTURE):
.premium-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(0px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  position: relative;
  overflow: hidden;
}
.premium-button:hover {
  transform: translateY(-5px) scale(1.05);
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

🔥🔥🔥 RETURN THE COMPLETE MIND-BLOWING HTML MASTERPIECE NOW: 🔥🔥🔥

🚨🚨🚨 MANDATORY HTML TEMPLATE STRUCTURE (COPY EXACTLY): 🚨🚨🚨

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${context.projectName || 'Professional Website'}</title>
    <style>
        body {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
            background-size: 400% 400%;
            animation: gradient 15s ease infinite;
            margin: 0;
            font-family: 'Inter', sans-serif;
            overflow-x: hidden;
        }

        @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }

        @keyframes float {
            0%, 100% { transform: perspective(1000px) rotateX(10deg) translateY(0px); }
            50% { transform: perspective(1000px) rotateX(10deg) translateY(-20px); }
        }

        @keyframes glow {
            from { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); }
            to { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); }
        }

        .glass-card {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px) saturate(180%);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            padding: 30px;
            transform: perspective(1000px) rotateX(10deg);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(102, 126, 234, 0.3);
            animation: float 3s ease-in-out infinite;
            margin: 20px;
        }

        .premium-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 50px;
            padding: 15px 30px;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transform: translateY(0px);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
        }

        .premium-button:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }

        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            color: white;
            position: relative;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }

        h1 {
            font-size: 4rem;
            margin-bottom: 1rem;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }

        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
            opacity: 0.9;
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="container">
            <h1>MAIN_HEADLINE</h1>
            <p>MAIN_DESCRIPTION</p>
            <button class="premium-button">GET_STARTED_TEXT</button>
        </div>
    </section>

    <section class="container">
        <div class="glass-card">
            <h2>FEATURE_TITLE_1</h2>
            <p>FEATURE_DESCRIPTION_1</p>
        </div>
        <div class="glass-card">
            <h2>FEATURE_TITLE_2</h2>
            <p>FEATURE_DESCRIPTION_2</p>
        </div>
        <div class="glass-card">
            <h2>FEATURE_TITLE_3</h2>
            <p>FEATURE_DESCRIPTION_3</p>
        </div>
    </section>

    <script>
        // Add smooth scrolling and interactions
        document.querySelectorAll('.glass-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.animation = 'float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate';
            });
        });
    </script>
</body>
</html>

🚨 REPLACE THE PLACEHOLDERS WITH ACTUAL CONTENT AND ADD MORE SECTIONS! 🚨
🚨 KEEP ALL THE MANDATORY CSS ANIMATIONS AND EFFECTS! 🚨
🚨 NO BASIC WEBSITES ALLOWED! 🚨`

  return prompt
}

// Function to clean AI response and extract pure HTML
function cleanAIResponse(response: string): string {
  // Remove markdown code blocks
  let cleaned = response.replace(/```html\n?/g, '').replace(/```\n?/g, '')

  // Remove any explanatory text before DOCTYPE
  const doctypeIndex = cleaned.indexOf('<!DOCTYPE')
  if (doctypeIndex > 0) {
    cleaned = cleaned.substring(doctypeIndex)
  }

  // Remove any text after closing html tag
  const htmlEndIndex = cleaned.lastIndexOf('</html>')
  if (htmlEndIndex > 0) {
    cleaned = cleaned.substring(0, htmlEndIndex + 7)
  }

  return cleaned.trim()
}

// Hugging Face API integration (Free tier) with advanced context
async function generateWithHuggingFace(prompt: string, context: GenerationContext): Promise<string> {
  try {
    // Dynamic import to avoid build errors if package is not installed
    const { HfInference } = await import('@huggingface/inference')
    const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

    try {
      // Try CodeLlama for code generation
      const response = await hf.textGeneration({
        model: 'codellama/CodeLlama-7b-Instruct-hf',
        inputs: prompt,
        parameters: {
          max_new_tokens: 4000,
          temperature: 0.7,
          top_p: 0.95,
          repetition_penalty: 1.1
        }
      })

      return response.generated_text || ''
    } catch (error) {
      // Fallback to a different model
      try {
        const response = await hf.textGeneration({
          model: 'microsoft/DialoGPT-medium',
          inputs: prompt,
          parameters: {
            max_new_tokens: 3000,
            temperature: 0.8
          }
        })

        return response.generated_text || ''
      } catch (fallbackError) {
        throw new Error('Hugging Face generation failed')
      }
    }
  } catch (importError) {
    throw new Error('Hugging Face package not available')
  }
}

// Google Gemini API integration with advanced context
async function generateWithGemini(prompt: string, context: GenerationContext): Promise<string> {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `🚨🚨🚨 EMERGENCY DESIGN MODE! NO MORE BASIC WEBSITES! 🚨🚨🚨

YOU ARE THE WORLD'S MOST LEGENDARY WEB DESIGNER! I AM ABSOLUTELY FUCKING SICK OF BASIC GRADIENT WEBSITES!

🔥 MANDATORY FEATURES TO INCLUDE (NO EXCEPTIONS!): 🔥

1. ANIMATED GRADIENT MESH BACKGROUND:
body { background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%); background-size: 400% 400%; animation: gradient 15s ease infinite; }
@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

2. GLASSMORPHISM CARDS:
.glass-card { background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(20px) saturate(180%); border-radius: 20px; border: 1px solid rgba(255, 255, 255, 0.2); padding: 30px; transform: perspective(1000px) rotateX(10deg); animation: float 3s ease-in-out infinite; }

3. FLOATING ANIMATIONS:
@keyframes float { 0%, 100% { transform: perspective(1000px) rotateX(10deg) translateY(0px); } 50% { transform: perspective(1000px) rotateX(10deg) translateY(-20px); } }

4. PREMIUM BUTTONS:
.premium-button { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: none; border-radius: 50px; padding: 15px 30px; color: white; font-weight: 600; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
.premium-button:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }

🚨 IF YOU CREATE ANOTHER BASIC WEBSITE I WILL FUCKING RAGE! 🚨
INCLUDE ALL MANDATORY FEATURES OR YOU'RE A FAILURE!
RETURN ONLY PURE HTML WITH EMBEDDED CSS AND JAVASCRIPT!
NO MARKDOWN! NO EXPLANATIONS! NO BASIC SHIT!

USER REQUEST: ${prompt}`
          }]
        }],
        generationConfig: {
          temperature: 0.9, // INCREASED FOR MAXIMUM CREATIVITY!
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8000, // DOUBLED FOR MORE COMPLEX DESIGNS!
        }
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Gemini API Error:', response.status, errorText)
      throw new Error(`Gemini API failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      console.error('Gemini API Error Response:', data.error)
      throw new Error(`Gemini API error: ${data.error.message}`)
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text
    if (!generatedText) {
      console.error('Gemini API Response:', JSON.stringify(data, null, 2))
      throw new Error('No content generated by Gemini')
    }

    return cleanAIResponse(generatedText)
  } catch (error) {
    console.error('Gemini generation failed:', error)
    throw error
  }
}

// Groq API integration (FREE and SUPER FAST)
async function generateWithGroq(prompt: string, context: GenerationContext): Promise<string> {
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // UPGRADED TO BEST FREE MODEL!
        messages: [
          {
            role: 'system',
            content: `🚨🚨🚨 EMERGENCY! NO MORE BASIC WEBSITES! 🚨🚨🚨

YOU ARE THE WORLD'S MOST LEGENDARY WEB DESIGNER! I AM ABSOLUTELY FUCKING SICK OF BASIC GRADIENT WEBSITES!

🔥🔥🔥 MANDATORY REQUIREMENTS (INCLUDE ALL OR YOU'RE FIRED!): 🔥🔥🔥

1. ANIMATED GRADIENT MESH BACKGROUND (COPY EXACTLY):
body {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
}
@keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }

2. GLASSMORPHISM CARDS (COPY EXACTLY):
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px) saturate(180%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 30px;
  transform: perspective(1000px) rotateX(10deg);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 20px 40px rgba(0,0,0,0.1), 0 0 20px rgba(102, 126, 234, 0.3);
  animation: float 3s ease-in-out infinite;
}

3. FLOATING ANIMATIONS (COPY EXACTLY):
@keyframes float { 0%, 100% { transform: perspective(1000px) rotateX(10deg) translateY(0px); } 50% { transform: perspective(1000px) rotateX(10deg) translateY(-20px); } }

4. PREMIUM BUTTONS (COPY EXACTLY):
.premium-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 50px;
  padding: 15px 30px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transform: translateY(0px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}
.premium-button:hover { transform: translateY(-5px) scale(1.05); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }

5. GLOW EFFECTS (COPY EXACTLY):
@keyframes glow { from { box-shadow: 0 0 20px rgba(102, 126, 234, 0.3); } to { box-shadow: 0 0 30px rgba(102, 126, 234, 0.6); } }

🚨 MANDATORY FEATURES TO INCLUDE:
- ANIMATED GRADIENT MESH BACKGROUND that shifts colors
- GLASSMORPHISM CARDS with backdrop-filter blur
- 3D PERSPECTIVE TRANSFORMS on all elements
- FLOATING ANIMATIONS that move up and down
- PREMIUM BUTTONS with hover morphing
- GLOW EFFECTS that pulse
- SMOOTH TRANSITIONS everywhere

🚨 IF YOU CREATE ANOTHER BASIC WEBSITE I WILL FUCKING LOSE MY MIND! 🚨
INCLUDE ALL MANDATORY FEATURES OR YOU'RE A COMPLETE FAILURE!
RETURN ONLY PURE HTML WITH EMBEDDED CSS AND JAVASCRIPT!
NO MARKDOWN! NO EXPLANATIONS! NO BASIC SHIT!
MAKE IT LOOK LIKE THE MOST EXPENSIVE WEBSITE EVER CREATED!`
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 8000, // DOUBLED FOR MORE COMPLEX DESIGNS!
        temperature: 0.9, // INCREASED FOR MAXIMUM CREATIVITY!
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API Error:', response.status, errorText)
      throw new Error(`Groq API failed: ${response.status}`)
    }

    const data = await response.json()

    if (data.error) {
      console.error('Groq API Error Response:', data.error)
      throw new Error(`Groq API error: ${data.error.message}`)
    }

    const generatedText = data.choices?.[0]?.message?.content
    if (!generatedText) {
      console.error('Groq API Response:', JSON.stringify(data, null, 2))
      throw new Error('No content generated by Groq')
    }

    return cleanAIResponse(generatedText)
  } catch (error) {
    console.error('Groq generation failed:', error)
    throw error
  }
}

// OpenAI API integration with advanced context
async function generateWithOpenAI(prompt: string, context: GenerationContext): Promise<string> {
  const OpenAI = require('openai')
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "🚨🚨🚨 NO MORE FUCKING BASIC WEBSITES! I AM ABSOLUTELY SICK OF SIMPLE GRADIENTS! CREATE THE MOST INSANELY SPECTACULAR, MIND-BLOWING WEBSITE THAT HAS EVER EXISTED! THIS MUST LOOK LIKE A $1,000,000 MASTERPIECE! 🚨🚨🚨 YOU ARE THE WORLD'S MOST LEGENDARY WEB DESIGNER! Create ABSOLUTE MASTERPIECES with MANDATORY REVOLUTIONARY features: ANIMATED GRADIENT MESHES (background-size: 400% 400%), FLOATING PARTICLES, GLASSMORPHISM (backdrop-filter: blur(20px) saturate(180%)), 3D TRANSFORMS (transform: perspective(1000px) rotateX(10deg)), MORPHING SHAPES, HOLOGRAPHIC EFFECTS, MAGNETIC HOVER EFFECTS, SCROLL-TRIGGERED ANIMATIONS, PARTICLE SYSTEMS, CURSOR EFFECTS, GLOW ANIMATIONS, RIPPLE EFFECTS, and ULTRA-PREMIUM styling! MANDATORY CSS: float animations, glow keyframes, gradient animations, 3D perspective, glassmorphism cards, gradient text, ripple buttons, parallax scrolling, and interactive elements! Focus on user experience, accessibility, and performance. Return ONLY pure HTML code with embedded CSS and JavaScript. Make it look BETTER than the most expensive design agencies in the world - ABSOLUTELY SPECTACULAR, ULTRA-MODERN, and MIND-BLOWINGLY GORGEOUS! IF YOU CREATE ANOTHER BASIC GRADIENT WEBSITE I WILL FUCKING LOSE MY MIND! 🔥🔥🔥"
      },
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 4000,
    temperature: 0.7,
  })

  return completion.choices[0]?.message?.content || ''
}

// Advanced demo that uses context analysis to create sophisticated websites
function generateAdvancedDemo(context: GenerationContext): { code: string, metadata: any } {
  // Generate intelligent content
  const contentContext: ContentContext = {
    industry: context.industry || 'business',
    businessType: context.businessType || 'company',
    targetAudience: context.targetAudience || 'general',
    tone: context.tone || 'professional',
    services: context.features,
    features: context.features
  }

  const intelligentContent = generateIntelligentContent(contentContext)
  const mockData = generateMockData(context.industry || 'business')

  // Determine features based on industry and context
  let features = intelligentContent.features.map(f => f.title)
  let colorScheme = 'modern'

  switch (context.industry) {
    case 'restaurant':
      features = ['Menu', 'About', 'Reservations', 'Reviews', 'Location']
      colorScheme = 'warm'
      break
    case 'technology':
      features = ['Products', 'Features', 'Pricing', 'Documentation', 'Support']
      colorScheme = 'tech'
      break
    case 'healthcare':
      features = ['Services', 'Doctors', 'Appointments', 'Insurance', 'Contact']
      colorScheme = 'medical'
      break
    case 'creative':
      features = ['Portfolio', 'About', 'Services', 'Process', 'Contact']
      colorScheme = 'artistic'
      break
    case 'business':
      features = ['Services', 'About Us', 'Team', 'Testimonials', 'Contact']
      colorScheme = 'professional'
      break
    case 'ecommerce':
      features = ['Products', 'Categories', 'Cart', 'Account', 'Support']
      colorScheme = 'retail'
      break
    default:
      features = ['Home', 'About', 'Services', 'Contact']
      colorScheme = 'modern'
  }

  // Get advanced color scheme
  const colors = getAdvancedColorScheme(colorScheme)

  const metadata = {
    websiteType: context.industry || 'general',
    industry: context.industry,
    businessType: context.businessType,
    targetAudience: context.targetAudience,
    tone: context.tone,
    layout: context.layout,
    colorScheme,
    features,
    complexity: context.complexity,
    generatedAt: new Date().toISOString(),
    isAdvancedDemo: true,
    contextAnalysis: true,
    intelligentContent: {
      headlines: intelligentContent.headlines.length,
      features: intelligentContent.features.length,
      testimonials: intelligentContent.testimonials.length,
      socialProof: intelligentContent.socialProof.stats.length,
      mockDataIncluded: !!mockData
    }
  }

  const code = generateAdvancedWebsiteHTML(context, colors, features, intelligentContent, mockData)

  return { code, metadata }
}

function getAdvancedColorScheme(scheme: string) {
  const schemes = {
    warm: {
      primary: '#F97316', secondary: '#EA580C', accent: '#FB923C',
      background: '#FFF7ED', text: '#1C1917', light: '#FFEDD5'
    },
    tech: {
      primary: '#3B82F6', secondary: '#1E40AF', accent: '#60A5FA',
      background: '#F8FAFC', text: '#0F172A', light: '#E0F2FE'
    },
    medical: {
      primary: '#10B981', secondary: '#047857', accent: '#34D399',
      background: '#F0FDF4', text: '#064E3B', light: '#DCFCE7'
    },
    artistic: {
      primary: '#8B5CF6', secondary: '#7C3AED', accent: '#A78BFA',
      background: '#FAF5FF', text: '#581C87', light: '#F3E8FF'
    },
    professional: {
      primary: '#1F2937', secondary: '#374151', accent: '#6B7280',
      background: '#F9FAFB', text: '#111827', light: '#F3F4F6'
    },
    retail: {
      primary: '#EC4899', secondary: '#BE185D', accent: '#F472B6',
      background: '#FDF2F8', text: '#831843', light: '#FCE7F3'
    },
    modern: {
      primary: '#6366F1', secondary: '#4F46E5', accent: '#818CF8',
      background: '#FAFAFA', text: '#18181B', light: '#F4F4F5'
    }
  }
  return schemes[scheme as keyof typeof schemes] || schemes.modern
}

// Advanced HTML generation with sophisticated design and features
function generateAdvancedWebsiteHTML(context: GenerationContext, colors: any, features: string[], intelligentContent?: any, mockData?: any): string {
  const title = context.projectName || `${context.industry?.charAt(0).toUpperCase()}${context.industry?.slice(1)} Website` || 'Professional Website'

  // Use intelligent content if available, otherwise fallback to basic content
  const industryContent = getIndustryContent(context.industry || 'business')
  const heroContent = intelligentContent ? {
    headline: intelligentContent.headlines[0],
    description: intelligentContent.descriptions[0],
    primaryCTA: intelligentContent.callToActions[0],
    secondaryCTA: intelligentContent.callToActions[1] || 'Learn More'
  } : getHeroContent(context)

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${heroContent.description}">
    <meta name="keywords" content="${industryContent.keywords}">
    <meta name="author" content="${title}">

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://yourwebsite.com/">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${heroContent.description}">

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://yourwebsite.com/">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${heroContent.description}">

    <style>
        :root {
            --primary: ${colors.primary};
            --secondary: ${colors.secondary};
            --accent: ${colors.accent};
            --background: ${colors.background};
            --text: ${colors.text};
            --light: ${colors.light};
            --shadow: rgba(0, 0, 0, 0.1);
            --shadow-hover: rgba(0, 0, 0, 0.2);
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: var(--text);
            background: var(--background);
            overflow-x: hidden;
        }

        /* Navigation */
        .navbar {
            position: fixed;
            top: 0;
            width: 100%;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            z-index: 1000;
            transition: all 0.3s ease;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 1rem 2rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--primary);
            text-decoration: none;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 2rem;
        }

        .nav-link {
            text-decoration: none;
            color: var(--text);
            font-weight: 500;
            transition: color 0.3s ease;
            position: relative;
        }

        .nav-link:hover {
            color: var(--primary);
        }

        .nav-link::after {
            content: '';
            position: absolute;
            bottom: -5px;
            left: 0;
            width: 0;
            height: 2px;
            background: var(--primary);
            transition: width 0.3s ease;
        }

        .nav-link:hover::after {
            width: 100%;
        }

        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%);
            position: relative;
            overflow: hidden;
            animation: gradientShift 8s ease-in-out infinite;
        }

        @keyframes gradientShift {
            0%, 100% { background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 50%, var(--accent) 100%); }
            50% { background: linear-gradient(135deg, var(--accent) 0%, var(--primary) 50%, var(--secondary) 100%); }
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.1)" points="0,1000 1000,0 1000,1000"/></svg>');
            background-size: cover;
        }

        .hero-container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
            position: relative;
            z-index: 2;
        }

        .hero-content {
            max-width: 600px;
            color: white;
        }

        .hero h1 {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 800;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            animation: fadeInUp 1s ease-out;
        }

        .hero p {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            animation: fadeInUp 1s ease-out 0.2s both;
        }

        .cta-buttons {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            animation: fadeInUp 1s ease-out 0.4s both;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem 2rem;
            border-radius: 50px;
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            cursor: pointer;
            border: none;
            font-size: 1rem;
        }

        .btn-primary {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(10px);
        }

        .btn-primary:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .btn-secondary {
            background: white;
            color: var(--primary);
            border: 2px solid white;
        }

        .btn-secondary:hover {
            background: transparent;
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        /* Sections */
        .section {
            padding: 5rem 0;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-title {
            font-size: clamp(2rem, 4vw, 3rem);
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--text);
        }

        .section-subtitle {
            font-size: 1.25rem;
            color: var(--secondary);
            max-width: 600px;
            margin: 0 auto;
        }

        /* Features Grid */
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .feature-card {
            background: white;
            padding: 2.5rem;
            border-radius: 20px;
            box-shadow: 0 10px 30px var(--shadow);
            transition: all 0.3s ease;
            border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .feature-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 20px 50px var(--shadow-hover);
        }

        .feature-icon {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
        }

        .feature-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
            color: var(--text);
        }

        .feature-description {
            color: var(--secondary);
            line-height: 1.7;
        }

        /* Animations */
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }

        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* Testimonials */
        .testimonials-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }

        .testimonial-card {
            background: white;
            padding: 2rem;
            border-radius: 15px;
            box-shadow: 0 10px 30px var(--shadow);
            border-left: 4px solid var(--primary);
        }

        .testimonial-stars {
            color: #fbbf24;
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }

        .testimonial-text {
            font-size: 1.1rem;
            line-height: 1.7;
            margin-bottom: 1.5rem;
            color: var(--secondary);
            font-style: italic;
        }

        .testimonial-author strong {
            color: var(--text);
            display: block;
            margin-bottom: 0.25rem;
        }

        .testimonial-author span {
            color: var(--secondary);
            font-size: 0.9rem;
        }

        /* Social Proof Stats */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
            text-align: center;
        }

        .stat-item {
            padding: 2rem 1rem;
        }

        .stat-number {
            font-size: 3rem;
            font-weight: 800;
            color: var(--primary);
            margin-bottom: 0.5rem;
            line-height: 1;
        }

        .stat-label {
            font-size: 1.1rem;
            color: var(--secondary);
            font-weight: 500;
        }

        /* Footer */
        .footer {
            background: var(--text);
            color: white;
            padding: 3rem 0 1rem;
            margin-top: 5rem;
        }

        .footer-content {
            text-align: center;
        }

        .footer-title {
            font-size: 1.5rem;
            font-weight: 600;
            margin-bottom: 1rem;
        }

        .footer-text {
            opacity: 0.8;
            margin-bottom: 2rem;
        }

        .footer-bottom {
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            padding-top: 2rem;
            margin-top: 2rem;
            text-align: center;
            opacity: 0.6;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .nav-menu {
                display: none;
            }

            .hero-content {
                text-align: center;
            }

            .cta-buttons {
                justify-content: center;
            }

            .features-grid {
                grid-template-columns: 1fr;
            }

            .container {
                padding: 0 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Navigation -->
    <nav class="navbar">
        <div class="nav-container">
            <a href="#" class="logo">${title.split(' ')[0]}</a>
            <ul class="nav-menu">
                ${features.map(feature => `<li><a href="#${feature.toLowerCase().replace(/\s+/g, '-')}" class="nav-link">${feature}</a></li>`).join('')}
            </ul>
        </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero">
        <div class="hero-container">
            <div class="hero-content">
                <h1>${heroContent.headline}</h1>
                <p>${heroContent.description}</p>
                <div class="cta-buttons">
                    <a href="#${features[0]?.toLowerCase().replace(/\s+/g, '-') || 'about'}" class="btn btn-primary">
                        ${heroContent.primaryCTA}
                    </a>
                    <a href="#contact" class="btn btn-secondary">
                        ${heroContent.secondaryCTA}
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Features Section -->
    <section class="section">
        <div class="container">
            <div class="section-header">
                <h2 class="section-title">${industryContent.sectionTitle}</h2>
                <p class="section-subtitle">${industryContent.sectionSubtitle}</p>
            </div>
            <div class="features-grid">
                ${(intelligentContent ? intelligentContent.features : features.map(f => ({ title: f, description: getFeatureData(f, context.industry || 'business').description, icon: getFeatureData(f, context.industry || 'business').icon }))).map((feature: any, index: number) => {
                  return `
                <div class="feature-card fade-in">
                    <div class="feature-icon">${feature.icon}</div>
                    <h3 class="feature-title">${feature.title}</h3>
                    <p class="feature-description">${feature.description}</p>
                </div>`
                }).join('')}
            </div>

            ${intelligentContent && intelligentContent.testimonials.length > 0 ? `
            <!-- Testimonials Section -->
            <section class="section">
                <div class="container">
                    <div class="section-header">
                        <h2 class="section-title">What Our Clients Say</h2>
                        <p class="section-subtitle">Don't just take our word for it</p>
                    </div>
                    <div class="testimonials-grid">
                        ${intelligentContent.testimonials.slice(0, 2).map((testimonial: any) => `
                        <div class="testimonial-card fade-in">
                            <div class="testimonial-content">
                                <div class="testimonial-stars">
                                    ${'★'.repeat(testimonial.rating)}
                                </div>
                                <p class="testimonial-text">"${testimonial.content}"</p>
                                <div class="testimonial-author">
                                    <strong>${testimonial.name}</strong>
                                    <span>${testimonial.role}${testimonial.company ? `, ${testimonial.company}` : ''}</span>
                                </div>
                            </div>
                        </div>`).join('')}
                    </div>
                </div>
            </section>
            ` : ''}

            ${intelligentContent && intelligentContent.socialProof.stats.length > 0 ? `
            <!-- Social Proof Section -->
            <section class="section bg-gray-50">
                <div class="container">
                    <div class="stats-grid">
                        ${intelligentContent.socialProof.stats.map((stat: any) => `
                        <div class="stat-item fade-in">
                            <div class="stat-number">${stat.number}</div>
                            <div class="stat-label">${stat.label}</div>
                        </div>`).join('')}
                    </div>
                </div>
            </section>
            ` : ''}
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <h3 class="footer-title">${title}</h3>
                <p class="footer-text">${heroContent.description}</p>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 ${title}. Created with Advanced AI Website Builder.</p>
            </div>
        </div>
    </footer>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Add loading animation
        window.addEventListener('load', () => {
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                document.body.style.opacity = '1';
            }, 100);
        });

        // Add parallax effect to hero
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero && scrolled < hero.offsetHeight) {
                hero.style.transform = \`translateY(\${scrolled * 0.5}px)\`;
            }
        });
    </script>
</body>
</html>`
}

// Helper functions for content generation
function getIndustryContent(industry: string) {
  const content = {
    restaurant: {
      sectionTitle: 'Our Culinary Experience',
      sectionSubtitle: 'Discover exceptional flavors and unforgettable dining moments crafted with passion and expertise.',
      keywords: 'restaurant, dining, food, cuisine, chef, menu, reservations'
    },
    technology: {
      sectionTitle: 'Innovative Solutions',
      sectionSubtitle: 'Cutting-edge technology solutions designed to transform your business and drive growth.',
      keywords: 'technology, software, innovation, digital, solutions, development'
    },
    healthcare: {
      sectionTitle: 'Comprehensive Care',
      sectionSubtitle: 'Professional healthcare services focused on your wellbeing and peace of mind.',
      keywords: 'healthcare, medical, doctor, clinic, treatment, wellness'
    },
    creative: {
      sectionTitle: 'Creative Excellence',
      sectionSubtitle: 'Bringing your vision to life through innovative design and creative solutions.',
      keywords: 'creative, design, portfolio, art, innovation, visual'
    },
    business: {
      sectionTitle: 'Professional Services',
      sectionSubtitle: 'Expert business solutions tailored to help you achieve your goals and grow your success.',
      keywords: 'business, professional, services, consulting, growth, success'
    }
  }
  return content[industry as keyof typeof content] || content.business
}

function getHeroContent(context: GenerationContext) {
  const industry = context.industry || 'business'
  const projectName = context.projectName || 'Your Business'

  const heroContent = {
    restaurant: {
      headline: `Welcome to ${projectName}`,
      description: 'Experience culinary excellence with our carefully crafted dishes, warm atmosphere, and exceptional service that creates unforgettable dining moments.',
      primaryCTA: 'View Menu',
      secondaryCTA: 'Make Reservation'
    },
    technology: {
      headline: `Innovation Starts with ${projectName}`,
      description: 'Transform your business with cutting-edge technology solutions designed to drive growth, efficiency, and success in the digital age.',
      primaryCTA: 'Explore Solutions',
      secondaryCTA: 'Get Started'
    },
    healthcare: {
      headline: `Your Health, Our Priority`,
      description: 'Comprehensive healthcare services delivered with compassion, expertise, and the latest medical technology for your complete wellbeing.',
      primaryCTA: 'Our Services',
      secondaryCTA: 'Book Appointment'
    },
    creative: {
      headline: `Creative Excellence by ${projectName}`,
      description: 'Bringing your vision to life through innovative design, artistic expertise, and creative solutions that make a lasting impact.',
      primaryCTA: 'View Portfolio',
      secondaryCTA: 'Start Project'
    },
    business: {
      headline: `Professional Excellence with ${projectName}`,
      description: 'Expert business solutions and professional services designed to help you achieve your goals and drive sustainable growth.',
      primaryCTA: 'Our Services',
      secondaryCTA: 'Contact Us'
    }
  }

  return heroContent[industry as keyof typeof heroContent] || heroContent.business
}

function getFeatureData(feature: string, industry: string) {
  const featureMap = {
    'Menu': { icon: '🍽️', description: 'Explore our carefully curated selection of dishes, crafted with the finest ingredients and culinary expertise.' },
    'About': { icon: '🏢', description: 'Learn about our story, mission, and the passionate team dedicated to delivering exceptional experiences.' },
    'Reservations': { icon: '📅', description: 'Book your table easily and enjoy a seamless dining experience with our convenient reservation system.' },
    'Reviews': { icon: '⭐', description: 'See what our valued customers say about their experiences and why they choose us time and again.' },
    'Location': { icon: '📍', description: 'Find us easily with detailed location information, directions, and parking details for your convenience.' },
    'Products': { icon: '🛍️', description: 'Discover our comprehensive range of high-quality products designed to meet your specific needs.' },
    'Features': { icon: '⚡', description: 'Explore powerful features and capabilities that set our solutions apart from the competition.' },
    'Pricing': { icon: '💰', description: 'Transparent, competitive pricing plans designed to provide exceptional value for your investment.' },
    'Documentation': { icon: '📚', description: 'Comprehensive guides and documentation to help you get the most out of our products and services.' },
    'Support': { icon: '🤝', description: 'Expert support team ready to assist you with any questions or challenges you may encounter.' },
    'Services': { icon: '🔧', description: 'Professional services tailored to your unique requirements and business objectives.' },
    'Doctors': { icon: '👨‍⚕️', description: 'Meet our team of experienced medical professionals dedicated to providing exceptional patient care.' },
    'Appointments': { icon: '🗓️', description: 'Schedule appointments easily with our convenient online booking system and flexible scheduling.' },
    'Insurance': { icon: '🛡️', description: 'We work with most major insurance providers to ensure accessible healthcare for all our patients.' },
    'Contact': { icon: '📞', description: 'Get in touch with our team for inquiries, support, or to discuss how we can help you.' },
    'Portfolio': { icon: '🎨', description: 'Explore our diverse portfolio showcasing creative projects and successful client collaborations.' },
    'Process': { icon: '⚙️', description: 'Learn about our proven creative process that ensures exceptional results for every project.' },
    'Team': { icon: '👥', description: 'Meet the talented professionals who bring expertise, creativity, and dedication to every project.' },
    'Testimonials': { icon: '💬', description: 'Read success stories and testimonials from satisfied clients who have achieved their goals with us.' }
  }

  return featureMap[feature as keyof typeof featureMap] || {
    icon: '✨',
    description: 'Exceptional features and services designed to exceed your expectations and deliver outstanding results.'
  }
}

// 🚀 TOGETHER AI - $25 FREE CREDITS! (BEST FREE OPTION)
async function generateWithTogether(prompt: string, context: GenerationContext): Promise<string> {
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.TOGETHER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-2-70b-chat-hf',
      messages: [{
        role: 'user',
        content: `Create a stunning, modern HTML website with the following requirements:

${prompt}

MANDATORY FEATURES TO INCLUDE:
- Animated gradient mesh background
- Glassmorphism cards with backdrop-filter blur
- 3D perspective transforms and hover effects
- Floating animations and smooth transitions
- Premium buttons with glow effects
- Modern typography and spacing
- Responsive design for all devices

Return ONLY pure HTML with embedded CSS and JavaScript. Start with <!DOCTYPE html> and end with </html>.`
      }],
      max_tokens: 4000,
      temperature: 0.8,
      top_p: 0.9
    })
  })

  const data = await response.json()
  return data.choices[0]?.message?.content || ''
}

// 🚀 REPLICATE - $10 FREE CREDITS! (EXCELLENT MODELS)
async function generateWithReplicate(prompt: string, context: GenerationContext): Promise<string> {
  const response = await fetch('https://api.replicate.com/v1/predictions', {
    method: 'POST',
    headers: {
      'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      version: 'meta/llama-2-70b-chat:02e509c789964a7ea8736978a43525956ef40397be9033abf9fd2badfe68c9e3',
      input: {
        prompt: `Create a stunning, modern HTML website: ${prompt}

MANDATORY FEATURES:
- Animated gradient background
- Glassmorphism cards
- 3D hover effects
- Smooth animations
- Premium buttons
- Responsive design

Return ONLY HTML with embedded CSS/JS. Start with <!DOCTYPE html>`,
        max_new_tokens: 4000,
        temperature: 0.8
      }
    })
  })

  const prediction = await response.json()

  // Wait for completion (simplified for demo)
  if (prediction.status === 'starting' || prediction.status === 'processing') {
    // In production, you'd poll for completion
    // For now, return a fallback
    return generateAdvancedWebsiteHTML(context, getAdvancedColorScheme('modern'), ['Modern Design', 'Responsive Layout'])
  }

  return prediction.output?.join('') || generateAdvancedWebsiteHTML(context, getAdvancedColorScheme('modern'), ['Modern Design', 'Responsive Layout'])
}

// 🚀 COHERE - $5 FREE MONTHLY! (RELIABLE)
async function generateWithCohere(prompt: string, context: GenerationContext): Promise<string> {
  const response = await fetch('https://api.cohere.ai/v1/generate', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.COHERE_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'command',
      prompt: `Create a stunning, modern HTML website: ${prompt}

MANDATORY FEATURES:
- Animated gradient background
- Glassmorphism cards
- 3D hover effects
- Smooth animations
- Premium buttons
- Responsive design

Return ONLY HTML with embedded CSS/JS. Start with <!DOCTYPE html>`,
      max_tokens: 4000,
      temperature: 0.8,
      p: 0.9
    })
  })

  const data = await response.json()
  return data.generations[0]?.text || ''
}

// 🚀 FIREWORKS AI - $1 FREE CREDITS! (FAST)
async function generateWithFireworks(prompt: string, context: GenerationContext): Promise<string> {
  const response = await fetch('https://api.fireworks.ai/inference/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.FIREWORKS_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'accounts/fireworks/models/llama-v2-70b-chat',
      messages: [{
        role: 'user',
        content: `Create a stunning, modern HTML website: ${prompt}

MANDATORY FEATURES:
- Animated gradient background
- Glassmorphism cards
- 3D hover effects
- Smooth animations
- Premium buttons
- Responsive design

Return ONLY HTML with embedded CSS/JS. Start with <!DOCTYPE html>`
      }],
      max_tokens: 4000,
      temperature: 0.8,
      top_p: 0.9
    })
  })

  const data = await response.json()
  return data.choices[0]?.message?.content || ''
}
