import { useState, useRef } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { 
  ExternalLink, 
  Eye, 
  X
} from 'lucide-react'
import useSoundEffects from '../hooks/useSoundEffects'

const IllustrationGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const sectionRef = useRef(null)
  const { playSound } = useSoundEffects()

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.8, 1, 1, 0.8])
  const rotate = useTransform(scrollYProgress, [0, 1], [1, -1])

  // Sample illustration data (replace with your Pinterest illustrations)
  const illustrations = [
    {
      id: 1,
      image: "https://i.pinimg.com/1200x/a6/a7/5e/a6a75e7efc2b24b75fe4c28b51f5176f.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/1618549863832148/",
    },
    {
      id: 2,
      image: "https://i.pinimg.com/736x/6e/02/89/6e0289e3fe316ce95b11ef7c73334bc5.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/12033123999226339/",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/1200x/a0/4a/b0/a04ab0dc235a6a0486ce0545693a45f2.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/68748584716/",
    },
   {
      id: 4,
      image: "https://i.pinimg.com/1200x/77/5d/fa/775dfaef2d9060a2d53fdc69c987097c.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/4081455907132815/",
    },
   {
      id: 5,
      image: "https://i.pinimg.com/736x/85/25/25/8525250faadf3c158d69da57bcbd6220.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/3729612268841518/",
    },
   {
      id: 6,
      image: "https://i.pinimg.com/1200x/5a/21/19/5a2119974412a8b2814203cafee9871c.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/3448137210055015/",
    },
   {
      id: 7,
      image: "https://i.pinimg.com/736x/13/f9/f5/13f9f5c064d246594db9750721f37b56.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/95349717106641465/",
    },
   {
      id: 8,
      image: "https://i.pinimg.com/736x/54/90/27/549027e426f8288c653f905f3b932a8a.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/492649954167403/",
    },
   {
      id: 9,
      image: "https://i.pinimg.com/736x/ea/96/8c/ea968c0cfd4982ec420fd22ea9adf497.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/17732992276918325/",
    },
   {
      id: 10,
      image: "https://i.pinimg.com/736x/15/3d/42/153d42b27b1d1361a558cfd31bc600c3.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/4925880837264921/",
    },
   {
      id: 11,
      image: "https://i.pinimg.com/736x/d4/8e/ee/d48eee73a1ce2ad5b59ee2b20c35f95d.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/25192079162523003/",
    },
   {
      id: 12,
      image: "https://i.pinimg.com/736x/09/66/3e/09663e60153314893201d0803cb7845c.jpg",
      tags: ["digital art", "illustration", "creative"],
      description: "A collection of digital illustrations exploring modern design concepts and color theory.",
      pinterestUrl: "https://id.pinterest.com/pin/4292562139047675/",
    },
  ]

  // Use all illustrations without filtering
  const filteredIllustrations = illustrations

  const openModal = (image) => {
    setSelectedImage(image)
    playSound('cardClick')
  }

  const closeModal = () => {
    setSelectedImage(null)
    playSound('cardClick')
  }

  return (
    <motion.section 
      ref={sectionRef}
      id="gallery"
      className="py-20 relative overflow-hidden"
      style={{ y, opacity, scale, rotate }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-40 left-16 w-36 h-36 bg-primary-light/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-40 right-16 w-28 h-28 bg-primary-dark/8 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary-dark mb-6">
            Illustration Gallery
          </h2>
          <div className="w-24 h-1 bg-primary-dark mx-auto rounded-full"></div>
          <p className="text-lg text-primary-dark/70 mt-4 max-w-2xl mx-auto">
            A curated collection of digital illustrations and creative works
          </p>
        </motion.div>


        {/* Simple Image Gallery */}
        <motion.div 
          className="gallery-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <AnimatePresence>
            {filteredIllustrations.map((illustration, index) => (
              <motion.div
                key={illustration.id}
                className="gallery-item group relative overflow-hidden rounded-xl cursor-pointer"
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.9 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120
                }}
                whileHover={{ 
                  scale: 1.03,
                  y: -8
                }}
                whileTap={{ scale: 0.97 }}
                onHoverStart={() => playSound('cardHover')}
                onClick={() => openModal(illustration)}
              >
                {/* Simple Image */}
                <img
                  src={illustration.image}
                  alt={illustration.title}
                  className="w-full h-auto object-cover transition-all duration-400 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                />
                
                {/* Simple Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ scale: 0.8 }}
                    whileHover={{ scale: 1 }}
                  >
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <Eye className="w-6 h-6 text-primary-dark" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Responsive Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
            >
              <motion.div
                className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <motion.button
                  className="absolute top-4 right-4 z-10 bg-white/90 backdrop-blur-sm text-gray-600 p-2 rounded-full hover:bg-white transition-colors duration-300 shadow-lg"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={closeModal}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                {/* Image Container */}
                <div className="relative">
                  <img
                    src={selectedImage.image}
                    alt="Illustration"
                    className="w-full h-80 sm:h-96 md:h-[500px] object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>

                {/* Content Panel */}
                <div className="p-4 sm:p-6">
                  {/* Description */}
                  <div className="mb-4">
                    <p className="text-primary-dark/80 text-sm sm:text-base leading-relaxed text-center">
                      {selectedImage.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="mb-6">
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedImage.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-primary-light/20 text-primary-dark px-3 py-1 rounded-full text-xs sm:text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Pinterest Link */}
                  <motion.a
                    href={selectedImage.pinterestUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-primary-dark text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-center font-medium hover:bg-primary-dark/90 transition-colors duration-300 flex items-center justify-center space-x-2 text-sm sm:text-base"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => playSound('cardClick')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View on Pinterest</span>
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  )
}

export default IllustrationGallery
