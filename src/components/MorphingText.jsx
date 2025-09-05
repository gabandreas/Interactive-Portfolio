import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 3D Morphing Text Component
export const MorphingText = ({ 
  text, 
  className = "",
  morphOnHover = true,
  morphOnClick = false,
  morphIntensity = 0.3,
  morphDuration = 0.6
}) => {
  const [isMorphing, setIsMorphing] = useState(false)
  const [morphValues, setMorphValues] = useState({
    scaleX: 1,
    scaleY: 1,
    rotateX: 0,
    rotateY: 0,
    skewX: 0,
    skewY: 0,
    perspective: 1000
  })

  const handleMorph = () => {
    if (morphOnHover || morphOnClick) {
      setIsMorphing(true)
      
      // Generate random morph values
      const newValues = {
        scaleX: 1 + (Math.random() - 0.5) * morphIntensity,
        scaleY: 1 + (Math.random() - 0.5) * morphIntensity,
        rotateX: (Math.random() - 0.5) * 20,
        rotateY: (Math.random() - 0.5) * 20,
        skewX: (Math.random() - 0.5) * 10,
        skewY: (Math.random() - 0.5) * 10,
        perspective: 1000 + Math.random() * 500
      }
      
      setMorphValues(newValues)
      
      // Reset after duration
      setTimeout(() => {
        setIsMorphing(false)
        setMorphValues({
          scaleX: 1,
          scaleY: 1,
          rotateX: 0,
          rotateY: 0,
          skewX: 0,
          skewY: 0,
          perspective: 1000
        })
      }, morphDuration * 1000)
    }
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      onHoverStart={morphOnHover ? handleMorph : undefined}
      onClick={morphOnClick ? handleMorph : undefined}
      style={{
        transformStyle: "preserve-3d",
        perspective: morphValues.perspective
      }}
      animate={{
        scaleX: morphValues.scaleX,
        scaleY: morphValues.scaleY,
        rotateX: morphValues.rotateX,
        rotateY: morphValues.rotateY,
        skewX: morphValues.skewX,
        skewY: morphValues.skewY
      }}
      transition={{
        duration: morphDuration,
        ease: "easeInOut"
      }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={isMorphing ? {
            y: [0, -10, 0],
            rotateZ: [0, (Math.random() - 0.5) * 20, 0],
            scale: [1, 1.1, 1]
          } : {}}
          transition={{
            duration: morphDuration,
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

// 3D Split Text with Morphing
export const SplitMorphingText = ({ 
  text, 
  className = "",
  delay = 0,
  morphOnHover = true,
  morphIntensity = 0.4
}) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay * 1000)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          initial={{ 
            opacity: 0, 
            y: 50, 
            rotateX: -90,
            scale: 0.5
          }}
          animate={isVisible ? {
            opacity: 1,
            y: 0,
            rotateX: 0,
            scale: 1
          } : {}}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: "easeOut"
          }}
          whileHover={morphOnHover ? {
            y: [0, -15, 0],
            rotateX: [0, 15, 0],
            rotateY: [0, 15, 0],
            scale: [1, 1.2, 1],
            z: 50
          } : {}}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// 3D Wave Text Effect
export const WaveMorphingText = ({ 
  text, 
  className = "",
  waveIntensity = 20,
  waveSpeed = 2
}) => {
  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            y: [
              0, 
              Math.sin((index * 0.5) + 0) * waveIntensity, 
              Math.sin((index * 0.5) + 1) * waveIntensity,
              Math.sin((index * 0.5) + 2) * waveIntensity,
              0
            ],
            rotateX: [
              0,
              Math.sin((index * 0.3) + 0) * 10,
              Math.sin((index * 0.3) + 1) * 10,
              Math.sin((index * 0.3) + 2) * 10,
              0
            ],
            rotateY: [
              0,
              Math.cos((index * 0.3) + 0) * 10,
              Math.cos((index * 0.3) + 1) * 10,
              Math.cos((index * 0.3) + 2) * 10,
              0
            ]
          }}
          transition={{
            duration: waveSpeed,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}

// 3D Flip Text Effect
export const FlipMorphingText = ({ 
  text, 
  className = "",
  flipOnHover = true,
  flipDuration = 0.8
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ transformStyle: "preserve-3d" }}
      onHoverStart={flipOnHover ? () => setIsFlipped(true) : undefined}
      onHoverEnd={flipOnHover ? () => setIsFlipped(false) : undefined}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={{
            rotateY: isFlipped ? 360 : 0,
            scale: isFlipped ? [1, 1.2, 1] : 1,
            rotateX: isFlipped ? [0, 15, 0] : 0
          }}
          transition={{
            duration: flipDuration,
            delay: index * 0.1,
            ease: "easeInOut"
          }}
          style={{
            transformStyle: "preserve-3d"
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
