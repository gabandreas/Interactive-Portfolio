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
    // Initialize Enhanced Google Analytics
    ReactGA.initialize("G-4G4ZCKYZFH", {
      debug: true, // set false di production
    });
    
    // Track page view
    ReactGA.send({
      hitType: "pageview",
      page: window.location.pathname,
      title: document.title
    });

    // Track user device
    const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    ReactGA.event({
      category: 'User Environment',
      action: 'Device Type',
      label: isMobile ? 'Mobile' : 'Desktop',
      transport_type: 'beacon'
    });

    // Track scroll depth
    let maxScroll = 0;
    const trackScroll = () => {
      const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
      
      // Track at 25%, 50%, 75%, 90% intervals
      if (scrollPercent > maxScroll && [25, 50, 75, 90].includes(scrollPercent)) {
        maxScroll = scrollPercent;
        ReactGA.event({
          category: 'User Engagement',
          action: 'Scroll Depth',
          label: `${scrollPercent}%`,
          value: scrollPercent,
          transport_type: 'beacon'
        });
        console.log(`Scroll depth: ${scrollPercent}%`);
      }
    };

    const handleScroll = () => {
      setIsMenuOpen(false);
      trackScroll();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [])

  const handleSplashComplete = () => {
    setShowSplash(false);
    
    // Track splash screen completion
    ReactGA.event({
      category: 'User Experience',
      action: 'Splash Screen Completed',
      transport_type: 'beacon'
    });
    console.log('Splash screen completed - tracked!');
  }

  return (
    <div className="App">
      {/* Splash Screen */}
      {showSplash && (
        <SplashScreen onComplete={handleSplashComplete} />
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