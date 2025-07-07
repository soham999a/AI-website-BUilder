'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Globe, 
  Rocket, 
  Check, 
  ExternalLink, 
  Copy, 
  Loader2, 
  Zap,
  Share2,
  Settings,
  Crown
} from 'lucide-react'

interface HostingPanelProps {
  generatedCode: string
  projectName: string
  onHostingComplete?: (url: string) => void
}

interface DeploymentResult {
  success: boolean
  url: string
  deploymentId: string
  status: string
  isDemo?: boolean
  message?: string
  provider?: string
  gistUrl?: string
}

export default function HostingPanel({ generatedCode, projectName, onHostingComplete }: HostingPanelProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState<DeploymentResult | null>(null)
  const [vercelToken, setVercelToken] = useState('')
  const [showTokenInput, setShowTokenInput] = useState(false)
  const [customProjectName, setCustomProjectName] = useState(projectName || 'my-website')
  const [copied, setCopied] = useState(false)

  const handleDeploy = async (useDemo = false) => {
    if (!generatedCode) {
      alert('No website code to deploy!')
      return
    }

    setIsDeploying(true)
    setDeploymentResult(null)

    try {
      const response = await fetch('/api/deploy-vercel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          html: generatedCode,
          projectName: customProjectName,
          userToken: useDemo ? null : vercelToken
        })
      })

      const result = await response.json()

      if (result.success) {
        setDeploymentResult(result)
        onHostingComplete?.(result.url)
      } else {
        throw new Error(result.error || 'Deployment failed')
      }
    } catch (error) {
      console.error('Deployment error:', error)
      alert(`Deployment failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsDeploying(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  const connectVercel = () => {
    // In a real implementation, this would redirect to Vercel OAuth
    setShowTokenInput(true)
  }

  return (
    <div className="hosting-panel glass rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Rocket className="h-6 w-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Host Your Website</h3>
        </div>
        <p className="text-gray-300 text-sm">
          Deploy your website to Vercel for FREE hosting with global CDN
        </p>
      </div>

      {/* Project Name Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">
          Project Name
        </label>
        <input
          type="text"
          value={customProjectName}
          onChange={(e) => setCustomProjectName(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
          className="w-full px-3 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="my-awesome-website"
        />
        <p className="text-xs text-gray-400">
          Your website will be available at: <span className="text-purple-400">{customProjectName}.vercel.app</span>
        </p>
      </div>

      {/* Deployment Options */}
      {!deploymentResult && (
        <div className="space-y-4">
          {/* Free Hosting Options */}
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold text-white mb-2">🆓 Free Hosting Options</h4>

            {/* Quick Deploy */}
            <motion.button
              onClick={() => handleDeploy(true)}
              disabled={isDeploying}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isDeploying ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Deploying...</span>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5" />
                  <span>🚀 Deploy FREE (No Account Needed)</span>
                </>
              )}
            </motion.button>

            <p className="text-xs text-gray-400 text-center">
              ✨ Instantly deploy to GitHub Gist + HTML Preview<br/>
              🌍 Accessible from anywhere • 📱 Mobile friendly • ⚡ Lightning fast
            </p>
          </div>

          {/* Manual Hosting Options */}
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-3">
            <h4 className="text-sm font-semibold text-white mb-2">🔧 Manual Hosting Options</h4>

            <div className="grid grid-cols-1 gap-2 text-xs">
              <div className="flex items-center justify-between p-2 bg-gray-700/50 rounded">
                <span className="text-gray-300">📁 Download HTML</span>
                <button
                  onClick={() => {
                    const blob = new Blob([generatedCode], { type: 'text/html' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `${customProjectName || 'website'}.html`
                    a.click()
                    URL.revokeObjectURL(url)
                  }}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs"
                >
                  Download
                </button>
              </div>

              <div className="text-gray-400 text-xs space-y-1">
                <p><strong>🌐 Netlify:</strong> Drag & drop HTML file to netlify.app/drop</p>
                <p><strong>⚡ Vercel:</strong> Upload to vercel.com (free tier)</p>
                <p><strong>🐙 GitHub Pages:</strong> Push to GitHub repo with Pages enabled</p>
                <p><strong>🚀 Surge.sh:</strong> Run <code className="bg-gray-600 px-1 rounded">npx surge</code> in terminal</p>
              </div>
            </div>
          </div>

          {/* Vercel Account Option */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900/50 text-gray-400">or</span>
            </div>
          </div>

          {/* Vercel Coming Soon */}
          <div className="bg-gray-800/50 rounded-lg p-4 space-y-3 border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Rocket className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-semibold text-gray-300">Vercel Deployment</span>
              </div>
              <span className="px-2 py-1 bg-yellow-600/20 text-yellow-400 text-xs rounded-full border border-yellow-500/30">
                Coming Soon
              </span>
            </div>

            <p className="text-xs text-gray-400">
              🚧 Direct Vercel deployment requires premium features. For now, use the free hosting option above or manually upload to Vercel.
            </p>

            <div className="text-xs text-gray-500 space-y-1 bg-gray-700/30 p-3 rounded">
              <p className="text-gray-300 font-medium">📋 Manual Vercel Upload:</p>
              <p>1. Click "Download HTML" above</p>
              <p>2. Go to <a href="https://vercel.com" target="_blank" className="text-blue-400 hover:text-blue-300 underline">vercel.com</a></p>
              <p>3. Drag & drop your HTML file</p>
              <p>4. Get instant deployment! 🚀</p>
            </div>
          </div>
        </div>
      )}

      {/* Deployment Success */}
      <AnimatePresence>
        {deploymentResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Check className="h-6 w-6 text-green-400" />
                <h4 className="text-lg font-semibold text-white">
                  🎉 Website Deployed Successfully!
                </h4>
              </div>

              {/* Provider Info */}
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3 mb-3">
                <p className="text-green-400 text-sm font-medium">
                  ✅ Hosted on: {deploymentResult.provider || 'Free Hosting'}
                </p>
                <p className="text-green-300 text-xs mt-1">
                  {deploymentResult.message || 'Your website is now live and accessible from anywhere!'}
                </p>
              </div>

              {deploymentResult.gistUrl && (
                <p className="text-blue-400 text-xs">
                  📝 Source: <a href={deploymentResult.gistUrl} target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-300">View on GitHub</a>
                </p>
              )}
            </div>

            {/* Live URL */}
            <div className="glass rounded-lg p-4 space-y-3">
              <div className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-green-400" />
                <span className="text-sm font-medium text-gray-300">Live Website URL:</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={deploymentResult.url}
                  readOnly
                  className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 text-sm"
                />
                <button
                  onClick={() => copyToClipboard(deploymentResult.url)}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={deploymentResult.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Visit Website</span>
              </a>
              
              <button
                onClick={() => copyToClipboard(deploymentResult.url)}
                className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-white font-medium rounded-lg transition-colors"
              >
                <Share2 className="h-4 w-4" />
                <span>Share Link</span>
              </button>
            </div>

            {/* Deploy Another */}
            <button
              onClick={() => {
                setDeploymentResult(null)
                setShowTokenInput(false)
                setVercelToken('')
              }}
              className="w-full px-4 py-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Deploy Another Website
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
