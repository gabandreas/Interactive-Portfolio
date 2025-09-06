import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Code, Palette, Database, Globe, Sparkles, Github, Linkedin, Mail } from 'lucide-react'
import { TypewriterText } from './AnimatedText'
import { RippleButton, MagneticButton } from './MicroInteractions'
import { SplitMorphingText } from './MorphingText'

const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -100])
  const opacity = useTransform(scrollY, [0, 800], [1, 0.1])
  const scale = useTransform(scrollY, [0, 800], [1, 0.8])
  const [currentRole, setCurrentRole] = useState(0)
  
  const roles = [
    "Junior Web Developer",
    "Front-End Programmer", 
    "Looking For Something Good",
    "Fresh Graduate",
    "Always Learning"
  ]

  const skills = [
    { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />, name: "Laravel" },
    { icon: <Database className="w-4 h-4 sm:w-5 sm:h-5" />, name: "MySQL" },
    { icon: <Code className="w-4 h-4 sm:w-5 sm:h-5" />, name: "React" },
    { icon: <Palette className="w-4 h-4 sm:w-5 sm:h-5" />, name: "Figma" },
    { icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />, name: "TailwindCSS" }
  ]

  const socialLinks = [
    { icon: <Github className="w-5 h-5 sm:w-6 sm:h-6" />, href: "https://github.com/gabandreas32", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />, href: "https://www.linkedin.com/in/gabriel-hutapea-b7a277374/", label: "LinkedIn" },
    { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, href: "mailto:gabandreas32@gmail.com?subject=Hello Gabriel&body=Hi Gabriel, I saw your portfolio and ...", label: "Email" }
  ]

  const stats = [
    { number: "1+", label: "Years Experience" },
    { number: "10+", label: "Projects Completed" },
    { number: "100%", label: "Learning Enthusiasm" }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  const handleScrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20"
      style={{ y, opacity, scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-40 sm:w-60 h-40 sm:h-60 glass-card liquid-blob opacity-30 sm:opacity-40"
          animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-32 right-16 w-24 sm:w-40 h-24 sm:h-30 glass-card liquid-blob opacity-20 sm:opacity-30"
          animate={{ y: [0, -10, 0], x: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-16 sm:w-24 h-16 sm:h-24 glass-card rounded-full opacity-15 sm:opacity-25"
          animate={{ y: [0, -10, 0], x: [0, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 depth-3"
        >
          {/* Greeting */}
          <motion.div 
            className="flex items-center justify-center mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary-dark mr-2" />
            <span className="text-sm sm:text-base lg:text-lg text-primary-dark/80 font-medium">
              Hello, I'm
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-primary-dark mb-3 sm:mb-4 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <SplitMorphingText 
              text="Gabriel Andreas" 
              className="block"
              delay={0.1}
              morphOnHover={true}
              morphIntensity={0.3}
            />
          </motion.h1>

          {/* Dynamic role */}
          <div className="h-8 sm:h-10 md:h-12 flex items-center justify-center mb-4 sm:mb-6">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-primary-dark/90"
            >
              <TypewriterText 
                text={roles[currentRole]}
                speed={100}
                className="inline-block"
              />
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl mx-auto mb-6 sm:mb-8"
          >
            <p className="text-base sm:text-lg text-primary-dark/80 leading-relaxed">
              A <span className="font-semibold text-primary-dark">Junior Web Developer</span> from Indonesia, 
              passionate about creating <span className="font-semibold text-primary-dark">beautiful and functional</span> web experiences.
            </p>
          </motion.div>

          {/* Skill badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="flex items-center bg-white/90 backdrop-blur-sm border border-primary-dark/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <span className="text-primary-dark mr-2">{skill.icon}</span>
                <span className="text-sm sm:text-base text-primary-dark font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <RippleButton
              onClick={handleScrollToProjects}
              className="bg-primary-dark text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto"
            >
              View My Work →
            </RippleButton>
            
            <MagneticButton
              onClick={handleScrollToContact}
              className="border-2 border-primary-dark text-primary-dark px-6 sm:px-8 py-3 rounded-full font-semibold hover:bg-secondary-dark hover:text-white transition-all duration-300 w-full sm:w-auto"
              strength={0.2}
            >
              Get In Touch
            </MagneticButton>
          </motion.div>

          {/* Social links */}
          <motion.div 
            className="flex justify-center gap-3 sm:gap-4 mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/80 backdrop-blur-sm border border-primary-dark/20 rounded-full text-primary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 mb-16 sm:mb-20 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                whileHover={{ scale: 1.05, y: -2 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 + index * 0.1 }}
              >
                <div className="text-xl sm:text-2xl font-bold text-primary-dark mb-1">{stat.number}</div>
                <div className="text-xs sm:text-sm text-primary-dark/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-4 sm:bottom-6 inset-x-0 mx-auto cursor-pointer z-20 w-fit"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        whileHover={{ scale: 1.1, y: -3 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="flex flex-col items-center text-center">
          <span className="text-xs text-primary-dark/60 mb-2 font-medium">
            Scroll Down
          </span>
          <div className="w-5 h-8 border-2 border-primary-dark/40 rounded-full flex justify-center">
            <motion.div 
              className="w-1 h-2 bg-primary-dark/60 rounded-full mt-1"
              animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </div>
      </motion.div>

    </motion.section>
  )
}

export default HeroSection