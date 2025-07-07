// Template system for the AI Website Builder

export interface Template {
  id: string
  name: string
  description: string
  category: string
  preview: string
  features: string[]
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  colorScheme: string
  complexity: 'simple' | 'moderate' | 'advanced'
}

export interface TemplateCategory {
  id: string
  name: string
  icon: string
  description: string
}

export const templateCategories: TemplateCategory[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    icon: '🎨',
    description: 'Showcase your work and skills'
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
    description: 'Professional business websites'
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: '🍽️',
    description: 'Food and dining experiences'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Tech companies and startups'
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: '🎭',
    description: 'Creative agencies and studios'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    description: 'Medical and healthcare services'
  }
]

export const templates: Template[] = [
  {
    id: 'modern-portfolio',
    name: 'Modern Portfolio',
    description: 'Clean, professional portfolio for creatives and professionals',
    category: 'portfolio',
    preview: '/templates/modern-portfolio.jpg',
    features: ['Hero Section', 'Portfolio Gallery', 'About', 'Contact Form', 'Responsive Design'],
    tags: ['portfolio', 'creative', 'modern', 'responsive'],
    difficulty: 'intermediate',
    colorScheme: 'modern',
    complexity: 'moderate'
  },
  {
    id: 'business-landing',
    name: 'Business Landing',
    description: 'Professional landing page for businesses and startups',
    category: 'business',
    preview: '/templates/business-landing.jpg',
    features: ['Hero Banner', 'Services', 'Testimonials', 'CTA Sections', 'Contact Info'],
    tags: ['business', 'landing', 'professional', 'startup'],
    difficulty: 'beginner',
    colorScheme: 'professional',
    complexity: 'simple'
  },
  {
    id: 'restaurant-menu',
    name: 'Restaurant Website',
    description: 'Appetizing website for restaurants and food businesses',
    category: 'restaurant',
    preview: '/templates/restaurant-menu.jpg',
    features: ['Menu Display', 'Gallery', 'Reservations', 'Location', 'Reviews'],
    tags: ['restaurant', 'food', 'menu', 'dining'],
    difficulty: 'intermediate',
    colorScheme: 'warm',
    complexity: 'moderate'
  },
  {
    id: 'tech-startup',
    name: 'Tech Startup',
    description: 'Modern website for technology companies and startups',
    category: 'technology',
    preview: '/templates/tech-startup.jpg',
    features: ['Product Showcase', 'Features', 'Pricing', 'Team', 'Blog'],
    tags: ['tech', 'startup', 'modern', 'saas'],
    difficulty: 'advanced',
    colorScheme: 'tech',
    complexity: 'advanced'
  },
  {
    id: 'creative-agency',
    name: 'Creative Agency',
    description: 'Bold, creative website for agencies and design studios',
    category: 'creative',
    preview: '/templates/creative-agency.jpg',
    features: ['Portfolio', 'Services', 'Process', 'Team', 'Contact'],
    tags: ['creative', 'agency', 'design', 'bold'],
    difficulty: 'advanced',
    colorScheme: 'artistic',
    complexity: 'advanced'
  },
  {
    id: 'healthcare-clinic',
    name: 'Healthcare Clinic',
    description: 'Professional website for healthcare providers',
    category: 'healthcare',
    preview: '/templates/healthcare-clinic.jpg',
    features: ['Services', 'Doctors', 'Appointments', 'Insurance', 'Contact'],
    tags: ['healthcare', 'medical', 'clinic', 'professional'],
    difficulty: 'intermediate',
    colorScheme: 'medical',
    complexity: 'moderate'
  }
]

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(template => template.category === category)
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find(template => template.id === id)
}

export function generateTemplateHTML(template: Template, customizations?: any): string {
  // This is a simplified template generation function
  // In a real implementation, this would generate actual HTML based on the template
  
  const baseHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${template.name}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 0;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        
        .hero p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
        
        .btn {
            display: inline-block;
            background: #ff6b6b;
            color: white;
            padding: 12px 30px;
            text-decoration: none;
            border-radius: 5px;
            transition: background 0.3s;
        }
        
        .btn:hover {
            background: #ff5252;
        }
        
        .section {
            padding: 80px 0;
        }
        
        .section h2 {
            text-align: center;
            font-size: 2.5rem;
            margin-bottom: 3rem;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .feature {
            text-align: center;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        
        .feature h3 {
            font-size: 1.5rem;
            margin-bottom: 1rem;
            color: #667eea;
        }
        
        .footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 2rem 0;
        }
        
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 2rem;
            }
            
            .features {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <section class="hero">
        <div class="container">
            <h1>${template.name}</h1>
            <p>${template.description}</p>
            <a href="#features" class="btn">Learn More</a>
        </div>
    </section>
    
    <section id="features" class="section">
        <div class="container">
            <h2>Features</h2>
            <div class="features">
                ${template.features.map(feature => `
                <div class="feature">
                    <h3>${feature}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.</p>
                </div>
                `).join('')}
            </div>
        </div>
    </section>
    
    <footer class="footer">
        <div class="container">
            <p>&copy; 2024 ${template.name}. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
  `
  
  return baseHTML
}

export default templates
