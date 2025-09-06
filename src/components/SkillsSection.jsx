import { motion, useInView, useScroll, useTransform } from 'framer-motion'
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
  TrendingUp,
  Award,
  Download,
  Eye,
  ExternalLink,
  Calendar,
  CheckCircle,
  X
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
  const [showCertificates, setShowCertificates] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState(null)
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

  const certificates = [
    {
      id: 1,
      title: "Junior Web Developer",
      issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
      date: "2025",
      image: "https://sertifikatbnsp.com/wp-content/uploads/2025/05/template-gambar-1024x517.jpg",
      pdf: "/bnsp-junior-web-developer.pdf",
      description: "Complete task of competency assessment for junior web developer",
      skills: ["Laravel", "JavaScript", "Bootstrap CSS"]
    },
    {
      id: 2,
      title: "Front-End Libraries",
      issuer: "freeCodeCamp",
      date: "2025",
      image: "/Sertifikat_freeCodeCamp.png",
      pdf: "/Sertifikat_freeCodeCamp.png",
      description: "Learning about front end libraries and complete task of competency assessment for front-end libraries",
      skills: ["React.js", "Next.js", "Vue.js", "TypeScript"]
    },
    {
      id: 3,
      title: "Microsoft Office Specialist",
      issuer: "Trust Training Partners",
      date: "2024",
      image: "/Cert. GABRIEL ANDREAS PANGIHUTAN HUTAPEA (1)_page-0001.jpg",
      pdf: "/Cert. GABRIEL ANDREAS PANGIHUTAN HUTAPEA (1).pdf",
      description: "Complete task of competency assessment for Microsoft Office Specialist",
      skills: ["Office", "Word", "Power Point", "Excel"]
    },
    {
      id: 4,
      title: "Internship Certificate",
      issuer: "Pt. Pratama Link",
      date: "2025",
      image: "/internship-certificate.png",
      pdf: "/internship-certificate.png",
      description: "Complete Internship for 917 Hours as Front-End Developer",
      skills: ["Laravel", "Postman"]
    },
  ]

  const filteredSkills = developmentSkills



  return (
    <motion.section 
      ref={sectionRef}
      id="skills"
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{ y, opacity, scale }}
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

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
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


        {/* Skills and Certificates Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Skills Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Technical Skills</h3>
              <p className="text-primary-dark/70">My proficiency in various technologies and frameworks</p>
            </div>
            
            <div className="grid gap-6" role="list" aria-label="Technical skills and proficiency levels">
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

          {/* Certificates Section */}
          <div className="space-y-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold text-primary-dark mb-4">Certificates & Achievements</h3>
              <p className="text-primary-dark/70">Professional certifications and learning achievements</p>
            </div>
            
            <div className="grid gap-4">
              {certificates.slice(0, 4).map((cert, index) => (
                <motion.div
                  key={cert.id}
                  className="group glass-card rounded-xl p-4 depth-2 hover:depth-3 transition-all duration-300 cursor-pointer"
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  onClick={() => {
                    setSelectedCertificate(cert)
                    // Auto-scroll to certificate modal when it opens
                    setTimeout(() => {
                      const modal = document.querySelector('.certificate-detail-modal')
                      if (modal) {
                        modal.scrollIntoView({ behavior: 'smooth', block: 'center' })
                      }
                    }, 200)
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-dark rounded-lg flex items-center justify-center text-white flex-shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-primary-dark text-sm mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-primary-dark/70 mb-2">{cert.issuer} • {cert.date}</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary-dark/10 text-primary-dark rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="px-2 py-1 bg-primary-dark/10 text-primary-dark rounded text-xs">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-1">
                      <motion.button
                        className="p-2 hover:bg-primary-dark/10 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(cert.pdf, '_blank')
                        }}
                        title="Download Certificate"
                      >
                        <Download className="w-4 h-4 text-primary-dark" />
                      </motion.button>
                      <motion.button
                        className="p-2 hover:bg-primary-dark/10 rounded-lg transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedCertificate(cert)
                          // Auto-scroll to certificate modal when it opens
                          setTimeout(() => {
                            const modal = document.querySelector('.certificate-detail-modal')
                            if (modal) {
                              modal.scrollIntoView({ behavior: 'smooth', block: 'center' })
                            }
                          }, 200)
                        }}
                        title="View Certificate"
                      >
                        <Eye className="w-4 h-4 text-primary-dark" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.button
              className="w-full py-3 px-4 bg-primary-dark text-white rounded-xl hover:shadow-lg hover:shadow-secondary-dark/30 transition-all duration-300 font-semibold flex items-center justify-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setShowCertificates(true)
                // Auto-scroll to certificates modal when it opens
                setTimeout(() => {
                  const modal = document.querySelector('.all-certificates-modal')
                  if (modal) {
                    modal.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }
                }, 200)
              }}
            >
              <Award className="w-5 h-5" />
              <span>View All Certificates</span>
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Certificate Modal */}
        {selectedCertificate && (
          <motion.div
            className="certificate-detail-modal fixed inset-0 z-[1000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedCertificate(null)}
            />
            <motion.div
              className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-dark">{selectedCertificate.title}</h3>
                    <p className="text-primary-dark/70">{selectedCertificate.issuer} • {selectedCertificate.date}</p>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setSelectedCertificate(null)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className="w-full h-64 object-cover rounded-lg border"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-primary-dark mb-2">Description</h4>
                      <p className="text-sm text-gray-600">{selectedCertificate.description}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-primary-dark mb-2">Skills Covered</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCertificate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-primary-dark/10 text-primary-dark rounded-full text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-3 pt-4">
                      <motion.a
                        href={selectedCertificate.pdf}
                        download
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-dark text-white rounded-lg hover:bg-primary-light transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Download className="w-4 h-4" />
                        <span>Download PDF</span>
                      </motion.a>
                      <motion.button
                        className="flex items-center space-x-2 px-4 py-2 border border-primary-dark text-primary-dark rounded-lg hover:bg-primary-dark hover:text-white transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(selectedCertificate.pdf, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>View Online</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* All Certificates Modal */}
        {showCertificates && (
          <motion.div
            className="all-certificates-modal fixed inset-0 z-[1000] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowCertificates(false)}
            />
            <motion.div
              className="relative bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-primary-dark">All Certificates</h3>
                    <p className="text-primary-dark/70">Professional certifications and achievements</p>
                  </div>
                  <button
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setShowCertificates(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {certificates.map((cert) => (
                    <motion.div
                      key={cert.id}
                      className="group glass-card rounded-xl p-4 cursor-pointer"
                      whileHover={{ scale: 1.02, y: -2 }}
                      onClick={() => {
                        setShowCertificates(false)
                        setSelectedCertificate(cert)
                        // Auto-scroll to certificate modal when it opens
                        setTimeout(() => {
                          const modal = document.querySelector('.certificate-detail-modal')
                          if (modal) {
                            modal.scrollIntoView({ behavior: 'smooth', block: 'center' })
                          }
                        }, 200)
                      }}
                    >
                      <div className="aspect-video rounded-lg mb-4 overflow-hidden">
                        <img
                          src={cert.image}
                          alt={cert.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className="font-bold text-primary-dark mb-2">{cert.title}</h4>
                      <p className="text-sm text-primary-dark/70 mb-3">{cert.issuer} • {cert.date}</p>
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 2).map((skill) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-primary-dark/10 text-primary-dark rounded text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 2 && (
                          <span className="px-2 py-1 bg-primary-dark/10 text-primary-dark rounded text-xs">
                            +{cert.skills.length - 2}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

      </div>
    </motion.section>
  )
}

export default SkillsSection