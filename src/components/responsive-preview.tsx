'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Monitor,
  Tablet,
  Smartphone,
  RotateCcw,
  Maximize2,
  Minimize2,
  RefreshCw,
  ExternalLink,
  Ruler,
  Play,
  Pause,
  Square,
  Activity,
  Zap,
  Eye,
  MousePointer,
  Timer,
  Gauge
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ResponsivePreviewProps {
  code: string
  className?: string
}

type DeviceType = 'desktop' | 'tablet' | 'mobile'

interface Device {
  type: DeviceType
  name: string
  width: number
  height: number
  icon: any
}

interface InteractionEvent {
  type: 'click' | 'scroll' | 'hover' | 'focus'
  timestamp: number
  element: string
  coordinates?: { x: number; y: number }
}

interface PerformanceMetrics {
  loadTime: number
  domElements: number
  cssRules: number
  jsErrors: number
  animations: number
}

const devices: Device[] = [
  { type: 'desktop', name: 'Desktop', width: 1200, height: 800, icon: Monitor },
  { type: 'tablet', name: 'Tablet', width: 768, height: 1024, icon: Tablet },
  { type: 'mobile', name: 'Mobile', width: 375, height: 667, icon: Smartphone }
]

export function ResponsivePreview({ code, className = '' }: ResponsivePreviewProps) {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>('desktop')
  const [isRotated, setIsRotated] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [refreshKey, setRefreshKey] = useState(0)

  // Advanced features
  const [isRecording, setIsRecording] = useState(false)
  const [interactions, setInteractions] = useState<InteractionEvent[]>([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [showMetrics, setShowMetrics] = useState(false)
  const [performance, setPerformance] = useState<PerformanceMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [animationCount, setAnimationCount] = useState(0)

  const iframeRef = useRef<HTMLIFrameElement>(null)

  const currentDevice = devices.find(d => d.type === selectedDevice)!

  const getDeviceSize = () => {
    if (!currentDevice) return { width: 1200, height: 800 }

    const { width, height } = currentDevice
    return isRotated
      ? { width: height, height: width }
      : { width, height }
  }

  const { width, height } = getDeviceSize()

  // Performance monitoring
  useEffect(() => {
    if (iframeRef.current) {
      setIsLoading(true)
      const startTime = Date.now()

      const handleLoad = () => {
        const loadTime = Date.now() - startTime
        setIsLoading(false)

        try {
          const iframeDoc = iframeRef.current?.contentDocument
          if (iframeDoc) {
            const domElements = iframeDoc.querySelectorAll('*').length
            const cssRules = Array.from(iframeDoc.styleSheets).reduce((count, sheet) => {
              try {
                return count + (sheet.cssRules?.length || 0)
              } catch {
                return count
              }
            }, 0)

            // Count animations
            const animatedElements = iframeDoc.querySelectorAll('[style*="animation"], [class*="animate"]')
            setAnimationCount(animatedElements.length)

            setPerformance({
              loadTime,
              domElements,
              cssRules,
              jsErrors: 0,
              animations: animatedElements.length
            })
          }
        } catch (error) {
          console.warn('Could not analyze iframe content:', error)
        }
      }

      iframeRef.current.addEventListener('load', handleLoad)
      return () => {
        iframeRef.current?.removeEventListener('load', handleLoad)
      }
    }
  }, [code, refreshKey])

  // Interaction recording
  const startRecording = () => {
    setIsRecording(true)
    setInteractions([])
  }

  const stopRecording = () => {
    setIsRecording(false)
  }

  const playInteractions = async () => {
    if (interactions.length === 0) return

    setIsPlaying(true)

    for (const interaction of interactions) {
      await new Promise(resolve => setTimeout(resolve, 500))
      // Simulate interaction in iframe
      try {
        const iframeDoc = iframeRef.current?.contentDocument
        if (iframeDoc && interaction.coordinates) {
          const element = iframeDoc.elementFromPoint(interaction.coordinates.x, interaction.coordinates.y)
          if (element) {
            const event = new MouseEvent(interaction.type === 'click' ? 'click' : 'mouseover', {
              bubbles: true,
              cancelable: true,
              clientX: interaction.coordinates.x,
              clientY: interaction.coordinates.y
            })
            element.dispatchEvent(event)
          }
        }
      } catch (error) {
        console.warn('Could not replay interaction:', error)
      }
    }

    setIsPlaying(false)
  }

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
    setInteractions([])
    setPerformance(null)
  }

  const handleOpenInNewTab = () => {
    const blob = new Blob([code], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.1, 2))
  }

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.1, 0.3))
  }

  const handleResetZoom = () => {
    setZoom(1)
  }

  return (
    <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between p-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          {/* Device Selection */}
          <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
            {devices.map((device) => {
              const Icon = device.icon
              return (
                <Button
                  key={device.type}
                  variant={selectedDevice === device.type ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedDevice(device.type)}
                  className="px-3 py-1.5"
                  title={device.name}
                >
                  <Icon className="h-4 w-4" />
                </Button>
              )
            })}
          </div>

          {/* Device Info */}
          <div className="text-sm text-gray-400 flex items-center gap-2">
            {currentDevice.name} • {width}×{height}
            {isLoading && (
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-xs">Loading...</span>
              </div>
            )}
          </div>

          {/* Performance Metrics */}
          {performance && (
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs">
                <Timer className="w-3 h-3 mr-1" />
                {performance.loadTime}ms
              </Badge>
              {animationCount > 0 && (
                <Badge variant="secondary" className="text-xs">
                  <Zap className="w-3 h-3 mr-1" />
                  {animationCount} animations
                </Badge>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-1">
          {/* Interaction Recording */}
          <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={isRecording ? stopRecording : startRecording}
              className={`px-2 py-1 ${isRecording ? 'text-red-400' : 'text-gray-400 hover:text-white'}`}
              title={isRecording ? "Stop Recording" : "Start Recording Interactions"}
            >
              {isRecording ? <Square className="h-3 w-3" /> : <MousePointer className="h-3 w-3" />}
            </Button>

            {interactions.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={playInteractions}
                disabled={isPlaying}
                className="px-2 py-1 text-gray-400 hover:text-white"
                title="Replay Interactions"
              >
                {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
              </Button>
            )}

            {interactions.length > 0 && (
              <span className="text-xs text-gray-400 px-1">
                {interactions.length}
              </span>
            )}
          </div>

          {/* Performance Monitor */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowMetrics(!showMetrics)}
            className={`text-gray-400 hover:text-white ${showMetrics ? 'bg-gray-600' : ''}`}
            title="Toggle Performance Metrics"
          >
            <Activity className="h-4 w-4" />
          </Button>

          {/* Zoom Controls */}
          <div className="flex items-center space-x-1 bg-gray-700 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomOut}
              className="px-2 py-1"
              title="Zoom Out"
            >
              -
            </Button>
            <span className="text-xs text-gray-400 px-2">
              {Math.round(zoom * 100)}%
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleZoomIn}
              className="px-2 py-1"
              title="Zoom In"
            >
              +
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetZoom}
              className="px-2 py-1"
              title="Reset Zoom"
            >
              <Ruler className="h-3 w-3" />
            </Button>
          </div>

          {/* Rotate */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsRotated(!isRotated)}
            className="text-gray-400 hover:text-white"
            title="Rotate Device"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>

          {/* Refresh */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            className="text-gray-400 hover:text-white"
            title="Refresh Preview"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>

          {/* Open in New Tab */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleOpenInNewTab}
            className="text-gray-400 hover:text-white"
            title="Open in New Tab"
          >
            <ExternalLink className="h-4 w-4" />
          </Button>

          {/* Fullscreen */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="text-gray-400 hover:text-white"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Preview Area */}
      <div className="bg-gray-100 p-4 min-h-[600px] flex items-center justify-center">
        {isFullscreen ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full h-full"
          >
            <iframe
              key={refreshKey}
              srcDoc={code}
              className="w-full h-full border-0 rounded-lg shadow-lg"
              title="Website Preview - Fullscreen"
              style={{ minHeight: '600px' }}
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative"
            style={{
              width: width * zoom,
              height: height * zoom,
              maxWidth: '100%',
              maxHeight: '100%'
            }}
          >
            {/* Device Frame */}
            <div 
              className={`
                relative bg-gray-800 rounded-lg shadow-2xl overflow-hidden
                ${selectedDevice === 'mobile' ? 'p-4' : selectedDevice === 'tablet' ? 'p-3' : 'p-2'}
              `}
              style={{
                width: width * zoom + (selectedDevice === 'mobile' ? 32 : selectedDevice === 'tablet' ? 24 : 16),
                height: height * zoom + (selectedDevice === 'mobile' ? 32 : selectedDevice === 'tablet' ? 24 : 16)
              }}
            >
              {/* Device Notch/Camera (for mobile) */}
              {selectedDevice === 'mobile' && !isRotated && (
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gray-600 rounded-full z-10" />
              )}

              {/* Screen */}
              <div 
                className="w-full h-full bg-white rounded-sm overflow-hidden"
                style={{
                  width: width * zoom,
                  height: height * zoom
                }}
              >
                <iframe
                  ref={iframeRef}
                  key={refreshKey}
                  srcDoc={code}
                  className="w-full h-full border-0"
                  title={`Website Preview - ${currentDevice.name}`}
                  style={{
                    width: width,
                    height: height,
                    transform: `scale(${zoom})`,
                    transformOrigin: 'top left'
                  }}
                />
              </div>

              {/* Device Home Indicator (for mobile) */}
              {selectedDevice === 'mobile' && !isRotated && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-gray-600 rounded-full" />
              )}
            </div>

            {/* Device Label */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
              {currentDevice.name} {isRotated ? '(Landscape)' : '(Portrait)'}
            </div>
          </motion.div>
        )}
      </div>

      {/* Performance Metrics Overlay */}
      <AnimatePresence>
        {showMetrics && performance && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-16 right-4 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl z-10"
          >
            <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Gauge className="w-4 h-4" />
              Performance Metrics
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Load Time:</span>
                <Badge variant={performance.loadTime < 1000 ? 'default' : 'destructive'} className="text-xs">
                  {performance.loadTime}ms
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">DOM Elements:</span>
                <span className="text-white">{performance.domElements}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">CSS Rules:</span>
                <span className="text-white">{performance.cssRules}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Animations:</span>
                <span className="text-white">{performance.animations}</span>
              </div>
              {interactions.length > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Recorded Interactions:</span>
                  <span className="text-white">{interactions.length}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Bar */}
      <div className="bg-gray-800 px-3 py-2 text-xs text-gray-400 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            Responsive Preview • {selectedDevice.charAt(0).toUpperCase() + selectedDevice.slice(1)}
            {isRecording && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-1"></div>
                Recording
              </Badge>
            )}
            {isPlaying && (
              <Badge variant="default" className="text-xs">
                <Play className="w-3 h-3 mr-1" />
                Playing
              </Badge>
            )}
          </span>
          <span className="flex items-center gap-2">
            Zoom: {Math.round(zoom * 100)}% • {isRotated ? 'Landscape' : 'Portrait'}
            {performance && (
              <span className="text-green-400">
                • {performance.loadTime}ms load
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  )
}
