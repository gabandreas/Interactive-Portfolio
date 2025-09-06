import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Palette, Sparkles } from 'lucide-react'

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState('light')
  const [isOpen, setIsOpen] = useState(false)

  const themes = [
    { 
      id: 'light', 
      name: 'Light', 
      icon: <Sun className="w-4 h-4" />,
      colors: {
        primary: '#154D71',
        secondary: '#9CAFAA',
        background: '#f8fafc',
        text: '#154D71',
        accent: '#ECEEDF'
      }
    },
    { 
      id: 'dark', 
      name: 'Dark', 
      icon: <Moon className="w-4 h-4" />,
      colors: {
        primary: '#000000',
        secondary: '#37353E',
        background: '#0f0f0f',
        text: '#000000',
        accent: '#44444E'
      }
    },
    { 
      id: 'neon', 
      name: 'Neon', 
      icon: <Sparkles className="w-4 h-4" />,
      colors: {
        primary: '#00ffff',
        secondary: '#ff00ff',
        background: '#330066',
        text: '#00ffff',
        accent: '#ff00ff'
      }
    },
    { 
      id: 'sunset', 
      name: 'Sunset', 
      icon: <Palette className="w-4 h-4" />,
      colors: {
        primary: '#E62727',
        secondary: '#ff6347',
        background: '#EF7722',
        text: '#E62727',
        accent: '#EF7722'
      }
    }
  ]

  const applyTheme = (themeId) => {
    const theme = themes.find(t => t.id === themeId)
    if (!theme) return

    const root = document.documentElement
    root.style.setProperty('--primary-dark', theme.colors.primary)
    root.style.setProperty('--primary-light', theme.colors.accent)
    root.style.setProperty('--secondary-dark', theme.colors.secondary)
    root.style.setProperty('--theme-bg', theme.colors.background)
    root.style.setProperty('--theme-text', theme.colors.text)
    
    // Set data-theme attribute for CSS targeting
    root.setAttribute('data-theme', themeId)
    
    // Update body background with smooth transition
    document.body.style.transition = 'background-color 0.3s ease'
    document.body.style.background = theme.colors.background
    
    // Debug: Log the applied colors
    console.log('Theme applied:', themeId, {
      primary: theme.colors.primary,
      accent: theme.colors.accent,
      background: theme.colors.background,
      text: theme.colors.text
    })
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light'
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [applyTheme])

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId)
    applyTheme(themeId)
    localStorage.setItem('portfolio-theme', themeId)
    setIsOpen(false)
  }

  const currentThemeData = themes.find(t => t.id === currentTheme)

  return (
    <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[300]">
      {/* Theme Switcher Button */}
      <motion.button
        className="relative w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 group"
        whileHover={{ scale: 1.05, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <motion.div
          className="text-primary-dark group-hover:text-primary-light transition-colors duration-300"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentThemeData?.icon}
        </motion.div>
        
        {/* Active indicator */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white"
          style={{ backgroundColor: currentThemeData?.colors.primary }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Theme Options Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-[-1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              className="absolute top-16 right-0 bg-white/10 backdrop-blur-xl rounded-2xl p-6 min-w-[240px] border border-white/20 shadow-2xl"
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.9 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="space-y-1">
                {/* Header */}
                <div className="flex items-center space-x-2 mb-4 pb-3 border-b border-white/10">
                  <Palette className="w-4 h-4 text-primary-dark" />
                  <h3 className="text-sm font-bold text-primary-dark">Choose Theme</h3>
                </div>
                
                {/* Theme Options */}
                {themes.map((theme, index) => (
                  <motion.button
                    key={theme.id}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
                      currentTheme === theme.id 
                        ? 'bg-primary-dark/20 border border-primary-dark/30 shadow-lg' 
                        : 'hover:bg-white/10 border border-transparent hover:border-white/20'
                    }`}
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleThemeChange(theme.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Theme Preview - Mini preview of the theme */}
                      <div className="relative w-8 h-6 rounded border border-gray-300 overflow-hidden">
                        {/* Background */}
                        <div 
                          className="absolute inset-0"
                          style={{ backgroundColor: theme.colors.background }}
                        />
                        {/* Primary color accent */}
                        <div 
                          className="absolute top-0 left-0 w-full h-1"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        {/* Secondary color dot */}
                        <div 
                          className="absolute top-1 right-1 w-1 h-1 rounded-full"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        {/* Accent color dot */}
                        <div 
                          className="absolute bottom-1 left-1 w-1 h-1 rounded-full"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                      
                      {/* Theme Name */}
                      <span className="text-sm font-medium text-primary-dark group-hover:text-primary-light transition-colors duration-300">
                        {theme.name}
                      </span>
                    </div>
                    
                    {/* Icon */}
                    <motion.div
                      className="text-primary-dark/60 group-hover:text-primary-light transition-colors duration-300"
                      animate={currentTheme === theme.id ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ duration: 0.5 }}
                    >
                      {theme.icon}
                    </motion.div>
                  </motion.button>
                ))}
                
                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-white/10">
                  <p className="text-xs text-primary-dark/60 text-center">
                    Theme will be saved automatically
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSwitcher
