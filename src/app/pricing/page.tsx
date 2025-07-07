'use client'

import { motion } from 'framer-motion'
import { Check, Sparkles, Zap, Shield, Users, Crown, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Footer from '@/components/footer'

const pricingPlans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'For getting started',
    features: [
      'Public projects',
      'Up to 20 collaborators',
      'Basic AI generation',
      'Community templates',
      'Standard support'
    ],
    limitations: '* Up to a maximum of 30 credits per month',
    buttonText: 'Get Started',
    buttonVariant: 'secondary',
    popular: false
  },
  {
    name: 'Pro',
    price: '$25',
    period: '/month',
    description: 'For more projects and usage',
    features: [
      'Everything in Free, plus:',
      'Up to 250 credits / month',
      'Private projects',
      'Remove the AI Builder badge',
      'Custom domains',
      'Role based access',
      'Priority support',
      'Advanced templates'
    ],
    buttonText: 'Get Started',
    buttonVariant: 'primary',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For custom needs',
    features: [
      'Everything in Pro, plus:',
      'Unlimited credits',
      'Dedicated support',
      'Custom integrations',
      'SSO authentication',
      'Opt out of data training',
      'White-label solution',
      'Custom AI models'
    ],
    buttonText: 'Contact Us',
    buttonVariant: 'secondary',
    popular: false
  }
]

const faqs = [
  {
    question: 'What is AI Builder and how does it work?',
    answer: 'AI Builder is an advanced website creation platform that uses artificial intelligence to generate professional websites from simple text descriptions. Just describe what you want, and our AI will create a complete website with modern design, responsive layout, and optimized code.'
  },
  {
    question: 'What does the free plan include?',
    answer: 'The free plan includes access to basic AI generation, public projects, community templates, and up to 30 credits per month. You can collaborate with up to 20 team members and get community support.'
  },
  {
    question: 'What is a credit?',
    answer: 'A credit is used each time you generate or significantly modify a website with AI. Simple edits and previews don\'t consume credits. The free plan includes 30 credits monthly, while Pro includes 250 credits.'
  },
  {
    question: 'What tech stacks does AI Builder support?',
    answer: 'AI Builder supports modern web technologies including HTML5, CSS3, JavaScript, React, Vue.js, Angular, and various CSS frameworks like Tailwind CSS and Bootstrap. We continuously add support for new technologies.'
  },
  {
    question: 'Who owns the projects and code?',
    answer: 'You own all the code and projects you create with AI Builder. We don\'t claim any ownership rights to your generated websites or content. You can export and use your code anywhere.'
  },
  {
    question: 'How much does it cost to use?',
    answer: 'AI Builder starts free with 30 credits monthly. Pro plans start at $25/month with 250 credits. Enterprise plans are custom-priced based on your specific needs and usage requirements.'
  }
]

export default function PricingPage() {
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
              <Link href="/pricing" className="text-white font-medium">
                Pricing
              </Link>
              <Link href="/enterprise" className="text-gray-300 hover:text-white transition-colors">
                Enterprise
              </Link>
              <Link href="/learn" className="text-gray-300 hover:text-white transition-colors">
                Learn
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Pricing</span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start for free. Upgrade to get the capacity that exactly matches your team's needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-2xl p-8 relative ${
                  plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      POPULAR
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mb-2">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 ml-1">{plan.period}</span>
                  </div>
                  <p className="text-gray-300">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                {plan.limitations && (
                  <p className="text-sm text-gray-400 mb-6">{plan.limitations}</p>
                )}

                <Link
                  href={plan.name === 'Enterprise' ? '/contact' : '/dashboard'}
                  className={`w-full py-3 px-6 rounded-lg font-semibold transition-all flex items-center justify-center ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white'
                      : 'border border-gray-600 hover:border-gray-500 text-white hover:bg-white/10'
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-2xl p-12"
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              50,000+ creators are building with AI Builder
            </h2>
            <div className="flex justify-center items-center space-x-2 mb-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-semibold"
                >
                  {i}
                </div>
              ))}
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
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
