'use client'

import { motion } from 'framer-motion'
import { Sparkles, BookOpen, Video, Code, Lightbulb, ArrowRight, Clock, User } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/footer'

const learningCategories = [
  {
    title: 'Getting Started',
    description: 'Learn the basics of AI Builder',
    icon: Lightbulb,
    color: 'from-green-500 to-emerald-500',
    articles: [
      { title: 'Your First Website', time: '5 min read', level: 'Beginner' },
      { title: 'Understanding AI Prompts', time: '8 min read', level: 'Beginner' },
      { title: 'Customizing Generated Code', time: '10 min read', level: 'Beginner' }
    ]
  },
  {
    title: 'Advanced Features',
    description: 'Master advanced AI Builder capabilities',
    icon: Code,
    color: 'from-blue-500 to-cyan-500',
    articles: [
      { title: 'Custom Templates', time: '15 min read', level: 'Advanced' },
      { title: 'API Integration', time: '20 min read', level: 'Advanced' },
      { title: 'Deployment Options', time: '12 min read', level: 'Intermediate' }
    ]
  },
  {
    title: 'Video Tutorials',
    description: 'Watch step-by-step video guides',
    icon: Video,
    color: 'from-purple-500 to-pink-500',
    articles: [
      { title: 'Building an E-commerce Site', time: '25 min watch', level: 'Intermediate' },
      { title: 'Creating a Portfolio', time: '18 min watch', level: 'Beginner' },
      { title: 'Advanced Customization', time: '35 min watch', level: 'Advanced' }
    ]
  },
  {
    title: 'Best Practices',
    description: 'Tips and tricks from experts',
    icon: BookOpen,
    color: 'from-orange-500 to-red-500',
    articles: [
      { title: 'Writing Effective Prompts', time: '12 min read', level: 'All Levels' },
      { title: 'SEO Optimization', time: '15 min read', level: 'Intermediate' },
      { title: 'Performance Tips', time: '10 min read', level: 'Advanced' }
    ]
  }
]

const quickLinks = [
  { title: 'API Documentation', href: '/api-docs', description: 'Complete API reference and examples' },
  { title: 'Template Gallery', href: '/templates', description: 'Browse and use community templates' },
  { title: 'Community Forum', href: '/community', description: 'Get help from other creators' },
  { title: 'Changelog', href: '/changelog', description: 'Latest updates and features' }
]

export default function LearnPage() {
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
              <Link href="/learn" className="text-white font-medium">
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
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Learn</span>
              <br />
              <span className="text-white">AI Builder</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Master AI-powered website creation with our comprehensive guides, tutorials, and documentation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#getting-started"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Start Learning
              </Link>
              <Link
                href="/api-docs"
                className="px-8 py-4 border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-lg transition-colors"
              >
                API Docs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.href}
                  className="block glass rounded-xl p-6 hover:bg-white/20 transition-all duration-300 group"
                >
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                    {link.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3">
                    {link.description}
                  </p>
                  <span className="text-purple-400 text-sm font-medium">
                    Learn more →
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Categories */}
      <section id="getting-started" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Learning Resources
            </h2>
            <p className="text-xl text-gray-300">
              Everything you need to become an AI Builder expert
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {learningCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-6`}>
                  <category.icon className="h-8 w-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-semibold text-white mb-3">
                  {category.title}
                </h3>
                
                <p className="text-gray-300 mb-6">
                  {category.description}
                </p>
                
                <div className="space-y-4">
                  {category.articles.map((article, articleIndex) => (
                    <div
                      key={articleIndex}
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      <div>
                        <h4 className="text-white font-medium mb-1">
                          {article.title}
                        </h4>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{article.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{article.level}</span>
                          </div>
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  ))}
                </div>
                
                <Link
                  href={`/learn/${category.title.toLowerCase().replace(' ', '-')}`}
                  className="inline-flex items-center mt-6 text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  View all articles
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Put your knowledge into practice and create your first AI-generated website
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              Start Building Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
