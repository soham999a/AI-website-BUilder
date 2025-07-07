'use client'

import { motion } from 'framer-motion'
import { Sparkles, Shield, Users, Zap, Crown, CheckCircle, ArrowRight, Phone, Mail } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/footer'

const enterpriseFeatures = [
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'SOC 2 compliance, SSO integration, and advanced security controls to meet your organization\'s requirements.'
  },
  {
    icon: Users,
    title: 'Unlimited Team Members',
    description: 'Scale your team without limits. Add unlimited collaborators with role-based access controls.'
  },
  {
    icon: Zap,
    title: 'Unlimited AI Credits',
    description: 'No restrictions on AI generation. Build as many websites as your team needs without credit limits.'
  },
  {
    icon: Crown,
    title: 'White-Label Solution',
    description: 'Completely customize the platform with your branding and deploy it as your own solution.'
  }
]

const benefits = [
  'Dedicated customer success manager',
  'Priority 24/7 support with SLA guarantees',
  'Custom integrations with your existing tools',
  'On-premise deployment options',
  'Advanced analytics and reporting',
  'Custom AI model training',
  'API access and webhooks',
  'Compliance certifications (SOC 2, GDPR, HIPAA)'
]

export default function EnterprisePage() {
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
              <Link href="/enterprise" className="text-white font-medium">
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
                href="/contact"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                <span className="gradient-text">Enterprise</span>
                <br />
                <span className="text-white">AI Website Builder</span>
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Scale your organization's web presence with enterprise-grade AI website generation. 
                Custom solutions, dedicated support, and unlimited possibilities.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Schedule a Demo
                </Link>
                <Link
                  href="/pricing"
                  className="px-8 py-4 border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-lg transition-colors flex items-center justify-center"
                >
                  View Pricing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="glass rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6">Enterprise Benefits</h3>
              <div className="space-y-4">
                {benefits.slice(0, 6).map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Built for Enterprise Scale
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to deploy AI website generation across your entire organization
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-8 hover:bg-white/20 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* All Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Complete Enterprise Package
            </h2>
            <p className="text-xl text-gray-300">
              Everything included to ensure your success
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start glass rounded-lg p-4"
              >
                <CheckCircle className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">{benefit}</span>
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
              Ready to Transform Your Organization?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Let's discuss how AI Builder Enterprise can accelerate your team's productivity
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
              >
                <Phone className="mr-2 h-5 w-5" />
                Schedule a Demo
              </Link>
              <Link
                href="mailto:enterprise@aibuilder.com"
                className="inline-flex items-center px-8 py-4 border border-gray-600 hover:border-gray-500 text-white font-semibold rounded-lg transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                Contact Sales
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
