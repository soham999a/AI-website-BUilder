'use client'

import { motion } from 'framer-motion'
import { Sparkles, Code, Zap, Palette, Rocket, Github, Users, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/footer'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <Sparkles className="h-8 w-8 text-purple-400" />
              <span className="text-xl font-bold gradient-text">AI Builder</span>
            </motion.div>
            
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
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="gradient-text">Build Websites</span>
              <br />
              <span className="text-white">with AI Magic</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Describe your dream website and watch AI bring it to life in seconds.
              No coding required, just pure creativity.
            </p>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8 text-gray-400">
              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>50,000+ creators</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>250,000+ websites built</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-5 w-5" />
                <span>4.9/5 rating</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/dashboard"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                Start Building Free
              </Link>
              <button className="px-8 py-4 border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-lg transition-colors">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose AI Builder?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of web development with our cutting-edge AI technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-300">
                  {feature.description}
                </p>
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
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of creators who are already building with AI
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <Rocket className="mr-2 h-5 w-5" />
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

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Generation",
    description: "Describe your website in plain English and watch AI create beautiful, functional code instantly."
  },
  {
    icon: Code,
    title: "Clean Code Output",
    description: "Get production-ready HTML, CSS, and JavaScript that's optimized, semantic, and maintainable."
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Generate complete websites in seconds, not hours. Perfect for rapid prototyping and iteration."
  },
  {
    icon: Palette,
    title: "Beautiful Designs",
    description: "AI creates stunning, modern designs that are responsive and follow current web design trends."
  },
  {
    icon: Rocket,
    title: "Export & Deploy",
    description: "Download your code or deploy directly to popular hosting platforms with one click."
  },
  {
    icon: Github,
    title: "Version Control",
    description: "Keep track of all your projects and iterations with built-in version management."
  }
]
