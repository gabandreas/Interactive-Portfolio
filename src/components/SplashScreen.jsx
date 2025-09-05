import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Code, 
  Palette, 
  Database, 
  Globe,
  Heart,
  Sparkles,
  BookOpen,
  Coffee,
  Camera,
  Music,
  Gamepad2,
  ArrowRight,
  CheckCircle
} from 'lucide-react'

const SplashScreen = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [showIllustration, setShowIllustration] = useState(true)

  const steps = [
    { 
      text: "Crafting Digital Experiences", 
      icon: <Code className="w-6 h-6" />, 
      color: "bg-primary-dark",
      illustration: "https://i.pinimg.com/1200x/69/d5/19/69d5198edf2530fa017b99402f16f372.jpg"
    },
    { 
      text: "Designing Beautiful Interfaces", 
      icon: <Palette className="w-6 h-6" />, 
      color: "bg-primary-light",
      textColor: "text-primary-dark",
      illustration: "https://i.pinimg.com/736x/8e/b5/97/8eb597d40747799172e0eace2218dd97.jpg"
    },
    { 
      text: "Building Amazing Projects", 
      icon: <Database className="w-6 h-6" />, 
      color: "bg-secondary-dark",
      illustration: "https://i.pinimg.com/736x/a1/0e/12/a10e121776518bd81f8bed5e06baa493.jpg"
    },
    { 
      text: "Connecting with the World", 
      icon: <Globe className="w-6 h-6" />, 
      color: "bg-primary-dark/80",
      illustration: "https://i.pinimg.com/1200x/75/07/61/7507612f539d8097757297a9e1e33665.jpg"
    },
    { 
      text: "Adding Personal Touch", 
      icon: <Heart className="w-6 h-6" />, 
      color: "bg-primary-light/80",
      textColor: "text-primary-dark",
      illustration: "https://i.pinimg.com/736x/22/aa/62/22aa6278637cd4017e507d6aa1522c4b.jpg"
    }
  ]

  const hobbies = [
    <Coffee className="w-5 h-5" />,
    <Camera className="w-5 h-5" />,
    <Music className="w-5 h-5" />,
    <Gamepad2 className="w-5 h-5" />,
    <BookOpen className="w-5 h-5" />
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete(), 1000)
          return 100
        }
        return prev + 2
      })
    }, 80)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 1200)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-gradient-to-br from-primary-dark via-primary-dark/90 to-secondary-dark flex items-center justify-center overflow-hidden"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Particles */}
          {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary-light/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Main Container */}
        <div className="relative z-10 w-full max-w-7xl mx-6 flex items-center justify-center">
          <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Side - Modern Card Design */}
            <motion.div
              className="relative w-full lg:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Main Card */}
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
                {/* Profile Section */}
                <div className="text-center mb-8">
                  <motion.div
                    className="w-32 h-32 mx-auto mb-6 bg-primary-light rounded-full flex items-center justify-center text-primary-dark text-4xl font-bold shadow-xl"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    GA
                  </motion.div>
                  <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
                    Gabriel Andreas
                  </h1>
                  <p className="text-xl text-primary-light/80 mb-4">
                    Interactive Portfolio
                  </p>
                  <div className="w-24 h-1 bg-primary-light mx-auto rounded-full"></div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  className="absolute top-6 right-6"
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="w-8 h-8 text-primary-light" />
                </motion.div>

                <motion.div
                  className="absolute bottom-6 left-6"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1
                  }}
                >
                  <Heart className="w-6 h-6 text-primary-light/80" />
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Loading Content */}
            <motion.div
              className="w-full lg:w-1/2 text-center lg:text-left"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {/* Loading Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  Loading Portfolio
                </h2>
                <p className="text-lg text-primary-light/80 mb-6">
                  Preparing your interactive experience...
                </p>
              </motion.div>

              {/* Loading Steps */}
              <div className="space-y-4 mb-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-500 ${
                      index === currentStep 
                        ? step.color + ' ' + (step.textColor || 'text-white') + ' shadow-lg scale-105' 
                        : 'bg-white/10 text-primary-light/80 backdrop-blur-sm'
                    }`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
                  >
                    <motion.div
                      animate={index === currentStep ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      {step.icon}
                    </motion.div>
                    <span className="font-medium text-lg">{step.text}</span>
                    {index === currentStep && (
                      <motion.div
                        className="ml-auto"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm text-primary-light/80 mb-3">
                  <span>Loading Portfolio...</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-light to-primary-dark rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Hobbies Icons */}
              <motion.div
                className="flex justify-center lg:justify-start space-x-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                {hobbies.map((hobby, index) => (
                  <motion.div
                    key={index}
                    className="text-primary-light/80 hover:text-primary-light transition-colors duration-300 p-3 rounded-full bg-white/10 backdrop-blur-sm"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2 + index * 0.2,
                      repeat: Infinity,
                      delay: index * 0.1,
                    }}
                  >
                    {hobby}
                  </motion.div>
                ))}
              </motion.div>

              {/* Completion Message */}
              {progress >= 100 && (
                <motion.div
                  className="mt-8 p-6 bg-primary-light/20 border border-primary-light/30 rounded-2xl backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-center justify-center space-x-3 text-primary-light">
                    <CheckCircle className="w-6 h-6" />
                    <span className="font-bold text-lg">Portfolio Ready!</span>
                  </div>
                  <div className="text-primary-light/80 text-sm mt-2 text-center">
                    Welcome to my interactive portfolio
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default SplashScreen
