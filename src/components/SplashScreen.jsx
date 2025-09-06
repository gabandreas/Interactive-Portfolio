import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

const SplashScreen = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isExiting, setIsExiting] = useState(false)
  // Text yang akan ditampilkan
  const text = "Press Enter to Continue"

  // 12 gambar yang dipilih
  const images = [
    "https://i.pinimg.com/1200x/53/7f/94/537f94a00bedd2730cec2b8ced367ac6.jpg",
    "https://i.pinimg.com/1200x/29/80/31/2980313f1528619b4b8bc2f2a25f5847.jpg",
    "https://i.pinimg.com/736x/1b/b7/fb/1bb7fbc2e212624c63a1a4d6c81c18ed.jpg",
    "https://i.pinimg.com/1200x/fb/4d/33/fb4d33758b8a112019a0a0173ccb4d5b.jpg",
    "https://i.pinimg.com/1200x/0e/bc/28/0ebc28a27f4cfd668c643dc0d3c53cf3.jpg",
    "https://i.pinimg.com/736x/2d/89/71/2d897145619f68e74aad628b8a5adbf1.jpg",
    "https://i.pinimg.com/1200x/ee/56/d4/ee56d4d293412bd6b0c33e00f78d6458.jpg",
    "https://i.pinimg.com/1200x/f4/23/75/f42375e39930435dcde011314a57e196.jpg",
    "https://i.pinimg.com/1200x/3a/c1/f7/3ac1f7eafdf24d154aad10ebe052d872.jpg",
    "https://i.pinimg.com/736x/87/15/fa/8715facd698990ca2cf9e5416d2f0db6.jpg",
    "https://i.pinimg.com/1200x/4a/39/87/4a3987cfe489ec832c33b5998c419b67.jpg",
    "https://i.pinimg.com/1200x/0d/52/15/0d5215f282a0da22493c920373496c1b.jpg"
  ]

  // Grid positions untuk 12 gambar
  const gridPositions = [
    { row: 1, col: 1, size: 'medium' },
    { row: 1, col: 2, size: 'small' },
    { row: 1, col: 3, size: 'large' },
    { row: 1, col: 4, size: 'medium' },
    { row: 2, col: 1, size: 'small' },
    { row: 2, col: 2, size: 'large' },
    { row: 2, col: 3, size: 'medium' },
    { row: 2, col: 4, size: 'small' },
    { row: 3, col: 1, size: 'large' },
    { row: 3, col: 2, size: 'medium' },
    { row: 3, col: 3, size: 'small' },
    { row: 3, col: 4, size: 'medium' }
  ]

  const handleEnter = useCallback(() => {
    if (isExiting) return
    
    setIsExiting(true)
    
    // Blow out animation
    setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 800)
  }, [isExiting, onComplete])


  // Keyboard event listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleEnter()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleEnter])

  const getSizeClasses = () => {
    // Semua kotak mengisi penuh grid cell
    return 'w-full h-full'
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
        style={{ cursor: 'default' }}
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          scale: 1.2,
          transition: { duration: 0.8, ease: "easeInOut" }
        }}
      >
        {/* Background */}
        <div 
          className="absolute inset-0"
          style={{ backgroundColor: '#FFE100' }}
        />

        {/* Grid Container - With border spacing */}
        <div className="relative w-full h-full p-4 sm:p-6 md:p-8">
          <div className="grid grid-cols-4 grid-rows-3 h-full w-full gap-1">
            {images.map((image, index) => {
              const position = gridPositions[index]
              const isHovered = hoveredIndex === index
              
              return (
                <motion.div
                  key={index}
                  className={`${getSizeClasses()} relative cursor-pointer`}
                  style={{
                    gridRow: position.row,
                    gridColumn: position.col
                  }}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8,
                    rotate: Math.random() * 10 - 5
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    rotate: 0
                  }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{
                    scale: 1.05,
                    rotate: Math.random() * 5 - 2.5,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                >
                  {/* Image Container - No rounded corners for seamless grid */}
                  <div className="relative w-full h-full overflow-hidden">
                    <img
                      src={image}
                      alt={`Pattern ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-white/30 backdrop-blur-sm"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Glow Effect */}
                    <motion.div
                      className="absolute inset-0"
                      style={{
                        boxShadow: isHovered 
                          ? 'inset 0 0 50px rgba(255, 255, 255, 0.8)'
                          : 'none'
                      }}
                      animate={{
                        boxShadow: isHovered 
                          ? 'inset 0 0 50px rgba(255, 255, 255, 0.8)'
                          : 'inset 0 0 0px rgba(255, 255, 255, 0)'
                      }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Static Text - Top Left */}
        <motion.div
          className="absolute top-4 left-4 z-[100]"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <motion.p
            className="text-black/90 text-xl font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            {text}
          </motion.p>
        </motion.div>

        {/* Exit Animation Overlay */}
        {isExiting && (
          <motion.div
            className="absolute inset-0 bg-white z-40"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { duration: 0.8, ease: "easeInOut" }
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export default SplashScreen