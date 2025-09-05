import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'

const ScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    const updateScrollY = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', updateScrollY)
    return () => window.removeEventListener('scroll', updateScrollY)
  }, [])

  const sections = [
    { id: 'home', label: 'Home', color: '#154D71' },
    { id: 'about', label: 'About', color: '#FFF9AF' },
    { id: 'skills', label: 'Skills', color: '#154D71' },
    { id: 'projects', label: 'Projects', color: '#FFF9AF' },
    { id: 'experience', label: 'Experience', color: '#154D71' },
    { id: 'hobbies', label: 'Hobbies', color: '#FFF9AF' },
    { id: 'contact', label: 'Contact', color: '#154D71' }
  ]

  const getCurrentSection = () => {
    const scrollPosition = scrollY + window.innerHeight / 2
    const sections = document.querySelectorAll('section[id]')
    
    for (let section of sections) {
      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top + scrollY
      const sectionBottom = sectionTop + rect.height
      
      if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
        return section.id
      }
    }
    return 'home'
  }

  const currentSection = getCurrentSection()

  return (
    <>
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[400] bg-primary-dark"
        style={{
          scaleX: scaleX,
          transformOrigin: '0%'
        }}
      />

      {/* Section Indicators */}
      <div className="fixed right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-[350] space-y-4 hidden md:block">
        {sections.map((section, index) => {
          const isActive = currentSection === section.id
          const isPassed = sections.findIndex(s => s.id === currentSection) > index

          return (
            <motion.button
              key={section.id}
              className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                isActive 
                  ? 'scale-150 shadow-lg' 
                  : isPassed 
                  ? 'scale-100' 
                  : 'scale-75 opacity-50'
              }`}
              style={{
                backgroundColor: isActive || isPassed ? section.color : 'transparent',
                borderColor: section.color,
                boxShadow: isActive ? `0 0 20px ${section.color}40` : 'none'
              }}
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 0.8 }}
              onClick={() => {
                document.getElementById(section.id)?.scrollIntoView({ 
                  behavior: 'smooth' 
                })
              }}
            >
              <span className="sr-only">{section.label}</span>
            </motion.button>
          )
        })}
      </div>

      {/* Progress Percentage */}
      <motion.div
        className="fixed bottom-8 left-4 sm:left-8 z-[350] glass-card px-3 sm:px-4 py-2 rounded-full hidden sm:block"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.span
          className="text-sm font-bold text-primary-dark"
          animate={{ 
            color: scrollY > window.innerHeight ? '#3396D3' : '#154D71'
          }}
        >
          {Math.round(scrollYProgress.get() * 100)}%
        </motion.span>
      </motion.div>

      {/* Scroll to Top Button */}
      {scrollY > window.innerHeight && (
        <motion.button
          className="fixed bottom-8 right-4 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-full z-[350] flex items-center justify-center magnetic-hover"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          whileHover={{ 
            scale: 1.2, 
            rotate: 360,
            boxShadow: "0 10px 30px rgba(21, 77, 113, 0.3)"
          }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <svg className="w-6 h-6 text-primary-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      )}
    </>
  )
}

export default ScrollProgress
