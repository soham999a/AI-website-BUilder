'use client'

import { motion } from 'framer-motion'
import { Sparkles, MessageCircle, Users, Heart, ExternalLink, Github, Twitter } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/footer'

const communityProjects = [
  {
    title: 'Modern E-commerce Store',
    author: 'Sarah Chen',
    description: 'A beautiful e-commerce platform built with AI Builder featuring modern design and smooth animations.',
    image: '/api/placeholder/400/300',
    tags: ['E-commerce', 'Modern', 'Responsive'],
    likes: 234,
    views: 1200
  },
  {
    title: 'Creative Portfolio',
    author: 'Alex Rodriguez',
    description: 'Stunning portfolio website showcasing creative work with interactive elements and smooth transitions.',
    image: '/api/placeholder/400/300',
    tags: ['Portfolio', 'Creative', 'Interactive'],
    likes: 189,
    views: 890
  },
  {
    title: 'Restaurant Landing Page',
    author: 'Maria Gonzalez',
    description: 'Elegant restaurant website with online reservations and beautiful food gallery.',
    image: '/api/placeholder/400/300',
    tags: ['Restaurant', 'Elegant', 'Booking'],
    likes: 156,
    views: 750
  },
  {
    title: 'Tech Startup Site',
    author: 'David Kim',
    description: 'Clean and professional startup website with pricing tables and feature showcases.',
    image: '/api/placeholder/400/300',
    tags: ['Startup', 'Professional', 'SaaS'],
    likes: 298,
    views: 1450
  },
  {
    title: 'Photography Studio',
    author: 'Emma Wilson',
    description: 'Minimalist photography studio website with stunning image galleries and contact forms.',
    image: '/api/placeholder/400/300',
    tags: ['Photography', 'Minimalist', 'Gallery'],
    likes: 167,
    views: 680
  },
  {
    title: 'Fitness App Landing',
    author: 'Mike Johnson',
    description: 'Dynamic fitness app landing page with workout videos and membership signup.',
    image: '/api/placeholder/400/300',
    tags: ['Fitness', 'Dynamic', 'App'],
    likes: 203,
    views: 920
  }
]

const communityStats = [
  { label: 'Active Creators', value: '50,000+' },
  { label: 'Websites Built', value: '250,000+' },
  { label: 'Discord Members', value: '15,000+' },
  { label: 'Templates Shared', value: '1,200+' }
]

export default function CommunityPage() {
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
              <Link href="/community" className="text-white font-medium">
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
              <Link href="/showcase" className="text-gray-300 hover:text-white transition-colors">
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
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Join Our</span>
              <br />
              <span className="text-white">Creative Community</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Connect with thousands of creators, share your projects, get inspired, 
              and learn from the best AI-generated websites.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://discord.gg/aibuilder"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Join Discord
              </a>
              <Link
                href="/showcase"
                className="px-8 py-4 border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Browse Projects
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center glass rounded-xl p-6"
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Featured Community Projects
            </h2>
            <p className="text-xl text-gray-300">
              Discover amazing websites created by our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {communityProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl overflow-hidden hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="aspect-video bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
                  <div className="text-gray-400 text-sm">Project Preview</div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center space-x-2 text-gray-400 text-sm">
                      <Heart className="h-4 w-4" />
                      <span>{project.likes}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">
                    by {project.author}
                  </p>
                  
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <span>{project.views} views</span>
                    <button className="text-purple-400 hover:text-purple-300 transition-colors">
                      View Project →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Links */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Connect With Us
            </h2>
            <p className="text-xl text-gray-300">
              Join our community across different platforms
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.a
              href="https://discord.gg/aibuilder"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300 group"
            >
              <MessageCircle className="h-12 w-12 text-[#5865F2] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Discord</h3>
              <p className="text-gray-300 mb-4">
                Chat with creators, get help, and share your work
              </p>
              <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                Join Server →
              </span>
            </motion.a>

            <motion.a
              href="https://github.com/aibuilder"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300 group"
            >
              <Github className="h-12 w-12 text-gray-300 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">GitHub</h3>
              <p className="text-gray-300 mb-4">
                Contribute to open source and access templates
              </p>
              <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                View Repos →
              </span>
            </motion.a>

            <motion.a
              href="https://twitter.com/aibuilder"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass rounded-xl p-8 text-center hover:bg-white/20 transition-all duration-300 group"
            >
              <Twitter className="h-12 w-12 text-[#1DA1F2] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold text-white mb-2">Twitter</h3>
              <p className="text-gray-300 mb-4">
                Follow for updates, tips, and community highlights
              </p>
              <span className="text-purple-400 group-hover:text-purple-300 transition-colors">
                Follow Us →
              </span>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
