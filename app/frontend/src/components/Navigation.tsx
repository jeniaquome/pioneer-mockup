import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/Auth0Context'
import { useAuth0 } from '@auth0/auth0-react'
import { User, LogOut, Settings, Menu, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useState, useMemo, useEffect } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

// Brand colors for profile icons
const PROFILE_COLORS = [
  '#4987C6', 
]

// Generate a consistent color based on user ID
const getUserColor = (userId: string | number | undefined): string => {
  if (!userId) return PROFILE_COLORS[0]
  
  // Convert to string if it's a number
  const userIdStr = String(userId)
  
  // Simple hash function to convert user ID to a number
  let hash = 0
  for (let i = 0; i < userIdStr.length; i++) {
    hash = userIdStr.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  // Use the hash to select a color
  const index = Math.abs(hash) % PROFILE_COLORS.length
  return PROFILE_COLORS[index]
}

export function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout, isLoading } = useAuth()
  const { loginWithRedirect } = useAuth0()
  const { t } = useTranslation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Sync localStorage with URL when on dashboard pages to maintain persistence
  useEffect(() => {
    if (user?.role === 'admin') {
      const isOnDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin-dashboard')

      if (isOnDashboard) {
        // Sync localStorage with current URL state
        const searchParams = new URLSearchParams(location.search)
        const urlView = searchParams.get('view')
        if (urlView === 'personalized') {
          localStorage.setItem('admin-dashboard-view', 'personalized')
        } else {
          // No query param or 'admin' means admin view
          localStorage.setItem('admin-dashboard-view', 'admin')
        }
      }
    }
  }, [user?.role, location.pathname, location.search])

  // Determine if admin is viewing personalized dashboard (with localStorage persistence)
  const isViewingPersonalizedDashboard = useMemo(() => {
    if (user?.role === 'admin') {
      const isOnDashboard = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin-dashboard')

      if (isOnDashboard) {
        // When on dashboard pages, URL parameters take precedence
        const searchParams = new URLSearchParams(location.search)
        const urlView = searchParams.get('view')
        if (urlView === 'personalized') {
          return true
        }
        if (urlView === null || urlView === 'admin') {
          return false
        }
      }

      // When not on dashboard pages, use localStorage for persistence
      const storedView = localStorage.getItem('admin-dashboard-view')
      if (storedView === 'personalized') {
        return true
      }
      // Default to admin view if no preference stored
      return false
    }
    return false
  }, [user?.role, location.pathname, location.search])
  
  // Get consistent color for this user
  const profileColor = useMemo(() => getUserColor(user?.id), [user?.id])

  // Navigation items for non-authenticated users
  const publicNavItems = [
    { label: t('nav.home'), to: '/' },
    { label: t('nav.resources'), to: '/resources' },
    { label: t('nav.about'), to: '/about' },
  ]

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { label: t('nav.dashboard'), to: '/dashboard' },
    { label: t('nav.bookmarks'), to: '/bookmarks' },
    { label: t('nav.home'), to: '/' },
    { label: t('nav.resources'), to: '/resources' },
    { label: t('nav.about'), to: '/about' },
  ]

  // Admin navigation items
  const adminNavItems = [
    { label: t('nav.adminDashboard'), to: '/dashboard' },
    { label: t('nav.bookmarks'), to: '/bookmarks' },
    { label: t('nav.home'), to: '/' },
    { label: t('nav.resources'), to: '/resources' },
    { label: t('nav.about'), to: '/about' },
  ]

  const navItems = isAuthenticated 
    ? (user?.role === 'admin' ? adminNavItems : authenticatedNavItems)
    : publicNavItems

  const handleLogout = () => {
    logout()
  }

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
      authorizationParams: {
        prompt: "login",
      },
    })
  }


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="bg-white border-b-2 border-brand-pms-285 sticky top-0 z-50 shadow-sm">
      <nav className="container mx-auto flex h-16 md:h-18 xl:h-20 items-center justify-between px-4 sm:px-6" data-nosnippet>
        {/* Logo with proper clear space - 120% larger */}
        <Link to="/" className="flex items-center group interactive-element py-1.5 xl:py-2 px-2 flex-shrink-0" onClick={closeMobileMenu}>
          <img 
            src="/branding/assets/logo-0.svg" 
            alt="Pittsburgh Tomorrow Pioneer Logo" 
            className="h-11 md:h-14 xl:h-24 w-auto object-contain hover:scale-105 transition-transform duration-200" 
            style={{ minHeight: '43px', maxWidth: '312px' }}
          />
        </Link>

        {/* Desktop Navigation - Only show on XL screens (1280px+) */}
        <div className="hidden xl:flex items-center gap-8">
          {/* Main Navigation Links */}
          <ul className="flex gap-8 items-center">
            {navItems.map((item) => {
              // Special handling for Admin Dashboard - conditional dropdown
              if (item.label === t('nav.adminDashboard') && user?.role === 'admin') {
                // Check if we're on any dashboard page (admin or personalized)
                const isActive = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin-dashboard')

                if (isActive) {
                  // Show dropdown for switching views when on dashboard pages
                  const currentLabel = isViewingPersonalizedDashboard ? t('nav.dashboard') : t('nav.adminDashboard')
                  const targetLabel = isViewingPersonalizedDashboard ? t('nav.adminDashboard') : t('nav.dashboard')
                  // When on personalized, switch to admin (no query param). When on admin, switch to personalized (with query param)
                  const targetPath = isViewingPersonalizedDashboard ? '/dashboard' : '/dashboard?view=personalized'

                  return (
                    <li key={item.to}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className={
                              'brand-accent font-medium px-4 py-2 rounded-md transition-all duration-200 interactive-element whitespace-nowrap flex items-center gap-1 ' +
                              (isActive
                                ? 'text-white bg-brand-reflex-blue shadow-md'
                                : 'text-brand-reflex-blue hover:text-white hover:bg-brand-pms-285 hover:shadow-md')
                            }
                            id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {currentLabel}
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48">
                          <DropdownMenuItem
                            onClick={() => {
                              // Update localStorage to persist the view choice
                              const newView = targetPath.includes('personalized') ? 'personalized' : 'admin'
                              localStorage.setItem('admin-dashboard-view', newView)
                              navigate(targetPath)
                            }}
                            className="cursor-pointer"
                          >
                            {targetLabel}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  )
                } else {
                  // Show regular link when not on dashboard pages
                  // Use isViewingPersonalizedDashboard (which checks localStorage) to determine label and navigation
                  const linkLabel = isViewingPersonalizedDashboard ? t('nav.dashboard') : t('nav.adminDashboard')
                  
                  return (
                    <li key={item.to}>
                      <button
                        onClick={() => {
                          // Use stored preference or default to admin view
                          if (isViewingPersonalizedDashboard) {
                            navigate('/dashboard?view=personalized')
                          } else {
                            navigate('/dashboard')
                          }
                        }}
                        className={
                          'brand-accent font-medium px-4 py-2 rounded-md transition-all duration-200 interactive-element whitespace-nowrap ' +
                          'text-brand-reflex-blue hover:text-white hover:bg-brand-pms-285 hover:shadow-md bg-transparent border-none cursor-pointer'
                        }
                        id={`nav-link-admin-dashboard`}
                      >
                        {linkLabel}
                      </button>
                    </li>
                  )
                }
              }
              
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={
                      'brand-accent font-medium px-4 py-2 rounded-md transition-all duration-200 interactive-element whitespace-nowrap ' +
                      ((item.to === '/dashboard' && location.pathname.startsWith('/dashboard')) || location.pathname === item.to
                        ? 'text-white bg-brand-reflex-blue shadow-md' 
                        : 'text-brand-reflex-blue hover:text-white hover:bg-brand-pms-285 hover:shadow-md')
                    }
                    aria-current={((item.to === '/dashboard' && location.pathname.startsWith('/dashboard')) || location.pathname === item.to) ? 'page' : undefined}
                    id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* Language Selector */}
          <div className="scale-95 origin-center">
            <LanguageSelector />
          </div>

          

          {/* Authentication Section */}
          {!isLoading && (
            <div className="flex items-center gap-4 border-l-2 border-brand-pms-290 pl-6">
              {isAuthenticated && user ? (
                // Authenticated User Menu
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-3 h-10 px-3 interactive-element hover:bg-brand-pms-290 rounded-lg">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: profileColor }}>
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <div className="text-sm font-medium text-brand-reflex-blue brand-accent">
                          {user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.username}
                        </div>
                        <div className="text-xs text-gray-600 brand-accent">{user.email}</div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 shadow-lg border-brand-pms-290">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-brand-reflex-blue brand-accent">{user.username}</p>
                      <p className="text-xs text-gray-600 brand-accent">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 text-brand-reflex-blue hover:bg-brand-pms-290 interactive-element">
                        <Settings className="h-4 w-4" />
                        {t('nav.accountSettings')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-brand-pms-179 hover:bg-red-50 interactive-element">
                      <LogOut className="h-4 w-4" />
                      {t('nav.signOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-4">
                <Button 
                  className="touch-target px-5 py-2 shadow-md hover:shadow-lg transition-all duration-200 text-white font-medium text-sm md:text-base hover:scale-105"
                    style={{ backgroundColor: '#2E3192' }}
                    onClick={handleLogin}
                  >
                    {t('nav.signIn')}
                  </Button>
                  {/* Get Started CTA - to the right of Login, only when not authenticated */}
                  <Link to="/screening" className="interactive-element">
                    <Button
                      size="sm"
                      className="bg-brand-pms-267 hover:bg-brand-pms-265 text-white font-brand-accent font-extrabold shadow-none transition-colors duration-200 px-4 text-sm md:text-base touch-target"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {t('homepage.getStarted')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile/Tablet Menu Button and Quick Actions - Show up to XL screens */}
        <div className="xl:hidden flex items-center gap-1 md:gap-3">
          {/* Hamburger Menu Button - Left side for better thumb reach */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 md:p-3 hover:bg-brand-pms-285 rounded-lg interactive-element touch-target flex-shrink-0"
            onClick={toggleMobileMenu}
            aria-label={t('common.toggleMobileMenu')}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 md:h-6 md:w-6 text-brand-reflex-blue hover:text-white" />
            ) : (
              <Menu className="h-5 w-5 md:h-6 md:w-6 text-brand-reflex-blue hover:text-white" />
            )}
          </Button>

          <LanguageSelector />
          
          {/* Mobile User Menu for authenticated users - separate dropdown */}
          {!isLoading && isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex items-center gap-2 interactive-element hover:bg-brand-pms-290 rounded-lg p-2 md:p-3 touch-target flex-shrink-0"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <div className="w-7 h-7 md:w-10 md:h-10 bg-brand-pms-285 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-lg">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-brand-reflex-blue brand-accent">{user.username}</p>
                  <p className="text-xs text-gray-600 brand-accent">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 text-brand-reflex-blue hover:bg-brand-pms-290 interactive-element">
                    <Settings className="h-4 w-4" />
                    {t('nav.settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-brand-pms-179 hover:bg-red-50 interactive-element">
                  <LogOut className="h-4 w-4" />
                  {t('nav.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>

      {/* Mobile/Tablet Menu - Show up to XL screens */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-brand-pms-285 shadow-lg" data-nosnippet>
          <div className="container mx-auto px-4 py-4">
              {/* Mobile menu Get Started CTA (hidden when authenticated) */}
              {!isAuthenticated && (
                <div className="mb-3">
                  <Link
                    to="/screening"
                    onClick={closeMobileMenu}
                    className="block w-full"
                  >
                    <button
                      className="w-full bg-brand-pms-267 hover:bg-brand-pms-265 text-white font-brand-accent font-extrabold rounded-md px-4 py-3 shadow-none transition-colors duration-200 touch-target"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {t('homepage.getStarted')}
                    </button>
                  </Link>
                </div>
              )}
            <ul className="space-y-2">
              {navItems.map((item) => {
                // Special handling for Admin Dashboard - conditional dropdown
                if (item.label === t('nav.adminDashboard') && user?.role === 'admin') {
                  // Check if we're on any dashboard page (admin or personalized)
                  const isActive = location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/admin-dashboard')

                  if (isActive) {
                    // Show dropdown for switching views when on dashboard pages
                    const currentLabel = isViewingPersonalizedDashboard ? t('nav.dashboard') : t('nav.adminDashboard')
                    const targetLabel = isViewingPersonalizedDashboard ? t('nav.adminDashboard') : t('nav.dashboard')
                    // When on personalized, switch to admin (no query param). When on admin, switch to personalized (with query param)
                    const targetPath = isViewingPersonalizedDashboard ? '/dashboard' : '/dashboard?view=personalized'

                    return (
                      <li key={item.to}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className={
                                'w-full px-4 py-3 rounded-md text-left brand-accent font-medium transition-all duration-200 interactive-element whitespace-nowrap flex items-center justify-between ' +
                                (isActive
                                  ? 'text-white bg-brand-reflex-blue shadow-md'
                                  : 'text-brand-reflex-blue hover:text-white hover:bg-brand-pms-285')
                              }
                              style={{ minHeight: '44px' }}
                            >
                              {currentLabel}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48">
                            <DropdownMenuItem
                              onClick={() => {
                                // Update localStorage to persist the view choice
                                const newView = targetPath.includes('personalized') ? 'personalized' : 'admin'
                                localStorage.setItem('admin-dashboard-view', newView)
                                navigate(targetPath)
                                closeMobileMenu()
                              }}
                              className="cursor-pointer"
                            >
                              {targetLabel}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </li>
                    )
                  } else {
                    // Show regular link when not on dashboard pages
                    // Use isViewingPersonalizedDashboard (which checks localStorage) to determine label and navigation
                    const linkLabel = isViewingPersonalizedDashboard ? t('nav.dashboard') : t('nav.adminDashboard')
                    
                    return (
                      <li key={item.to}>
                        <button
                          onClick={() => {
                            // Use stored preference or default to admin view
                            if (isViewingPersonalizedDashboard) {
                              navigate('/dashboard?view=personalized')
                            } else {
                              navigate('/dashboard')
                            }
                            closeMobileMenu()
                          }}
                          className={
                            'block w-full px-4 py-3 rounded-md text-left brand-accent font-medium transition-all duration-200 interactive-element whitespace-nowrap ' +
                            'text-brand-reflex-blue hover:text-white hover:bg-brand-pms-285 bg-transparent border-none cursor-pointer'
                          }
                          style={{ minHeight: '44px' }}
                        >
                          {linkLabel}
                        </button>
                      </li>
                    )
                  }
                }
                
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={
                        'block w-full px-4 py-3 rounded-md text-left brand-accent font-medium transition-all duration-200 interactive-element whitespace-nowrap ' +
                        ((item.to === '/dashboard' && location.pathname.startsWith('/dashboard')) || location.pathname === item.to
                          ? 'text-white bg-brand-reflex-blue shadow-md' 
                          : 'text-brand-reflex-blue hover:text-white hover:bg-brand-pms-285')
                      }
                      style={{ minHeight: '44px' }}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>

            {/* Mobile Menu Auth Button for non-authenticated users only */}
            {!isAuthenticated && (
              <div className="mt-6 pt-4 border-t border-brand-pms-290">
                <button 
                  onClick={() => {
                    closeMobileMenu()
                    handleLogin()
                  }} 
                  className="w-full touch-target text-center py-3 rounded-md text-white font-medium text-base shadow-md hover:shadow-lg transition-all duration-200"
                  style={{ backgroundColor: '#2E3192' }}
                >
                  {t('nav.signIn')}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
