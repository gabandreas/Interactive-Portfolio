import { motion, useScroll, useTransform } from 'framer-motion'
import { Menu, X, Home, User, Code, Briefcase, Award, Heart, MessageCircle, Image } from 'lucide-react'
import { useState, useEffect, useMemo } from 'react'

const Navigation = ({ isOpen, setIsOpen }) => {
  const { scrollY } = useScroll()
  const backgroundOpacity = useTransform(scrollY, [0, 100], [0, 0.95])
  const blur = useTransform(scrollY, [0, 100], [0, 15])

  const navItems = useMemo(() => [
    { name: 'Home', href: '#home', icon: <Home className="w-5 h-5" /> },
    { name: 'About', href: '#about', icon: <User className="w-5 h-5" /> },
    { name: 'Skills', href: '#skills', icon: <Code className="w-5 h-5" /> },
    { name: 'Projects', href: '#projects', icon: <Briefcase className="w-5 h-5" /> },
    { name: 'Experience', href: '#experience', icon: <Award className="w-5 h-5" /> },
    { name: 'Hobbies', href: '#hobbies', icon: <Heart className="w-5 h-5" /> },
    { name: 'Gallery', href: '#gallery', icon: <Image className="w-5 h-5" /> },
    { name: 'Contact', href: '#contact', icon: <MessageCircle className="w-5 h-5" /> },
  ], [])

  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.substring(1))
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [navItems])

  const scrollToSection = (href) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[200] px-4 sm:px-6 py-3 sm:py-4 glass-dark"
        style={{
          background: `rgba(21, 77, 113, ${backgroundOpacity})`,
          backdropFilter: `blur(${blur}px)`,
        }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="text-lg sm:text-xl font-bold text-white cursor-pointer flex items-center touch-manipulation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection('#home')}
            role="banner"
            tabIndex={0}
            aria-label="Gabriel Andreas - Go to home section"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                scrollToSection('#home')
              }
            }}
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-light rounded-lg mr-2 sm:mr-3 flex items-center justify-center">
              <span className="text-primary-dark font-bold text-xs sm:text-sm">GA</span>
            </div>
            <span>Gabriel</span>
          </motion.div>

          {/* Desktop Navigation - Compact */}
          <div className="hidden lg:flex items-center space-x-1" role="menubar">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 text-sm touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50 ${
                  activeSection === item.href.substring(1)
                    ? 'bg-primary-light text-primary-dark shadow-lg'
                    : 'text-white hover:bg-white/20'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                role="menuitem"
                aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                aria-label={`Navigate to ${item.name} section`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="lg:hidden p-2 rounded-lg text-white hover:bg-white/20 transition-colors touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isOpen ? "Close mobile menu" : "Open mobile menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </motion.div>
          </motion.button>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <motion.div
        id="mobile-menu"
        className={`fixed inset-0 z-[150] lg:hidden ${
          isOpen ? 'block' : 'hidden'
        }`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="absolute inset-0 bg-primary-dark" onClick={() => setIsOpen(false)} />
        <motion.div
          className="absolute inset-0 flex flex-col justify-center items-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: isOpen ? 1 : 0.8, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <div className="text-center space-y-8">
            <motion.div
              className="mb-12"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-4xl font-bold text-primary-light mb-2">Navigation</h2>
              <div className="w-24 h-1 bg-primary-light mx-auto rounded-full"></div>
            </motion.div>
            
            <div className="space-y-4 sm:space-y-6" role="menubar">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`flex items-center space-x-3 sm:space-x-4 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 text-base sm:text-lg touch-manipulation focus:outline-none focus:ring-2 focus:ring-primary-light focus:ring-opacity-50 ${
                    activeSection === item.href.substring(1)
                      ? 'bg-primary-light text-primary-dark shadow-xl'
                      : 'text-white hover:bg-white/10'
                  }`}
                  whileHover={{ scale: 1.05, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                  role="menuitem"
                  aria-current={activeSection === item.href.substring(1) ? 'page' : undefined}
                  aria-label={`Navigate to ${item.name} section`}
                >
                  <span className="text-lg sm:text-xl">{item.icon}</span>
                  <span className="font-semibold">{item.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  )
}

export default Navigation