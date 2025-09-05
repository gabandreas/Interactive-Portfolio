import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { 
  Calendar, 
  MapPin, 
  Building, 
  Award, 
  ChevronRight, 
  ExternalLink,
  Star,
  Users,
  TrendingUp,
  Code,
  Palette,
  Database,
  Cloud
} from 'lucide-react'

const ExperienceSection = () => {
  const [activeExperience, setActiveExperience] = useState(0)
  // const [hoveredExperience, setHoveredExperience] = useState(null)
  const sectionRef = useRef(null)
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [1, -1])

  const experiences = [
    {
      title: "Junior Web Developer (Internship)",
      company: "PT Pratama Link",
      location: "Malang, Indonesia",
      period: "Feb 2024 - Jul 2024",
      type: "Internship",
      description: "Worked as a Front-End Developer during a 5-month internship. Responsible for translating UI/UX designs into functional code, building features using Laravel, and integrating APIs.",
      achievements: [
        "Developed hospital management system (HMSoft) front-end using Laravel Blade",
        "Collaborated with backend team to integrate REST APIs",
        "Optimized UI components based on Figma designs",
        "Improved data handling and CRUD features for patient management"
      ],
      technologies: ["Laravel", "Blade", "MySQL", "Bootstrap", "Figma"],
      logo: "💻",
      color: "from-blue-500 to-cyan-500",
      current: false,
      stats: { teamSize: 4, projects: 1, impact: "High" }
    },
    {
      title: "Final Year Project – Landing Page",
      company: "Universitas Brawijaya",
      location: "Malang, Indonesia",
      period: "2025",
      type: "Academic Project",
      description: "Created a Laravel-based landing page for Serena Print Solution as a final diploma project. The system included admin CRUD features for managing products and promotional content.",
      achievements: [
        "Designed and built responsive landing page for product promotion",
        "Implemented admin panel with CRUD functionality",
        "Integrated JSON-based data handling for flexibility",
        "Successfully defended the project in the final thesis presentation"
      ],
      technologies: ["Laravel", "MySQL", "Bootstrap"],
      logo: "🎓",
      color: "from-purple-500 to-pink-500",
      current: false,
      stats: { teamSize: 1, projects: 1, impact: "Medium" }
    },
    {
      title: "Freelance & Personal Projects",
      company: "Self-Employed",
      location: "Remote",
      period: "2023 - Present",
      type: "Freelance / Personal",
      description: "Worked on freelance and personal projects to sharpen web development skills. Projects include band-tee e-commerce site BootlegInThaHouse and Rockie Clothes e-commerce website.",
      achievements: [
        "Built interactive portfolio site with React, Tailwind, and Framer Motion",
        "Developed BootlegInThaHouse (band-tee e-commerce concept)",
        "Created Rockie Clothes online store with WordPress & WooCommerce",
        "Continuously learning React ecosystem (Next.js, TypeScript)"
      ],
      technologies: ["React", "Tailwind CSS", "Shadcn UI", "WordPress", "WooCommerce"],
      logo: "🚀",
      color: "from-green-500 to-emerald-500",
      current: true,
      stats: { teamSize: 1, projects: 4, impact: "Learning" }
    }
  ]
  

  // const skills = [
  //   { name: "Leadership", level: 85, icon: <Users className="w-4 h-4" /> },
  //   { name: "Problem Solving", level: 95, icon: <Code className="w-4 h-4" /> },
  //   { name: "Team Collaboration", level: 90, icon: <TrendingUp className="w-4 h-4" /> },
  //   { name: "Technical Mentoring", level: 80, icon: <Award className="w-4 h-4" /> }
  // ]

  return (
    <motion.section 
      ref={sectionRef}
      id="experience"
      className="py-20 relative overflow-hidden"
      style={{ y, opacity, scale, rotate }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark mb-6">
            Professional Experience
          </h2>
          <div className="w-24 h-1 bg-primary-dark mx-auto rounded-full"></div>
          <p className="text-lg text-primary-dark/70 mt-4 max-w-2xl mx-auto">
            My journey through the tech industry
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Timeline Navigation */}
          <motion.div
            className="lg:col-span-1 space-y-4"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-primary-dark mb-6">Experience Timeline</h3>
            {experiences.map((exp, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveExperience(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeExperience === index
                    ? 'bg-primary-dark text-white shadow-lg'
                    : 'bg-white/80 text-primary-dark hover:bg-primary-light/20'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                // onHoverStart={() => setHoveredExperience(index)}
                // onHoverEnd={() => setHoveredExperience(null)}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{exp.logo}</div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{exp.title}</h4>
                    <p className="text-xs opacity-80">{exp.company}</p>
                    <p className="text-xs opacity-60">{exp.period}</p>
                  </div>
                  {exp.current && (
                    <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">
                      Current
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Experience Details */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              key={activeExperience}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary-dark/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {experiences[activeExperience] && (
                <>
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 ${experiences[activeExperience].color} rounded-2xl flex items-center justify-center text-2xl`}>
                        {experiences[activeExperience].logo}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-primary-dark">
                          {experiences[activeExperience].title}
                        </h3>
                        <p className="text-lg text-primary-dark/80">
                          {experiences[activeExperience].company}
                        </p>
                        <div className="flex items-center space-x-4 text-sm text-primary-dark/60 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{experiences[activeExperience].period}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{experiences[activeExperience].location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-primary-light/30 text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
                        {experiences[activeExperience].type}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-primary-dark/80 leading-relaxed mb-6">
                    {experiences[activeExperience].description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary-dark mb-3 flex items-center space-x-2">
                      <Award className="w-5 h-5" />
                      <span>Key Achievements</span>
                    </h4>
                    <ul className="space-y-2">
                      {experiences[activeExperience].achievements.map((achievement, index) => (
                        <motion.li
                          key={index}
                          className="flex items-start space-x-3 text-primary-dark/80"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                          <ChevronRight className="w-4 h-4 text-primary-light mt-0.5 flex-shrink-0" />
                          <span>{achievement}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-primary-dark mb-3 flex items-center space-x-2">
                      <Code className="w-5 h-5" />
                      <span>Technologies Used</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {experiences[activeExperience].technologies.map((tech) => (
                        <span
                          key={tech}
                          className="bg-primary-light/30 text-primary-dark px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 p-4 bg-primary-dark/5 rounded-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-dark">
                        {experiences[activeExperience].stats.teamSize}
                      </div>
                      <div className="text-sm text-primary-dark/70">Team Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-dark">
                        {experiences[activeExperience].stats.projects}
                      </div>
                      <div className="text-sm text-primary-dark/70">Projects</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-dark">
                        {experiences[activeExperience].stats.impact}
                      </div>
                      <div className="text-sm text-primary-dark/70">Impact</div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>

      </div>
    </motion.section>
  )
}

export default ExperienceSection