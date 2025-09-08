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
import ReactGA from "react-ga4";


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    ReactGA.initialize("G-4G4ZCKYZFH"); // ganti dengan Measurement ID kamu dari GA
    ReactGA.send({ hitType: "pageview", page: window.location.pathname });
/*************  ✨ Windsurf Command ⭐  *************/
  /**
   * When the user scrolls the page, this function will be called to close the mobile menu.
   */
/*******  2bb8f9fe-e59d-4cea-8a20-cf4b91438af5  *******/    const handleScroll = () => {
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