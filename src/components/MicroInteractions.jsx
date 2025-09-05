import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

// Ripple Effect Component
export const RippleButton = ({ 
  children, 
  className = "",
  onClick = () => {},
  disabled = false,
  ...props
}) => {
  const [ripples, setRipples] = useState([])
  const buttonRef = useRef(null)

  const createRipple = (event) => {
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }

  const handleClick = (event) => {
    if (!disabled) {
      createRipple(event)
      onClick(event)
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      ))}
    </motion.button>
  )
}

// Magnetic Button Component
export const MagneticButton = ({ 
  children, 
  className = "",
  strength = 0.3,
  onClick = () => {},
  ...props
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef(null)

  const handleMouseMove = (e) => {
    const button = buttonRef.current
    const rect = button.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    setPosition({ x: deltaX, y: deltaY })
  }

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

// Flip Card Component
export const FlipCard = ({ 
  front, 
  back, 
  className = "",
  flipOnHover = true,
  flipOnClick = false
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    if (flipOnClick) {
      setIsFlipped(!isFlipped)
    }
  }

  return (
    <motion.div
      className={`relative w-full h-full ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onHoverStart={() => flipOnHover && setIsFlipped(true)}
      onHoverEnd={() => flipOnHover && setIsFlipped(false)}
      onClick={handleFlip}
      whileHover={{ scale: 1.02 }}
    >
      {/* Front */}
      <motion.div
        className="absolute inset-0 w-full h-full backface-hidden"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {front}
      </motion.div>
      
      {/* Back */}
      <motion.div
        className="absolute inset-0 w-full h-full backface-hidden"
        animate={{ rotateY: isFlipped ? 0 : -180 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transform: "rotateY(180deg)" }}
      >
        {back}
      </motion.div>
    </motion.div>
  )
}

// Loading Spinner Component
export const LoadingSpinner = ({ 
  size = 40, 
  color = "primary-dark",
  className = ""
}) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    >
      <div
        className={`border-4 border-${color}/20 border-t-${color} rounded-full`}
        style={{ width: size, height: size }}
      />
    </motion.div>
  )
}

// Skeleton Loader Component
export const SkeletonLoader = ({ 
  width = "100%", 
  height = "20px", 
  className = ""
}) => {
  return (
    <motion.div
      className={`bg-gray-200 rounded ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  )
}

// Pulse Effect Component
export const PulseEffect = ({ 
  children, 
  intensity = 0.1,
  duration = 2,
  className = ""
}) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1 + intensity, 1],
        opacity: [0.8, 1, 0.8]
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Shake Effect Component
export const ShakeEffect = ({ 
  children, 
  trigger = false,
  intensity = 10,
  className = ""
}) => {
  return (
    <motion.div
      className={className}
      animate={trigger ? {
        x: [0, -intensity, intensity, -intensity, intensity, 0],
        y: [0, intensity, -intensity, intensity, -intensity, 0]
      } : {}}
      transition={{
        duration: 0.5,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Bounce Effect Component
export const BounceEffect = ({ 
  children, 
  trigger = false,
  className = ""
}) => {
  return (
    <motion.div
      className={className}
      animate={trigger ? {
        y: [0, -20, 0],
        scale: [1, 1.1, 1]
      } : {}}
      transition={{
        duration: 0.6,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}
