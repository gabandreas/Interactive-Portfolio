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
        secondary: '#FFF9AF',
        background: '#f5f7fa',
        text: '#154D71'
      }
    },
    { 
      id: 'dark', 
      name: 'Dark', 
      icon: <Moon className="w-4 h-4" />,
      colors: {
        primary: '#FFF9AF',
        secondary: '#154D71',
        background: '#0f0f23',
        text: '#FFF9AF'
      }
    },
    { 
      id: 'neon', 
      name: 'Neon', 
      icon: <Sparkles className="w-4 h-4" />,
      colors: {
        primary: '#00ff88',
        secondary: '#ff0080',
        background: '#000000',
        text: '#00ff88'
      }
    },
    { 
      id: 'sunset', 
      name: 'Sunset', 
      icon: <Palette className="w-4 h-4" />,
      colors: {
        primary: '#ff6b35',
        secondary: '#f7931e',
        background: '#ff9a9e',
        text: '#ff6b35'
      }
    }
  ]

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') || 'light'
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (themeId) => {
    const theme = themes.find(t => t.id === themeId)
    if (!theme) return

    const root = document.documentElement
    root.style.setProperty('--primary-dark', theme.colors.primary)
    root.style.setProperty('--primary-light', theme.colors.secondary)
    root.style.setProperty('--theme-bg', theme.colors.background)
    root.style.setProperty('--theme-text', theme.colors.text)
    
    // Update body background
    document.body.style.background = theme.colors.background
  }

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId)
    applyTheme(themeId)
    localStorage.setItem('portfolio-theme', themeId)
    setIsOpen(false)
  }

  const currentThemeData = themes.find(t => t.id === currentTheme)

  return (
    <div className="fixed top-4 right-4 sm:top-8 sm:right-8 z-[300]">
      <motion.button
        className="w-10 h-10 sm:w-12 sm:h-12 glass-card rounded-full flex items-center justify-center magnetic-hover"
        whileHover={{ scale: 1.1, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {currentThemeData?.icon}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="absolute top-16 right-0 glass-card rounded-2xl p-4 min-w-[200px]"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
          >
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-primary-dark mb-3">Choose Theme</h3>
              {themes.map((theme) => (
                <motion.button
                  key={theme.id}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                    currentTheme === theme.id 
                      ? 'bg-primary-dark/10 border border-primary-dark/20' 
                      : 'hover:bg-primary-dark/5'
                  }`}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleThemeChange(theme.id)}
                >
                  <div 
                    className="w-4 h-4 rounded-full border-2"
                    style={{ 
                      backgroundColor: theme.colors.primary,
                      borderColor: theme.colors.secondary
                    }}
                  />
                  <span className="text-sm font-medium text-primary-dark">
                    {theme.name}
                  </span>
                  {theme.icon}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSwitcher
