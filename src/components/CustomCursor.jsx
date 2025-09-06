import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
  const cursorRef = useRef(null)
  const ringRef = useRef(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [cursorType, setCursorType] = useState('default')

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const cursor = cursorRef.current
    const ring = ringRef.current
    if (!cursor || !ring || isMobile) return

    let animationId
    let ringAnimationId

    const updateCursor = () => {
      if (cursor) {
        cursor.style.transform = `translate3d(${mousePosition.x - 8}px, ${mousePosition.y - 8}px, 0)`
      }
      animationId = requestAnimationFrame(updateCursor)
    }

    const updateRing = () => {
      if (ring) {
        ring.style.transform = `translate3d(${mousePosition.x - 20}px, ${mousePosition.y - 20}px, 0) scale(${isHovering ? 1.5 : 1})`
      }
      ringAnimationId = requestAnimationFrame(updateRing)
    }

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseEnter = (e) => {
      if (e.target.closest('button, a, input, textarea, [data-cursor-hover], .cursor-hover')) {
        setIsHovering(true)
        
        // Determine cursor type based on element
        if (e.target.closest('button')) {
          setCursorType('button')
        } else if (e.target.closest('a')) {
          setCursorType('link')
        } else if (e.target.closest('input, textarea')) {
          setCursorType('text')
        } else {
          setCursorType('hover')
        }
      }
    }

    const handleMouseOut = (e) => {
      if (e.target.closest('button, a, input, textarea, [data-cursor-hover], .cursor-hover')) {
        setIsHovering(false)
        setCursorType('default')
      }
    }

    // Start animations
    updateCursor()
    updateRing()

    // Event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseEnter)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('resize', checkMobile)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseEnter)
      document.removeEventListener('mouseout', handleMouseOut)
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
      if (ringAnimationId) {
        cancelAnimationFrame(ringAnimationId)
      }
    }
  }, [mousePosition, isHovering, isMobile])

  // Don't render custom cursor on mobile
  if (isMobile) return null

  return (
    <>
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className={`fixed pointer-events-none z-[9999] transition-all duration-300 ${
          isHovering 
            ? cursorType === 'button' 
              ? 'w-12 h-12 bg-primary-light/30 border-2 border-primary-light' 
              : cursorType === 'link'
              ? 'w-12 h-12 bg-primary-dark/30 border-2 border-primary-dark'
              : cursorType === 'text'
              ? 'w-2 h-6 bg-primary-dark border-2 border-white'
              : 'w-12 h-12 bg-primary-dark/30 border-2 border-primary-dark'
            : isClicking
            ? 'w-6 h-6 bg-primary-dark border-2 border-white'
            : 'w-4 h-4 bg-primary-dark border-2 border-white'
        } ${
          cursorType === 'text' ? 'rounded-sm' : 'rounded-full'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease, width 0.3s ease, height 0.3s ease, border-radius 0.3s ease'
        }}
      />
      
      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] w-20 h-20 border border-primary-dark/20 rounded-full transition-all duration-300"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.2s ease, transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }}
      />
    </>
  )
}

export default CustomCursor
