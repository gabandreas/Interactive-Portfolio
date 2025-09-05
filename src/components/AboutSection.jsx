import { motion, useScroll, useTransform } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { TextReveal, GradientText, ParticleText } from './AnimatedText'
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
  BookOpenText,
  Github,
  Calendar,
  Star,
  GitBranch,
  Eye
} from 'lucide-react'

const AboutSection = () => {
  const [activeTab, setActiveTab] = useState('story')
  const [githubStats, setGithubStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const sectionRef = useRef(null)

  // Fetch real GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true)
        
        // Fetch user profile
        const userResponse = await fetch('https://api.github.com/users/gabandreas')
        if (!userResponse.ok) {
          throw new Error(`Failed to fetch user data: ${userResponse.status}`)
        }
        const userData = await userResponse.json()
        
        // Fetch repositories
        const reposResponse = await fetch('https://api.github.com/users/gabandreas/repos?per_page=100&sort=updated')
        if (!reposResponse.ok) {
          throw new Error(`Failed to fetch repositories: ${reposResponse.status}`)
        }
        const reposData = await reposResponse.json()
        
        // Calculate total stars
        const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        
        // Try to get commit count from GitHub API
        let totalCommits = 0
        let isEstimated = true
        
        try {
          // Try to get commits from individual repositories
          let commitCount = 0
          let processedRepos = 0
          
          // Process first 10 repositories to get commit count
          const reposToProcess = reposData.slice(0, 10)
          
          for (const repo of reposToProcess) {
            try {
              const commitsResponse = await fetch(`https://api.github.com/repos/${userData.login}/${repo.name}/commits?per_page=100&author=${userData.login}`)
              
              if (commitsResponse.ok) {
                const commitsData = await commitsResponse.json()
                if (Array.isArray(commitsData)) {
                  commitCount += commitsData.length
                  processedRepos++
                }
              }
              
              // Add small delay to avoid rate limiting
              await new Promise(resolve => setTimeout(resolve, 100))
            } catch (repoError) {
              console.log(`Error fetching commits for ${repo.name}:`, repoError)
            }
          }
          
          if (commitCount > 0) {
            // Estimate total commits based on processed repos
            const averageCommitsPerRepo = commitCount / processedRepos
            totalCommits = Math.round(averageCommitsPerRepo * reposData.length)
            isEstimated = false
          } else {
            // Fallback: try GitHub events API
            const eventsResponse = await fetch('https://api.github.com/users/gabandreas/events?per_page=100')
            
            if (eventsResponse.ok) {
              const eventsData = await eventsResponse.json()
              
              if (Array.isArray(eventsData)) {
                const pushEvents = eventsData.filter(event => event.type === 'PushEvent')
                totalCommits = pushEvents.length
                
                if (totalCommits > 0) {
                  isEstimated = false
                }
              }
            }
          }
          
          // If still no data, use conservative estimation
          if (totalCommits === 0) {
            totalCommits = Math.max(10, reposData.length * 5) // 5 commits per repo average
            isEstimated = true
          }
          
        } catch (error) {
          console.log('Error fetching commit data:', error)
          // Fallback estimation based on repos
          totalCommits = Math.max(10, reposData.length * 5)
          isEstimated = true
        }
        
        // Calculate language usage
        const languageStats = {}
        let totalRepos = reposData.length
        
        for (const repo of reposData) {
          if (repo.language) {
            languageStats[repo.language] = (languageStats[repo.language] || 0) + 1
          }
        }
        
        // Convert to percentages
        const languages = {}
        Object.entries(languageStats).forEach(([lang, count]) => {
          languages[lang] = Math.round((count / totalRepos) * 100)
        })
        
        // Sort languages by usage and take top 5
        const sortedLanguages = Object.entries(languages)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 5)
          .reduce((obj, [lang, percentage]) => {
            obj[lang] = percentage
            return obj
          }, {})
        
        // Recent activity removed to keep section concise
        
        const githubStats = {
          public_repos: userData.public_repos,
          followers: userData.followers,
          following: userData.following,
          created_at: userData.created_at,
          total_stars: totalStars,
          total_commits: totalCommits,
          languages: sortedLanguages,
          profile_url: userData.html_url,
          avatar_url: userData.avatar_url,
          bio: userData.bio,
          location: userData.location,
          company: userData.company,
          // Additional commit info
          commit_info: {
            estimated: isEstimated,
            note: isEstimated ? "Estimated based on repository activity" : "Based on recent GitHub activity"
          },
          // Contribution graph data with multiple options
          contribution_graphs: {
            default: `https://ghchart.rshah.org/gabandreas`,
            flat: `https://ghchart.rshah.org/gabandreas?style=flat`,
            dark: `https://ghchart.rshah.org/gabandreas?style=dark`,
            flat_dark: `https://ghchart.rshah.org/gabandreas?style=flat&theme=dark`
          }
        }
        
        setGithubStats(githubStats)
        setLoading(false)
        
      } catch (error) {
        console.error('Error fetching GitHub data:', error)
        
        // Fallback to mock data if API fails
        const mockStats = {
          public_repos: 0,
          followers: 0,
          following: 0,
          created_at: new Date().toISOString(),
          total_stars: 0,
          total_commits: 0,
          languages: {},
          profile_url: "https://github.com/gabandreas",
          avatar_url: "",
          bio: "GitHub profile not available",
          location: "",
          company: "",
          commit_info: {
            estimated: true,
            note: "GitHub API not available"
          },
          contribution_graphs: {
            default: `https://ghchart.rshah.org/gabandreas`,
            flat: `https://ghchart.rshah.org/gabandreas?style=flat`,
            dark: `https://ghchart.rshah.org/gabandreas?style=dark`,
            flat_dark: `https://ghchart.rshah.org/gabandreas?style=flat&theme=dark`
          }
        }
        setGithubStats(mockStats)
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [])
  
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
    { id: 'interests', label: 'Interests', icon: <Heart className="w-4 h-4" /> },
    { id: 'github', label: 'GitHub Activity', icon: <Github className="w-4 h-4" /> }
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

  const renderGitHubActivity = () => (
    <div className="space-y-6">
      {/* GitHub Profile Info */}
      {githubStats && (
        <motion.div
          className="glass-card p-6 rounded-xl"
          whileHover={{ scale: 1.02, y: -2 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-start space-x-4">
            {githubStats.avatar_url && (
              <img 
                src={githubStats.avatar_url} 
                alt="GitHub Avatar" 
                className="w-16 h-16 rounded-full border-2 border-primary-dark/20"
              />
            )}
            <div className="flex-1">
              <h3 className="text-xl font-bold text-primary-dark mb-2">GitHub Profile</h3>
              {githubStats.bio && (
                <p className="text-primary-dark/80 mb-3">{githubStats.bio}</p>
              )}
              <div className="flex flex-wrap gap-4 text-sm text-primary-dark/70">
                {githubStats.location && (
                  <span className="flex items-center">
                    📍 {githubStats.location}
                  </span>
                )}
                {githubStats.company && (
                  <span className="flex items-center">
                    🏢 {githubStats.company}
                  </span>
                )}
                <span className="flex items-center">
                  📅 Joined {new Date(githubStats.created_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long' 
                  })}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* GitHub Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { 
            icon: <Github className="w-5 h-5" />, 
            label: "Repositories", 
            value: githubStats?.public_repos || 0,
            color: ""
          },
          { 
            icon: <Star className="w-5 h-5" />, 
            label: "Total Stars", 
            value: githubStats?.total_stars || 0,
            color: ""
          },
          { 
            icon: <GitBranch className="w-5 h-5" />, 
            label: "Total Commits", 
            value: githubStats?.total_commits || 0,
            color: "",
            subtitle: githubStats?.commit_info?.note || ""
          },
          { 
            icon: <Users className="w-5 h-5" />, 
            label: "Followers", 
            value: githubStats?.followers || 0,
            color: ""
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="glass-card p-4 rounded-xl text-center group cursor-pointer"
            whileHover={{ scale: 1.05, y: -2 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className={`inline-flex p-2 rounded-lg bg-gradient-to-r ${stat.color} mb-3 group-hover:scale-110 transition-transform duration-300`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-primary-dark mb-1 group-hover:text-primary-light transition-colors duration-300">
              {stat.value}
            </div>
            <div className="text-sm text-primary-dark/70 font-medium">
              {stat.label}
            </div>
            {stat.subtitle && (
              <div className="text-xs text-primary-dark/50 mt-1 italic">
                {stat.subtitle}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Top Languages */}
      <motion.div
        className="glass-card p-6 rounded-xl"
        whileHover={{ scale: 1.02, y: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h3 className="text-lg font-semibold text-primary-dark mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2" />
          Top Languages
        </h3>
        <div className="space-y-4">
          {githubStats?.languages && Object.entries(githubStats.languages).map(([language, percentage], index) => (
            <motion.div
              key={language}
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
            >
              <div className="flex justify-between items-center">
                <span className="text-primary-dark font-medium">{language}</span>
                <span className="text-primary-dark/70 text-sm">{percentage}%</span>
              </div>
              <div className="w-full bg-primary-dark/10 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Contribution Graph */}
      <motion.div
        className="glass-card p-6 rounded-xl"
        whileHover={{ scale: 1.02, y: -2 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h3 className="text-lg font-semibold text-primary-dark mb-4 flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          Contribution Activity
        </h3>
        <div className="bg-white/20 rounded-lg p-4 overflow-hidden">
          {githubStats?.contribution_graphs ? (
            <div className="relative">
              <img 
                src={githubStats.contribution_graphs.default}
                alt="GitHub Contribution Graph"
                className="w-full h-auto rounded-lg shadow-lg"
                onError={(e) => {
                  // Try fallback to flat style
                  e.target.src = githubStats.contribution_graphs.flat
                  e.target.onerror = () => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'block'
                  }
                }}
              />
              <div 
                className="hidden text-center py-8 text-primary-dark/60"
                style={{ display: 'none' }}
              >
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Contribution graph not available</p>
                <p className="text-sm mt-2">
                  <a 
                    href={`https://github.com/${githubStats?.profile_url?.split('/').pop() || 'gabandreas'}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-dark hover:text-primary-light underline"
                  >
                    View on GitHub
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-primary-dark/60">
              <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Contribution graph not available</p>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-primary-dark/70">
            View full contribution history on{' '}
            <a 
              href={githubStats?.profile_url || "https://github.com/gabandreas"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-dark hover:text-primary-light underline transition-colors duration-300"
            >
              GitHub
            </a>
          </p>
        </div>
      </motion.div>

      {/* GitHub Profile Link */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <a
          href={githubStats?.profile_url || "https://github.com/gabandreas"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-6 py-3 bg-primary-dark text-white rounded-full font-semibold hover:bg-primary-light transition-all duration-300 shadow-lg hover:shadow-xl group"
        >
          <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" />
          Visit My GitHub Profile
          <motion.div
            className="ml-2"
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </motion.div>
        </a>
      </motion.div>
    </div>
  )
  

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

              {activeTab === 'github' && (
                <div>
                  {loading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
                    </div>
                  ) : (
                    renderGitHubActivity()
                  )}
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