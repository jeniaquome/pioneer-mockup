import { useState, useEffect, useCallback } from 'react'

interface UseResponsiveTextOptions {
  baseSize?: number
  maxSize?: number
  minSize?: number
  textLength?: number
  containerWidth?: number
}

export function useResponsiveText({
  baseSize = 16,
  maxSize = 32,
  minSize = 12,
  textLength = 0,
  containerWidth = window.innerWidth
}: UseResponsiveTextOptions = {}) {
  const [fontSize, setFontSize] = useState(baseSize)
  const [isOverflowing, setIsOverflowing] = useState(false)

  const calculateOptimalSize = useCallback(() => {
    // Base calculation on viewport width
    const viewportWidth = window.innerWidth
    const viewportMultiplier = viewportWidth / 1200 // Normalize against a 1200px baseline
    
    // Adjust for text length (longer text should be smaller)
    const lengthFactor = textLength > 100 ? 0.8 : textLength > 50 ? 0.9 : 1
    
    // Calculate responsive size
    let calculatedSize = baseSize * viewportMultiplier * lengthFactor
    
    // Apply min/max constraints
    calculatedSize = Math.max(minSize, Math.min(maxSize, calculatedSize))
    
    return calculatedSize
  }, [baseSize, maxSize, minSize, textLength])

  const checkOverflow = useCallback((element: HTMLElement | null) => {
    if (!element) return false
    
    const isHorizontalOverflow = element.scrollWidth > element.clientWidth
    const isVerticalOverflow = element.scrollHeight > element.clientHeight
    
    return isHorizontalOverflow || isVerticalOverflow
  }, [])

  const adjustFontSize = useCallback((element: HTMLElement | null) => {
    if (!element) return
    
    let currentSize = fontSize
    let attempts = 0
    const maxAttempts = 10
    
    // Check if text is overflowing and reduce font size if needed
    while (checkOverflow(element) && currentSize > minSize && attempts < maxAttempts) {
      currentSize *= 0.9
      element.style.fontSize = `${currentSize}px`
      attempts++
    }
    
    setFontSize(currentSize)
    setIsOverflowing(checkOverflow(element))
  }, [fontSize, minSize, checkOverflow])

  useEffect(() => {
    const handleResize = () => {
      const newSize = calculateOptimalSize()
      setFontSize(newSize)
    }

    handleResize() // Calculate initial size
    window.addEventListener('resize', handleResize)
    
    return () => window.removeEventListener('resize', handleResize)
  }, [calculateOptimalSize])

  return {
    fontSize,
    isOverflowing,
    adjustFontSize,
    calculateOptimalSize
  }
}

// Hook specifically for text that needs to fit within a container
export function useFitText(containerRef: React.RefObject<HTMLElement>, text: string) {
  const [scale, setScale] = useState(1)
  
  useEffect(() => {
    const container = containerRef.current
    if (!container || !text) return
    
    const checkFit = () => {
      // Reset scale
      container.style.transform = 'scale(1)'
      
      // Check if content overflows
      const containerRect = container.getBoundingClientRect()
      const parentRect = container.parentElement?.getBoundingClientRect()
      
      if (!parentRect) return
      
      const widthScale = parentRect.width / containerRect.width
      const heightScale = parentRect.height / containerRect.height
      const newScale = Math.min(widthScale, heightScale, 1)
      
      if (newScale < 1) {
        setScale(newScale)
        container.style.transform = `scale(${newScale})`
        container.style.transformOrigin = 'center center'
      }
    }
    
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(checkFit)
    
    const resizeObserver = new ResizeObserver(checkFit)
    resizeObserver.observe(container)
    
    return () => resizeObserver.disconnect()
  }, [containerRef, text])
  
  return scale
} 