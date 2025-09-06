import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef } from 'react'
import { 
  Music, 
  Camera, 
  Gamepad2, 
  BookOpen, 
  Coffee,
  Heart,
  Star,
  Play,
  Pause,
  Volume2,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Target,
  Award,
  Film,
  ListMusic
} from 'lucide-react'

const HobbiesSection = () => {
  const [activeHobby, setActiveHobby] = useState(0)
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

  const hobbies = [
    {
      title: "Music Lover",
      icon: <Music className="w-8 h-8" />,
      color: "from-purple-500 to-pink-500",
      description: "Listening to different genres of music, from alternative rock to indie and lo-fi. Music inspires me and keeps me focused when coding.",
      details: {
        favoriteGenres: "Rock, Country, Britpop",
        favoriteBands: "Led Zeppelin, Radiohead, Johnny Cash, The Beatles, Blur",
        habit: "Daily playlists on Spotify"
      },
      favorites: [
        { name: "Led Zeppelin", type: "Band", reason: "Great story behind the band" },
        { name: "Radiohead", type: "Band", reason: "Unique sound" },
        { name: "The Beatles", type: "Band", reason: "Icon" }
      ],
      achievements: [
        "Created curated playlists for friends",
        "Discovered 100+ new artists in 2024",
        "Attended live concerts"
      ],
      currentProject: "Exploring new indie playlists on Spotify"
    },
    {
      title: "Football Enthusiast",
      icon: <Star className="w-8 h-8" />,
      color: "from-green-500 to-emerald-500",
      description: "Watching football matches, especially European leagues. It’s both entertainment and inspiration about teamwork and strategy.",
      details: {
        favoriteClub: "FC Barcelona",
        favoriteLeague: "Premier League",
        habit: "Weekend matches"
      },
      favorites: [
        { name: "Premier League", type: "League", reason: "Exciting competition" },
        { name: "Champions League", type: "League", reason: "Top teams in Europe" },
        { name: "Derby Matches", type: "Game", reason: "Intense atmosphere" }
      ],
      achievements: [
        "Never missed a big match from my favorite team",
        "Watched World Cup final with friends",
        "Analyzed match tactics as a hobby"
      ],
      currentProject: "Following the latest Premier League season"
    },
    {
      title: "Trying New Things",
      icon: <Sparkles className="w-8 h-8" />,
      color: "from-blue-500 to-cyan-500",
      description: "I enjoy exploring new activities, from testing new apps and tools to learning random skills. Curiosity keeps me motivated.",
      details: {
        mindset: "Growth-oriented",
        motto: "Always learning",
        style: "Experimenting"
      },
      favorites: [
        { name: "Learning React", type: "Skill", reason: "Modern web tech" },
        { name: "Exploring AI tools", type: "Skill", reason: "Boost productivity" },
        { name: "Cooking simple recipes", type: "Activity", reason: "Fun and useful" }
      ],
      achievements: [
        "Tried 5+ new skills this year",
        "Experimented with AI coding tools",
        "Learned basic cooking"
      ],
      currentProject: "Building portfolio with React + Framer Motion"
    },
    {
      title: "Gaming",
      icon: <Gamepad2 className="w-8 h-8" />,
      color: "from-orange-500 to-yellow-500",
      description: "Playing games as a way to relax and enjoy both strategy and storytelling. I enjoy both competitive and casual games.",
      details: {
        platform: "PC & PlayStation",
        genre: "Action, RPG, Sports",
        habit: "Weekend sessions"
      },
      favorites: [
        { name: "FIFA", type: "Game", reason: "Football passion" },
        { name: "Valorant", type: "Game", reason: "Tactical shooter" },
        { name: "GTA V", type: "Game", reason: "Open-world fun" }
      ],
      achievements: [
        "Reached decent rank in Valorant",
        "Finished multiple story-driven games",
        "Built custom gaming setup"
      ],
      currentProject: "Exploring new football & RPG games"
    },
    {
      title: "Traveling",
      icon: <Camera className="w-8 h-8" />,
      color: "from-pink-500 to-red-500",
      description: "I love exploring new places, cultures, and foods. Traveling helps me see the world from new perspectives.",
      details: {
        style: "City trips & cultural visits",
        favoriteDestinations: "Bali, Pontianak",
        dreamDestination: "New York"
      },
      favorites: [
        { name: "Bali", type: "Place", reason: "Beach & culture" },
        { name: "Pontianak", type: "Place", reason: "Food" },
        { name: "New York", type: "Dream", reason: "City Of Dreams" }
      ],
      achievements: [
        "Visited several cities in Indonesia",
        "Tried local foods from different regions",
        "Documented trips with photos"
      ],
      currentProject: "Planning next trip abroad"
    }
  ]
  

  const currentHobby = hobbies[activeHobby]

  return (
    <motion.section 
      ref={sectionRef}
      id="hobbies"
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
            My Hobbies &amp; Interests
          </h2>
          <div className="w-24 h-1 bg-primary-dark mx-auto rounded-full"></div>
          <p className="text-lg text-primary-dark/70 mt-4 max-w-2xl mx-auto">
            Beyond coding, here's what keeps me inspired and balanced
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Hobby Navigation */}
          <motion.div
            className="lg:col-span-1 space-y-3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-xl font-bold text-primary-dark mb-6">Explore My Interests</h3>
            {hobbies.map((hobby, index) => (
              <motion.button
                key={index}
                onClick={() => setActiveHobby(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 ${
                  activeHobby === index
                    ? 'bg-primary-dark text-white shadow-lg'
                    : 'bg-white/80 text-primary-dark hover:bg-primary-light/20'
                }`}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${hobby.color} text-white flex-shrink-0`}>
                    {hobby.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm mb-1">{hobby.title}</h4>
                    <p className="text-xs opacity-80 line-clamp-2 leading-relaxed">{hobby.description}</p>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-60 flex-shrink-0" />
                </div>
              </motion.button>
            ))}
          </motion.div>

          {/* Hobby Details */}
          <motion.div
            className="lg:col-span-2 text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              key={activeHobby}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-primary-dark/10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${currentHobby.color} rounded-2xl flex items-center justify-center text-white flex-shrink-0`}>
                    {currentHobby.icon}
                  </div>
                  <div className="flex-1 text-left self-start">
                    <h3 className="text-2xl font-bold text-primary-dark mb-3">{currentHobby.title}</h3>
                    <p className="text-base text-primary-dark/80 leading-relaxed !text-left">{currentHobby.description}</p>
                  </div>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-4">
                  <h4 className="font-semibold text-primary-dark text-lg flex items-center space-x-2 text-left">
                    <Target className="w-5 h-5" />
                    <span>Details</span>
                  </h4>
                  <div className="space-y-3">
                    {Object.entries(currentHobby.details).map(([key, value]) => (
                      <div key={key} className="p-4 bg-primary-dark/5 rounded-lg border border-primary-dark/10">
                        <div className="flex flex-col space-y-2 text-left">
                          <span className="text-primary-dark/70 capitalize font-semibold text-sm text-left">{key}:</span>
                          <span className="text-primary-dark font-medium text-sm leading-relaxed text-left">{value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-primary-dark text-lg flex items-center space-x-2 text-left">
                    <Star className="w-5 h-5" />
                    <span>Favorites</span>
                  </h4>
                  <div className="space-y-3">
                    {currentHobby.favorites.slice(0, 3).map((favorite, index) => (
                      <div key={index} className="p-4 bg-primary-light/10 rounded-lg border border-primary-light/20">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-primary-light rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1 text-left">
                            <span className="text-primary-dark font-semibold text-sm block mb-1 text-left">{favorite.name}</span>
                            <span className="text-primary-dark/60 text-xs leading-relaxed text-left">{favorite.reason}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-8">
                <h4 className="font-semibold text-primary-dark text-lg mb-4 flex items-center space-x-2 text-left">
                  <Award className="w-5 h-5" />
                  <span>Achievements</span>
                </h4>
                <div className="space-y-3">
                  {currentHobby.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-primary-light/20 rounded-lg border border-primary-light/30"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Sparkles className="w-4 h-4 text-primary-light flex-shrink-0 mt-0.5" />
                      <span className="text-primary-dark font-medium text-sm leading-relaxed text-left">{achievement}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Current Project */}
              <div className="bg-gradient-to-r from-primary-dark/5 to-primary-light/10 p-6 rounded-xl border border-primary-dark/10">
                <h4 className="font-semibold text-primary-dark text-lg mb-3 flex items-center space-x-2 text-left">
                  <Zap className="w-5 h-5" />
                  <span>Current Project</span>
                </h4>
                <p className="text-primary-dark/80 leading-relaxed text-left">{currentHobby.currentProject}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Fun Stats */}
        <motion.div
          className="mt-16 bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-primary-dark/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h3 className="text-2xl font-bold text-primary-dark mb-8 text-center">Fun Stats</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Movie Watched", value: "150+", icon: <Film className="w-6 h-6" /> },
              { label: "Coffee Shops", value: "50+", icon: <Coffee className="w-6 h-6" /> },
              { label: "Music Played", value: "2K+", icon: <ListMusic className="w-6 h-6" /> },
              { label: "Games Played", value: "100+", icon: <Gamepad2 className="w-6 h-6" /> }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center group cursor-pointer p-4 rounded-xl hover:bg-primary-dark/5 transition-colors duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white text-2xl">{stat.icon}</div>
                </div>
                <div className="text-2xl font-bold text-primary-dark mb-2">{stat.value}</div>
                <div className="text-sm text-primary-dark/70 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default HobbiesSection