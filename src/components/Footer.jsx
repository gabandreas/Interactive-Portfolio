import { motion } from 'framer-motion'
import { 
  Github, 
  Linkedin, 
  Mail, 
  Twitter,
  Heart,
  Coffee,
  ArrowUp,
  ExternalLink,
  Calendar,
  MapPin,
  Phone,
  Code,
  Palette,
  Database,
  Smartphone,
  Cloud,
  Star,
  Zap,
  Sparkles
} from 'lucide-react'

const Footer = () => {

  const socialLinks = [
    { 
      icon: <Github className="w-6 h-6" />, 
      href: "https://github.com/gabandreas", 
      label: "GitHub",
      color: "hover:text-gray-300",
      stats: "2.5k followers"
    },
    { 
      icon: <Linkedin className="w-6 h-6" />, 
      href: "https://www.linkedin.com/in/gabriel-hutapea-b7a277374/", 
      label: "LinkedIn",
      color: "hover:text-blue-400",
      stats: "500+ connections"
    },
    { 
      icon: <Twitter className="w-6 h-6" />, 
      href: "https://x.com/gabbandreass", 
      label: "Twitter",
      color: "hover:text-blue-400",
      stats: "1.2k followers"
    },
    { 
      icon: <Mail className="w-6 h-6" />, 
      href: "#", 
      label: "Email",
      color: "hover:text-red-400",
      stats: "Always open"
    }
  ]

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Hobbies", href: "#hobbies" },
    { name: "Contact", href: "#contact" }
  ]

  const techStack = [
    { name: "Laravel", icon: <Code className="w-4 h-4" /> },
    { name: "MySQL", icon: <Database className="w-4 h-4" /> },
    { name: "React", icon: <Palette className="w-4 h-4" /> },
    { name: "Figma", icon: <Cloud className="w-4 h-4" /> },
    { name: "TailwindCSS", icon: <Smartphone className="w-4 h-4" /> }
  ]

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.footer 
      className="bg-primary-dark text-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary-light rounded-xl flex items-center justify-center">
                  <span className="text-primary-dark font-bold text-xl">GA</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Gabriel Andreas</h3>
                  <p className="text-white/70 text-sm">Junior Web Developer</p>
                </div>
              </div>
              
              <p className="text-white/80 mb-6 leading-relaxed">
                Creating digital experiences that combine beautiful design with powerful functionality. 
                Always learning, always building.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Jakarta, Indonesia</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>gabandreas32@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+62 (812) 93386168</span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Quick Links</span>
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-primary-light transition-colors duration-300 flex items-center space-x-2 group"
                    >
                      <span>{link.name}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <Code className="w-5 h-5" />
                <span>Tech Stack</span>
              </h4>
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center space-x-2 text-white/70 hover:text-primary-light transition-colors duration-300 group cursor-pointer"
                  >
                    <span className="group-hover:scale-110 transition-transform duration-300">{tech.icon}</span>
                    <span className="text-sm">{tech.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Social & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h4 className="text-lg font-semibold mb-6 flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span>Connect</span>
              </h4>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="flex items-center space-x-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all duration-300 group"
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    <div className={`p-2 rounded-lg bg-white/20 group-hover:bg-white/30 transition-colors duration-300 ${social.color}`}>
                      {social.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{social.label}</p>
                      <p className="text-xs text-white/60">{social.stats}</p>
                    </div>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <motion.div
            className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="text-center">
              <h4 className="text-xl font-bold mb-2 flex items-center justify-center space-x-2">
                <Sparkles className="w-5 h-5" />
                <span>Stay Updated</span>
              </h4>
              <p className="text-white/80 mb-4">Get notified about my latest projects and insights</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-primary-light"
                />
                <motion.button
                  className="px-6 py-3 bg-primary-light text-primary-dark rounded-lg font-semibold hover:bg-white transition-colors duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-white/70">
              <span>© 2025 Gabriel Andreas. Made by</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-400" />
              </motion.div>
              <span>and lots of</span>
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Coffee className="w-4 h-4 text-amber-400" />
              </motion.div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-white/70">
              <a href="#" className="hover:text-primary-light transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-primary-light transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-primary-light transition-colors duration-300">Sitemap</a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-primary-dark text-white p-3 rounded-full shadow-lg hover:bg-primary-light hover:text-primary-dark transition-all duration-300 z-[350]"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <ArrowUp className="w-5 h-5" />
      </motion.button>
    </motion.footer>
  )
}

export default Footer