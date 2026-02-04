import { useState, useEffect } from 'react'

/**
 * Breakpoint definitions matching Tailwind config
 * xs: 475px - Extra small devices
 * sm: 640px - Small devices (landscape phones)
 * md: 768px - Medium devices (tablets)
 * lg: 1024px - Large devices (desktops)
 * xl: 1280px - Extra large devices
 * 2xl: 1536px - 2X Extra large devices
 */
export const BREAKPOINTS = {
  xs: 475,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const

export type Breakpoint = keyof typeof BREAKPOINTS
export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/**
 * Hook to detect current breakpoint
 * Returns the current breakpoint name and device type
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('lg')
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth

      let currentBreakpoint: Breakpoint = 'xs'
      
      // Determine breakpoint
      if (width >= BREAKPOINTS['2xl']) {
        currentBreakpoint = '2xl'
      } else if (width >= BREAKPOINTS.xl) {
        currentBreakpoint = 'xl'
      } else if (width >= BREAKPOINTS.lg) {
        currentBreakpoint = 'lg'
      } else if (width >= BREAKPOINTS.md) {
        currentBreakpoint = 'md'
      } else if (width >= BREAKPOINTS.sm) {
        currentBreakpoint = 'sm'
      } else if (width >= BREAKPOINTS.xs) {
        currentBreakpoint = 'xs'
      }

      // Determine device type
      let currentDeviceType: DeviceType = 'mobile'
      if (width >= BREAKPOINTS.lg) {
        currentDeviceType = 'desktop'
      } else if (width >= BREAKPOINTS.md) {
        currentDeviceType = 'tablet'
      }

      setBreakpoint(currentBreakpoint)
      setDeviceType(currentDeviceType)
    }

    // Initial update
    updateBreakpoint()

    // Listen for resize events
    window.addEventListener('resize', updateBreakpoint)
    
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return { breakpoint, deviceType }
}

/**
 * Hook to check if viewport is at or above a specific breakpoint
 */
export function useMediaQuery(breakpoint: Breakpoint) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const minWidth = BREAKPOINTS[breakpoint]
    const mql = window.matchMedia(`(min-width: ${minWidth}px)`)
    
    const updateMatches = () => {
      setMatches(mql.matches)
    }

    updateMatches()
    mql.addEventListener('change', updateMatches)
    
    return () => mql.removeEventListener('change', updateMatches)
  }, [breakpoint])

  return matches
}

/**
 * Hook to detect if device is mobile (< 768px)
 * Maintains backward compatibility with existing useIsMobile
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINTS.md - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < BREAKPOINTS.md)
    }
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < BREAKPOINTS.md)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}

/**
 * Hook to detect if device is tablet (768px - 1023px)
 */
export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const updateTablet = () => {
      const width = window.innerWidth
      setIsTablet(width >= BREAKPOINTS.md && width < BREAKPOINTS.lg)
    }

    updateTablet()
    window.addEventListener('resize', updateTablet)
    
    return () => window.removeEventListener('resize', updateTablet)
  }, [])

  return isTablet
}

/**
 * Hook to detect if device is desktop (>= 1024px)
 */
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${BREAKPOINTS.lg}px)`)
    const onChange = () => {
      setIsDesktop(window.innerWidth >= BREAKPOINTS.lg)
    }
    mql.addEventListener('change', onChange)
    setIsDesktop(window.innerWidth >= BREAKPOINTS.lg)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return isDesktop
}

/**
 * Hook to check if device supports touch
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch(
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      // @ts-ignore - for older browsers
      navigator.msMaxTouchPoints > 0
    )
  }, [])

  return isTouch
}

