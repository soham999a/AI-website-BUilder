'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Code,
  Eye,
  Download,
  Save,
  Wand2,
  Loader2,
  Plus,
  FolderOpen,
  Layout,
  Palette,
  Brain,
  Settings,
  Zap,
  Target,
  Users,
  Briefcase,
  Volume2,
  ChevronDown,
  BarChart3,
  Globe,
  Monitor,
  Tablet,
  Smartphone,
  Rocket
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { TemplateSelector } from '@/components/template-selector'
import { Template, generateTemplateHTML } from '@/lib/templates'
import { CodeEditor } from '@/components/code-editor'
import { ResponsivePreview } from '@/components/responsive-preview'
import AdvancedHostingPanel from '@/components/advanced-hosting-panel'
import toast from 'react-hot-toast'

interface GenerationContext {
  industry?: string
  targetAudience?: string
  businessType?: string
  tone?: string
  colorScheme?: string
  complexity?: 'simple' | 'moderate' | 'advanced'
  layout?: string
  features?: string[]
}

export default function BeautifulDashboard() {
  const [projectName, setProjectName] = useState('')
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'hosting'>('editor')
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [generationMethod, setGenerationMethod] = useState<'ai' | 'template'>('ai')
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false)
  const [context, setContext] = useState<GenerationContext>({
    industry: '',
    targetAudience: '',
    businessType: '',
    tone: 'professional',
    colorScheme: 'modern',
    complexity: 'moderate',
    layout: 'modern',
    features: []
  })

  const handleGenerate = async () => {
    if (!prompt.trim() && generationMethod === 'ai') {
      toast.error('Please describe your website')
      return
    }

    if (generationMethod === 'template' && !selectedTemplate) {
      toast.error('Please select a template')
      return
    }

    setIsGenerating(true)
    
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          projectName,
          generationMethod,
          template: selectedTemplate,
          context
        })
      })

      const data = await response.json()

      if (data.code) {
        setGeneratedCode(data.code)
        toast.success(`Website generated successfully with ${data.provider}!`)
      } else {
        toast.error(data.error || data.warning || 'Generation failed')
      }
    } catch (error) {
      toast.error('Failed to generate website')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setShowTemplateSelector(false)
    setGenerationMethod('template')
  }

  const handleSave = () => {
    toast.success('Project saved successfully!')
  }

  const handleExport = () => {
    if (!generatedCode) {
      toast.error('No code to export')
      return
    }

    const blob = new Blob([generatedCode], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${projectName || 'website'}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Website exported successfully!')
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="glass border-b border-white/10 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Sparkles className="h-8 w-8 text-purple-400" />
            <h1 className="text-2xl font-bold gradient-text">AI Website Builder Pro</h1>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <FolderOpen className="h-4 w-4 mr-2" />
              Projects
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplateSelector(true)}
              className="text-gray-300 hover:text-white"
            >
              <Layout className="h-4 w-4 mr-2" />
              Templates
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        </div>
      </header>

      {/* Template Selector Modal */}
      <AnimatePresence>
        {showTemplateSelector && (
          <TemplateSelector
            onSelectTemplate={handleTemplateSelect}
            onClose={() => setShowTemplateSelector(false)}
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="grid lg:grid-cols-2 gap-6 h-full">
          {/* Left Panel - Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Project Info */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <Wand2 className="h-5 w-5 mr-2 text-purple-400" />
                Describe Your Website
              </h2>

              <div className="space-y-4">
                <Input
                  placeholder="Project name (e.g., My Portfolio)"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />

                {/* Generation Method Toggle */}
                <div className="flex gap-2 p-1 bg-white/10 rounded-lg">
                  <button
                    onClick={() => setGenerationMethod('ai')}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      generationMethod === 'ai'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="h-4 w-4 inline mr-2" />
                    AI Generation
                  </button>
                  <button
                    onClick={() => setGenerationMethod('template')}
                    className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      generationMethod === 'template'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    <Layout className="h-4 w-4 inline mr-2" />
                    Template
                  </button>
                </div>

                {/* Template Selection */}
                {generationMethod === 'template' && (
                  <div className="space-y-3">
                    {selectedTemplate ? (
                      <div className="p-3 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-purple-300">{selectedTemplate.name}</div>
                            <div className="text-sm text-gray-400">{selectedTemplate.description}</div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowTemplateSelector(true)}
                            className="text-purple-300 hover:text-white"
                          >
                            <Palette className="h-4 w-4 mr-1" />
                            Change
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={() => setShowTemplateSelector(true)}
                        className="w-full border-dashed border-gray-600 hover:border-purple-500 text-gray-300 hover:text-white"
                      >
                        <Layout className="h-4 w-4 mr-2" />
                        Choose Template
                      </Button>
                    )}
                  </div>
                )}

                <Textarea
                  placeholder={
                    generationMethod === 'template'
                      ? "Customize your template... (e.g., Change colors to blue, add a contact form, include testimonials section)"
                      : "Describe the website you want to create... (e.g., A modern portfolio website for a graphic designer with a dark theme, showcase section for projects, and contact form)"
                  }
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={generationMethod === 'template' ? 4 : 6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 resize-none"
                />

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || (generationMethod === 'template' && !selectedTemplate)}
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      {generationMethod === 'ai' ? (
                        <Sparkles className="h-4 w-4 mr-2" />
                      ) : (
                        <Layout className="h-4 w-4 mr-2" />
                      )}
                      {generationMethod === 'ai' ? 'Generate with AI' : 'Generate from Template'}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {/* Advanced AI Settings */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center">
                  <Brain className="h-5 w-5 mr-2 text-purple-400" />
                  AI Context Settings
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                  className="text-gray-400 hover:text-white"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {showAdvancedSettings ? 'Hide' : 'Show'} Advanced
                  <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${showAdvancedSettings ? 'rotate-180' : ''}`} />
                </Button>
              </div>

              <AnimatePresence>
                {showAdvancedSettings && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    {/* Industry Selection */}
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Industry</label>
                      <select
                        value={context.industry}
                        onChange={(e) => setContext({...context, industry: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="">Select Industry</option>
                        <option value="restaurant">🍽️ Restaurant & Food</option>
                        <option value="technology">💻 Technology & Software</option>
                        <option value="healthcare">🏥 Healthcare & Medical</option>
                        <option value="creative">🎨 Creative & Design</option>
                        <option value="business">💼 Business & Consulting</option>
                        <option value="ecommerce">🛍️ E-commerce & Retail</option>
                        <option value="education">📚 Education & Training</option>
                        <option value="finance">💰 Finance & Banking</option>
                      </select>
                    </div>

                    {/* Target Audience */}
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Target Audience</label>
                      <select
                        value={context.targetAudience}
                        onChange={(e) => setContext({...context, targetAudience: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="">Select Audience</option>
                        <option value="young">🎯 Young Adults (18-30)</option>
                        <option value="professional">👔 Business Professionals</option>
                        <option value="family">👨‍👩‍👧‍👦 Families & Parents</option>
                        <option value="seniors">👴 Seniors (50+)</option>
                        <option value="luxury">💎 Luxury Market</option>
                        <option value="budget">💰 Budget-Conscious</option>
                      </select>
                    </div>

                    {/* Business Type */}
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Business Type</label>
                      <select
                        value={context.businessType}
                        onChange={(e) => setContext({...context, businessType: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="">Select Type</option>
                        <option value="startup">🚀 Startup</option>
                        <option value="enterprise">🏢 Enterprise</option>
                        <option value="small-business">🏪 Small Business</option>
                        <option value="freelancer">👤 Freelancer</option>
                        <option value="agency">🎯 Agency</option>
                        <option value="nonprofit">❤️ Non-Profit</option>
                      </select>
                    </div>

                    {/* Tone */}
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Tone & Style</label>
                      <select
                        value={context.tone}
                        onChange={(e) => setContext({...context, tone: e.target.value})}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white"
                      >
                        <option value="professional">💼 Professional</option>
                        <option value="friendly">😊 Friendly</option>
                        <option value="modern">✨ Modern</option>
                        <option value="elegant">👑 Elegant</option>
                        <option value="playful">🎉 Playful</option>
                        <option value="minimalist">⚪ Minimalist</option>
                      </select>
                    </div>

                    {/* Color Scheme */}
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Color Scheme</label>
                      <div className="grid grid-cols-3 gap-2">
                        {['modern', 'warm', 'cool', 'dark', 'light', 'vibrant'].map((scheme) => (
                          <button
                            key={scheme}
                            onClick={() => setContext({...context, colorScheme: scheme})}
                            className={`p-2 rounded-lg text-sm font-medium transition-colors ${
                              context.colorScheme === scheme
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Complexity */}
                    <div>
                      <label className="text-sm font-medium text-gray-300 mb-2 block">Complexity Level</label>
                      <div className="flex gap-2">
                        {['simple', 'moderate', 'advanced'].map((level) => (
                          <button
                            key={level}
                            onClick={() => setContext({...context, complexity: level as any})}
                            className={`flex-1 p-2 rounded-lg text-sm font-medium transition-colors ${
                              context.complexity === level
                                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                : 'bg-white/10 text-gray-300 hover:bg-white/20'
                            }`}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Actions */}
            {generatedCode && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                  <Rocket className="h-5 w-5 mr-2 text-purple-400" />
                  Actions
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Button
                    onClick={handleSave}
                    variant="ghost"
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Project
                  </Button>
                  <Button
                    onClick={handleExport}
                    variant="ghost"
                    size="sm"
                    className="bg-white/10 hover:bg-white/20 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export HTML
                  </Button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Panel - Code/Preview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-xl overflow-hidden"
          >
            {/* Tabs */}
            <div className="flex items-center justify-between border-b border-white/10">
              <div className="flex">
                <button
                  onClick={() => setActiveTab('editor')}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'editor'
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Code className="h-4 w-4 inline mr-2" />
                  Code Editor
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === 'preview'
                      ? 'text-purple-400 border-b-2 border-purple-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Eye className="h-4 w-4 inline mr-2" />
                  Live Preview
                </button>
              </div>

              {/* Hosting Button - Always Visible */}
              <div className="relative mr-4">
                <button
                  onClick={() => setActiveTab('hosting')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all whitespace-nowrap border ${
                    activeTab === 'hosting'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg border-purple-400 scale-105'
                      : generatedCode
                      ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-md border-green-400 hover:scale-105 animate-pulse'
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed border-gray-600'
                  }`}
                  disabled={!generatedCode}
                  title={generatedCode ? 'Deploy your website with one click!' : 'Generate a website first to enable hosting'}
                >
                  <Rocket className={`w-4 h-4 ${generatedCode ? 'animate-bounce' : ''}`} />
                  🚀 Host Live
                  {generatedCode && (
                    <span className="bg-white/20 text-xs px-2 py-1 rounded-full">
                      Ready!
                    </span>
                  )}
                </button>

                {/* Notification Badge */}
                {generatedCode && activeTab !== 'hosting' && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                    <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="h-[600px]">
              {activeTab === 'editor' ? (
                <CodeEditor
                  value={generatedCode || '<!-- Your generated code will appear here... -->'}
                  onChange={setGeneratedCode}
                  language="html"
                  height="600px"
                  className="h-full"
                />
              ) : activeTab === 'preview' ? (
                <div className="h-full">
                  {generatedCode ? (
                    <ResponsivePreview
                      code={generatedCode}
                      className="h-full"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Generate a website to see the preview</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full">
                  {generatedCode ? (
                    <div className="h-full p-6 bg-gray-900/50 backdrop-blur-sm overflow-auto">
                      <AdvancedHostingPanel
                        generatedCode={generatedCode}
                        projectName={projectName || 'my-website'}
                        onHostingComplete={(url) => {
                          toast.success(`🎉 Website deployed successfully! Live at: ${url}`)
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Rocket className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Generate a website first to enable hosting</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
