import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { 
  Code, 
  Palette, 
  Database, 
  Smartphone, 
  Globe, 
  Cloud,
  Cpu,
  Zap,
  Shield,
  Layers,
  ChevronRight,
  Star,
  TrendingUp
} from 'lucide-react'

// Animated Counter Component
const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      let startTime = null
      const animate = (currentTime) => {
        if (startTime === null) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)
        
        setCount(Math.floor(progress * value))
        
        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [isInView, value, duration])

  return <span ref={ref}>{count}%</span>
}

const SkillsSection = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const sectionRef = useRef(null)
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [120, -120])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [1, -1])


  const developmentSkills = [
    { 
      name: "Frontend Development", 
      skills: ["React.js", "TailwindCSS", "Framer Motion", "JavaScript (ES6)"], 
      level: 75,
      description: "Building responsive and interactive user interfaces",
      icon: <Code className="w-6 h-6" />
    },
    { 
      name: "Backend Development", 
      skills: ["Laravel", "MySQL", "REST APIs"], 
      level: 70,
      description: "Creating and managing server-side applications with Laravel",
      icon: <Database className="w-6 h-6" />
    },
    { 
      name: "UI/UX & Design", 
      skills: ["Figma", "Wireframing", "Prototyping"], 
      level: 80,
      description: "Designing clean, user-friendly interfaces",
      icon: <Globe className="w-6 h-6" />
    },
    { 
      name: "Development Tools", 
      skills: ["Git & GitHub", "Vercel", "VS Code"], 
      level: 85,
      description: "Tools I use daily to code and deploy projects",
      icon: <Cpu className="w-6 h-6" />
    }
  ]

  const filteredSkills = developmentSkills



  return (
    <motion.section 
      ref={sectionRef}
      id="skills"
      className="py-20 relative overflow-hidden"
      style={{ y, opacity, scale, rotate }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-32 right-20 w-40 h-40 bg-primary-light/5 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-32 h-32 bg-primary-dark/5 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark mb-6 stagger-text">
            <span>S</span><span>k</span><span>i</span><span>l</span><span>l</span><span>s</span>
            <span className="mx-2">&</span>
            <span>D</span><span>e</span><span>v</span><span>e</span><span>l</span><span>o</span><span>p</span><span>m</span><span>e</span><span>n</span><span>t</span>
          </h2>
          <div className="w-24 h-1 bg-primary-dark mx-auto rounded-full"></div>
          <p className="text-lg text-primary-dark/70 mt-4 max-w-2xl mx-auto">
            My journey in web development and continuous learning
          </p>
        </motion.div>


        {/* Skills Development Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12" role="list" aria-label="Technical skills and proficiency levels">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="group relative glass-card rounded-2xl p-6 depth-2 hover:depth-3 overflow-hidden card-3d hover-lift-3d magnetic-hover focus-within:ring-2 focus-within:ring-primary-dark focus-within:ring-opacity-50"
              initial={{ opacity: 0, y: 30, rotateX: -15, scale: 0.8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.08, 
                y: -15, 
                rotateX: 8, 
                rotateY: 8,
                z: 50,
                boxShadow: "0 25px 50px rgba(21, 77, 113, 0.2)"
              }}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onHoverEnd={() => setHoveredSkill(null)}
              role="listitem"
              tabIndex={0}
              aria-label={`${skill.name} - ${skill.description}. Proficiency level: ${skill.level}%`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setHoveredSkill(hoveredSkill === skill.name ? null : skill.name)
                }
              }}
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-primary-dark/10 text-primary-dark">
                      {skill.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary-dark">{skill.name}</h3>
                      <p className="text-sm text-primary-dark/70">{skill.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-dark">
                      <AnimatedCounter value={skill.level} duration={2} />
                    </div>
                    <div className="text-xs text-primary-dark/60">Proficiency</div>
                  </div>
                </div>

                {/* Progress bar with wave effect */}
                <div className="w-full bg-primary-light/20 rounded-full h-3 mb-6 overflow-hidden relative">
                  <motion.div
                    className="h-3 bg-primary-dark rounded-full relative overflow-hidden"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: index * 0.2, ease: "easeOut" }}
                  >
                    {/* Wave effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/30 rounded-full"
                      animate={{
                        x: ['-100%', '100%'],
                        opacity: [0, 1, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2 + 1,
                        repeat: Infinity,
                        repeatDelay: 3
                      }}
                    />
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-white/20 rounded-full"
                      animate={{
                        opacity: [0, 1, 0],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.2 + 1.8
                      }}
                    />
                  </motion.div>
                </div>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                  {skill.skills.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary-dark/10 text-primary-dark rounded-full text-sm font-medium border border-primary-dark/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.section>
  )
}

export default SkillsSection