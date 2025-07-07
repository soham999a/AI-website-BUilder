'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Star, Eye, Zap } from 'lucide-react'
import { templates, Template, TemplateCategory } from '@/lib/templates'

// Temporary inline definition until export issue is resolved
const templateCategories: TemplateCategory[] = [
  {
    id: 'portfolio',
    name: 'Portfolio',
    icon: '🎨',
    description: 'Showcase your work and skills'
  },
  {
    id: 'business',
    name: 'Business',
    icon: '💼',
    description: 'Professional business websites'
  },
  {
    id: 'restaurant',
    name: 'Restaurant',
    icon: '🍽️',
    description: 'Food and dining experiences'
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    description: 'Tech companies and startups'
  },
  {
    id: 'creative',
    name: 'Creative',
    icon: '🎭',
    description: 'Creative agencies and studios'
  },
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: '🏥',
    description: 'Medical and healthcare services'
  }
]
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface TemplateSelectorProps {
  onSelectTemplate: (template: Template) => void
  onClose: () => void
}

export function TemplateSelector({ onSelectTemplate, onClose }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [filteredTemplates, setFilteredTemplates] = useState(templates)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    filterTemplates(query, selectedCategory)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    filterTemplates(searchQuery, category)
  }

  const filterTemplates = (query: string, category: string) => {
    let filtered = templates

    if (category !== 'all') {
      filtered = filtered.filter(template => template.category === category)
    }

    if (query) {
      const lowercaseQuery = query.toLowerCase()
      filtered = filtered.filter(template =>
        template.name.toLowerCase().includes(lowercaseQuery) ||
        template.description.toLowerCase().includes(lowercaseQuery) ||
        (template.tags && template.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)))
      )
    }

    setFilteredTemplates(filtered)
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-500'
      case 'intermediate': return 'text-yellow-500'
      case 'advanced': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return '🟢'
      case 'intermediate': return '🟡'
      case 'advanced': return '🔴'
      default: return '⚪'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gray-900 rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-white">Choose a Template</h2>
            <Button variant="ghost" onClick={onClose} className="text-gray-400 hover:text-white">
              ✕
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleCategoryChange('all')}
                className="whitespace-nowrap"
              >
                All
              </Button>
              {templateCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => handleCategoryChange(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.icon} {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No templates found</div>
              <div className="text-gray-500">Try adjusting your search or filters</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((template) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -5 }}
                  className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group"
                  onClick={() => onSelectTemplate(template)}
                >
                  {/* Template Preview */}
                  <div className="h-48 bg-gradient-to-br from-purple-600 to-pink-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-6xl opacity-80">
                        {templateCategories.find(cat => cat.id === template.category)?.icon || '🌐'}
                      </div>
                    </div>
                    
                    {/* Difficulty Badge */}
                    <div className="absolute top-3 right-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-black/50 text-white`}>
                        {getDifficultyIcon(template.difficulty || 'beginner')} {template.difficulty || 'beginner'}
                      </span>
                    </div>

                    {/* Preview Button */}
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button size="sm" variant="ghost" className="bg-black/50 text-white hover:bg-black/70">
                        <Eye className="h-4 w-4 mr-1" />
                        Preview
                      </Button>
                    </div>
                  </div>

                  {/* Template Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-white text-lg group-hover:text-purple-400 transition-colors">
                        {template.name}
                      </h3>
                      <div className="flex items-center text-yellow-400 text-sm">
                        <Star className="h-3 w-3 mr-1 fill-current" />
                        4.8
                      </div>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1 mb-3">
                      {(template.features || []).slice(0, 3).map((feature, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
                        >
                          {feature}
                        </span>
                      ))}
                      {(template.features || []).length > 3 && (
                        <span className="inline-block px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md">
                          +{(template.features || []).length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {(template.tags || []).slice(0, 4).map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block px-2 py-1 bg-purple-900/30 text-purple-300 text-xs rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Use Template Button */}
                  <div className="p-4 pt-0">
                    <Button 
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        onSelectTemplate(template)
                      }}
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Use This Template
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}
