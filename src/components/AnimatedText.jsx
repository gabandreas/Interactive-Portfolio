import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// Typewriter Effect Component
export const TypewriterText = ({ 
  text, 
  speed = 100, 
  delay = 0, 
  className = "",
  onComplete = () => {}
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)
      return () => clearTimeout(timeout)
    } else if (!isComplete) {
      setIsComplete(true)
      onComplete()
    }
  }, [currentIndex, text, speed, isComplete, onComplete])

  return (
    <span className={className}>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1"
      >
        |
      </motion.span>
    </span>
  )
}

// Gradient Text Component
export const GradientText = ({ 
  children, 
  gradient = "from-primary-light to-primary-dark",
  className = "",
  animate = true
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent ${className}`}
      animate={animate ? {
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
      } : {}}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{
        backgroundSize: '200% 200%'
      }}
    >
      {children}
    </motion.span>
  )
}

// Text Reveal Component
export const TextReveal = ({ 
  children, 
  delay = 0,
  direction = "up",
  className = ""
}) => {
  const directions = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { y: 0, x: 50 },
    right: { y: 0, x: -50 }
  }

  return (
    <motion.div
      className={className}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0, 
        x: 0 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.8, 
        delay,
        ease: "easeOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Particle Text Effect
export const ParticleText = ({ 
  text, 
  className = "",
  onHover = true
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`inline-block ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.05 }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={isHovered ? {
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
            scale: [1, 1.2, 1]
          } : {}}
          transition={{
            duration: 0.6,
            delay: index * 0.05,
            ease: "easeOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Animated Counter
export const AnimatedCounter = ({ 
  value, 
  duration = 2, 
  className = "",
  prefix = "",
  suffix = ""
}) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime = null
    const animate = (currentTime) => {
      if (startTime === null) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <span className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}

// Glitch Text Effect
export const GlitchText = ({ 
  children, 
  className = "",
  intensity = 0.1
}) => {
  return (
    <motion.div
      className={`relative ${className}`}
      animate={{
        x: [0, -2, 2, -1, 1, 0],
        y: [0, 1, -1, 0.5, -0.5, 0]
      }}
      transition={{
        duration: 0.1,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-primary-light opacity-20"
        animate={{
          x: [0, 2, -2, 1, -1, 0],
          y: [0, -1, 1, -0.5, 0.5, 0]
        }}
        transition={{
          duration: 0.1,
          repeat: Infinity,
          repeatDelay: 3,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}
