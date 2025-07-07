'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart, Eye, ExternalLink, Filter, Search } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/footer'

const categories = ['All', 'E-commerce', 'Portfolio', 'Business', 'Creative', 'Restaurant', 'Tech', 'Education']

const showcaseProjects = [
  {
    id: 1,
    title: 'Modern E-commerce Store',
    category: 'E-commerce',
    author: 'Sarah Chen',
    description: 'A beautiful e-commerce platform with modern design, smooth animations, and seamless checkout experience.',
    image: '/api/placeholder/600/400',
    tags: ['E-commerce', 'Modern', 'Responsive', 'Payment'],
    likes: 234,
    views: 1200,
    featured: true
  },
  {
    id: 2,
    title: 'Creative Portfolio',
    category: 'Portfolio',
    author: 'Alex Rodriguez',
    description: 'Stunning portfolio website showcasing creative work with interactive elements and smooth transitions.',
    image: '/api/placeholder/600/400',
    tags: ['Portfolio', 'Creative', 'Interactive', 'Animation'],
    likes: 189,
    views: 890,
    featured: false
  },
  {
    id: 3,
    title: 'Restaurant Elegance',
    category: 'Restaurant',
    author: 'Maria Gonzalez',
    description: 'Elegant restaurant website with online reservations, beautiful food gallery, and menu showcase.',
    image: '/api/placeholder/600/400',
    tags: ['Restaurant', 'Elegant', 'Booking', 'Gallery'],
    likes: 156,
    views: 750,
    featured: true
  },
  {
    id: 4,
    title: 'Tech Startup Hub',
    category: 'Tech',
    author: 'David Kim',
    description: 'Clean and professional startup website with pricing tables, feature showcases, and team profiles.',
    image: '/api/placeholder/600/400',
    tags: ['Startup', 'Professional', 'SaaS', 'Pricing'],
    likes: 298,
    views: 1450,
    featured: false
  },
  {
    id: 5,
    title: 'Photography Studio',
    category: 'Creative',
    author: 'Emma Wilson',
    description: 'Minimalist photography studio website with stunning image galleries and contact forms.',
    image: '/api/placeholder/600/400',
    tags: ['Photography', 'Minimalist', 'Gallery', 'Contact'],
    likes: 167,
    views: 680,
    featured: false
  },
  {
    id: 6,
    title: 'Fitness App Landing',
    category: 'Business',
    author: 'Mike Johnson',
    description: 'Dynamic fitness app landing page with workout videos, membership signup, and progress tracking.',
    image: '/api/placeholder/600/400',
    tags: ['Fitness', 'Dynamic', 'App', 'Membership'],
    likes: 203,
    views: 920,
    featured: true
  },
  {
    id: 7,
    title: 'Educational Platform',
    category: 'Education',
    author: 'Lisa Park',
    description: 'Comprehensive educational platform with course listings, student dashboard, and progress tracking.',
    image: '/api/placeholder/600/400',
    tags: ['Education', 'Platform', 'Courses', 'Dashboard'],
    likes: 145,
    views: 580,
    featured: false
  },
  {
    id: 8,
    title: 'Corporate Business',
    category: 'Business',
    author: 'Robert Chen',
    description: 'Professional corporate website with service pages, team profiles, and client testimonials.',
    image: '/api/placeholder/600/400',
    tags: ['Corporate', 'Professional', 'Services', 'Testimonials'],
    likes: 178,
    views: 820,
    featured: false
  }
]

export default function ShowcasePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold gradient-text">AI Builder</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/community" className="text-gray-300 hover:text-white transition-colors">
                Community
              </Link>
              <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link href="/enterprise" className="text-gray-300 hover:text-white transition-colors">
                Enterprise
              </Link>
              <Link href="/learn" className="text-gray-300 hover:text-white transition-colors">
                Learn
              </Link>
              <Link href="/showcase" className="text-white font-medium">
                Showcase
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Log in
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Project</span>
              <br />
              <span className="text-white">Showcase</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover amazing websites created by our community. Get inspired and see what's possible with AI Builder.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="pb-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    category === 'All'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'glass text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="pb-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseProjects.filter(project => project.featured).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center relative">
                  <div className="text-gray-400 text-sm">Project Preview</div>
                  <div className="absolute top-3 right-3">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      Featured
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-gray-400 text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{project.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">
                    by {project.author}
                  </p>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="w-full py-2 px-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 hover:from-purple-600/30 hover:to-pink-600/30 text-purple-300 font-medium rounded-lg transition-all flex items-center justify-center">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">All Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {showcaseProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="glass rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Project Preview</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-3 text-gray-400 text-sm">
                      <div className="flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{project.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{project.views}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">
                    by {project.author} • {project.category}
                  </p>
                  
                  <p className="text-gray-300 mb-4 text-sm line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
                    View Project →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
