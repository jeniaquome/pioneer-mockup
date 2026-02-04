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
  const [isScrolled, setIsScrolled] = useState(false)

  // Check if we're on the homepage for transparent header
  const isHomePage = location.pathname === '/'

  // Handle scroll for header background transition
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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

  // Mockup-style navigation items for public users - links to page sections
  const publicNavItems = [
    { label: t('nav.story', 'THE STORY'), to: '/#story' },
    { label: t('nav.resources', 'RESOURCES'), to: '/#resources' },
    { label: t('nav.gallery', 'GALLERY'), to: '/#gallery' },
  ]

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { label: t('nav.dashboard'), to: '/dashboard' },
    { label: t('nav.bookmarks'), to: '/bookmarks' },
    { label: t('nav.resources', 'RESOURCES'), to: '/resources' },
    { label: t('nav.pioneerStory', 'THE PIONEER STORY'), to: '/about' },
  ]

  // Admin navigation items
  const adminNavItems = [
    { label: t('nav.adminDashboard'), to: '/dashboard' },
    { label: t('nav.bookmarks'), to: '/bookmarks' },
    { label: t('nav.resources', 'RESOURCES'), to: '/resources' },
    { label: t('nav.pioneerStory', 'THE PIONEER STORY'), to: '/about' },
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

  // Determine header styling based on page and scroll state
  const headerClasses = isHomePage && !isScrolled && !isMobileMenuOpen
    ? 'fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-none transition-all duration-500'
    : 'fixed top-0 left-0 right-0 z-50 bg-brand-reflex-blue/95 backdrop-blur-md shadow-lg transition-all duration-500'

  // Text color classes based on state
  const textColorClass = isHomePage && !isScrolled && !isMobileMenuOpen
    ? 'text-white'
    : 'text-white'

  const linkHoverClass = isHomePage && !isScrolled && !isMobileMenuOpen
    ? 'hover:text-brand-pms-129'
    : 'hover:text-brand-pms-129'

  return (
    <header className={headerClasses}>
      <nav className="container mx-auto flex h-20 md:h-24 items-center justify-between px-6 lg:px-12" data-nosnippet>
        {/* Logo - Use SVG logo with white filter on dark/transparent */}
        <Link to="/" className="flex items-center group interactive-element flex-shrink-0" onClick={closeMobileMenu}>
          <img
            src="/branding/assets/logo-0.svg"
            alt="Pittsburgh Tomorrow Pioneer Logo"
            className="h-10 md:h-12 w-auto object-contain brightness-0 invert hover:opacity-90 transition-opacity duration-200"
            style={{ minHeight: '40px', maxWidth: '280px' }}
          />
        </Link>

        {/* Desktop Navigation - Only show on LG screens (1024px+) */}
        <div className="hidden lg:flex items-center gap-10">
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
                            className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 interactive-element whitespace-nowrap flex items-center gap-1 ${textColorClass} ${linkHoverClass}`}
                            id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {currentLabel}
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-48 bg-brand-reflex-blue border-white/10">
                          <DropdownMenuItem
                            onClick={() => {
                              // Update localStorage to persist the view choice
                              const newView = targetPath.includes('personalized') ? 'personalized' : 'admin'
                              localStorage.setItem('admin-dashboard-view', newView)
                              navigate(targetPath)
                            }}
                            className="cursor-pointer text-white hover:text-brand-pms-129 hover:bg-white/10"
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
                        className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 interactive-element whitespace-nowrap ${textColorClass} ${linkHoverClass} bg-transparent border-none cursor-pointer`}
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
                    className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 interactive-element whitespace-nowrap ${textColorClass} ${linkHoverClass}`}
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
          <div className="scale-90 origin-center">
            <LanguageSelector />
          </div>

          {/* Authentication Section */}
          {!isLoading && (
            <div className="flex items-center gap-4">
              {isAuthenticated && user ? (
                // Authenticated User Menu
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className={`flex items-center gap-3 h-10 px-3 interactive-element hover:bg-white/10 rounded-lg ${textColorClass}`}>
                      <div className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: profileColor }}>
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left hidden xl:block">
                        <div className="text-sm font-medium">
                          {user.first_name ? `${user.first_name} ${user.last_name || ''}`.trim() : user.username}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 shadow-lg bg-brand-reflex-blue border-white/10">
                    <div className="px-3 py-2">
                      <p className="text-sm font-medium text-white">{user.username}</p>
                      <p className="text-xs text-white/60">{user.email}</p>
                    </div>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 text-white hover:text-brand-pms-129 hover:bg-white/10 interactive-element">
                        <Settings className="h-4 w-4" />
                        {t('nav.accountSettings')}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-white/10" />
                    <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 interactive-element">
                      <LogOut className="h-4 w-4" />
                      {t('nav.signOut')}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-4">
                  {/* Get Your Guide CTA - Mockup style */}
                  <Link to="/screening" className="interactive-element">
                    <Button
                      className="bg-brand-pms-129 hover:bg-brand-pms-179 text-brand-reflex-blue font-black uppercase tracking-[0.15em] text-[11px] px-6 py-2.5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      {t('nav.getYourGuide', 'GET YOUR GUIDE')}
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile/Tablet Menu Button and Quick Actions - Show up to LG screens */}
        <div className="lg:hidden flex items-center gap-3">
          <LanguageSelector />

          {/* Hamburger Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`p-2 md:p-3 hover:bg-white/10 rounded-lg interactive-element touch-target flex-shrink-0 ${textColorClass}`}
            onClick={toggleMobileMenu}
            aria-label={t('common.toggleMobileMenu')}
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>

          {/* Mobile User Menu for authenticated users - separate dropdown */}
          {!isLoading && isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`flex items-center gap-2 interactive-element hover:bg-white/10 rounded-lg p-2 md:p-3 touch-target flex-shrink-0`}
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: profileColor }}>
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 shadow-lg bg-brand-reflex-blue border-white/10">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium text-white">{user.username}</p>
                  <p className="text-xs text-white/60">{user.email}</p>
                </div>
                <DropdownMenuSeparator className="bg-white/10" />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="flex items-center gap-2 text-white hover:text-brand-pms-129 hover:bg-white/10 interactive-element">
                    <Settings className="h-4 w-4" />
                    {t('nav.settings')}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-300 hover:text-red-200 hover:bg-red-500/10 interactive-element">
                  <LogOut className="h-4 w-4" />
                  {t('nav.signOut')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </nav>

      {/* Mobile/Tablet Menu - Show up to LG screens */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-brand-reflex-blue/95 backdrop-blur-md border-t border-white/10 shadow-lg" data-nosnippet>
          <div className="container mx-auto px-6 py-6">
            {/* Mobile menu Get Your Guide CTA (hidden when authenticated) */}
            {!isAuthenticated && (
              <div className="mb-6">
                <Link
                  to="/screening"
                  onClick={closeMobileMenu}
                  className="block w-full"
                >
                  <button
                    className="w-full bg-brand-pms-129 hover:bg-brand-pms-179 text-brand-reflex-blue font-black uppercase tracking-[0.15em] text-sm rounded-full px-6 py-4 shadow-lg transition-all duration-300 touch-target"
                  >
                    {t('nav.getYourGuide', 'GET YOUR GUIDE')}
                  </button>
                </Link>
              </div>
            )}
            <ul className="space-y-1">
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
                              className="w-full px-4 py-4 rounded-lg text-left text-white text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-200 interactive-element whitespace-nowrap flex items-center justify-between hover:bg-white/10"
                              style={{ minHeight: '44px' }}
                            >
                              {currentLabel}
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="start" className="w-48 bg-brand-reflex-blue border-white/10">
                            <DropdownMenuItem
                              onClick={() => {
                                // Update localStorage to persist the view choice
                                const newView = targetPath.includes('personalized') ? 'personalized' : 'admin'
                                localStorage.setItem('admin-dashboard-view', newView)
                                navigate(targetPath)
                                closeMobileMenu()
                              }}
                              className="cursor-pointer text-white hover:text-brand-pms-129 hover:bg-white/10"
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
                          className="block w-full px-4 py-4 rounded-lg text-left text-white text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-200 interactive-element whitespace-nowrap hover:bg-white/10 bg-transparent border-none cursor-pointer"
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
                      className="block w-full px-4 py-4 rounded-lg text-left text-white text-[12px] font-black uppercase tracking-[0.2em] transition-all duration-200 interactive-element whitespace-nowrap hover:bg-white/10 hover:text-brand-pms-129"
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
              <div className="mt-6 pt-6 border-t border-white/10">
                <button
                  onClick={() => {
                    closeMobileMenu()
                    handleLogin()
                  }}
                  className="w-full touch-target text-center py-4 rounded-full text-white text-[12px] font-black uppercase tracking-[0.2em] border-2 border-white/30 hover:bg-white/10 hover:border-white/50 transition-all duration-200"
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
