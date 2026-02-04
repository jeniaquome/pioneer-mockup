import { Routes, Route, useNavigate } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Navigation } from '@/components/Navigation'
import { ScrollToTop } from '@/components/ScrollToTop'
import { Footer } from '@/components/Footer'
import { ChatWidget } from '@/components/ChatWidget'
import { Toaster } from '@/components/ui/toaster'
import { HomePage } from '@/pages/HomePage'
import { DashboardPage } from '@/pages/DashboardPage'
import { ScreeningPage } from '@/pages/ScreeningPage'
import { ChecklistPage } from '@/pages/ChecklistPage'
import { ResourcePage } from '@/pages/ResourcePage'
import { ResourceCategoryPage } from '@/pages/ResourceCategoryPage'
import { ResourceSearchPage } from '@/pages/ResourceSearchPage'
import { DashboardPriorityCategoryPage } from '@/pages/DashboardPriorityCategoryPage'
import { BookmarksPage } from '@/pages/BookmarksPage'
import { AboutPage } from '@/pages/AboutPage'
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage'
import { CallbackPage } from '@/pages/CallbackPage'
import ProfilePage from '@/pages/ProfilePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { LoginPage } from '@/pages/LoginPage'
import { RequireAuth } from '@/contexts/Auth0Context'
import { useAutoLanguage } from '@/hooks/use-auto-language'
import { useHtmlLang } from '@/hooks/use-html-lang'
import { useUrlLangParam } from '@/hooks/use-url-lang-param'
import { FloatingFeedbackButton } from '@/components/FloatingFeedbackButton'
import { useEffect } from 'react'
import { useAuth } from '@/contexts/Auth0Context'

// Component to handle onboarding navigation (must be inside Router)
function OnboardingNavigationHandler() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  
  useEffect(() => {
    const handleOnboardingComplete = () => {
      // Only navigate if user is authenticated
      const token = localStorage.getItem('access_token')
      if (isAuthenticated || token) {
        navigate('/dashboard')
      }
    }
    
    window.addEventListener('onboardingComplete', handleOnboardingComplete)
    return () => window.removeEventListener('onboardingComplete', handleOnboardingComplete)
  }, [navigate, isAuthenticated])
  
  return null // This component doesn't render anything
}

// Component to handle logout navigation (must be inside Router)
function LogoutNavigationHandler() {
  const navigate = useNavigate()
  
  useEffect(() => {
    const handleUserLoggedOut = () => {
      navigate('/')
    }
    
    window.addEventListener('userLoggedOut', handleUserLoggedOut)
    return () => window.removeEventListener('userLoggedOut', handleUserLoggedOut)
  }, [navigate])
  
  return null // This component doesn't render anything
}

export function App() {
  // Detect and apply language from URL parameter (?lang=XX) for SEO/hreflang support
  useUrlLangParam()
  
  // Initialize automatic language switching based on user profile
  useAutoLanguage()
  
  // Synchronize HTML lang attribute with current language for accessibility and SEO
  useHtmlLang()

  return (
    <HelmetProvider>
      <OnboardingNavigationHandler />
      <LogoutNavigationHandler />
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
        <Navigation />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Back-compat routes (redirected in DashboardPage) */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            } />
            <Route path="/dashboard/:tab" element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            } />
            {/* New admin dashboard routes */}
            <Route path="/admin-dashboard" element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            } />
            <Route path="/admin-dashboard/:tab" element={
              <RequireAuth>
                <DashboardPage />
              </RequireAuth>
            } />
            <Route path="/screening" element={<ScreeningPage />} />
            {/* Personalized priority category view from dashboard */}
            <Route path="/dashboard/priority/:categoryKey" element={
              <RequireAuth>
                <DashboardPriorityCategoryPage />
              </RequireAuth>
            } />
            {/* Checklist is a public page (legacy personalized view) so users coming from survey can access without logging in */}
            <Route path="/checklist" element={<ChecklistPage />} />
            {/* Global resource search results page */}
            <Route path="/resources/search" element={<ResourceSearchPage />} />
            {/* Support deep-linking to group hubs and grouped tertiary paths */}
            <Route path="/resources/:categoryId/:groupId/:subcategoryId" element={<ResourceCategoryPage />} />
            <Route path="/resources/:categoryId/:subcategoryId" element={<ResourceCategoryPage />} />
            <Route path="/resources/:categoryId" element={<ResourceCategoryPage />} />
            <Route path="/resources" element={<ResourcePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/callback" element={<CallbackPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/profile" element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            } />
            <Route path="/edit" element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            } />
            {/* Catch-all route for 404 - must be last */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
        <ChatWidget />
        <FloatingFeedbackButton />
      </div>
      <Toaster />
    </HelmetProvider>
  )
}
