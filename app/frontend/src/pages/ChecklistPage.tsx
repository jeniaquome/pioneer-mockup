import { Checklist } from '@/components/Checklist'
import { SaveDownloadOptions } from '@/components/SaveDownloadOptions'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Heart, Users, Clock, CheckCircle2, MessageCircle, Loader2, RefreshCw, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { API_BASE_URL } from '@/lib/api'
import { SEO } from '@/components/SEO'
import { generateSectionId } from '@/lib/geo-utils'

interface ChecklistData {
  checklist_id: string
  name: string
  description: string
  profile: {
    audience_type: string
    tech_oriented: boolean
    traditional_immigrant: boolean
    language_needs: string
    urgency_level: string
    support_level: string
  }
  items: any[]
  total_items: number
  created_at: string
}

export function ChecklistPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [checklistData, setChecklistData] = useState<ChecklistData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checklistId, setChecklistId] = useState<string | null>(null)
  const { t } = useTranslation()
  
  // Get checklist ID from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const id = urlParams.get('id') || urlParams.get('checklist_id')
    
    if (id) {
      setChecklistId(id)
      fetchChecklist(id)
    } else {
      // No checklist ID, redirect to screening
      navigate('/screening')
    }
  }, [location.search, navigate])

  const fetchChecklist = async (id: string) => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_BASE_URL}/checklists/${id}`)
      if (!response.ok) {
        if (response.status === 404) {
          setError('Checklist not found. Please complete the screening again.')
          return
        }
        throw new Error('Failed to fetch checklist')
      }
      
      const data = await response.json()
      setChecklistData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleProgressUpdate = (progress: Record<string, any>) => {
    // Progress is automatically saved to backend by the Checklist component
    console.log('Progress updated:', progress)
  }

  const getAudienceTypeDisplay = (audienceType: string) => {
    switch (audienceType) {
      case 'tech_professional': return 'Tech Professional'
      case 'traditional_immigrant': return 'New American'
      case 'mixed': return 'Mixed Background'
      default: return 'Newcomer'
    }
  }

  const getUrgencyDisplay = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'high': return 'Immediate needs'
      case 'medium': return 'Recent arrival'
      case 'low': return 'Planning ahead'
      default: return 'Standard timeline'
    }
  }

  const getUrgencyColor = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-4" />
              <p className="text-lg text-gray-600">{t('checklist.loadingMessage')}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
          <div className="mt-6 text-center flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={() => navigate('/screening')} className="touch-target">
              Take Screening Again
            </Button>
            <Button variant="outline" className="touch-target" onClick={() => checklistId && fetchChecklist(checklistId)}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!checklistData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container max-w-4xl mx-auto py-12 px-4">
          <div className="text-center">
            <p className="text-lg text-gray-600 mb-4">No checklist found.</p>
            <Button onClick={() => navigate('/screening')} className="touch-target">
              Take Screening
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <SEO 
        title={checklistData.name || "Your Personalized Checklist"}
        description={checklistData.description || "Your personalized action plan for settling in Pittsburgh. Track your progress with essential tasks tailored to your needs."}
        keywords="Pittsburgh, checklist, newcomer guide, personalized roadmap, settlement plan, action plan"
        url={`https://www.pittsburghpioneer.com/checklist?id=${checklistId}`}
      />
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="container max-w-4xl mx-auto py-12 px-4">
          {/* Header */}
          <header className="text-center mb-8">
            <h1 id={generateSectionId(checklistData.name)} className="font-montserrat text-4xl font-bold text-amber-700 mb-4">
              {checklistData.name}
            </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            {checklistData.description}
          </p>
          
          {/* Profile Summary */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              <Users className="w-3 h-3 mr-1" />
              {getAudienceTypeDisplay(checklistData.profile.audience_type)}
            </Badge>
            <Badge variant="outline" className={getUrgencyColor(checklistData.profile.urgency_level)}>
              <Clock className="w-3 h-3 mr-1" />
              {getUrgencyDisplay(checklistData.profile.urgency_level)}
            </Badge>
            {checklistData.profile.language_needs !== 'none' && (
              <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                <MessageCircle className="w-3 h-3 mr-1" />
                Language support needed
              </Badge>
            )}
          </div>
        </header>

        {/* Action Bar */}
        <section className="mb-8">
          <SaveDownloadOptions />
        </section>

        {/* Main Content */}
        <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Checklist */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <Checklist 
              items={checklistData.items}
              checklistId={checklistId || undefined}
              onProgressUpdate={handleProgressUpdate}
            />
          </div>

          {/* Sidebar - moved below on mobile, beside on desktop */}
          <div className="space-y-6 order-1 lg:order-2">
            {/* Progress Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="touch-target w-full justify-start" asChild>
                  <Link to="/resources">
                    <Users className="w-4 h-4 mr-2" />
                    Browse All Resources
                  </Link>
                </Button>

                <Button variant="outline" className="touch-target w-full justify-start" onClick={() => navigate('/screening')}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retake Screening
                </Button>
              </CardContent>
            </Card>

            {/* Profile Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm">
                  <span className="font-medium">Audience Type:</span>
                  <br />
                  {getAudienceTypeDisplay(checklistData.profile.audience_type)}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Timeline:</span>
                  <br />
                  {getUrgencyDisplay(checklistData.profile.urgency_level)}
                </div>
                {checklistData.profile.language_needs !== 'none' && (
                  <div className="text-sm">
                    <span className="font-medium">Language Support:</span>
                    <br />
                    {checklistData.profile.language_needs === 'high' ? 'High priority' : 'Professional level'}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Emergency Resources */}
            {checklistData.profile.urgency_level === 'high' && (
              <Card className="border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="text-base text-red-800">Emergency Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-red-700 mb-3">
                    Need immediate help? Here are emergency resources:
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="touch-target w-full justify-start text-red-700 border-red-200">
                      <AlertCircle className="w-4 h-4 mr-2" />
                      Emergency Housing
                    </Button>
                    <Button variant="outline" size="sm" className="touch-target w-full justify-start text-red-700 border-red-200">
                      <Heart className="w-4 h-4 mr-2" />
                      Crisis Support
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      </div>
      </main>
    </>
  )
}
