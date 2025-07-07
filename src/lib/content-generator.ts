// Advanced Content Generation System
// Provides intelligent, industry-specific content for AI website generation

export interface ContentContext {
  industry: string
  businessType: string
  targetAudience: string
  tone: string
  location?: string
  services?: string[]
  features?: string[]
}

export interface GeneratedContent {
  headlines: string[]
  descriptions: string[]
  features: Array<{
    title: string
    description: string
    icon: string
  }>
  testimonials: Array<{
    name: string
    role: string
    company: string
    content: string
    rating: number
  }>
  callToActions: string[]
  aboutContent: string
  contactInfo: {
    email: string
    phone: string
    address: string
  }
  socialProof: {
    stats: Array<{
      number: string
      label: string
    }>
    achievements: string[]
  }
}

// Industry-specific content databases
const industryContent = {
  restaurant: {
    headlines: [
      "Exceptional Dining Experience Awaits",
      "Where Flavor Meets Passion",
      "Culinary Excellence in Every Bite",
      "Fresh Ingredients, Unforgettable Taste",
      "Your Table is Ready for Something Special"
    ],
    descriptions: [
      "Experience culinary artistry with our chef-crafted dishes made from the finest local ingredients.",
      "Join us for an unforgettable dining journey where every meal tells a story of passion and flavor.",
      "Discover a menu that celebrates both tradition and innovation in every carefully prepared dish."
    ],
    features: [
      { title: "Farm-to-Table", description: "Fresh, locally sourced ingredients delivered daily", icon: "🌱" },
      { title: "Expert Chefs", description: "Award-winning culinary team with years of experience", icon: "👨‍🍳" },
      { title: "Cozy Atmosphere", description: "Warm, inviting ambiance perfect for any occasion", icon: "🕯️" },
      { title: "Wine Selection", description: "Curated wine list to complement every dish", icon: "🍷" }
    ],
    testimonials: [
      {
        name: "Sarah Johnson",
        role: "Food Critic",
        company: "City Magazine",
        content: "An absolutely divine experience. The attention to detail in every dish is remarkable.",
        rating: 5
      },
      {
        name: "Michael Chen",
        role: "Regular Customer",
        company: "",
        content: "This has become our go-to spot for special occasions. Never disappoints!",
        rating: 5
      }
    ],
    callToActions: [
      "Reserve Your Table",
      "View Our Menu",
      "Order Online",
      "Book Private Dining"
    ]
  },
  
  technology: {
    headlines: [
      "Innovation That Transforms Your Business",
      "Cutting-Edge Solutions for Modern Challenges",
      "Technology That Drives Success",
      "Empowering Your Digital Future",
      "Where Innovation Meets Excellence"
    ],
    descriptions: [
      "Leverage cutting-edge technology solutions designed to accelerate your business growth and digital transformation.",
      "Our expert team delivers innovative software solutions that solve complex challenges and drive measurable results.",
      "Transform your business with scalable, secure, and efficient technology solutions built for the future."
    ],
    features: [
      { title: "Cloud Solutions", description: "Scalable cloud infrastructure for modern businesses", icon: "☁️" },
      { title: "AI Integration", description: "Intelligent automation to streamline operations", icon: "🤖" },
      { title: "Security First", description: "Enterprise-grade security for your peace of mind", icon: "🔒" },
      { title: "24/7 Support", description: "Round-the-clock technical support and monitoring", icon: "🛠️" }
    ],
    testimonials: [
      {
        name: "David Rodriguez",
        role: "CTO",
        company: "TechStart Inc.",
        content: "Their solutions increased our efficiency by 300% and reduced costs significantly.",
        rating: 5
      },
      {
        name: "Lisa Wang",
        role: "Operations Manager",
        company: "Global Corp",
        content: "Exceptional service and innovative solutions. Highly recommend their expertise.",
        rating: 5
      }
    ],
    callToActions: [
      "Get Free Consultation",
      "View Our Solutions",
      "Start Your Project",
      "Schedule Demo"
    ]
  },

  healthcare: {
    headlines: [
      "Your Health, Our Priority",
      "Compassionate Care When You Need It Most",
      "Advanced Healthcare Solutions",
      "Dedicated to Your Wellbeing",
      "Excellence in Patient Care"
    ],
    descriptions: [
      "Providing comprehensive healthcare services with compassion, expertise, and the latest medical technology.",
      "Our dedicated team of healthcare professionals is committed to delivering personalized care for your wellbeing.",
      "Experience healthcare that puts you first, with advanced treatments and a caring approach."
    ],
    features: [
      { title: "Expert Physicians", description: "Board-certified doctors with specialized expertise", icon: "👨‍⚕️" },
      { title: "Modern Facilities", description: "State-of-the-art medical equipment and facilities", icon: "🏥" },
      { title: "Personalized Care", description: "Tailored treatment plans for individual needs", icon: "❤️" },
      { title: "Emergency Services", description: "24/7 emergency care when you need it most", icon: "🚑" }
    ],
    testimonials: [
      {
        name: "Jennifer Smith",
        role: "Patient",
        company: "",
        content: "The care I received was exceptional. The staff made me feel comfortable throughout.",
        rating: 5
      },
      {
        name: "Robert Brown",
        role: "Patient",
        company: "",
        content: "Professional, caring, and thorough. I trust them completely with my health.",
        rating: 5
      }
    ],
    callToActions: [
      "Book Appointment",
      "Find a Doctor",
      "Emergency Care",
      "Patient Portal"
    ]
  },

  creative: {
    headlines: [
      "Bringing Your Vision to Life",
      "Creative Excellence in Every Project",
      "Where Art Meets Innovation",
      "Transforming Ideas into Reality",
      "Design That Makes an Impact"
    ],
    descriptions: [
      "We create stunning visual experiences that captivate audiences and bring your brand story to life.",
      "Our creative team combines artistic vision with strategic thinking to deliver exceptional design solutions.",
      "From concept to completion, we craft unique creative solutions that resonate with your audience."
    ],
    features: [
      { title: "Brand Identity", description: "Distinctive brand design that sets you apart", icon: "🎨" },
      { title: "Digital Design", description: "Modern web and app design for digital success", icon: "💻" },
      { title: "Print Design", description: "Professional print materials that make an impact", icon: "📄" },
      { title: "Creative Strategy", description: "Strategic creative direction for your brand", icon: "💡" }
    ],
    testimonials: [
      {
        name: "Amanda Taylor",
        role: "Marketing Director",
        company: "Fashion Forward",
        content: "Their creative vision transformed our brand completely. Outstanding work!",
        rating: 5
      },
      {
        name: "James Wilson",
        role: "Founder",
        company: "StartUp Studio",
        content: "Incredible attention to detail and creative flair. Exceeded all expectations.",
        rating: 5
      }
    ],
    callToActions: [
      "View Portfolio",
      "Start Your Project",
      "Get Quote",
      "Creative Consultation"
    ]
  },

  business: {
    headlines: [
      "Professional Excellence You Can Trust",
      "Strategic Solutions for Business Growth",
      "Your Success is Our Mission",
      "Expert Guidance for Every Challenge",
      "Driving Results Through Partnership"
    ],
    descriptions: [
      "We provide strategic business solutions and professional services designed to accelerate your growth.",
      "Our experienced team delivers expert guidance and proven strategies to help you achieve your goals.",
      "Partner with us for comprehensive business solutions that drive measurable results and sustainable growth."
    ],
    features: [
      { title: "Strategic Planning", description: "Comprehensive business strategy development", icon: "📊" },
      { title: "Expert Consulting", description: "Professional guidance from industry experts", icon: "🎯" },
      { title: "Process Optimization", description: "Streamlined operations for maximum efficiency", icon: "⚙️" },
      { title: "Growth Solutions", description: "Scalable strategies for sustainable growth", icon: "📈" }
    ],
    testimonials: [
      {
        name: "Mark Thompson",
        role: "CEO",
        company: "Growth Enterprises",
        content: "Their strategic guidance helped us double our revenue in just one year.",
        rating: 5
      },
      {
        name: "Susan Davis",
        role: "Business Owner",
        company: "Local Services Co.",
        content: "Professional, knowledgeable, and results-driven. Highly recommend their services.",
        rating: 5
      }
    ],
    callToActions: [
      "Schedule Consultation",
      "Learn More",
      "Get Started",
      "Contact Us"
    ]
  }
}

// Generate intelligent content based on context
export function generateIntelligentContent(context: ContentContext): GeneratedContent {
  const industry = context.industry || 'business'
  const content = industryContent[industry as keyof typeof industryContent] || industryContent.business

  // Customize content based on business type and audience
  const customizedHeadlines = content.headlines.map(headline => {
    if (context.businessType === 'startup') {
      return headline.replace(/Excellence|Professional/, 'Innovation')
    }
    if (context.targetAudience === 'luxury') {
      return headline.replace(/Your|Our/, 'Exclusive')
    }
    return headline
  })

  // Generate location-specific contact info
  const contactInfo = {
    email: `info@${context.businessType || 'business'}.com`,
    phone: '+1 (555) 123-4567',
    address: context.location || '123 Business Street, City, State 12345'
  }

  // Generate social proof stats based on industry
  const socialProof = {
    stats: generateIndustryStats(industry),
    achievements: generateAchievements(industry, context.businessType)
  }

  // Generate about content
  const aboutContent = generateAboutContent(context)

  return {
    headlines: customizedHeadlines,
    descriptions: content.descriptions,
    features: content.features,
    testimonials: content.testimonials,
    callToActions: content.callToActions,
    aboutContent,
    contactInfo,
    socialProof
  }
}

function generateIndustryStats(industry: string) {
  const statsByIndustry = {
    restaurant: [
      { number: '500+', label: 'Happy Customers' },
      { number: '50+', label: 'Signature Dishes' },
      { number: '5★', label: 'Average Rating' },
      { number: '10+', label: 'Years Experience' }
    ],
    technology: [
      { number: '100+', label: 'Projects Completed' },
      { number: '50+', label: 'Happy Clients' },
      { number: '99.9%', label: 'Uptime Guarantee' },
      { number: '24/7', label: 'Support Available' }
    ],
    healthcare: [
      { number: '10,000+', label: 'Patients Served' },
      { number: '25+', label: 'Medical Specialists' },
      { number: '15+', label: 'Years of Service' },
      { number: '24/7', label: 'Emergency Care' }
    ],
    creative: [
      { number: '200+', label: 'Projects Completed' },
      { number: '95%', label: 'Client Satisfaction' },
      { number: '50+', label: 'Brands Transformed' },
      { number: '10+', label: 'Design Awards' }
    ],
    business: [
      { number: '500+', label: 'Clients Served' },
      { number: '95%', label: 'Success Rate' },
      { number: '20+', label: 'Years Experience' },
      { number: '$10M+', label: 'Revenue Generated' }
    ]
  }

  return statsByIndustry[industry as keyof typeof statsByIndustry] || statsByIndustry.business
}

function generateAchievements(industry: string, businessType?: string) {
  const baseAchievements = {
    restaurant: ['Featured in Local Magazine', 'Best Restaurant Award 2023', 'Certified Organic Ingredients'],
    technology: ['ISO 27001 Certified', 'AWS Partner', 'Industry Innovation Award'],
    healthcare: ['Joint Commission Accredited', 'Patient Safety Excellence Award', 'Top Rated Healthcare Provider'],
    creative: ['Design Excellence Award', 'Featured in Design Magazine', 'Creative Agency of the Year'],
    business: ['BBB A+ Rating', 'Industry Leadership Award', 'Certified Business Consultants']
  }

  let achievements = baseAchievements[industry as keyof typeof baseAchievements] || baseAchievements.business

  if (businessType === 'startup') {
    achievements = achievements.map(achievement => 
      achievement.replace(/Award|Excellence/, 'Innovation Recognition')
    )
  }

  return achievements
}

function generateAboutContent(context: ContentContext): string {
  const industry = context.industry || 'business'
  const businessType = context.businessType || 'company'
  const tone = context.tone || 'professional'

  const aboutTemplates = {
    restaurant: `We are a ${businessType === 'family' ? 'family-owned' : 'passionate'} restaurant dedicated to creating exceptional dining experiences. Our commitment to fresh, locally-sourced ingredients and innovative culinary techniques has made us a beloved destination for food enthusiasts.`,
    
    technology: `As a ${businessType === 'startup' ? 'innovative startup' : 'leading technology company'}, we specialize in delivering cutting-edge solutions that transform businesses. Our team of expert developers and strategists work tirelessly to bring your digital vision to life.`,
    
    healthcare: `Our healthcare facility is committed to providing compassionate, comprehensive medical care to our community. With a team of experienced physicians and state-of-the-art facilities, we ensure every patient receives the highest quality care.`,
    
    creative: `We are a ${businessType === 'startup' ? 'dynamic creative studio' : 'established design agency'} that believes in the power of great design to transform brands and connect with audiences. Our creative team brings fresh perspectives and innovative solutions to every project.`,
    
    business: `As a ${businessType === 'startup' ? 'growing consultancy' : 'established business services firm'}, we partner with organizations to drive growth and operational excellence. Our proven methodologies and expert guidance help businesses achieve their strategic objectives.`
  }

  return aboutTemplates[industry as keyof typeof aboutTemplates] || aboutTemplates.business
}

// Generate mock data for specific industries
export function generateMockData(industry: string) {
  const mockDataGenerators = {
    restaurant: () => ({
      menuItems: [
        { name: 'Grilled Salmon', price: '$28', description: 'Fresh Atlantic salmon with seasonal vegetables' },
        { name: 'Ribeye Steak', price: '$35', description: 'Prime cut ribeye with garlic mashed potatoes' },
        { name: 'Pasta Primavera', price: '$22', description: 'Fresh pasta with seasonal vegetables and herbs' }
      ],
      hours: {
        'Monday-Thursday': '5:00 PM - 10:00 PM',
        'Friday-Saturday': '5:00 PM - 11:00 PM',
        'Sunday': '4:00 PM - 9:00 PM'
      }
    }),
    
    technology: () => ({
      services: [
        { name: 'Cloud Migration', description: 'Seamless transition to cloud infrastructure' },
        { name: 'Custom Development', description: 'Tailored software solutions for your business' },
        { name: 'AI Integration', description: 'Intelligent automation and machine learning' }
      ],
      technologies: ['React', 'Node.js', 'AWS', 'Python', 'Docker', 'Kubernetes']
    }),
    
    healthcare: () => ({
      services: [
        { name: 'Primary Care', description: 'Comprehensive health and wellness services' },
        { name: 'Specialist Care', description: 'Expert care from board-certified specialists' },
        { name: 'Emergency Services', description: '24/7 emergency medical care' }
      ],
      doctors: [
        { name: 'Dr. Sarah Johnson', specialty: 'Internal Medicine', experience: '15 years' },
        { name: 'Dr. Michael Chen', specialty: 'Cardiology', experience: '12 years' }
      ]
    })
  }

  const generator = mockDataGenerators[industry as keyof typeof mockDataGenerators]
  return generator ? generator() : null
}
