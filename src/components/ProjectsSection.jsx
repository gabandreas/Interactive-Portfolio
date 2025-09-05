import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
// import { FlipCard, RippleButton, MagneticButton } from './MicroInteractions'
// import { TextReveal, GradientText } from './AnimatedText'
import { 
  Github, 
  Globe, 
  ExternalLink, 
  Star, 
  Eye, 
  Code,
  Palette,
  Database,
  Smartphone,
  Cloud,
  Filter,
  ChevronDown,
  X,
  Play,
  Video,
  Camera,
  Images,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

const ProjectsSection = () => {
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [selectedProject, setSelectedProject] = useState(null)
  const [showGallery, setShowGallery] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const sectionRef = useRef(null)
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [1.5, -1.5])

  const filters = [
    { id: 'all', label: 'All Projects', icon: <Code className="w-4 h-4" /> },
    { id: 'web', label: 'Web Development', icon: <Globe className="w-4 h-4" /> },
    { id: 'seminar', label: 'Event Documentation', icon: <Video className="w-4 h-4" /> },
    { id: 'film', label: 'Film Production', icon: <Camera className="w-4 h-4" /> }
  ]

  const getFilterCount = (filterId) => {
    if (filterId === 'all') return projects.length
    return projects.filter(project => project.category === filterId).length
  }

  const projects = [
    {
      id: 1,
      title: "Healthcare Management Software (HMSoft)",
      description: "Comprehensive hospital management system developed during internship at PT Pratama Link. Features include patient registration, appointment scheduling, medical records management, billing system, and comprehensive admin dashboard with role-based access control.",
      longDescription: "A full-stack web application built with Laravel framework, featuring a modern responsive UI and robust backend architecture. The system handles patient data management, doctor scheduling, medical records, billing, and provides real-time analytics for hospital administrators.",
      image: "https://i.pinimg.com/1200x/21/d6/01/21d60136d625e582e7709abb063d0844.jpg",
      category: "web",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "Postman", "RESTful API"],
      github: "https://github.com/gabandreas/HMSoft-Development-Front-Endbolehj",
      live: "https://hmsoft-to.pratamalink.com/",
      featured: true,
      stats: { stars: 12, forks: 3, views: 450 },
      duration: "3 months",
      teamSize: "Solo Project",
      challenges: ["Complex database design", "User authentication", "Real-time data updates"],
      achievements: ["Reduced patient registration time by 60%", "Improved data accuracy by 85%"]
    },
    {
      id: 2,
      title: "Serena Print Solution Landing Page",
      description: "Final project for diploma thesis. A comprehensive Laravel-based landing page for digital printing machine business featuring product showcase, service catalog, contact management, and admin panel for content management.",
      longDescription: "A responsive business website built with Laravel framework, showcasing digital printing services and equipment. Features include dynamic product galleries, service pricing calculator, contact form integration, and a complete admin panel for managing content, products, and customer inquiries.",
      image: "https://i.pinimg.com/1200x/68/fb/86/68fb869e5c1ce2f78b01ba631a3096e2.jpg",
      category: "web",
      technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "JSON", "RESTful API"],
      github: "https://github.com/gabandreas/serena_landingpage",
      live: "https://serena-print-solution.vercel.app",
      featured: false,
      stats: { stars: 8, forks: 2, views: 320 },
      duration: "2 months",
      teamSize: "Solo Project",
      challenges: ["Responsive design implementation", "Admin panel development", "Database optimization"],
      achievements: ["Achieved 95% mobile responsiveness", "Reduced page load time by 40%"]
    },
    {
      id: 3,
      title: "E-Commerce Landing Page",
      description: "E-commerce project built with Blogger and formBuilder for a clothing brand. Includes article page, order form, and contact page.",
      image: "https://i.pinimg.com/736x/9c/14/05/9c140503273c028316966f1935175e94.jpg",
      category: "web",
      technologies: ["WordPress", "WooCommerce", "Elementor"],
      github: "https://github.com/gabandreas",
      live: "https://rockieeclothess.blogspot.com/?utm_source=Instagram&utm_medium=Story&utm_campaign=jual_baju_band&utm_content=Homepage&fbclid=PAZXh0bgNhZW0CMTEAAafDbgAxiCbVjcEAma9TzhLEOW2w40Car3gnE10LtcBtkmSE0pQBLTRYutYB6Q_aem_UR1o5ZYFXLV9JT2JDZLu2Q",
      featured: false,
      stats: { stars: 5, forks: 1, views: 180 }
    },
    {
      id: 4,
      title: "Digital Business Seminar Documentation",
      description: "Complete documentation project for Digital Business Seminar event. Responsible for capturing key moments, speaker presentations, and creating promotional content.",
      image: "https://i.pinimg.com/1200x/13/67/be/1367bed363eca4548bc097df65920632.jpg",
      category: "seminar",
      technologies: ["Video Editing", "Photography", "Content Creation", "Social Media"],
      github: null,
      live: null,
      featured: true,
      stats: { views: 1200, likes: 45, shares: 12 },
      isGallery: true,
      gallery: [
        "/img_1.jpeg",
        "/img_2.jpeg",
        "/img_3.jpeg",
        "/img_4.jpeg",
        "/img_5.jpeg"
      ]
    },
    {
      id: 5,
      title: "Short Movie: 'From The Bottom'",
      description: "Short film project exploring the impact of technology on human relationships. Served as director, handling story development, cinematography, and post-production.",
      image: "https://i.pinimg.com/736x/e4/71/1e/e4711e46bea5264eaab661d643285ff6.jpg",
      category: "film",
      technologies: ["Video Production", "Directing", "Post-Production", "Storytelling"],
      github: null,
      live: "https://youtu.be/0unhfTcg1YE?si=25y1TayqUtz2ioh6",
      featured: true,
      stats: { views: 2500, likes: 89, shares: 23 },
      isVideo: true
    }
  ]

  const filteredProjects = selectedFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedFilter)

  const openGallery = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setShowGallery(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === selectedProject.gallery.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? selectedProject.gallery.length - 1 : prev - 1
    )
  }

  // const featuredProjects = projects.filter(project => project.featured)

  return (
    <motion.section 
      ref={sectionRef}
      id="projects"
      className="py-20 relative overflow-hidden"
      style={{ y, opacity, scale, rotate }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 left-16 w-24 h-24 bg-primary-light/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 15, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 right-16 w-20 h-20 bg-primary-dark/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -12, 0],
            y: [0, 8, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark mb-6">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-primary-dark mx-auto rounded-full"></div>
          <p className="text-lg text-primary-dark/70 mt-4 max-w-2xl mx-auto">
            A showcase of my recent work and side projects
          </p>
        </motion.div>

        {/* Filter Section */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {filters.map((filter) => (
            <motion.button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedFilter === filter.id
                  ? 'neumorphism-pressed text-primary-dark'
                  : 'neumorphism-interactive text-primary-dark/70 hover:text-primary-dark'
              }`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{filter.icon}</span>
              <span>{filter.label}</span>
              <span className="text-xs bg-primary-dark/10 text-primary-dark px-2 py-1 rounded-full">
                {getFilterCount(filter.id)}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProjects.length === 0 ? (
              <motion.div
                className="col-span-full text-center py-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-primary-dark mb-2">No projects found</h3>
                <p className="text-primary-dark/70">Try selecting a different category</p>
              </motion.div>
            ) : (
              filteredProjects.map((project, index) => (
              <motion.div
                key={`${selectedFilter}-${project.id}`}
                className="group relative glass-card rounded-2xl depth-2 hover:depth-3 overflow-hidden card-3d hover-lift-3d magnetic-hover perspective-1000"
                initial={{ opacity: 0, y: 50, rotateY: -20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ 
                  scale: 1.08, 
                  y: -20, 
                  rotateX: 12, 
                  rotateY: 12,
                  z: 50,
                  boxShadow: "0 40px 80px rgba(21, 77, 113, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px"
                }}
                onClick={() => {
                  setSelectedProject(project)
                }}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-primary-dark text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="w-3 h-3" />
                      <span>Featured</span>
                    </span>
                  </div>
                )}

                {/* Project Image */}
                <div className="h-48 bg-primary-dark/10 relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={`${project.title} - ${project.description}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-4">
                      {project.github && (
                        <motion.a
                          href={project.github}
                          className="bg-white/90 text-primary-dark p-3 rounded-full hover:bg-white transition-colors duration-300 magnetic-button"
                          whileHover={{ 
                            scale: 1.15,
                            rotateY: 10,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            transformStyle: "preserve-3d"
                          }}
                        >
                          <Github className="w-5 h-5" />
                        </motion.a>
                      )}
                      {project.isGallery ? (
                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation()
                            openGallery(project)
                          }}
                          className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-colors duration-300"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Images className="w-5 h-5" />
                        </motion.button>
                      ) : project.live && (
                        <motion.a
                          href={project.live}
                          className={`p-3 rounded-full transition-colors duration-300 ${
                            project.isVideo 
                              ? 'bg-red-600 text-white hover:bg-red-700' 
                              : 'bg-primary-dark text-white hover:bg-primary-dark/90'
                          }`}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {project.isVideo ? <Play className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                        </motion.a>
                      )}
                      <motion.button
                        className="bg-white/90 text-primary-dark p-3 rounded-full hover:bg-white transition-colors duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedProject(project)
                        }}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-primary-dark mb-2 group-hover:text-primary-light transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-primary-dark/70 mb-4 leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                  
                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <motion.span 
                        key={tech}
                        className="bg-primary-light/30 text-primary-dark px-3 py-1 rounded-full text-sm font-medium border border-primary-light/40 hover:bg-primary-light/40 transition-colors duration-300"
                        whileHover={{ scale: 1.05, y: -1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 3 && (
                      <motion.span 
                        className="text-primary-dark/60 text-sm px-2 py-1 rounded-full bg-primary-dark/5 border border-primary-dark/10"
                        whileHover={{ scale: 1.05 }}
                      >
                        +{project.technologies.length - 3} more
                      </motion.span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex justify-between items-center text-sm text-primary-dark/60">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{project.stats.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="w-4 h-4" />
                        <span>{project.stats.views}</span>
                      </div>
                    </div>
                    <span className="text-xs bg-primary-dark/10 px-2 py-1 rounded-full">
                      {project.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
            )}
          </motion.div>
        </AnimatePresence>

        {/* Project Modal */}
        <AnimatePresence mode="wait">
          {selectedProject && (
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                initial={{ scale: 0.7, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img 
                    src={selectedProject.image} 
                    alt={`${selectedProject.title} - Project showcase`}
                    className="w-full h-64 object-cover rounded-t-2xl"
                    loading="eager"
                    decoding="async"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 bg-white/90 text-primary-dark p-2 rounded-full hover:bg-white transition-colors duration-300 cursor-hover"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-8">
                  <h3 className="text-3xl font-bold text-primary-dark mb-4">{selectedProject.title}</h3>
                  <p className="text-primary-dark/80 leading-relaxed mb-6">{selectedProject.description}</p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h4 className="font-semibold text-primary-dark mb-3">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech) => (
                          <span 
                            key={tech}
                            className="bg-primary-light/30 text-primary-dark px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-primary-dark mb-3">Project Stats</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-primary-dark/70">Stars</span>
                          <span className="font-medium">{selectedProject.stats.stars}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-dark/70">Forks</span>
                          <span className="font-medium">{selectedProject.stats.forks}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-primary-dark/70">Views</span>
                          <span className="font-medium">{selectedProject.stats.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-4">
                    {selectedProject.github && (
                      <motion.a
                        href={selectedProject.github}
                        className="flex items-center space-x-2 bg-primary-dark text-white px-6 py-3 rounded-lg hover:bg-primary-dark/90 transition-colors duration-300 cursor-hover"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github className="w-5 h-5" />
                        <span>View Code</span>
                      </motion.a>
                    )}
                    {selectedProject.isGallery ? (
                      <motion.button
                        onClick={() => openGallery(selectedProject)}
                        className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-all duration-300 cursor-hover"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Images className="w-5 h-5" />
                        <span>View Gallery</span>
                      </motion.button>
                    ) : selectedProject.live && (
                      <motion.a
                        href={selectedProject.live}
                        className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 cursor-hover ${
                          selectedProject.isVideo 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : 'border border-primary-dark text-primary-dark hover:bg-primary-dark hover:text-white'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {selectedProject.isVideo ? <Play className="w-5 h-5" /> : <ExternalLink className="w-5 h-5" />}
                        <span>{selectedProject.isVideo ? 'Watch Video' : 'Live Demo'}</span>
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gallery Popup */}
        <AnimatePresence mode="wait">
          {showGallery && selectedProject && (
            <motion.div
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={() => setShowGallery(false)}
            >
              <motion.div
                className="relative max-w-5xl max-h-[90vh] w-full mx-4"
                initial={{ scale: 0.6, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.6, opacity: 0, y: 30 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition-colors cursor-hover"
                  onClick={() => setShowGallery(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-6 h-6" />
                </motion.button>

                {/* Main Image */}
                <div className="relative">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedProject.gallery[currentImageIndex]}
                    alt={`${selectedProject.title} - Gallery image ${currentImageIndex + 1}`}
                    className="w-full h-auto max-h-[70vh] object-contain rounded-lg shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -20 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Navigation Arrows */}
                  <motion.button
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 cursor-hover shadow-lg"
                    onClick={prevImage}
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </motion.button>

                  <motion.button
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition-all duration-300 cursor-hover shadow-lg"
                    onClick={nextImage}
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Thumbnail Strip */}
                <motion.div 
                  className="flex space-x-2 mt-4 overflow-x-auto pb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  {selectedProject.gallery.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden cursor-hover transition-all duration-300 ${
                        index === currentImageIndex 
                          ? 'ring-2 ring-white shadow-lg scale-105' 
                          : 'hover:scale-105 hover:shadow-md'
                      }`}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                    >
                      <img
                        src={image}
                        alt={`${selectedProject.title} - Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </motion.button>
                  ))}
                </motion.div>

                {/* Image Counter */}
                <motion.div 
                  className="text-center mt-2 text-white/80 text-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  {currentImageIndex + 1} / {selectedProject.gallery.length}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default ProjectsSection