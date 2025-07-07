export interface Template {
  id: string
  name: string
  description: string
  category: string
  industry: string
  preview: string
  features: string[]
  colorScheme: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  mockData?: any
}

export const templateCategories = [
  { id: 'portfolio', name: 'Portfolio', icon: '👨‍💼' },
  { id: 'business', name: 'Business', icon: '🏢' },
  { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
  { id: 'blog', name: 'Blog', icon: '📝' },
  { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
  { id: 'landing', name: 'Landing Page', icon: '🚀' },
  { id: 'agency', name: 'Agency', icon: '🎨' },
  { id: 'saas', name: 'SaaS', icon: '💻' },
  { id: 'nonprofit', name: 'Non-profit', icon: '❤️' },
  { id: 'education', name: 'Education', icon: '🎓' }
]

export const templates: Template[] = [
  {
    id: 'modern-portfolio',
    name: 'Modern Portfolio',
    description: 'A sleek, modern portfolio website perfect for designers, developers, and creatives',
    category: 'portfolio',
    industry: 'creative',
    preview: '/templates/modern-portfolio.jpg',
    features: ['Hero Section', 'Project Gallery', 'Skills Showcase', 'Contact Form', 'Responsive Design'],
    colorScheme: 'blue',
    difficulty: 'beginner',
    tags: ['creative', 'modern', 'responsive', 'portfolio'],
    mockData: {
      name: 'Alex Johnson',
      title: 'Full Stack Developer',
      bio: 'Passionate developer with 5+ years of experience creating amazing web experiences.',
      projects: [
        { name: 'E-commerce Platform', tech: 'React, Node.js', image: '/mock/project1.jpg' },
        { name: 'Mobile App', tech: 'React Native', image: '/mock/project2.jpg' },
        { name: 'Dashboard UI', tech: 'Vue.js, D3.js', image: '/mock/project3.jpg' }
      ]
    }
  },
  {
    id: 'corporate-business',
    name: 'Corporate Business',
    description: 'Professional business website with modern design and corporate feel',
    category: 'business',
    industry: 'corporate',
    preview: '/templates/corporate-business.jpg',
    features: ['Services Section', 'Team Profiles', 'Testimonials', 'Contact Info', 'About Us'],
    colorScheme: 'green',
    difficulty: 'intermediate',
    tags: ['corporate', 'professional', 'business', 'services'],
    mockData: {
      companyName: 'TechCorp Solutions',
      tagline: 'Innovative Technology Solutions for Modern Business',
      services: [
        { name: 'Web Development', description: 'Custom web applications', icon: '💻' },
        { name: 'Mobile Apps', description: 'iOS and Android development', icon: '📱' },
        { name: 'Cloud Solutions', description: 'Scalable cloud infrastructure', icon: '☁️' }
      ]
    }
  },
  {
    id: 'restaurant-deluxe',
    name: 'Restaurant Deluxe',
    description: 'Elegant restaurant website with menu showcase and reservation system',
    category: 'restaurant',
    industry: 'hospitality',
    preview: '/templates/restaurant-deluxe.jpg',
    features: ['Menu Display', 'Reservation Form', 'Gallery', 'Location Map', 'Reviews'],
    colorScheme: 'orange',
    difficulty: 'intermediate',
    tags: ['restaurant', 'food', 'elegant', 'reservations'],
    mockData: {
      restaurantName: 'Bella Vista',
      cuisine: 'Italian Fine Dining',
      menuItems: [
        { name: 'Margherita Pizza', price: '$18', description: 'Fresh mozzarella, basil, tomato sauce' },
        { name: 'Pasta Carbonara', price: '$22', description: 'Creamy pasta with pancetta and parmesan' },
        { name: 'Tiramisu', price: '$12', description: 'Classic Italian dessert with coffee and mascarpone' }
      ]
    }
  },
  {
    id: 'tech-blog',
    name: 'Tech Blog',
    description: 'Modern blog layout perfect for tech writers and content creators',
    category: 'blog',
    industry: 'media',
    preview: '/templates/tech-blog.jpg',
    features: ['Article Layout', 'Categories', 'Search', 'Author Bio', 'Comments'],
    colorScheme: 'indigo',
    difficulty: 'beginner',
    tags: ['blog', 'tech', 'content', 'writing'],
    mockData: {
      blogName: 'TechInsights',
      tagline: 'Latest trends in technology and development',
      posts: [
        { title: 'The Future of AI in Web Development', date: '2024-01-15', excerpt: 'Exploring how AI is transforming the way we build websites...' },
        { title: 'React vs Vue: A 2024 Comparison', date: '2024-01-10', excerpt: 'An in-depth comparison of the two popular frameworks...' }
      ]
    }
  },
  {
    id: 'ecommerce-store',
    name: 'E-commerce Store',
    description: 'Complete online store with product catalog and shopping cart',
    category: 'ecommerce',
    industry: 'retail',
    preview: '/templates/ecommerce-store.jpg',
    features: ['Product Grid', 'Shopping Cart', 'Product Details', 'Checkout', 'User Account'],
    colorScheme: 'pink',
    difficulty: 'advanced',
    tags: ['ecommerce', 'shopping', 'products', 'cart'],
    mockData: {
      storeName: 'StyleHub',
      products: [
        { name: 'Wireless Headphones', price: '$99', image: '/mock/product1.jpg', rating: 4.5 },
        { name: 'Smart Watch', price: '$299', image: '/mock/product2.jpg', rating: 4.8 },
        { name: 'Laptop Stand', price: '$49', image: '/mock/product3.jpg', rating: 4.2 }
      ]
    }
  },
  {
    id: 'saas-landing',
    name: 'SaaS Landing Page',
    description: 'High-converting landing page for SaaS products with pricing and features',
    category: 'landing',
    industry: 'technology',
    preview: '/templates/saas-landing.jpg',
    features: ['Hero Section', 'Feature Highlights', 'Pricing Table', 'Testimonials', 'CTA Buttons'],
    colorScheme: 'cyan',
    difficulty: 'intermediate',
    tags: ['saas', 'landing', 'conversion', 'pricing'],
    mockData: {
      productName: 'CloudFlow',
      tagline: 'Streamline your workflow with powerful automation',
      features: [
        { name: 'Automated Workflows', description: 'Set up complex automations in minutes' },
        { name: 'Team Collaboration', description: 'Work together seamlessly across teams' },
        { name: 'Analytics Dashboard', description: 'Track performance with detailed insights' }
      ]
    }
  }
]

export function getTemplateById(id: string): Template | undefined {
  return templates.find(template => template.id === id)
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter(template => template.category === category)
}

export function getTemplatesByIndustry(industry: string): Template[] {
  return templates.filter(template => template.industry === industry)
}

export function searchTemplates(query: string): Template[] {
  const lowercaseQuery = query.toLowerCase()
  return templates.filter(template =>
    template.name.toLowerCase().includes(lowercaseQuery) ||
    template.description.toLowerCase().includes(lowercaseQuery) ||
    template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  )
}

// Re-export the generator function
export { generateTemplateHTML } from './generators'
