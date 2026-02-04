import { CheckCircle, Move, Calendar, ExternalLink, Star, Clock, AlertCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { API_BASE_URL } from '@/lib/api'

interface ChecklistResource {
  id: string
  name: string
  description: string
  short_description: string
  categories: string[]
  languages: string[]
  location: string
  contact: {
    phone: string
    email: string
    website: string
  }
  address: string
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  priority: 'urgent' | 'high' | 'medium' | 'low'
  category: string
  resourceIds: string[]
  resources: ChecklistResource[]
}

interface ChecklistProps {
  items: ChecklistItem[]
  checklistId?: string
  onProgressUpdate?: (progress: Record<string, any>) => void
}

export function Checklist({ items, checklistId, onProgressUpdate }: ChecklistProps) {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [dragged, setDragged] = useState<string | null>(null)
  const [list, setList] = useState(items)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState<Record<string, string>>({})
  const dragItemRef = useRef<number | null>(null)
  const dragOverItemRef = useRef<number | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Load progress from backend when component mounts
  useEffect(() => {
    if (checklistId) {
      loadProgress()
    }
  }, [checklistId])

  // Update progress when items change
  useEffect(() => {
    setList(items)
  }, [items])

  const loadProgress = async () => {
    if (!checklistId) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/checklists/${checklistId}/progress`)
      if (response.ok) {
        const data = await response.json()
        setChecked(data.progress.checked || {})
        setNotes(data.progress.notes || {})
        setExpandedItems(data.progress.expanded || {})
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }

  const saveProgress = async (progressData: Record<string, any>) => {
    if (!checklistId) return
    
    try {
      const response = await fetch(`${API_BASE_URL}/checklists/${checklistId}/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(progressData),
      })
      
      if (response.ok && onProgressUpdate) {
        onProgressUpdate(progressData)
      }
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  function toggle(id: string) {
    const newChecked = { ...checked, [id]: !checked[id] }
    setChecked(newChecked)
    
    // Auto-scroll to progress bar to show updated progress
    setTimeout(() => {
      if (progressBarRef.current) {
        progressBarRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest'
        })
      }
    }, 100) // Small delay to ensure state update is reflected
    
    // Save progress to backend
    const progressData = {
      checked: newChecked,
      notes: notes,
      expanded: expandedItems,
      lastUpdated: new Date().toISOString()
    }
    saveProgress(progressData)
  }

  function toggleExpanded(id: string) {
    const newExpanded = { ...expandedItems, [id]: !expandedItems[id] }
    setExpandedItems(newExpanded)
    
    // Auto-scroll to progress bar for better flow
    if (progressBarRef.current) {
      progressBarRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        inline: 'nearest'
      })
    }
    
    // Save expanded state
    const progressData = {
      checked: checked,
      notes: notes,
      expanded: newExpanded,
      lastUpdated: new Date().toISOString()
    }
    saveProgress(progressData)
  }

  function updateNote(id: string, note: string) {
    const newNotes = { ...notes, [id]: note }
    setNotes(newNotes)
    
    // Save notes
    const progressData = {
      checked: checked,
      notes: newNotes,
      expanded: expandedItems,
      lastUpdated: new Date().toISOString()
    }
    saveProgress(progressData)
  }

  function handleDragStart(index: number) {
    dragItemRef.current = index
    setDragged(list[index].id)
  }

  function handleDragEnter(index: number) {
    dragOverItemRef.current = index
  }

  function handleDragEnd() {
    const from = dragItemRef.current
    const to = dragOverItemRef.current
    if (from !== null && to !== null && from !== to) {
      const updated = [...list]
      const [removed] = updated.splice(from, 1)
      updated.splice(to, 0, removed)
      setList(updated)
    }
    setDragged(null)
    dragItemRef.current = null
    dragOverItemRef.current = null
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-brand-pms-179/20 text-brand-pms-179 border-brand-pms-179/30'
      case 'high': return 'bg-brand-pms-129/20 text-brand-pms-129 border-brand-pms-129/30'
      case 'medium': return 'bg-brand-pms-3955/20 text-brand-pms-129 border-brand-pms-3955/30'
      case 'low': return 'bg-brand-pms-354/20 text-brand-pms-354 border-brand-pms-354/30'
      default: return 'bg-brand-pms-290 text-brand-reflex-blue border-brand-pms-285/30'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent': return <AlertCircle className="w-4 h-4" />
      case 'high': return <Star className="w-4 h-4" />
      case 'medium': return <Clock className="w-4 h-4" />
      case 'low': return <Calendar className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  // Calculate completion percentage
  const completionPercentage = items.length > 0 ? (Object.values(checked).filter(Boolean).length / items.length) * 100 : 0

  if (!items || items.length === 0) {
    return (
      <div className="text-slate-500 text-center my-12" role="status" id="checklist-empty-state">
        No checklist items to show. Please complete the screening to generate your roadmap.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card ref={progressBarRef}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Progress Overview
          </CardTitle>
          <CardDescription>
            {Object.values(checked).filter(Boolean).length} of {items.length} tasks completed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={completionPercentage} className="w-full" />
          <div className="mt-2 text-sm text-gray-600">
            {completionPercentage.toFixed(0)}% complete
          </div>
        </CardContent>
      </Card>

      {/* Checklist Items */}
      <ul className="space-y-4" id="checklist-list">
        {list.map((item, i) => (
          <li key={item.id}>
            <Card
              className={`transition-all duration-200 ${
                dragged === item.id ? 'shadow-lg bg-amber-50 border-amber-200' : 'hover:shadow-md'
              } ${checked[item.id] ? 'opacity-75' : ''}`}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragEnter={() => handleDragEnter(i)}
              onDragEnd={handleDragEnd}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <button
                    type="button"
                    className={`touch-target mt-1 rounded-full border-2 min-w-[44px] min-h-[44px] flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                      checked[item.id] 
                        ? 'border-green-600 bg-green-600 text-white shadow-sm hover:bg-green-700 hover:border-green-700' 
                        : 'border-slate-300 bg-white hover:border-green-400 hover:bg-green-50 focus:border-green-500 focus:bg-green-50'
                    }`}
                    onClick={() => toggle(item.id)}
                    aria-checked={checked[item.id] ? 'true' : 'false'}
                    id={`checklist-checkbox-${item.id}`}
                    aria-label={checked[item.id] ? `Mark ${item.title} as not completed` : `Mark ${item.title} as completed`}
                    title={checked[item.id] ? `Click to mark as incomplete` : `Click to mark as complete`}
                  >
                    {checked[item.id] && <CheckCircle className="w-5 h-5 fill-current" />}
                  </button>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className={`text-lg ${checked[item.id] ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                        {item.title}
                      </CardTitle>
                      <Badge variant="outline" className={`text-xs ${getPriorityColor(item.priority)}`}>
                        {getPriorityIcon(item.priority)}
                        <span className="ml-1">{item.priority}</span>
                      </Badge>
                    </div>
                    <CardDescription className="text-sm">
                      {item.description}
                    </CardDescription>
                  </div>
                  
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleExpanded(item.id)}
                      className="touch-target text-slate-500 hover:text-slate-700"
                    >
                      {expandedItems[item.id] ? 'Less' : 'More'}
                    </Button>
                    <button 
                      className="touch-target cursor-move text-slate-400 flex items-center justify-center min-w-[44px] min-h-[44px] hover:text-slate-600 transition-colors" 
                      aria-label="Drag to reorder"
                      onMouseDown={(e) => e.currentTarget.style.cursor = 'grabbing'}
                      onMouseUp={(e) => e.currentTarget.style.cursor = 'grab'}
                    >
                      <Move className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </CardHeader>

              {expandedItems[item.id] && (
                <CardContent className="pt-0">
                  {/* Resources */}
                  {item.resources && item.resources.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-slate-700 mb-2">Resources</h4>
                      <div className="grid gap-2">
                        {item.resources.map((resource) => (
                          <div key={resource.id} className="p-3 bg-slate-50 rounded-lg border">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <h5 className="font-medium text-sm text-slate-800">{resource.name}</h5>
                                <p className="text-xs text-slate-600 mt-1">{resource.short_description}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <div className="flex gap-1">
                                    {resource.categories.map((cat) => (
                                      <Badge key={cat} variant="secondary" className="text-xs">
                                        {cat}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex gap-1">
                                    {resource.languages.map((lang) => (
                                      <Badge key={lang} variant="outline" className="text-xs">
                                        {lang}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex gap-1 ml-2">
                                {resource.contact.website && (
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => window.open(resource.contact.website, '_blank')}
                                    className="touch-target p-2"
                                    aria-label={`Visit ${resource.name} website`}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  <div>
                    <h4 className="font-semibold text-sm text-slate-700 mb-2">Notes</h4>
                    <textarea
                      value={notes[item.id] || ''}
                      onChange={(e) => updateNote(item.id, e.target.value)}
                      placeholder="Add your notes here..."
                      className="w-full p-2 text-sm border rounded-md resize-none"
                      rows={3}
                    />
                  </div>
                </CardContent>
              )}
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
