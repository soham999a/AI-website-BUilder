'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Github, 
  GitBranch, 
  Star, 
  Eye, 
  Clock, 
  User, 
  ExternalLink,
  Copy,
  Check,
  Loader2,
  Plus,
  RefreshCw,
  Settings,
  Zap
} from 'lucide-react'

interface GitHubIntegrationProps {
  projectName: string
  generatedCode: string
}

interface Repository {
  name: string
  fullName: string
  url: string
  stars: number
  forks: number
  language: string
  updatedAt: string
}

interface Commit {
  sha: string
  message: string
  author: string
  date: string
  url: string
}

export default function GitHubIntegration({ projectName, generatedCode }: GitHubIntegrationProps) {
  const [githubToken, setGithubToken] = useState('')
  const [showTokenInput, setShowTokenInput] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isCreatingRepo, setIsCreatingRepo] = useState(false)
  const [repository, setRepository] = useState<Repository | null>(null)
  const [commits, setCommits] = useState<Commit[]>([])
  const [copied, setCopied] = useState(false)

  const handleConnectGitHub = async () => {
    if (!githubToken) {
      setShowTokenInput(true)
      return
    }

    setIsConnecting(true)
    try {
      // Verify GitHub token by fetching user info
      const response = await fetch('https://api.github.com/user', {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      })

      if (response.ok) {
        const user = await response.json()
        alert(`Connected to GitHub as ${user.login}!`)
      } else {
        throw new Error('Invalid GitHub token')
      }
    } catch (error) {
      alert('Failed to connect to GitHub. Please check your token.')
    } finally {
      setIsConnecting(false)
    }
  }

  const handleCreateRepository = async () => {
    if (!githubToken || !generatedCode) return

    setIsCreatingRepo(true)
    try {
      const response = await fetch('/api/github-integration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'create-repo',
          projectName,
          code: generatedCode,
          githubToken
        })
      })

      const result = await response.json()

      if (result.success) {
        // Fetch repository details
        await fetchRepositoryInfo(result.repoName)
        alert('Repository created successfully!')
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      alert(`Failed to create repository: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsCreatingRepo(false)
    }
  }

  const fetchRepositoryInfo = async (repoName: string) => {
    try {
      const response = await fetch(`/api/github-integration?githubToken=${githubToken}&repoName=${repoName}`)
      const result = await response.json()

      if (result.success) {
        setRepository(result.repo)
        setCommits(result.commits)
      }
    } catch (error) {
      console.error('Failed to fetch repository info:', error)
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

  return (
    <div className="github-integration glass rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Github className="h-6 w-6 text-gray-300" />
          <h3 className="text-xl font-bold text-white">GitHub Integration</h3>
        </div>
        <p className="text-gray-300 text-sm">
          Connect to GitHub for version control, CI/CD, and collaboration
        </p>
      </div>

      {/* GitHub Token Input */}
      {!githubToken && (
        <AnimatePresence>
          {showTokenInput ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-3"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300">
                  GitHub Personal Access Token
                </label>
                <input
                  type="password"
                  value={githubToken}
                  onChange={(e) => setGithubToken(e.target.value)}
                  className="w-full px-3 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
                />
                <p className="text-xs text-gray-400">
                  Get your token from{' '}
                  <a 
                    href="https://github.com/settings/tokens" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    github.com/settings/tokens
                  </a>
                  {' '}with repo permissions
                </p>
              </div>
              
              <button
                onClick={handleConnectGitHub}
                disabled={isConnecting || !githubToken}
                className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
              >
                {isConnecting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <Github className="h-5 w-5" />
                    <span>Connect to GitHub</span>
                  </>
                )}
              </button>
            </motion.div>
          ) : (
            <motion.button
              onClick={() => setShowTokenInput(true)}
              className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Github className="h-5 w-5" />
              <span>Connect GitHub Account</span>
            </motion.button>
          )}
        </AnimatePresence>
      )}

      {/* Connected State */}
      {githubToken && !repository && (
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2 text-green-400">
            <Check className="h-5 w-5" />
            <span>Connected to GitHub</span>
          </div>

          <button
            onClick={handleCreateRepository}
            disabled={isCreatingRepo || !generatedCode}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all disabled:opacity-50"
          >
            {isCreatingRepo ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Creating Repository...</span>
              </>
            ) : (
              <>
                <Plus className="h-5 w-5" />
                <span>Create GitHub Repository</span>
              </>
            )}
          </button>

          {!generatedCode && (
            <p className="text-center text-sm text-gray-400">
              Generate a website first to create a repository
            </p>
          )}
        </div>
      )}

      {/* Repository Information */}
      {repository && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {/* Repository Header */}
          <div className="glass rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Github className="h-5 w-5 text-gray-300" />
                <span className="text-white font-medium">{repository.name}</span>
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {repository.language || 'HTML'}
                </span>
              </div>
              <a
                href={repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>{repository.stars}</span>
              </div>
              <div className="flex items-center space-x-1">
                <GitBranch className="h-3 w-3" />
                <span>{repository.forks}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>Updated {new Date(repository.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-3">
              <input
                type="text"
                value={repository.url}
                readOnly
                className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 text-sm"
              />
              <button
                onClick={() => copyToClipboard(repository.url)}
                className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {/* Recent Commits */}
          <div className="glass rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-white font-medium">Recent Commits</h4>
              <button
                onClick={() => fetchRepositoryInfo(repository.fullName)}
                className="text-gray-400 hover:text-white"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-2">
              {commits.map((commit) => (
                <div key={commit.sha} className="flex items-center justify-between p-2 bg-gray-800/50 rounded">
                  <div className="flex-1">
                    <div className="text-white text-sm font-medium truncate">
                      {commit.message}
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <User className="h-3 w-3" />
                      <span>{commit.author}</span>
                      <span>•</span>
                      <span>{commit.sha}</span>
                      <span>•</span>
                      <span>{new Date(commit.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white ml-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
              <Zap className="h-4 w-4" />
              <span>Setup CI/CD</span>
            </button>
            
            <button className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-white font-medium rounded-lg transition-colors">
              <Settings className="h-4 w-4" />
              <span>Configure</span>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
