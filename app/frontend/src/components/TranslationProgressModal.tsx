import { useState, useEffect } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle, XCircle, Loader2, Languages, AlertCircle } from 'lucide-react'

interface TranslationProgressModalProps {
  isOpen: boolean
  onClose: () => void
  resourcesBeingTranslated: string[]
  translationProgress: {
    [resourceId: string]: {
      resourceName: string
      languages: {
        [langCode: string]: 'pending' | 'translating' | 'completed' | 'failed'
      }
    }
  }
  overallProgress: {
    total: number
    completed: number
    failed: number
  }
  isComplete: boolean
}

 
export function TranslationProgressModal({
  isOpen,
  onClose,
  resourcesBeingTranslated,
  translationProgress,
  overallProgress,
  isComplete
}: TranslationProgressModalProps) {
  const [estimatedTimeRemaining, setEstimatedTimeRemaining] = useState<number | null>(null)
  const [startTime] = useState(Date.now())

  useEffect(() => {
    if (overallProgress.completed > 0 && !isComplete) {
      const elapsed = Date.now() - startTime
      const rate = overallProgress.completed / elapsed
      const remaining = (overallProgress.total - overallProgress.completed) / rate
      setEstimatedTimeRemaining(Math.ceil(remaining / 1000))
    }
  }, [overallProgress.completed, overallProgress.total, isComplete, startTime])

  // Calculate resource-based progress instead of translation-based
  const getResourceCounts = () => {
    const totalResources = resourcesBeingTranslated.length
    let completedResources = 0
    let failedResources = 0
    let pendingResources = 0
    
    resourcesBeingTranslated.forEach(resourceId => {
      const status = getResourceStatus(resourceId)
      if (status === 'completed') completedResources++
      else if (status === 'failed') failedResources++
      else pendingResources++
    })
    
    return { totalResources, completedResources, failedResources, pendingResources }
  }
  
  const resourceCounts = getResourceCounts()
  const progressPercentage = resourceCounts.totalResources > 0 
    ? Math.round(((resourceCounts.completedResources + resourceCounts.failedResources) / resourceCounts.totalResources) * 100)
    : 0

  const getResourceStatus = (resourceId: string) => {
    const resource = translationProgress[resourceId]
    if (!resource) return 'pending'
    
    const statuses = Object.values(resource.languages)
    if (statuses.every(s => s === 'completed')) return 'completed'
    if (statuses.some(s => s === 'failed')) return 'failed'
    if (statuses.some(s => s === 'translating')) return 'translating'
    return 'pending'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'translating':
        return <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
      default:
        return <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'translating':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200'
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[90vw] sm:w-[540px] max-w-4xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5" />
            Translation Progress
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6">
          {/* Overall Progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-gray-600">
                {resourceCounts.completedResources + resourceCounts.failedResources} of {resourceCounts.totalResources} resources
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{progressPercentage}% complete</span>
              {estimatedTimeRemaining && !isComplete && (
                <span>~{estimatedTimeRemaining}s remaining</span>
              )}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="border-green-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{resourceCounts.completedResources}</div>
                <div className="text-sm text-gray-600">Completed</div>
              </CardContent>
            </Card>
            <Card className="border-red-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{resourceCounts.failedResources}</div>
                <div className="text-sm text-gray-600">Failed</div>
              </CardContent>
            </Card>
            <Card className="border-blue-200">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{resourceCounts.pendingResources}</div>
                <div className="text-sm text-gray-600">Pending</div>
              </CardContent>
            </Card>
          </div>

          {/* Resource Details */}
          <div className="space-y-3">
            <h3 className="font-medium">Resource Translation Status</h3>
            <div className="space-y-2 max-h-[32rem] overflow-y-auto">
              {resourcesBeingTranslated.map((resourceId) => {
                const resource = translationProgress[resourceId]
                const status = getResourceStatus(resourceId)
                
                return (
                  <Card key={resourceId} className="border-gray-200">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(status)}
                          <span className="font-medium text-sm">
                            {resource?.resourceName || resourceId}
                          </span>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(status)}`}>
                          {status}
                        </Badge>
                      </div>
                      
                      {resource && (
                        <div className="flex flex-wrap gap-1">
                          {Object.entries(resource.languages).map(([langCode, langStatus]) => (
                            <div key={langCode} className="flex items-center gap-1">
                              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {langCode}
                              </span>
                              <div className="h-2 w-2 rounded-full">
                                {langStatus === 'completed' && <div className="h-2 w-2 bg-green-500 rounded-full" />}
                                {langStatus === 'failed' && <div className="h-2 w-2 bg-red-500 rounded-full" />}
                                {langStatus === 'translating' && <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />}
                                {langStatus === 'pending' && <div className="h-2 w-2 bg-gray-300 rounded-full" />}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Error Summary */}
          {resourceCounts.failedResources > 0 && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className="font-medium text-red-800">Translation Errors</span>
              </div>
              <p className="text-sm text-red-700">
                {resourceCounts.failedResources} resources had translation failures. These resources can still be published, 
                but will only be available in English until translations are fixed.
              </p>
            </div>
          )}

          {/* Completion Message */}
          {isComplete && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Translation Complete</span>
              </div>
              <p className="text-sm text-green-700">
                All resources have been processed. You can now publish your resources to make them available to users.
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
