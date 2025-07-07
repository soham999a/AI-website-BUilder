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
  Cpu,
  Database,
  Shield,
  Gauge,
  Briefcase,
  Building,
  Users2,
  Crown,
  Smile,
  Megaphone,
  Paintbrush,
  Zap,
  Target,
  TrendingUp,
  Award,
  CheckCircle,
  Settings,
  Lightbulb,
  Rocket,
  Copy,
  Monitor,
  Tablet,
  Smartphone,
  ChevronDown,
  BarChart3,
  Globe,
  Volume2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { TemplateSelector } from '@/components/template-selector'
import { Template } from '@/lib/templates'
import { generateTemplateHTML } from '@/lib/templates/generators'
import AdvancedHostingPanel from '@/components/advanced-hosting-panel'
import { CodeEditor } from '@/components/code-editor'
import { ResponsivePreview } from '@/components/responsive-preview'
import toast from 'react-hot-toast'

interface GenerationContext {
  industry?: string
  targetAudience?: string
  businessType?: string
  tone?: string
  colorScheme?: string
  complexity?: 'simple' | 'moderate' | 'advanced'
}

export default function AdvancedDashboard() {
  const [prompt, setPrompt] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [projectName, setProjectName] = useState('')
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'hosting'>('editor')
  const [showTemplateSelector, setShowTemplateSelector] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [generationMethod, setGenerationMethod] = useState<'ai' | 'template'>('ai')
  const [context, setContext] = useState<GenerationContext>({})
  const [aiProvider, setAiProvider] = useState('')
  const [generationMetadata, setGenerationMetadata] = useState<any>(null)

  const industries = [
    { value: 'restaurant', label: 'Restaurant & Food', icon: '🍽️' },
    { value: 'technology', label: 'Technology & Software', icon: '💻' },
    { value: 'healthcare', label: 'Healthcare & Medical', icon: '🏥' },
    { value: 'creative', label: 'Creative & Design', icon: '🎨' },
    { value: 'business', label: 'Business & Consulting', icon: '💼' },
    { value: 'ecommerce', label: 'E-commerce & Retail', icon: '🛍️' },
    { value: 'education', label: 'Education & Training', icon: '📚' },
    { value: 'finance', label: 'Finance & Banking', icon: '💰' },
    { value: 'realestate', label: 'Real Estate', icon: '🏠' },
    { value: 'fitness', label: 'Fitness & Wellness', icon: '💪' }
  ]

  const audiences = [
    { value: 'young', label: 'Young Adults (18-30)', icon: '🎯' },
    { value: 'professional', label: 'Business Professionals', icon: '👔' },
    { value: 'family', label: 'Families & Parents', icon: '👨‍👩‍👧‍👦' },
    { value: 'luxury', label: 'Luxury Market', icon: '👑' },
    { value: 'senior', label: 'Senior Citizens', icon: '👴' }
  ]

  const businessTypes = [
    { value: 'startup', label: 'Startup', icon: '🚀' },
    { value: 'enterprise', label: 'Enterprise', icon: '🏢' },
    { value: 'small', label: 'Small Business', icon: '🏪' },
    { value: 'personal', label: 'Personal/Freelance', icon: '👤' }
  ]

  const tones = [
    { value: 'friendly', label: 'Friendly & Approachable', icon: '😊' },
    { value: 'professional', label: 'Professional & Formal', icon: '💼' },
    { value: 'creative', label: 'Creative & Artistic', icon: '🎨' },
    { value: 'trustworthy', label: 'Trustworthy & Secure', icon: '🛡️' },
    { value: 'modern', label: 'Modern & Innovative', icon: '⚡' }
  ]

  const colorSchemes = [
    { value: 'warm', label: 'Warm & Inviting', color: '#F97316' },
    { value: 'tech', label: 'Tech Blue', color: '#3B82F6' },
    { value: 'medical', label: 'Medical Green', color: '#10B981' },
    { value: 'artistic', label: 'Creative Purple', color: '#8B5CF6' },
    { value: 'professional', label: 'Professional Gray', color: '#1F2937' },
    { value: 'retail', label: 'Retail Pink', color: '#EC4899' },
    { value: 'modern', label: 'Modern Indigo', color: '#6366F1' }
  ]

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a description for your website')
      return
    }

    setIsGenerating(true)

    try {
      if (generationMethod === 'template' && selectedTemplate) {
        // Generate from template
        const code = generateTemplateHTML(selectedTemplate as any, prompt.trim(), projectName.trim())
        setGeneratedCode(code)
        setAiProvider('Template System')
        setGenerationMetadata({ templateUsed: selectedTemplate.name })
        toast.success('Website generated from template!')
      } else {
        // AI Generation with advanced context
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: prompt.trim(),
            projectName: projectName.trim(),
            ...context
          }),
        })

        if (!response.ok) {
          throw new Error('Failed to generate website')
        }

        const data = await response.json()
        setGeneratedCode(data.code)
        setAiProvider(data.provider)
        setGenerationMetadata(data.metadata)
        
        if (data.warning) {
          toast.success(data.message || 'Website generated successfully!', { duration: 4000 })
        } else {
          toast.success(`Website generated with ${data.provider}!`)
        }
      }
      setActiveTab('preview')
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate website. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleTemplateSelect = (template: Template) => {
    setSelectedTemplate(template)
    setShowTemplateSelector(false)
    setGenerationMethod('template')
    toast.success(`Template "${template.name}" selected!`)
  }

  const handleDownload = () => {
    if (!generatedCode) {
      toast.error('No code to download')
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
    toast.success('Website downloaded!')
  }

  const handleCopy = async () => {
    if (!generatedCode) {
      toast.error('No code to copy')
      return
    }

    try {
      await navigator.clipboard.writeText(generatedCode)
      toast.success('Code copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy code')
    }
  }

  const handleReset = () => {
    setGeneratedCode('')
    setPrompt('')
    setProjectName('')
    setSelectedTemplate(null)
    setContext({})
    setAiProvider('')
    setGenerationMetadata(null)
    setActiveTab('editor')
    toast.success('Dashboard reset!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Website Builder Pro
                </h1>
                <p className="text-sm text-gray-600">Advanced AI-powered website generation</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {aiProvider && (
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  <Cpu className="w-3 h-3 mr-1" />
                  {aiProvider}
                </Badge>
              )}
              <Button variant="outline" size="sm" onClick={handleReset}>
                <Settings className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Input & Configuration */}
          <div className="lg:col-span-1 space-y-6">
            {/* Project Info */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5 text-blue-600" />
                  Project Details
                </CardTitle>
                <CardDescription>
                  Configure your website project settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Project Name</label>
                  <Input
                    placeholder="My Awesome Website"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="border-gray-200"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Website Description</label>
                  <Textarea
                    placeholder="Describe your website in detail. Be specific about your business, target audience, features you want, and the overall style you're looking for..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={4}
                    className="border-gray-200 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* AI Context Configuration */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  AI Context Settings
                </CardTitle>
                <CardDescription>
                  Advanced settings for better AI generation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Industry</label>
                  <Select value={context.industry} onValueChange={(value) => setContext({...context, industry: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.value} value={industry.value}>
                          <span className="flex items-center gap-2">
                            <span>{industry.icon}</span>
                            {industry.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Target Audience</label>
                  <Select value={context.targetAudience} onValueChange={(value) => setContext({...context, targetAudience: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Who is your target audience?" />
                    </SelectTrigger>
                    <SelectContent>
                      {audiences.map((audience) => (
                        <SelectItem key={audience.value} value={audience.value}>
                          <span className="flex items-center gap-2">
                            <span>{audience.icon}</span>
                            {audience.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Business Type</label>
                  <Select value={context.businessType} onValueChange={(value) => setContext({...context, businessType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="What type of business?" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <span className="flex items-center gap-2">
                            <span>{type.icon}</span>
                            {type.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Tone & Style</label>
                  <Select value={context.tone} onValueChange={(value) => setContext({...context, tone: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="What tone should it have?" />
                    </SelectTrigger>
                    <SelectContent>
                      {tones.map((tone) => (
                        <SelectItem key={tone.value} value={tone.value}>
                          <span className="flex items-center gap-2">
                            <span>{tone.icon}</span>
                            {tone.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Color Scheme</label>
                  <Select value={context.colorScheme} onValueChange={(value) => setContext({...context, colorScheme: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a color scheme" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorSchemes.map((scheme) => (
                        <SelectItem key={scheme.value} value={scheme.value}>
                          <span className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: scheme.color }}></div>
                            {scheme.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Complexity Level</label>
                  <Select value={context.complexity} onValueChange={(value) => setContext({...context, complexity: value as any})}>
                    <SelectTrigger>
                      <SelectValue placeholder="How complex should it be?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simple">
                        <span className="flex items-center gap-2">
                          <Gauge className="w-4 h-4" />
                          Simple - Basic layout
                        </span>
                      </SelectItem>
                      <SelectItem value="moderate">
                        <span className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4" />
                          Moderate - Standard features
                        </span>
                      </SelectItem>
                      <SelectItem value="advanced">
                        <span className="flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Advanced - Rich features
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Generation Method */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="w-5 h-5 text-indigo-600" />
                  Generation Method
                </CardTitle>
                <CardDescription>
                  Choose how to create your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant={generationMethod === 'ai' ? 'default' : 'outline'}
                    onClick={() => setGenerationMethod('ai')}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Brain className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium">AI Generation</div>
                      <div className="text-xs opacity-70">Smart AI analysis</div>
                    </div>
                  </Button>

                  <Button
                    variant={generationMethod === 'template' ? 'default' : 'outline'}
                    onClick={() => {
                      setGenerationMethod('template')
                      setShowTemplateSelector(true)
                    }}
                    className="h-auto p-4 flex flex-col items-center gap-2"
                  >
                    <Layout className="w-6 h-6" />
                    <div className="text-center">
                      <div className="font-medium">Template</div>
                      <div className="text-xs opacity-70">Pre-built designs</div>
                    </div>
                  </Button>
                </div>

                {selectedTemplate && (
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                      <span className="font-medium text-blue-900">Template Selected</span>
                    </div>
                    <p className="text-sm text-blue-700">{selectedTemplate.name}</p>
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Website
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generation Info */}
            {generationMetadata && (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-green-600" />
                    Generation Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Provider:</span>
                    <Badge variant="secondary">{aiProvider}</Badge>
                  </div>

                  {generationMetadata.context && (
                    <>
                      {generationMetadata.context.industry && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Industry:</span>
                          <span className="font-medium">{generationMetadata.context.industry}</span>
                        </div>
                      )}

                      {generationMetadata.context.targetAudience && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Audience:</span>
                          <span className="font-medium">{generationMetadata.context.targetAudience}</span>
                        </div>
                      )}

                      {generationMetadata.context.complexity && (
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Complexity:</span>
                          <span className="font-medium">{generationMetadata.context.complexity}</span>
                        </div>
                      )}
                    </>
                  )}

                  {generationMetadata.isAdvancedDemo && (
                    <div className="p-2 bg-yellow-50 rounded border border-yellow-200">
                      <p className="text-xs text-yellow-800">
                        <Lightbulb className="w-3 h-3 inline mr-1" />
                        Using advanced demo with AI analysis
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Panel - Editor & Preview */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm h-[calc(100vh-200px)]">
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="w-5 h-5 text-indigo-600" />
                    Website Builder
                  </CardTitle>

                  <div className="flex items-center justify-between gap-4 w-full">
                    {/* Main Tabs */}
                    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
                      <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="editor" className="flex items-center gap-2">
                          <Code className="w-4 h-4" />
                          Code Editor
                        </TabsTrigger>
                        <TabsTrigger value="preview" className="flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Live Preview
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>

                    {/* Hosting Button - Always Visible */}
                    <div className="relative">
                      <button
                        onClick={() => setActiveTab('hosting')}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap border-2 ${
                          activeTab === 'hosting'
                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl border-purple-400 scale-105'
                            : generatedCode
                            ? 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg border-green-400 hover:scale-105 animate-pulse'
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed border-gray-300'
                        }`}
                        disabled={!generatedCode}
                        title={generatedCode ? 'Deploy your website with one click!' : 'Generate a website first to enable hosting'}
                      >
                        <Rocket className={`w-5 h-5 ${generatedCode ? 'animate-bounce' : ''}`} />
                        <span className="text-lg">🚀</span>
                        <span className="font-bold">Host Live</span>
                        {generatedCode && (
                          <span className="bg-white/30 text-xs px-2 py-1 rounded-full font-medium">
                            Ready!
                          </span>
                        )}
                      </button>

                      {/* Notification Badge */}
                      {generatedCode && activeTab !== 'hosting' && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-ping">
                          <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                        </div>
                      )}
                    </div>

                    {generatedCode && (
                      <div className="flex items-center gap-1 ml-4">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCopy}
                          className="h-8"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownload}
                          className="h-8"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-0 h-full">
                <Tabs value={activeTab} className="h-full">
                  <TabsContent value="editor" className="h-full m-0">
                    {generatedCode ? (
                      <CodeEditor
                        value={generatedCode}
                        onChange={setGeneratedCode}
                        className="h-full"
                      />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gray-50">
                        <div className="text-center max-w-md mx-auto p-8">
                          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Code className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Ready to Create Something Amazing?
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Configure your project settings and generate your website with our advanced AI system.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Brain className="w-4 h-4 text-blue-500" />
                              AI-Powered
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Zap className="w-4 h-4 text-yellow-500" />
                              Lightning Fast
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Shield className="w-4 h-4 text-green-500" />
                              Production Ready
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Palette className="w-4 h-4 text-purple-500" />
                              Beautiful Design
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="preview" className="h-full m-0">
                    {generatedCode ? (
                      <ResponsivePreview code={generatedCode} />
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gray-50">
                        <div className="text-center max-w-md mx-auto p-8">
                          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Eye className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Preview Your Website
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Your generated website will appear here with responsive preview options.
                          </p>
                          <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Monitor className="w-4 h-4" />
                              Desktop
                            </div>
                            <div className="flex items-center gap-1">
                              <Tablet className="w-4 h-4" />
                              Tablet
                            </div>
                            <div className="flex items-center gap-1">
                              <Smartphone className="w-4 h-4" />
                              Mobile
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="hosting" className="h-full m-0">
                    {generatedCode ? (
                      <div className="h-full p-6 bg-gray-50 overflow-auto">
                        <AdvancedHostingPanel
                          generatedCode={generatedCode}
                          projectName={projectName || 'my-website'}
                          onHostingComplete={(url) => {
                            toast.success(`🎉 Website deployed successfully! Live at: ${url}`)
                          }}
                        />
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center bg-gray-50">
                        <div className="text-center max-w-md mx-auto p-8">
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Rocket className="w-8 h-8 text-white" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            Ready to Go Live?
                          </h3>
                          <p className="text-gray-600 mb-6">
                            Generate your website first, then deploy it to Vercel for FREE hosting with global CDN.
                          </p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-500">
                              <Globe className="w-4 h-4 text-green-500" />
                              Global CDN
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Shield className="w-4 h-4 text-blue-500" />
                              SSL Secure
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <Zap className="w-4 h-4 text-yellow-500" />
                              Lightning Fast
                            </div>
                            <div className="flex items-center gap-2 text-gray-500">
                              <CheckCircle className="w-4 h-4 text-purple-500" />
                              FREE Forever
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Template Selector Modal */}
      <AnimatePresence>
        {showTemplateSelector && (
          <TemplateSelector
            onSelectTemplate={handleTemplateSelect}
            onClose={() => setShowTemplateSelector(false)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
