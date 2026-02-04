import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/Auth0Context'
import { useAuth0 } from '@auth0/auth0-react'
import { Button } from '@/components/ui/button'
import { BrandPagination } from '@/components/BrandPagination'
import { useToast } from '@/hooks/use-toast'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Upload,
  FileText,
  Users,
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  StickyNote,
  Clock,
  Database,
  Heart,
  GraduationCap,
  Home,
  Briefcase,
  AlertTriangle,
  Scale,
  UserCheck,
  Palette,
  Search,
  Globe,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  Loader2,
} from 'lucide-react'
import { API_BASE_URL } from '@/lib/api'

interface AdminStats {
  total_resources: number
  ready_resources: number
  published_resources: number
  total_users: number
  admin_users: number
  demo_users: number
  category_distribution: Record<string, number>
}

interface ImportResult {
  total_rows: number
  successful_imports: number
  failed_imports: number
  new_records: number
  updated_records: number
  deleted_records: number
  skipped_rows: number
  errors: string[]
  warnings: string[]
  has_more_errors?: boolean
  has_more_warnings?: boolean
  summary_message?: string
}

interface Resource {
  id: string
  ready: boolean
  published?: boolean
  category: string
  subcategory?: string
  resource_name: string
  summary?: string
  website_link?: string
  physical_location?: string
  notes?: string
  priority?: number
  created_at?: string
  updated_at?: string
  translation_status?: 'not_started' | 'pending' | 'completed' | 'failed'
}

// Removed legacy ResourcePagination interface (client-side pagination now)

interface AdminDashboardProps {
  initialTab: string
}



export function AdminDashboard({ initialTab }: AdminDashboardProps) {
  const { user, token } = useAuth()
  const { loginWithRedirect } = useAuth0()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [uploading, setUploading] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string>('')
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  
  // Resource management state
  const [resources, setResources] = useState<Resource[]>([])
  const [allResources, setAllResources] = useState<Resource[]>([])
  const [resourceLoading, setResourceLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([])
  const [availableSubcategories, setAvailableSubcategories] = useState<string[]>([])
  const [publishing, setPublishing] = useState(false)
  const [translating, setTranslating] = useState(false)
  const [resourcesNeedingTranslation, setResourcesNeedingTranslation] = useState<string[]>([])
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'unpublished' | 'not_ready' | 'translated' | 'translation_failed' | 'needs_translation'>('all')
  const [resultsView, setResultsView] = useState<'all' | 'errors' | 'updates' | 'duplicates'>('all')
  
  // Sorting state
  const [sortField, setSortField] = useState<'category' | 'resource_name' | 'priority' | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')


  // Canonical → display mapping for category names
  const displayCategoryName = (canonical: string): string => {
    const key = (canonical || '').toLowerCase()
    if (key.includes('community') && key.includes('belonging')) return 'Community & Belonging'
    if (key.includes('culture') && key.includes('leisure')) return 'Culture & Leisure'
    if (key.includes('esl') || key.includes('immigrant')) return 'ESL and Immigrant Support'
    if (key.includes('education') || key.includes('youth')) return 'Education & Youth'
    if (key.includes('living') || key.includes('essentials')) return 'Living Essentials'
    if (key.includes('work') || key.includes('business')) return 'Work & Business'
    return canonical
  }

  // Handle sorting
  const handleSort = (field: 'category' | 'resource_name' | 'priority') => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      // New field, default to ascending
      setSortField(field)
      setSortDirection('asc')
    }
  }

  // Sort resources based on current sort settings
  const sortResources = (resources: Resource[]): Resource[] => {
    if (!sortField) return resources

    return [...resources].sort((a, b) => {
      let aValue: string | number
      let bValue: string | number

      switch (sortField) {
        case 'category':
          aValue = displayCategoryName(a.category || '')
          bValue = displayCategoryName(b.category || '')
          break
        case 'resource_name':
          aValue = a.resource_name || ''
          bValue = b.resource_name || ''
          break
        case 'priority':
          aValue = a.priority ?? 0
          bValue = b.priority ?? 0
          break
        default:
          return 0
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        const result = aValue.localeCompare(bValue)
        return sortDirection === 'asc' ? result : -result
      } else {
        const result = (aValue as number) - (bValue as number)
        return sortDirection === 'asc' ? result : -result
      }
    })
  }

  useEffect(() => {
    fetchDashboardData()
    if (initialTab === 'resources') {
      fetchAllResources()
      fetchCategories()
    }
  }, [initialTab])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setStats(data.stats)
      
      // Also check for resources needing translation
      await checkUntranslatedResources()
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
      setError('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  const checkUntranslatedResources = async (): Promise<string[]> => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/translation-status`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        setResourcesNeedingTranslation([])
        return []
      }
      
      const data = await response.json()
      const resourceStatus = data.data?.resource_status || {}
      
      // Get resources that need translation (not_started or failed)
      const needsTranslation = (resourceStatus.not_started || 0) + (resourceStatus.failed || 0)
      
      if (needsTranslation > 0) {
        // Get specific resource IDs that need translation
        const resourcesResponse = await fetch(`${API_BASE_URL}/admin/resources-needing-translation`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
        if (resourcesResponse.ok) {
          const resourcesData = await resourcesResponse.json()
          const resourceIds = resourcesData.resource_ids || []
          setResourcesNeedingTranslation(resourceIds)
          return resourceIds
        }
      }
      
      setResourcesNeedingTranslation([])
      return []
    } catch (error) {
      console.error('Error checking untranslated resources:', error)
      setResourcesNeedingTranslation([])
      return []
    }
  }

  const handleSmartPublish = async () => {
    if (!token) return
    setPublishing(true)
    
    try {
      // Step 1: Check for untranslated resources
      const untranslatedResources = await checkUntranslatedResources()
      
      if (untranslatedResources.length > 0) {
        // Step 2: Start translation in background
        setTranslating(true)
        toast({
          title: "Starting Translation",
          description: `Translating ${untranslatedResources.length} resources...`,
          variant: "default",
        })
        
        await startTranslationInBackground(untranslatedResources)
        setTranslating(false)
        
        toast({
          title: "Translation Complete",
          description: "Resources have been translated and are ready for publishing.",
          variant: "default",
        })
      }
      
      // Step 3: Publish all ready resources
      await publishResources()
      
      // Step 4: Refresh translation status after publishing
      await checkUntranslatedResources()
      
    } catch (error) {
      console.error('Smart publish error:', error)
      toast({
        title: 'Publish failed',
        description: 'Could not complete the publish process. Please try again.',
        variant: 'destructive'
      })
    } finally {
      setPublishing(false)
      setTranslating(false)
    }
  }

  const publishResources = async () => {
    const response = await fetch(`${API_BASE_URL}/admin/publish`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
    const data = await response.json()
    const now = data?.results?.now_published ?? 0
    const total = data?.results?.ready_resources ?? 0
    toast({
      title: 'Publish complete',
      description: `${now} resources are now published (${total} ready).`,
    })
    // Optimistically update current list so badges flip instantly
    setAllResources(prev => prev.map(r => (r.ready ? { ...r, published: true } : { ...r, published: false })))
    setResources(prev => prev.map(r => (r.ready ? { ...r, published: true } : { ...r, published: false })))
    await fetchDashboardData()
    // Add small delay to ensure database operations complete
    await new Promise(resolve => setTimeout(resolve, 500))
    await fetchAllResources()
  }

  const startTranslationInBackground = async (resourceIds: string[]) => {
    try {
      // Start translation process
      const response = await fetch(`${API_BASE_URL}/admin/translate-resources`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resource_ids: resourceIds,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || `Translation failed: ${response.status}`)
      }

      // Wait for the translation to complete
      await response.json()
      
      // Refresh resources after translation
      await fetchAllResources()

    } catch (error) {
      console.error('Error during translation:', error)
      toast({
        title: "Translation Error",
        description: error instanceof Error ? error.message : "Translation failed",
        variant: "destructive",
      })
      throw error // Re-throw to be handled by the caller
    }
  }

  // Legacy publish function for backward compatibility
  const handlePublish = handleSmartPublish

  const validateAndSetFile = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      setError('Please select a CSV file')
      return false
    }
    
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      setError('File size must be less than 10MB')
      return false
    }
    
    setSelectedFile(file)
    setError('')
    return true
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) validateAndSetFile(file)
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    if (file) validateAndSetFile(file)
  }

  const handleUpload = async () => {
    if (!selectedFile) return

    setUploading(true)
    setUploadProgress(0)
    setError('')
    setImportResult(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      // Simulate progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90))
      }, 200)

      const response = await fetch(`${API_BASE_URL}/admin/import-csv`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const text = await response.text()
        console.error('[CSV] Upload failed', { status: response.status, text })
        try {
          const errorData = JSON.parse(text)
          throw new Error(errorData.detail || `Upload failed (${response.status})`)
        } catch (_) {
          throw new Error(`Upload failed (${response.status})`)
        }
      }

      const result = await response.json()
      setImportResult({
        ...result.results,
        summary_message: result.message  // Add the user-friendly summary message
      })
      
      // Refresh dashboard data after successful import
      await fetchDashboardData()
      // Always refresh resources after successful import (needed for Resource Directory tab)
      // Add small delay to ensure database has committed all changes
      await new Promise(resolve => setTimeout(resolve, 500))
      await fetchAllResources()
      // Also refresh categories in case new ones were added
      await fetchCategories()
      
      // Clear file selection after successful upload
      setSelectedFile(null)
      const fileInput = document.getElementById('csv-file') as HTMLInputElement
      if (fileInput) fileInput.value = ''

    } catch (error) {
      console.error('[CSV] Exception during upload:', error)
      setError(error instanceof Error ? error.message : 'Upload failed')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const clearResults = () => {
    setImportResult(null)
  }

  const fetchAllResources = async () => {
    setResourceLoading(true)
    try {
      const aggregated: Resource[] = []
      let page = 1
      const limit = 100
      // Loop through pages until we've fetched all
      // Safeguard with a max of 200 pages
      for (let i = 0; i < 200; i++) {
        const response = await fetch(`${API_BASE_URL}/admin/resources?page=${page}&limit=${limit}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        aggregated.push(...data.resources)
        const total = data.pagination?.total ?? aggregated.length
        if (aggregated.length >= total) break
        page += 1
      }
      // De-duplicate by id in case of overlapping pages or updates during fetch
      const uniqueMap = new Map<string, Resource>()
      for (const r of aggregated) uniqueMap.set(r.id, r)
      const unique = Array.from(uniqueMap.values())
      setAllResources(unique)
      setResources(unique)
      setCurrentPage(1)
    } catch (error) {
      console.error('Error fetching resources:', error)
      setError('Failed to load resources')
    } finally {
      setResourceLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/resources/categories/list`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
      const data = await response.json()
      if (Array.isArray(data.categories)) setCategories(data.categories)
    } catch (e) {
      console.warn('Failed to load categories; deriving from data')
    }
  }

  // Derive available subcategories based on selected category and all resources
  useEffect(() => {
    const subs = new Set<string>()
    const pool = selectedCategories.length > 0
      ? allResources.filter(r => {
          const catTokens = (r.category || '')
            .split(',')
            .map(s => s.trim().toLowerCase())
            .filter(Boolean)
          return selectedCategories.some(sel => catTokens.includes(sel.toLowerCase()))
        })
      : allResources
    for (const r of pool) {
      const parts = (r.subcategory || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean)
      parts.forEach(p => subs.add(p))
    }
    const list = Array.from(subs).sort((a, b) => a.localeCompare(b))
    setAvailableSubcategories(list)
    // Reset selected subcategories if they are no longer available
    setSelectedSubcategories(prev => prev.filter(s => list.includes(s)))
  }, [selectedCategories, allResources])

  // Apply client-side filtering and sorting based on search, category, subcategories
  useEffect(() => {
    let filtered = [...allResources]

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(r => {
        const catTokens = (r.category || '')
          .split(',')
          .map(s => s.trim().toLowerCase())
          .filter(Boolean)
        return selectedCategories.some(sel => catTokens.includes(sel.toLowerCase()))
      })
    }

    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(r => {
        const subs = (r.subcategory || '')
          .split(',')
          .map(s => s.trim().toLowerCase())
          .filter(Boolean)
        return selectedSubcategories.some(sel => subs.includes(sel.toLowerCase()))
      })
    }

    // Filter by combined status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(r => {
        switch (statusFilter) {
          case 'published':
            return r.ready && !!r.published
          case 'unpublished':
            return r.ready && !r.published
          case 'not_ready':
            return !r.ready
          case 'translated':
            return (r.translation_status || 'not_started') === 'completed'
          case 'translation_failed':
            return (r.translation_status || 'not_started') === 'failed'
          case 'needs_translation':
            return (r.translation_status || 'not_started') === 'not_started'
          default:
            return true
        }
      })
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      filtered = filtered.filter(r =>
        (r.resource_name || '').toLowerCase().includes(q) ||
        (r.summary || '').toLowerCase().includes(q) ||
        (r.notes || '').toLowerCase().includes(q) ||
        (r.category || '').toLowerCase().includes(q) ||
        (r.subcategory || '').toLowerCase().includes(q) ||
        (r.physical_location || '').toLowerCase().includes(q)
      )
    }

    // Apply sorting
    const sorted = sortResources(filtered)

    setResources(sorted)
    setCurrentPage(1)
  }, [searchQuery, selectedCategories, selectedSubcategories, statusFilter, allResources, sortField, sortDirection])

  const getCategoryIcon = (category: string) => {
    const value = (category || '').toLowerCase()
    // Colorful, category-appropriate icons
    if (value.includes('living') || value.includes('essentials')) return <Home className="h-5 w-5 text-[#2563EB]" />
    if (value.includes('education') || value.includes('youth')) return <GraduationCap className="h-5 w-5 text-[#22C55E]" />
    if (value.includes('esl') || value.includes('immigrant')) return <Globe className="h-5 w-5 text-[#0EA5E9]" />
    if (value.includes('community') || value.includes('belonging')) return <Users className="h-5 w-5 text-[#F59E0B]" />
    if (value.includes('work') || value.includes('business')) return <Briefcase className="h-5 w-5 text-[#8B5CF6]" />
    if (value.includes('culture') || value.includes('leisure')) return <Palette className="h-5 w-5 text-[#06B6D4]" />
    if (value.includes('housing')) return <Home className="h-5 w-5 text-[#2563EB]" />
    if (value.includes('health')) return <Heart className="h-5 w-5 text-[#EF4444]" />
    if (value.includes('legal')) return <Scale className="h-5 w-5 text-[#9333EA]" />
    if (value.includes('emergency')) return <AlertTriangle className="h-5 w-5 text-[#DC2626]" />
    return <FileText className="h-5 w-5 text-[#5B6B8C]" />
  }

  const normalizeUrl = (url?: string): string | null => {
    if (!url) return null
    const trimmed = url.trim()
    if (!trimmed) return null
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed
    return `https://${trimmed}`
  }

  const getTranslationStatusBadge = (status?: string) => {
    switch (status) {
      case 'completed':
        return (
          <Badge variant="outline" className="bg-white text-green-700 border-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Translated
          </Badge>
        )
      case 'pending':
        return (
          <Badge variant="outline" className="bg-white text-blue-700 border-blue-500">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Translating
          </Badge>
        )
      case 'failed':
        return (
          <Badge variant="outline" className="bg-white text-red-700 border-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        )
      case 'not_started':
      default:
        return (
          <Badge variant="outline" className="bg-white text-orange-700 border-orange-500">
            <Clock className="h-3 w-3 mr-1" />
            Needs Translation
          </Badge>
        )
    }
  }

  // Domain extraction no longer used (using a compact button instead of text link)


  if (!user || user.role !== 'admin') {
    loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
      },
    })
    return null
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <RefreshCw className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-[32px] leading-9 font-extrabold text-brand-reflex-blue tracking-tight">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          
          {/* Button is disabled if currently processing, no ready resources exist, or everything is published and translated */}
          <Button
            onClick={handlePublish}
            disabled={
              publishing || 
              translating || 
              (stats?.ready_resources ?? 0) === 0 ||
              ((stats?.published_resources ?? 0) >= (stats?.ready_resources ?? 0) && resourcesNeedingTranslation.length === 0)
            }
            className="group inline-flex items-center gap-2 bg-gradient-to-r from-brand-reflex-blue to-brand-pms-285 hover:from-brand-pms-285 hover:to-brand-reflex-blue text-white border-0 shadow-md hover:shadow-lg transition-all px-4"
          >
            {(translating || publishing) ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <svg className="h-4 w-4 opacity-90 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            )}
            {translating ? 'Translating Resources...' : publishing ? 'Publishing...' : 'Publish Resources'}
          </Button>
        </div>
      </div>

      <Tabs value={initialTab} className="w-full" onValueChange={(v) => {
        const path = v === 'overview'
          ? '/admin-dashboard/overview'
          : v === 'csv-upload'
            ? '/admin-dashboard/csv-upload'
            : '/admin-dashboard/resources'
        navigate(path)
      }}>
        <TabsList className="w-full grid grid-cols-3 gap-2 rounded-xl border border-[#DBE7FF] bg-[#EEF3FF] p-1 mb-6 items-center">
          <TabsTrigger 
            value="overview"
            className="w-full rounded-lg py-2 px-2 font-semibold text-brand-reflex-blue text-center inline-flex items-center justify-center -translate-y-px data-[state=active]:bg-brand-reflex-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Overview</span>
            <span className="sm:hidden">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="csv-upload"
            className="w-full rounded-lg py-2 px-2 font-semibold text-brand-reflex-blue text-center inline-flex items-center justify-center -translate-y-px data-[state=active]:bg-brand-reflex-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all text-sm sm:text-base"
          >
            <span className="hidden sm:inline">CSV Import</span>
            <span className="sm:hidden">Import</span>
          </TabsTrigger>
          <TabsTrigger 
            value="resources"
            className="w-full rounded-lg py-2 px-1 font-semibold text-brand-reflex-blue text-center inline-flex items-center justify-center -translate-y-px data-[state=active]:bg-brand-reflex-blue data-[state=active]:text-white data-[state=active]:shadow-md transition-all text-sm sm:text-base"
          >
            <span className="hidden sm:inline">Resource Directory</span>
            <span className="sm:hidden">Resources</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-2 md:mt-4">
            <Card className="border border-[#E7EEFF] bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-[#1D2A64]">Total Resources</CardTitle>
                <Database className="h-4 w-4 text-[#5B7CFF]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-[#1D2A64]">{stats?.total_resources || 0}</div>
                <p className="text-xs text-[#5B6B8C]">Community organizations</p>
              </CardContent>
            </Card>

            <Card className="bg-[#E9F7EF] border-[#C8EBD7] shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-[#0E8345]">Publishing Status</CardTitle>
                <CheckCircle className="h-4 w-4 text-[#16A34A]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-[#0E8345]">
                  {stats?.published_resources ?? 0}/{stats?.ready_resources ?? 0}
                </div>
                <p className="text-xs text-[#1F9D55]">Published resources</p>
              </CardContent>
            </Card>

            <Card className="border border-[#E7EEFF] bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-[#1D2A64]">Total Users</CardTitle>
                <Users className="h-4 w-4 text-[#5B7CFF]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-[#1D2A64]">{stats?.total_users || 0}</div>
                <p className="text-xs text-[#5B6B8C]">Registered accounts</p>
              </CardContent>
            </Card>

            <Card className="border border-[#E7EEFF] bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-[#1D2A64]">Admin Users</CardTitle>
                <UserCheck className="h-4 w-4 text-[#5B7CFF]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-[#1D2A64]">{stats?.admin_users || 0}</div>
                <p className="text-xs text-[#5B6B8C]">Platform administrators</p>
              </CardContent>
            </Card>

            <Card className="border border-[#E7EEFF] bg-white shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-semibold text-[#1D2A64]">Demo Users</CardTitle>
                <BarChart3 className="h-4 w-4 text-[#5B7CFF]" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-extrabold text-[#1D2A64]">{stats?.demo_users || 0}</div>
                <p className="text-xs text-[#5B6B8C]">Demo accounts</p>
              </CardContent>
            </Card>
          </div>

          {/* Resource Categories Section */}
          {stats?.category_distribution && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Resource Categories</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                  {['Living/Essentials','Education/Youth','ESL/Immigrant','Community/Belonging','Work/Business','Culture/Leisure']
                    .map((category) => {
                      const count = stats.category_distribution?.[category] || 0
                      return (
                        <Card key={category} className="text-center p-4 border border-[#E7EEFF] bg-[#F8FBFF] hover:bg-white transition-colors shadow-sm">
                          <div className="text-3xl font-extrabold mb-2 text-[#1D2A64]">
                            {count}
                          </div>
                          <div className="flex items-center justify-center gap-2 text-[#1D2A64]">
                            {getCategoryIcon(category)}
                            <span>{category}</span>
                          </div>
                        </Card>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="csv-upload" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Import Resources from CSV</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="csv-file">Select CSV File</Label>
                <div 
                  className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onClick={() => document.getElementById('csv-file')?.click()}
                >
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">
                    {selectedFile ? selectedFile.name : 'Click to upload or drag and drop CSV file'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Maximum file size: 10MB</p>
                </div>
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                  <div className="flex items-center">
                    <XCircle className="h-4 w-4 text-red-600 mr-2" />
                    <span className="text-red-700 text-sm">{error}</span>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button 
                  onClick={handleUpload} 
                  disabled={!selectedFile || uploading}
                  className="flex-1 bg-brand-reflex-blue hover:bg-brand-pms-285 text-white border-0 shadow-md hover:shadow-lg transition-all duration-200 disabled:bg-gray-400 disabled:hover:bg-gray-400"
                >
                  {uploading ? 'Uploading...' : 'Import Resources'}
                </Button>
                {selectedFile && (
                  <Button 
                    onClick={() => {
                      setSelectedFile(null)
                      setError('')
                      const fileInput = document.getElementById('csv-file') as HTMLInputElement
                      if (fileInput) fileInput.value = ''
                    }}
                    className="border-2 border-brand-reflex-blue text-brand-reflex-blue hover:bg-brand-reflex-blue hover:text-white bg-white transition-all duration-200"
                  >
                    Clear
                  </Button>
                )}
              </div>

              {uploading && (
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {importResult && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span>Import Results</span>
                  </CardTitle>
                  <Button 
                    size="sm" 
                    onClick={clearResults}
                    className="border-2 border-brand-reflex-blue text-brand-reflex-blue hover:bg-brand-reflex-blue hover:text-white bg-white transition-all duration-200"
                  >
                    Clear Results
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Summary Message */}
                {importResult.summary_message && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="text-sm text-blue-800 whitespace-pre-line font-medium">
                      {importResult.summary_message}
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{importResult.total_rows}</div>
                    <div className="text-sm text-gray-600">CSV Rows Processed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{importResult.successful_imports}</div>
                    <div className="text-sm text-gray-600">Saved to Database</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{importResult.new_records}</div>
                    <div className="text-sm text-gray-600">New</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{importResult.updated_records}</div>
                    <div className="text-sm text-gray-600">Updated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{importResult.deleted_records}</div>
                    <div className="text-sm text-gray-600">Deleted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{importResult.failed_imports}</div>
                    <div className="text-sm text-gray-600">Failed</div>
                  </div>
                </div>

                {(() => {
                  const warnings = importResult.warnings || []
                  const duplicatePattern = /(Duplicate entry found|Duplicate resource found|appears multiple times|already processed earlier)/i
                  const updatePattern = /(Updated existing resource|temporarily unpublished|Removed \d+ (resources|duplicate))/i
                  const duplicates = warnings.filter((w) => duplicatePattern.test(w))
                  const updates = warnings.filter((w) => updatePattern.test(w))
                  const otherNotices = warnings.filter((w) => !duplicatePattern.test(w) && !updatePattern.test(w))

                  const Section = ({ title, color, items }: { title: string; color: 'red' | 'yellow' | 'blue'; items: string[] }) => {
                    if (!items || items.length === 0) return null
                    const colorClasses =
                      color === 'red'
                        ? { heading: 'text-red-600', box: 'bg-red-50 border-red-200', item: 'text-red-700 border-red-400' }
                        : color === 'yellow'
                        ? { heading: 'text-yellow-600', box: 'bg-yellow-50 border-yellow-200', item: 'text-yellow-700 border-yellow-400' }
                        : { heading: 'text-blue-700', box: 'bg-blue-50 border-blue-200', item: 'text-blue-700 border-blue-400' }
                    return (
                      <div className="space-y-2">
                        <h4 className={`font-medium flex items-center ${colorClasses.heading}`}>
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {title} ({items.length} total)
                        </h4>
                        <div className={`${colorClasses.box} border rounded p-3 max-h-96 overflow-y-auto`}>
                          {items.map((msg, idx) => (
                            <div key={idx} className={`text-sm mb-3 p-3 bg-white rounded shadow-sm border-l-4 ${colorClasses.item}`}>
                              <div className="font-medium leading-relaxed">{msg}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }

                  return (
                    <div className="space-y-4">
                      <Tabs value={resultsView} onValueChange={(v) => setResultsView(v as any)}>
                        <TabsList className="mb-2">
                          <TabsTrigger value="all">All</TabsTrigger>
                          <TabsTrigger value="errors">Errors</TabsTrigger>
                          <TabsTrigger value="updates">Updates</TabsTrigger>
                          <TabsTrigger value="duplicates">Duplicates</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="space-y-4">
                          <Section title="Issues Found" color="red" items={importResult.errors} />
                          <Section title="Updates Made" color="yellow" items={updates} />
                          <Section title="Duplicate entries skipped" color="blue" items={duplicates} />
                          <Section title="Notices" color="yellow" items={otherNotices} />
                        </TabsContent>
                        <TabsContent value="errors">
                          <Section title="Issues Found" color="red" items={importResult.errors} />
                        </TabsContent>
                        <TabsContent value="updates">
                          <Section title="Updates Made" color="yellow" items={updates} />
                        </TabsContent>
                        <TabsContent value="duplicates">
                          <Section title="Duplicate entries skipped" color="blue" items={duplicates} />
                        </TabsContent>
                      </Tabs>
                    </div>
                  )
                })()}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <div className="flex flex-col gap-4">
            {/* Filters - Responsive grid layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
              {/* Search - Full width on small, spans multiple columns on larger screens */}
              <div className="md:col-span-2 lg:col-span-3 xl:col-span-1">
                <Label htmlFor="admin-resource-search" className="text-brand-reflex-blue">Search</Label>
                <div className="relative mt-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-pms-285" />
                  <Input
                    id="admin-resource-search"
                    placeholder="Search by name, summary, category, location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-full"
                  />
                </div>
              </div>
              
              {/* Status */}
              <div className="w-full">
                <Label className="text-brand-reflex-blue">Status</Label>
                <Select value={statusFilter} onValueChange={(v) => setStatusFilter(v as any)}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="unpublished">Ready</SelectItem>
                    <SelectItem value="not_ready">Not Ready</SelectItem>
                    <SelectItem value="translated">Translated</SelectItem>
                    <SelectItem value="translation_failed">Translation Failed</SelectItem>
                    <SelectItem value="needs_translation">Needs Translation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {/* Categories */}
              <div className="w-full">
                <Label className="text-brand-reflex-blue">Categories</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-between mt-1 w-full text-brand-reflex-blue border-brand-pms-285/30 hover:bg-brand-pms-290">
                      <span className="truncate">{selectedCategories.length > 0 ? `${selectedCategories.length} selected` : 'All categories'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    <DropdownMenuLabel>Filter categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.filter(Boolean).map((c) => (
                      <DropdownMenuCheckboxItem
                        key={c}
                        checked={selectedCategories.includes(c)}
                        onCheckedChange={(checked) => {
                          setSelectedCategories(prev => checked ? [...prev, c] : prev.filter(x => x !== c))
                        }}
                        className="capitalize"
                      >
                        {displayCategoryName(c)}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Subcategories */}
              <div className="w-full">
                <Label className="text-brand-reflex-blue">Subcategories</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="justify-between mt-1 w-full text-brand-reflex-blue border-brand-pms-285/30 hover:bg-brand-pms-290">
                      <span className="truncate">{selectedSubcategories.length > 0 ? `${selectedSubcategories.length} selected` : 'All subcategories'}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-[300px] overflow-y-auto">
                    <DropdownMenuLabel>Filter subcategories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {availableSubcategories.length === 0 && (
                      <div className="px-2 py-1.5 text-sm text-gray-500">No subcategories</div>
                    )}
                    {availableSubcategories.map((sub) => (
                      <DropdownMenuCheckboxItem
                        key={sub}
                        checked={selectedSubcategories.includes(sub)}
                        onCheckedChange={(checked) => {
                          setSelectedSubcategories((prev) =>
                            checked ? [...prev, sub] : prev.filter((s) => s !== sub)
                          )
                        }}
                        className="capitalize"
                      >
                        {sub}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              {/* Rows per page */}
              <div className="w-full">
                <Label className="text-brand-reflex-blue">Rows per page</Label>
                <Select value={String(pageSize)} onValueChange={(v) => { setPageSize(Number(v)); setCurrentPage(1) }}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Clear filters/sorting buttons */}
            <div className="flex items-center gap-2">
                {(searchQuery || selectedCategories.length > 0 || selectedSubcategories.length > 0 || statusFilter !== 'all') && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { 
                      setSearchQuery(''); 
                      setSelectedCategories([]); 
                      setSelectedSubcategories([]);
                      setStatusFilter('all');
                    }}
                    className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium"
                  >
                    Clear filters
                  </Button>
                )}
                {sortField && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => { setSortField(null); setSortDirection('asc') }}
                    className="text-gray-600 hover:text-gray-800 hover:bg-gray-100 border border-gray-200 rounded-md px-3 py-1.5 text-sm font-medium"
                  >
                    Clear sorting
                  </Button>
                )}
            </div>
            
            {/* Sorting and count info */}
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div>
                {sortField && (
                  <span className="flex items-center gap-1">
                    Sorted by{' '}
                    <span className="font-medium">
                      {sortField === 'resource_name' ? 'Resource Name' : 
                       sortField === 'category' ? 'Category' : 'Priority'}
                    </span>
                    {sortDirection === 'asc' ? 
                      <ArrowUp className="h-3 w-3" /> : 
                      <ArrowDown className="h-3 w-3" />
                    }
                    ({sortField === 'priority' 
                      ? (sortDirection === 'asc' ? 'Low-High' : 'High-Low')
                      : (sortDirection === 'asc' ? 'A-Z' : 'Z-A')
                    })
                  </span>
                )}
              </div>
              <div>
                {resources.length > 0 && (
                  <span>
                    Showing {Math.min((currentPage - 1) * pageSize + 1, resources.length)}–{Math.min(currentPage * pageSize, resources.length)} of {resources.length} resources in database
                  </span>
                )}
              </div>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Resources</CardTitle>
              <div className="text-sm text-gray-600">
                View-only access. Use CSV import to make changes.
              </div>
            </CardHeader>
            <CardContent>
              {resourceLoading ? (
                <div className="flex items-center justify-center p-8">
                  <RefreshCw className="h-6 w-6 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
                    <div className="inline-block min-w-full align-middle">
                    <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[110px]">Status</TableHead>
                        <TableHead className="w-[45%]">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort('resource_name')}
                            className={`flex items-center gap-1 p-1 px-2 h-auto text-left justify-start font-medium transition-colors rounded-md ${
                              sortField === 'resource_name' 
                                ? 'text-blue-700 bg-blue-50 hover:bg-blue-100' 
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            Resource
                            {sortField === 'resource_name' ? (
                              sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-3 w-3 opacity-40" />
                            )}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            onClick={() => handleSort('category')}
                            className={`flex items-center gap-1 p-1 px-2 h-auto text-left justify-start font-medium transition-colors rounded-md ${
                              sortField === 'category' 
                                ? 'text-blue-700 bg-blue-50 hover:bg-blue-100' 
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            Category
                            {sortField === 'category' ? (
                              sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-3 w-3 opacity-40" />
                            )}
                          </Button>
                        </TableHead>
                        <TableHead>Subcategory</TableHead>
                        <TableHead className="w-[90px] text-center">
                          <Button
                            variant="ghost"
                            onClick={() => handleSort('priority')}
                            className={`flex items-center gap-1 p-1 px-2 h-auto text-center justify-center font-medium mx-auto transition-colors rounded-md ${
                              sortField === 'priority' 
                                ? 'text-blue-700 bg-blue-50 hover:bg-blue-100' 
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                            }`}
                          >
                            Rating
                            {sortField === 'priority' ? (
                              sortDirection === 'asc' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />
                            ) : (
                              <ArrowUpDown className="h-3 w-3 opacity-40" />
                            )}
                          </Button>
                        </TableHead>
                        <TableHead className="w-[140px]">Location</TableHead>
                        <TableHead>Notes</TableHead>
                        <TableHead className="w-[110px] text-center">Links</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {resources
                        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                        .map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              {resource.ready && resource.published ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Published
                                </Badge>
                              ) : resource.ready ? (
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Ready
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-100 text-gray-600 border-gray-200">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Not Ready
                                </Badge>
                              )}
                              {getTranslationStatusBadge(resource.translation_status)}
                            </div>
                          </TableCell>
                          <TableCell className="w-[45%]">
                            <div className="max-w-none">
                              <div className="font-semibold text-brand-reflex-blue">{resource.resource_name}</div>
                              {resource.summary && (
                                <div className="text-sm text-gray-700 whitespace-normal break-words">
                                  {resource.summary}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap items-center gap-1">
                              {(resource.category || '')
                                .split(',')
                                .map((c) => c.trim())
                                .filter(Boolean)
                                .map((cat) => (
                                  <Badge key={`${resource.id}-${cat}`} variant="outline" className="flex items-center gap-1">
                                    {getCategoryIcon(cat)}
                                    <span>{displayCategoryName(cat)}</span>
                                  </Badge>
                                ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {(resource.subcategory || '')
                                .split(',')
                                .map((s) => s.trim())
                                .filter(Boolean)
                                .map((sub) => (
                                  <Badge key={`${resource.id}-sub-${sub}`} variant="outline">{sub}</Badge>
                                ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            {typeof resource.priority === 'number' ? resource.priority : '-'}
                          </TableCell>
                          <TableCell className="w-[140px]">
                            <div className="text-sm text-gray-700 max-w-[120px] truncate" title={resource.physical_location || ''}>
                              {resource.physical_location || '-'}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-700 max-w-[120px] truncate" title={resource.notes || ''}>
                              {resource.notes || '-'}
                            </div>
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-2">
                              {resource.website_link && (
                                <Button asChild size="sm" variant="outline" className="px-2 py-1 text-xs">
                                  <a
                                    href={normalizeUrl(resource.website_link) || undefined}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={normalizeUrl(resource.website_link) || undefined}
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    <span className="sr-only">Visit website</span>
                                  </a>
                                </Button>
                              )}
                              {resource.notes && (
                                <Button variant="ghost" size="sm" title={resource.notes}>
                                  <StickyNote className="h-3 w-3" />
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                    </Table>
                    </div>
                  </div>

                  {resources.length > 0 && (
                    <BrandPagination
                      currentPage={currentPage}
                      totalPages={Math.max(1, Math.ceil(resources.length / pageSize))}
                      onPageChange={(page) => setCurrentPage(page)}
                      showPageNumbers={false}
                      showPageInfo={true}
                    />
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

    </div>
  )
}
