import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  MessageSquare,
  Calendar,
  Clock,
  ExternalLink,
  Copy,
  Heart,
  Coffee,
  Zap
} from 'lucide-react'

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
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
  const [formStatus, setFormStatus] = useState('idle') // idle, sending, success, error
  const [errors, setErrors] = useState({})
  const [copiedEmail, setCopiedEmail] = useState(false)

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "gabandreas32@gmail.com",
      href: "mailto:gabandreas32@gmail.com?subject=Hello Gabriel&body=Hi Gabriel, I saw your portfolio and...",
      description: "Drop me a line anytime"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+62 (812) 93386168",
      href: "tel:+6281293386168",
      description: "Mon-Fri 9AM-6PM PST"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Jakarta, Indonesia",
      href: "#",
      description: "Available for remote work"
    }
  ]

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/gabandreas", label: "GitHub", color: "hover:text-gray-800" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/gabriel-hutapea-b7a277374/", label: "LinkedIn", color: "hover:text-primary-light" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/gabbandreass", label: "Twitter", color: "hover:text-primary-light" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:gabandreas32@gmail.com?subject=Hello Gabriel&body=Hi Gabriel, I saw your portfolio and...", label: "Email", color: "hover:text-red-500" }
  ]

  const quickReplies = [
    "Let's work together!",
    "I have a project idea",
    "Coffee chat?",
    "Quick question"
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setFormStatus('sending')
    
    try {
      // Using Formspree for reliable email delivery
      const response = await fetch('https://formspree.io/f/mblaqrop', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact: ${formData.subject}`
        })
      })
      
      if (response.ok) {
        setFormStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Failed to send email')
      }
      
    } catch (error) {
      console.error('Error sending email:', error)
      setFormStatus('error')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('gabandreas32@gmail.com')
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    } catch {
      console.error('Failed to copy email')
    }
  }

  const getStatusIcon = () => {
    switch (formStatus) {
      case 'sending':
        return <Clock className="w-5 h-5 animate-spin" />
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Send className="w-5 h-5" />
    }
  }

  const getStatusText = () => {
    switch (formStatus) {
      case 'sending':
        return 'Sending...'
      case 'success':
        return 'Message Sent!'
      case 'error':
        return 'Error Sending'
      default:
        return 'Send Message'
    }
  }

  return (
    <motion.section 
      ref={sectionRef}
      id="contact"
      className="py-16 sm:py-20 relative overflow-hidden"
      style={{ y, opacity, scale }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark mb-4 sm:mb-6">
            Get In Touch
          </h2>
          <div className="w-24 h-1 bg-primary-dark mx-auto rounded-full"></div>
          <p className="text-lg text-primary-dark/70 mt-4 max-w-2xl mx-auto">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-primary-dark mb-6 flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>Let's Connect</span>
              </h3>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <motion.div 
                    key={info.label}
                    className="flex items-center p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all duration-300 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => {
                      if (info.label === 'Email') copyEmail()
                      else if (info.href !== '#') window.open(info.href, '_blank')
                    }}
                  >
                    <div className="bg-primary-dark text-white p-3 rounded-full mr-4">
                      {info.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-primary-dark">{info.label}</p>
                      <p className="text-primary-dark/80">{info.value}</p>
                      <p className="text-sm text-primary-dark/60">{info.description}</p>
                    </div>
                    {info.label === 'Email' && copiedEmail && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold text-primary-dark mb-4">Follow Me</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="p-3 bg-white/80 backdrop-blur-sm border border-primary-dark/20 rounded-full text-primary-dark hover:bg-primary-dark hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6">
              <h4 className="text-lg font-semibold text-primary-dark mb-4">Response Time</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-primary-dark/70">Email Response</span>
                  <span className="font-semibold text-primary-dark">&lt; 24 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-primary-dark/70">Availability</span>
                  <span className="font-semibold text-primary-dark">Open to work</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 sm:p-8 shadow-xl border border-primary-dark/10">
              <h3 className="text-xl font-bold text-primary-dark mb-6">Send a Message</h3>
              
              {/* Quick Reply Buttons */}
              <div className="mb-6">
                <p className="text-sm text-primary-dark/70 mb-3">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => setFormData(prev => ({ ...prev, subject: reply }))}
                      className="px-3 py-1 bg-primary-light/30 text-primary-dark rounded-full text-sm hover:bg-primary-light/50 transition-colors duration-300"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-primary-dark font-semibold mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors duration-300 ${
                        errors.name 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-primary-dark/20 focus:border-primary-dark'
                      }`}
                      placeholder="Your full name"
                    />
                    {errors.name && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.name}</span>
                      </motion.p>
                    )}
                  </div>
                  <div>
                    <label className="block text-primary-dark font-semibold mb-2">
                      <Mail className="w-4 h-4 inline mr-2" />
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors duration-300 ${
                        errors.email 
                          ? 'border-red-500 focus:border-red-500' 
                          : 'border-primary-dark/20 focus:border-primary-dark'
                      }`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && (
                      <motion.p 
                        className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.email}</span>
                      </motion.p>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-primary-dark font-semibold mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors duration-300 ${
                      errors.subject 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-primary-dark/20 focus:border-primary-dark'
                    }`}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.subject}</span>
                    </motion.p>
                  )}
                </div>
                
                <div>
                  <label className="block text-primary-dark font-semibold mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-colors duration-300 resize-none ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'border-primary-dark/20 focus:border-primary-dark'
                    }`}
                    placeholder="Tell me about your project or just say hello!"
                  />
                  {errors.message && (
                    <motion.p 
                      className="text-red-500 text-sm mt-1 flex items-center space-x-1"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.message}</span>
                    </motion.p>
                  )}
                </div>
                
                <motion.button
                  type="submit"
                  disabled={formStatus === 'sending'}
                  className={`w-full py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    formStatus === 'sending'
                      ? 'bg-primary-dark/50 text-white cursor-not-allowed'
                      : 'bg-primary-dark text-white hover:bg-primary-dark/90 hover:scale-105'
                  }`}
                  whileHover={formStatus !== 'sending' ? { scale: 1.02 } : {}}
                  whileTap={formStatus !== 'sending' ? { scale: 0.98 } : {}}
                >
                  {getStatusIcon()}
                  <span>{getStatusText()}</span>
                </motion.button>
              </form>

              {/* Success Message */}
              <AnimatePresence>
                {formStatus === 'success' && (
                  <motion.div
                    className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-2"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-green-700">Thanks! I'll get back to you soon.</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default ContactSection