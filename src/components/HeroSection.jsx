import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronDown, Code, Palette, Database, Smartphone, Globe, Sparkles, Github, Linkedin, Mail } from 'lucide-react'
import { TypewriterText, GradientText, ParticleText, TextReveal } from './AnimatedText'
import { RippleButton, MagneticButton } from './MicroInteractions'
import { SplitMorphingText, WaveMorphingText, FlipMorphingText } from './MorphingText'

const HeroSection = () => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 800], [0, -100])
  const opacity = useTransform(scrollY, [0, 800], [1, 0.1])
  const scale = useTransform(scrollY, [0, 800], [1, 0.8])
  const rotate = useTransform(scrollY, [0, 800], [0, 5])
  const [currentRole, setCurrentRole] = useState(0)
  
  const roles = [
    "Junior Web Developer",
    "Front-End Programmer", 
    "Laravel Developer",
    "React Enthusiast",
    "Always Learning"
  ]

  const skills = [
    { 
      icon: <Code className="w-5 h-5" />, 
      name: "Laravel", 
      color: "from-blue-500 to-cyan-500" 
    },
    { 
      icon: <Database className="w-5 h-5" />, 
      name: "MySQL", 
      color: "from-green-500 to-emerald-500" 
    },
    { 
      icon: <Code className="w-5 h-5" />, 
      name: "React", 
      color: "from-indigo-500 to-blue-500" 
    },
    { 
      icon: <Palette className="w-5 h-5" />, 
      name: "Figma", 
      color: "from-purple-500 to-pink-500" 
    },
    { 
      icon: <Globe className="w-5 h-5" />, 
      name: "TailwindCSS", 
      color: "from-sky-500 to-cyan-500" 
    }
  ];
  

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
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
      style={{ y, opacity, scale, rotate }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Floating Islands Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Main floating island - Simplified */}
        <motion.div
          className="absolute -top-20 -left-20 w-60 h-60 glass-card liquid-blob opacity-40"
          animate={{ 
            y: [0, -15, 0],
            x: [0, 10, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Secondary floating island - Simplified */}
        <motion.div
          className="absolute top-32 right-16 w-40 h-30 glass-card liquid-blob opacity-30"
          animate={{ 
            y: [0, -10, 0],
            x: [0, -8, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Small floating element - Simplified */}
        <motion.div
          className="absolute bottom-32 left-20 w-24 h-24 glass-card rounded-full opacity-25"
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        {/* Simple floating dots - Lightweight */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary-dark/20 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 sm:p-8 md:p-12 depth-3"
        >
          {/* Greeting with sparkle effect */}
          <motion.div 
            className="flex items-center justify-center mb-4"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", stiffness: 100 }}
          >
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-primary-dark mr-2" />
            </motion.div>
            <motion.span 
              className="text-base sm:text-lg text-primary-dark/80 font-medium"
              animate={{ 
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Hello, I'm
            </motion.span>
          </motion.div>

          {/* Main heading with 3D morphing typography - Mobile optimized */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-primary-dark mb-4 sm:mb-6 leading-tight">
            <SplitMorphingText 
              text="Gabriel" 
              className="block"
              delay={0.1}
              morphOnHover={true}
              morphIntensity={0.3}
            />
            <br />
            <SplitMorphingText 
              text="Andreas" 
              className="block"
              delay={0.5}
              morphOnHover={true}
              morphIntensity={0.4}
            />
          </h1>

          {/* Dynamic role with typewriter animation - Mobile optimized */}
          <div className="h-10 sm:h-12 md:h-16 flex items-center justify-center mb-4 sm:mb-6 md:mb-8">
            <motion.div
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-primary-dark/90 text-center px-2 sm:px-4"
            >
              <TypewriterText 
                text={roles[currentRole]}
                speed={100}
                className="inline-block"
              />
            </motion.div>
          </div>

          {/* Enhanced description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-3xl mx-auto mb-8 sm:mb-12 px-4"
          >
            <p className="text-lg sm:text-xl text-primary-dark/80 leading-relaxed">
                A <span className="font-semibold text-primary-dark">Junior Web Developer</span> from Indonesia, 
                passionate about creating <span className="font-semibold text-primary-dark">beautiful and functional</span> web experiences, 
                and always eager to <span className="font-semibold text-primary-dark">learn & grow</span> in the tech industry.
            </p>
          </motion.div>

          {/* Interactive skill badges */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group flex items-center bg-white/90 backdrop-blur-sm border border-primary-dark/20 rounded-full px-3 sm:px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1 + index * 0.1
                }}
              >
                <span className="text-primary-dark mr-2 group-hover:scale-110 transition-transform duration-300">
                  {skill.icon}
                </span>
                <span className="text-primary-dark font-medium group-hover:text-primary-dark transition-colors duration-300">
                  {skill.name}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced CTA buttons - Mobile optimized */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4"
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 1.2, type: "spring", stiffness: 80 }}
          >
            <RippleButton
              onClick={handleScrollToProjects}
              className="group relative bg-primary-dark text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 w-full sm:w-auto touch-manipulation"
            >
              <span className="flex items-center justify-center">
                View My Work
                <motion.div
                  className="ml-2"
                  animate={{ 
                    x: [0, 8, 0],
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  →
                </motion.div>
              </span>
            </RippleButton>
            
            <MagneticButton
              onClick={handleScrollToContact}
              className="border-2 border-primary-dark text-primary-dark px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold hover:bg-secondary-dark hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl w-full sm:w-auto touch-manipulation"
              strength={0.2}
            >
              Get In Touch
            </MagneticButton>
          </motion.div>

          {/* Social links - Mobile optimized */}
          <motion.div 
            className="flex justify-center space-x-4 sm:space-x-6 mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {[
              { icon: <Github className="w-5 h-5 sm:w-6 sm:h-6" />, href: "https://github.com/gabandreas32", label: "GitHub" },
              { icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />, href: "https://www.linkedin.com/in/gabriel-hutapea-b7a277374/", label: "LinkedIn" },
              { icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />, href: "mailto:gabandreas32@gmail.com?subject=Hello Gabriel&body=Hi Gabriel, I saw your portfolio and ...", label: "Email" }
            ].map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 sm:p-3 bg-white/80 backdrop-blur-sm border border-primary-dark/20 rounded-full text-primary-dark hover:bg-primary-dark hover:text-white transition-all duration-300 shadow-lg hover:shadow-xl touch-manipulation"
                whileHover={{ 
                  scale: 1.1, 
                  y: -3
                }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 1.6 + index * 0.1
                }}
                aria-label={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>

          {/* Stats section */}
          <motion.div 
            className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 mb-16 sm:mb-20 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
          >
            {[
              { number: "1+", label: "Years Experience" },
              { number: "10+", label: "Projects Completed" },
              { number: "100%", label: "Learning Enthusiasm" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 2 + index * 0.1
                }}
              >
                <div className="text-2xl sm:text-3xl font-bold text-primary-dark mb-1 sm:mb-2 group-hover:text-primary-light transition-colors duration-300">{stat.number}</div>
                <div className="text-xs sm:text-sm text-primary-dark/70 font-medium group-hover:text-primary-dark transition-colors duration-300 text-center">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator with smooth animation */}
      <motion.div 
        className="absolute bottom-2 sm:bottom-4 inset-x-0 mx-auto cursor-pointer z-20 w-fit"
        animate={{ 
          y: [0, 12, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        whileHover={{ 
          scale: 1.2, 
          y: -5,
          rotate: [0, 5, -5, 0]
        }}
        whileTap={{ scale: 0.8 }}
      >
        <div className="flex flex-col items-center group text-center">
          <motion.span 
            className="text-xs sm:text-sm text-primary-dark/60 mb-2 font-medium group-hover:text-primary-dark transition-colors duration-300 text-center"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll Down
          </motion.span>
          <motion.div 
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-primary-dark/40 rounded-full flex justify-center group-hover:border-primary-dark transition-all duration-300 group-hover:shadow-lg"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <motion.div 
              className="w-1 h-2 sm:h-3 bg-primary-dark/60 rounded-full mt-1 sm:mt-2 group-hover:bg-primary-dark transition-colors duration-300"
              animate={{ 
                y: [0, 12, 0],
                scale: [1, 1.2, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{ 
                duration: 2.5, 
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </motion.div>

    </motion.section>
  )
}

export default HeroSection