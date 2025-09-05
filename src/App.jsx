import { useState, useEffect } from 'react'
import Navigation from './components/Navigation'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import SkillsSection from './components/SkillsSection'
import ProjectsSection from './components/ProjectsSection'
import ExperienceSection from './components/ExperienceSection'
import HobbiesSection from './components/HobbiesSection'
import IllustrationGallery from './components/IllustrationGallery'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ThemeSwitcher from './components/ThemeSwitcher'
import SplashScreen from './components/SplashScreen'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      setIsMenuOpen(false)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={() => setShowSplash(false)} />
      )}
      
      {/* Main Content */}
      {!showSplash && (
        <>
          {/* Custom Cursor */}
          <CustomCursor />
          
          {/* Theme Switcher */}
          <ThemeSwitcher />
          
          {/* Scroll Progress */}
          <ScrollProgress />
          
          {/* Main Content */}
          <Navigation isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ExperienceSection />
          <HobbiesSection />
          <IllustrationGallery />
          <ContactSection />
          <Footer />
        </>
      )}
    </div>
  )
}

export default App