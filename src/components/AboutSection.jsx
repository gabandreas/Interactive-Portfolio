import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import useSoundEffects from '../hooks/useSoundEffects'
import { TextReveal, GradientText, ParticleText } from './AnimatedText'
import { RippleButton, MagneticButton } from './MicroInteractions'
import { 
  Code, 
  Palette, 
  Database, 
  Smartphone, 
  Globe, 
  Award, 
  Users, 
  Coffee,
  BookOpen,
  Gamepad2,
  Camera,
  Music,
  Heart,
  ChevronRight,
  Download,
  ExternalLink,
  GraduationCap,
  Briefcase,
  BookOpenText
} from 'lucide-react'

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('story')
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { playSound } = useSoundEffects()
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [150, -150])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.7, 1, 1, 0.7])
  const rotate = useTransform(scrollYProgress, [0, 1], [2, -2])

  const tabs = [
    { id: 'story', label: 'My Story', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'interests', label: 'Interests', icon: <Heart className="w-4 h-4" /> }
  ]

  const achievements = [
    { 
      icon: <GraduationCap className="w-6 h-6" />, 
      title: "Fresh Graduate", 
      description: "D3 Information Technology, Universitas Brawijaya" 
    },
    { 
      icon: <Briefcase className="w-6 h-6" />, 
      title: "Internship Experience", 
      description: "5-months as Front-End Developer using Laravel" 
    },
    { 
      icon: <BookOpenText className="w-6 h-6" />, 
      title: "Continuous Learner", 
      description: "Currently exploring React, TailwindCSS, and modern web tech" 
    }
  ];

  // const developmentSkills = [
  //   { 
  //     name: "Frontend Development", 
  //     skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], 
  //     level: 90,
  //     description: "Building responsive and interactive user interfaces"
  //   },
  //   { 
  //     name: "Backend Development", 
  //     skills: ["Node.js", "Express.js", "PostgreSQL", "MongoDB", "REST APIs"], 
  //     level: 85,
  //     description: "Creating robust server-side applications and APIs"
  //   },
  //   { 
  //     name: "Full-Stack Integration", 
  //     skills: ["Authentication", "Database Design", "API Integration", "State Management"], 
  //     level: 88,
  //     description: "Connecting frontend and backend seamlessly"
  //   },
  //   { 
  //     name: "Development Tools", 
  //     skills: ["Git", "Docker", "Vercel", "VS Code", "Chrome DevTools"], 
  //     level: 92,
  //     description: "Essential tools for efficient development workflow"
  //   }
  // ]

  const interests = [
    { 
      icon: "⚽", 
      name: "Football Enthusiast", 
      description: "I enjoy watching football matches, especially on weekends." 
    },
    { 
      icon: "🎮", 
      name: "Gaming", 
      description: "Playing games is my way to relax and sometimes even spark creativity." 
    },
    { 
      icon: "🍿", 
      name: "Movies & Series", 
      description: "I love exploring films with strong stories and unexpected twists." 
    },
    { 
      icon: "😴", 
      name: "Sleeping", 
      description: "Because even coders need some proper rest... or just a good nap." 
    }
  ];
  

  return (
    <motion.section 
      ref={sectionRef}
      id="about"
      className="py-20 relative overflow-hidden"
      style={{ y, opacity, scale, rotate }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Morphing Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-24 h-24 bg-primary-light/10 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 10, 0],
            y: [0, -8, 0]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-20 h-20 bg-primary-dark/10 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
            x: [0, -8, 0],
            y: [0, 5, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-12 h-12 bg-primary-light/5 blur-2xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, 20, 0],
            y: [0, -15, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            duration: 0.8, 
            ease: "easeOut",
            delay: 0.2
          }}
        >
          <TextReveal delay={0.3} direction="up">
            <ParticleText 
              text="About Me" 
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark mb-6 block"
            />
          </TextReveal>
          <motion.div 
            className="w-24 h-1 bg-primary-dark mx-auto rounded-full"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />
          <motion.p 
            className="text-lg text-primary-dark/70 mt-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            A glimpse into my journey
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Profile Section */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Profile Card */}
            <div className="glass-card rounded-2xl p-8 depth-3">
              <div className="flex items-center space-x-6 mb-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-full overflow-hidden neumorphism ring-2 ring-primary-dark/20 group-hover:ring-primary-dark/40 transition-all duration-300">
                    <img 
                      src="https://media.licdn.com/dms/image/v2/D4E03AQGJNZaMuR7q9Q/profile-displayphoto-scale_400_400/B4EZkVFNOhIsAo-/0/1756995311896?e=1759968000&v=beta&t=6xhW8_v0Hqi--uJ752O5cYNL_7LQBNmAz7HyNqfT1m0" 
                      alt="Profile" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-primary-dark">Gabriel Andreas</h3>
                  <p className="text-primary-dark/70">Junior Web Developer</p>
                  <div className="flex space-x-2 mt-2">
                    <span className="px-3 py-1 bg-primary-light/30 text-primary-dark rounded-full text-sm font-medium">Available</span>
                    <span className="px-3 py-1 bg-primary-dark/10 text-primary-dark rounded-full text-sm font-medium">Remote</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
              <p className="text-primary-dark/80 leading-relaxed">
                I am a fresh graduate in Information Technology with a focus on web development. 
                I have hands-on experience with Laravel during my internship and I am currently 
                expanding my skills in React and modern front-end technologies. 
                I enjoy creating clean, user-friendly websites and continuously learning new things in tech.
              </p>

                
                <div className="flex space-x-4">
                  {/* Download CV */}
                  <motion.a
                    href="/Gabriel_Resume.pdf"   // path file di public
                    download="Gabriel_Resume.pdf" // nama file ketika diunduh
                    className="flex items-center space-x-2 bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary-dark/90 transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Download className="w-4 h-4" />
                    <span>Download CV</span>
                  </motion.a>

                  {/* View Portfolio */}
                  <motion.a
                    href="#projects"
                    className="flex items-center space-x-2 border border-primary-dark text-primary-dark px-4 py-2 rounded-lg hover:bg-primary-dark hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Portfolio</span>
                  </motion.a>
                </div>

              </div>
            </div>

            {/* Achievements */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.title}
                  className="bg-white/60 backdrop-blur-sm p-4 rounded-xl text-center hover:bg-white/80 transition-all duration-300"
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="text-primary-dark mb-2 flex justify-center">{achievement.icon}</div>
                  <h4 className="font-bold text-primary-dark text-sm mb-1">{achievement.title}</h4>
                  <p className="text-xs text-primary-dark/70">{achievement.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Content Tabs */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-white/60 backdrop-blur-sm p-1 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-primary-dark text-white shadow-lg'
                      : 'text-primary-dark/70 hover:text-primary-dark hover:bg-white/60'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-primary-dark/10"
            >
              {activeTab === 'story' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary-dark mb-4">My Journey</h3>
                  <p className="text-primary-dark/80 leading-relaxed">
                    My journey in tech began during my studies at Universitas Brawijaya, 
                    where I discovered my passion for web development. 
                    What started with small projects eventually grew into building 
                    real applications during my internship.
                  </p>
                  <p className="text-primary-dark/80 leading-relaxed">
                    I worked as an intern Front-End Developer using Laravel for 5 months, 
                    where I learned how to transform design into functional code 
                    and collaborate in a real development environment. 
                    Now, I’m sharpening my skills in React and modern front-end frameworks 
                    to prepare myself for new challenges in the industry.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {['Problem Solver', 'Team Player', 'Always Learning', 'Detail Oriented'].map((trait) => (
                      <span 
                        key={trait} 
                        className="px-3 py-1 bg-primary-light/30 text-primary-dark rounded-full text-sm font-medium"
                      >
                        {trait}
                      </span>
                    ))}
                </div>
              </div>
              
              )}


              {activeTab === 'interests' && (
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-primary-dark mb-4">Beyond Code</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {interests.map((interest, index) => (
                      <motion.div
                        key={interest.name}
                        className="flex items-start space-x-3 p-3 rounded-lg hover:bg-primary-light/10 transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                      >
                        <div className="text-primary-dark mt-1">{interest.icon}</div>
                        <div>
                          <h4 className="font-semibold text-primary-dark text-sm">{interest.name}</h4>
                          <p className="text-xs text-primary-dark/70">{interest.description}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutSection