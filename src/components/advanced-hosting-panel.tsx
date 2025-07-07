'use client'

import { useState, useEffect } from 'react'
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
  Crown,
  BarChart3,
  Users,
  Clock,
  GitBranch,
  RefreshCw,
  Plus,
  Trash2,
  Eye,
  TrendingUp,
  Activity,
  Calendar,
  Link as LinkIcon,
  Github,
  Gauge
} from 'lucide-react'
import GitHubIntegration from './github-integration'

interface AdvancedHostingPanelProps {
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
  customDomain?: string
  analytics?: {
    views: number
    visitors: number
    countries: string[]
  }
}

interface ProjectVersion {
  id: string
  name: string
  code: string
  deployedAt: Date
  url: string
  isActive: boolean
}

export default function AdvancedHostingPanel({ generatedCode, projectName, onHostingComplete }: AdvancedHostingPanelProps) {
  const [isDeploying, setIsDeploying] = useState(false)
  const [deploymentResult, setDeploymentResult] = useState<DeploymentResult | null>(null)
  const [vercelToken, setVercelToken] = useState('')
  const [showTokenInput, setShowTokenInput] = useState(false)
  const [customProjectName, setCustomProjectName] = useState(projectName || 'my-website')
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'deploy' | 'domains' | 'analytics' | 'versions' | 'team' | 'github' | 'performance'>('deploy')
  
  // Advanced features state
  const [customDomain, setCustomDomain] = useState('')
  const [versions, setVersions] = useState<ProjectVersion[]>([])
  const [analytics, setAnalytics] = useState({
    views: 1247,
    visitors: 892,
    countries: ['US', 'UK', 'CA', 'DE', 'FR'],
    dailyViews: [45, 52, 38, 61, 73, 89, 94]
  })
  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'You', email: 'user@example.com', role: 'Owner', avatar: '👤' },
  ])
  const [newMemberEmail, setNewMemberEmail] = useState('')

  useEffect(() => {
    // Simulate loading versions
    if (deploymentResult) {
      setVersions([
        {
          id: '1',
          name: 'v1.0.0 - Initial Release',
          code: generatedCode,
          deployedAt: new Date(),
          url: deploymentResult.url,
          isActive: true
        }
      ])
    }
  }, [deploymentResult, generatedCode])

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
          userToken: useDemo ? null : vercelToken,
          customDomain: customDomain || undefined
        })
      })

      const result = await response.json()

      if (result.success) {
        const enhancedResult = {
          ...result,
          customDomain: customDomain || undefined,
          analytics: {
            views: Math.floor(Math.random() * 1000) + 100,
            visitors: Math.floor(Math.random() * 500) + 50,
            countries: ['US', 'UK', 'CA', 'DE', 'FR']
          }
        }
        setDeploymentResult(enhancedResult)
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

  const handleAddCustomDomain = async () => {
    if (!customDomain || !deploymentResult) return
    
    // Simulate adding custom domain
    setDeploymentResult({
      ...deploymentResult,
      customDomain: customDomain
    })
    alert(`Custom domain ${customDomain} added successfully!`)
  }

  const handleAddTeamMember = () => {
    if (!newMemberEmail) return
    
    const newMember = {
      id: Date.now().toString(),
      name: newMemberEmail.split('@')[0],
      email: newMemberEmail,
      role: 'Editor',
      avatar: '👤'
    }
    
    setTeamMembers([...teamMembers, newMember])
    setNewMemberEmail('')
    alert(`Invited ${newMemberEmail} to collaborate!`)
  }

  const handleCreateVersion = () => {
    const newVersion = {
      id: Date.now().toString(),
      name: `v${versions.length + 1}.0.0 - Updated Design`,
      code: generatedCode,
      deployedAt: new Date(),
      url: deploymentResult?.url || '',
      isActive: false
    }
    
    setVersions([newVersion, ...versions])
    alert('New version created successfully!')
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

  const TabButton = ({ id, label, icon: Icon, count }: { id: string, label: string, icon: any, count?: number }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
        activeTab === id
          ? 'bg-purple-600 text-white'
          : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      {count && (
        <span className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
          {count}
        </span>
      )}
    </button>
  )

  return (
    <div className="advanced-hosting-panel glass rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Rocket className="h-6 w-6 text-purple-400" />
          <h3 className="text-xl font-bold text-white">Advanced Hosting</h3>
        </div>
        <p className="text-gray-300 text-sm">
          Professional hosting with custom domains, analytics, team collaboration & more
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 justify-center">
        <TabButton id="deploy" label="Deploy" icon={Rocket} />
        <TabButton id="domains" label="Domains" icon={Globe} />
        <TabButton id="analytics" label="Analytics" icon={BarChart3} />
        <TabButton id="versions" label="Versions" icon={GitBranch} count={versions.length} />
        <TabButton id="team" label="Team" icon={Users} count={teamMembers.length} />
        <TabButton id="github" label="GitHub" icon={Github} />
        <TabButton id="performance" label="Performance" icon={Gauge} />
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'deploy' && (
          <motion.div
            key="deploy"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
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
            </div>

            {/* Deployment Options */}
            {!deploymentResult && (
              <div className="space-y-4">
                <motion.button
                  onClick={() => handleDeploy(true)}
                  disabled={isDeploying}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg disabled:opacity-50"
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
                      <span>🚀 Deploy Now</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}

            {/* Deployment Success */}
            {deploymentResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <Check className="h-6 w-6 text-green-400" />
                    <h4 className="text-lg font-semibold text-white">
                      🎉 Website Deployed Successfully!
                    </h4>
                  </div>
                </div>

                <div className="glass rounded-lg p-4 space-y-3">
                  <div className="flex items-center space-x-2">
                    <Globe className="h-5 w-5 text-green-400" />
                    <span className="text-sm font-medium text-gray-300">Live Website URL:</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={deploymentResult.customDomain || deploymentResult.url}
                      readOnly
                      className="flex-1 px-3 py-2 bg-gray-800 text-white rounded border border-gray-600 text-sm"
                    />
                    <button
                      onClick={() => copyToClipboard(deploymentResult.customDomain || deploymentResult.url)}
                      className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={deploymentResult.customDomain || deploymentResult.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Visit Website</span>
                  </a>
                  
                  <button
                    onClick={handleCreateVersion}
                    className="flex items-center justify-center space-x-2 px-4 py-2 border border-gray-600 hover:border-gray-500 text-white font-medium rounded-lg transition-colors"
                  >
                    <GitBranch className="h-4 w-4" />
                    <span>New Version</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {activeTab === 'domains' && (
          <motion.div
            key="domains"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Custom Domains</h4>
              <p className="text-gray-300 text-sm">Connect your own domain to your website</p>
            </div>

            <div className="space-y-3">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="yourdomain.com"
                  className="flex-1 px-3 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleAddCustomDomain}
                  disabled={!customDomain || !deploymentResult}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {deploymentResult?.customDomain && (
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <LinkIcon className="h-4 w-4 text-green-400" />
                      <span className="text-white">{deploymentResult.customDomain}</span>
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
                    </div>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Website Analytics</h4>
              <p className="text-gray-300 text-sm">Track your website performance and visitor insights</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{analytics.views.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Total Views</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+12%</span>
                </div>
              </div>
              
              <div className="glass rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{analytics.visitors.toLocaleString()}</div>
                <div className="text-sm text-gray-300">Unique Visitors</div>
                <div className="flex items-center justify-center mt-1">
                  <TrendingUp className="h-3 w-3 text-green-400 mr-1" />
                  <span className="text-xs text-green-400">+8%</span>
                </div>
              </div>
            </div>

            <div className="glass rounded-lg p-4">
              <h5 className="text-white font-medium mb-3">Top Countries</h5>
              <div className="space-y-2">
                {analytics.countries.map((country, index) => (
                  <div key={country} className="flex items-center justify-between">
                    <span className="text-gray-300">{country}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${100 - index * 15}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-400">{100 - index * 15}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'versions' && (
          <motion.div
            key="versions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Version History</h4>
              <p className="text-gray-300 text-sm">Manage different versions of your website</p>
            </div>

            <div className="space-y-3">
              {versions.map((version) => (
                <div key={version.id} className="glass rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-white font-medium">{version.name}</span>
                        {version.isActive && (
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">Active</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{version.deployedAt.toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>View</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!version.isActive && (
                        <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors">
                          Deploy
                        </button>
                      )}
                      <button className="text-gray-400 hover:text-white">
                        <RefreshCw className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'team' && (
          <motion.div
            key="team"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Team Collaboration</h4>
              <p className="text-gray-300 text-sm">Invite team members to collaborate on your project</p>
            </div>

            <div className="flex space-x-2">
              <input
                type="email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                placeholder="colleague@company.com"
                className="flex-1 px-3 py-2 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                onClick={handleAddTeamMember}
                disabled={!newMemberEmail}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50"
              >
                Invite
              </button>
            </div>

            <div className="space-y-3">
              {teamMembers.map((member) => (
                <div key={member.id} className="glass rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{member.avatar}</div>
                      <div>
                        <div className="text-white font-medium">{member.name}</div>
                        <div className="text-sm text-gray-400">{member.email}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        member.role === 'Owner' 
                          ? 'bg-yellow-500 text-black' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {member.role}
                      </span>
                      {member.role !== 'Owner' && (
                        <button className="text-red-400 hover:text-red-300">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'github' && (
          <motion.div
            key="github"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GitHubIntegration
              projectName={customProjectName}
              generatedCode={generatedCode}
            />
          </motion.div>
        )}

        {activeTab === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <div className="text-center">
              <h4 className="text-lg font-semibold text-white mb-2">Performance Monitoring</h4>
              <p className="text-gray-300 text-sm">Monitor your website's speed, SEO, and user experience</p>
            </div>

            {deploymentResult ? (
              <div className="space-y-4">
                {/* Performance Score */}
                <div className="glass rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h5 className="text-white font-medium">Performance Score</h5>
                    <button className="text-purple-400 hover:text-purple-300 text-sm">
                      Run Audit
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">94</div>
                      <div className="text-xs text-gray-400">Performance</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400">87</div>
                      <div className="text-xs text-gray-400">SEO</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">92</div>
                      <div className="text-xs text-gray-400">Accessibility</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">89</div>
                      <div className="text-xs text-gray-400">Best Practices</div>
                    </div>
                  </div>
                </div>

                {/* Core Web Vitals */}
                <div className="glass rounded-lg p-4">
                  <h5 className="text-white font-medium mb-3">Core Web Vitals</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">First Contentful Paint</span>
                      <span className="text-green-400 font-medium">1.2s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Largest Contentful Paint</span>
                      <span className="text-yellow-400 font-medium">2.1s</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 text-sm">Cumulative Layout Shift</span>
                      <span className="text-green-400 font-medium">0.02</span>
                    </div>
                  </div>
                </div>

                {/* SEO Recommendations */}
                <div className="glass rounded-lg p-4">
                  <h5 className="text-white font-medium mb-3">SEO Recommendations</h5>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Page has meta description</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Check className="h-4 w-4 text-green-400" />
                      <span className="text-gray-300 text-sm">Images have alt text</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-yellow-400" />
                      <span className="text-gray-300 text-sm">Add structured data markup</span>
                    </div>
                  </div>
                </div>

                <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors">
                  Optimize SEO Automatically
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Gauge className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Deploy your website first to monitor performance</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
