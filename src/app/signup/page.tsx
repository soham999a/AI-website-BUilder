'use client'

import { motion } from 'framer-motion'
import { Sparkles, Mail, Lock, User, Github, Chrome, ArrowRight, Check } from 'lucide-react'
import Link from 'next/link'

const benefits = [
  'Create unlimited public projects',
  'Access to community templates',
  'AI-powered website generation',
  'Export and download code',
  'Community support'
]

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"></div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left side - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hidden lg:block"
          >
            <div className="text-center lg:text-left">
              <Link href="/" className="inline-flex items-center space-x-2 mb-8">
                <Sparkles className="h-10 w-10 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">AI Builder</span>
              </Link>
              
              <h1 className="text-4xl font-bold text-white mb-4">
                Start building amazing websites with AI
              </h1>
              
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of creators who are already building with AI Builder
              </p>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center">
                    <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right side - Signup Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full max-w-md mx-auto"
          >
            {/* Mobile logo */}
            <div className="text-center mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center space-x-2">
                <Sparkles className="h-10 w-10 text-purple-400" />
                <span className="text-2xl font-bold gradient-text">AI Builder</span>
              </Link>
            </div>

            <div className="glass rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Create your account</h2>
                <p className="text-gray-300">Start building for free</p>
              </div>

              {/* Social Signup */}
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 hover:border-gray-500 rounded-lg text-white font-medium transition-colors">
                  <Github className="h-5 w-5 mr-3" />
                  Continue with GitHub
                </button>
                <button className="w-full flex items-center justify-center px-4 py-3 border border-gray-600 hover:border-gray-500 rounded-lg text-white font-medium transition-colors">
                  <Chrome className="h-5 w-5 mr-3" />
                  Continue with Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900/50 text-gray-400">Or continue with email</span>
                </div>
              </div>

              {/* Email Form */}
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      required
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 focus:border-purple-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 focus:border-purple-500"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      required
                      className="w-full pl-10 pr-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-600 focus:border-purple-500"
                      placeholder="Create a password"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700 mt-1"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-300">
                    I agree to the{' '}
                    <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Create account
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>

              {/* Sign in link */}
              <div className="text-center mt-6">
                <p className="text-gray-300">
                  Already have an account?{' '}
                  <Link
                    href="/login"
                    className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            {/* Back to home */}
            <div className="text-center mt-6">
              <Link
                href="/"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                ← Back to home
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
