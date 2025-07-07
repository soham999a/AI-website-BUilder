'use client'

import { useRef, useEffect } from 'react'
import Editor from '@monaco-editor/react'
import { motion } from 'framer-motion'
import { 
  Copy, 
  Download, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Settings,
  FileCode,
  Palette
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  language?: string
  theme?: 'vs-dark' | 'light' | 'vs'
  readOnly?: boolean
  height?: string
  className?: string
}

export function CodeEditor({
  value,
  onChange,
  language = 'html',
  theme = 'vs-dark',
  readOnly = false,
  height = '600px',
  className = ''
}: CodeEditorProps) {
  const editorRef = useRef<any>(null)

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor

    // Configure Monaco Editor
    monaco.editor.defineTheme('custom-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: 'C586C0' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'tag', foreground: '569CD6' },
        { token: 'attribute.name', foreground: '92C5F8' },
        { token: 'attribute.value', foreground: 'CE9178' },
      ],
      colors: {
        'editor.background': '#0f0f23',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editor.selectionBackground': '#264f78',
        'editor.inactiveSelectionBackground': '#3a3d41',
        'editorIndentGuide.background': '#404040',
        'editorIndentGuide.activeBackground': '#707070',
        'editor.lineHighlightBackground': '#2a2d2e',
      }
    })

    monaco.editor.setTheme('custom-dark')

    // Add custom HTML snippets
    monaco.languages.registerCompletionItemProvider('html', {
      provideCompletionItems: (model: any, position: any) => {
        const suggestions = [
          {
            label: 'html5-boilerplate',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    $0
</body>
</html>`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'HTML5 boilerplate template'
          },
          {
            label: 'responsive-grid',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: `<div class="grid">
    <div class="grid-item">$1</div>
    <div class="grid-item">$2</div>
    <div class="grid-item">$3</div>
</div>

<style>
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
}
.grid-item {
    padding: 1rem;
    background: #f5f5f5;
    border-radius: 8px;
}
</style>`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Responsive CSS Grid layout'
          },
          {
            label: 'hero-section',
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: `<section class="hero">
    <div class="hero-content">
        <h1>$1</h1>
        <p>$2</p>
        <button class="cta-button">$3</button>
    </div>
</section>

<style>
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    text-align: center;
}
.hero-content h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
}
.hero-content p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
}
.cta-button {
    padding: 12px 30px;
    background: rgba(255,255,255,0.2);
    border: 2px solid rgba(255,255,255,0.3);
    color: white;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
}
.cta-button:hover {
    background: rgba(255,255,255,0.3);
    transform: translateY(-2px);
}
</style>`,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Hero section with gradient background'
          }
        ]
        return { suggestions }
      }
    })

    // Enable format on paste
    editor.updateOptions({
      formatOnPaste: true,
      formatOnType: true,
      autoIndent: 'full',
      tabSize: 2,
      insertSpaces: true,
      wordWrap: 'on',
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      fontSize: 14,
      lineHeight: 22,
      fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
      cursorBlinking: 'smooth',
      cursorSmoothCaretAnimation: 'on',
      smoothScrolling: true,
      mouseWheelZoom: true
    })
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value)
      toast.success('Code copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy code')
    }
  }

  const handleDownload = () => {
    const blob = new Blob([value], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `website.${language}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Code downloaded!')
  }

  const handleFormat = () => {
    if (editorRef.current) {
      editorRef.current.getAction('editor.action.formatDocument').run()
      toast.success('Code formatted!')
    }
  }

  const handleReset = () => {
    if (editorRef.current) {
      editorRef.current.setValue('')
      toast.success('Editor cleared!')
    }
  }

  return (
    <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <FileCode className="h-4 w-4 text-gray-400" />
          <span className="text-sm font-medium text-gray-300">
            {language.toUpperCase()} Editor
          </span>
          <span className="text-xs text-gray-500">
            {value.split('\n').length} lines
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFormat}
            className="text-gray-400 hover:text-white"
            title="Format Code (Shift+Alt+F)"
          >
            <Palette className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="text-gray-400 hover:text-white"
            title="Copy to Clipboard"
          >
            <Copy className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="text-gray-400 hover:text-white"
            title="Download File"
          >
            <Download className="h-4 w-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleReset}
            className="text-gray-400 hover:text-white"
            title="Clear Editor"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="relative">
        <Editor
          height={height}
          language={language}
          value={value}
          onChange={(newValue) => onChange(newValue || '')}
          onMount={handleEditorDidMount}
          theme="custom-dark"
          options={{
            readOnly,
            minimap: { enabled: true },
            fontSize: 14,
            lineHeight: 22,
            fontFamily: 'JetBrains Mono, Consolas, Monaco, monospace',
            wordWrap: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            formatOnPaste: true,
            formatOnType: true,
            autoIndent: 'full',
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            },
            suggest: {
              showKeywords: true,
              showSnippets: true,
              showFunctions: true
            },
            quickSuggestions: {
              other: true,
              comments: true,
              strings: true
            }
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-gray-900">
              <div className="text-gray-400">Loading editor...</div>
            </div>
          }
        />
        
        {/* Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-800 px-3 py-1 text-xs text-gray-400 border-t border-gray-700">
          <div className="flex items-center justify-between">
            <span>
              {language.toUpperCase()} • UTF-8 • LF
            </span>
            <span>
              {value.length} characters
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
