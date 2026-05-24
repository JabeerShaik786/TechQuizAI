import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  TrendingUp,
  Zap,
  Award,
  Book,
  Flame,
  Sparkles,
  ArrowRight,
  Cpu,
  Target,
  Rocket,
} from 'lucide-react'

import {
  useStatsStore,
  useAuthStore,
} from '../store/index'

import {
  GlassCard,
  SectionTitle,
  Button,
  Badge,
  StatCard,
  CTACard,
  FeaturePill,
} from '../components/UIComponents'

import {
  containerVariants,
  itemVariants,
  heroVariants,
  heroTitleVariants,
  heroParagraphVariants,
  floatVariants,
  glowPulseVariants,
} from '../animations/variants'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const {
    xp,
    level,
    streak,
    quizzesCompleted,
    totalAccuracy,
    badges,
  } = useStatsStore()

  const stats = [
    {
      icon: Zap,
      label: 'XP Points',
      value: xp.toLocaleString(),
      color: 'cyan',
      trend: '12',
    },
    {
      icon: TrendingUp,
      label: 'Level',
      value: level,
      color: 'purple',
      trend: '5',
    },
    {
      icon: Book,
      label: 'Quizzes',
      value: quizzesCompleted,
      color: 'pink',
      trend: '8',
    },
    {
      icon: Award,
      label: 'Accuracy',
      value: `${totalAccuracy.toFixed(1)}%`,
      color: 'green',
      trend: '2',
    },
  ]

  const quizFeatures = [
    { icon: Cpu, text: 'AI-Powered' },
    { icon: Target, text: 'Adaptive' },
    { icon: Rocket, text: 'Fast Feedback' },
  ]

  return (
    <div className="min-h-screen w-full flex flex-col relative">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{ y: [0, 50, 0], x: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-purple-500/5 blur-3xl"
          animate={{ y: [0, -50, 0], x: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 relative z-10">

        {/* ==================== HERO SECTION ==================== */}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mb-16 md:mb-20 text-center lg:text-left relative"
        >
          {/* Background glow */}
          <div className="absolute -inset-20 -z-10 pointer-events-none bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 rounded-3xl blur-3xl opacity-15" />

          <motion.div variants={heroTitleVariants} className="relative z-10">
            <h1 className="hero-text-sharp text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-tight mb-6 tracking-tight text-white drop-shadow-[0_18px_80px_rgba(0,245,255,0.14)]">
              Welcome back,&nbsp;
              <span className="relative inline-flex items-center">
                <span className="relative z-20 bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  {user?.name || 'Learner'}
                </span>
                <motion.span
                  className="hero-glow-behind rounded-full bg-cyan-400/12"
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </span>
              !
            </h1>
          </motion.div>

          <motion.p
            variants={heroParagraphVariants}
            className="text-xl sm:text-2xl text-cyberpunk-secondary max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed"
          >
            Your AI-powered learning command center is ready. Choose a topic, master the content, and level up your skills today.
          </motion.p>

          {/* Badge row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-3 justify-center lg:justify-start"
          >
            {quizFeatures.map((feature, idx) => (
              <FeaturePill
                key={idx}
                icon={feature.icon}
                text={feature.text}
                variant={idx === 0 ? 'default' : idx === 1 ? 'purple' : 'pink'}
              />
            ))}
          </motion.div>
        </motion.div>

        {/* ==================== STATS GRID ==================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-12 md:mb-16"
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <StatCard
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                color={stat.color}
                trend={stat.trend}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* ==================== MAIN GRID ==================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 md:mb-16"
        >

          {/* ==================== START QUIZ CTA - HERO ==================== */}

          <motion.div
            variants={itemVariants}
            className="lg:col-span-2"
          >
            <CTACard
              title="Start Your Learning Journey"
              description="Select a topic and begin an AI-adaptive quiz tailored to your skill level. Get instant feedback and watch your expertise grow."
              icon={Rocket}
              buttonText="Choose a Quiz Topic"
              onButtonClick={() => navigate('/topics')}
              gradient="from-cyan-500/30 via-purple-600/20 to-pink-500/30"
            />
          </motion.div>

          {/* ==================== STREAK CARD - PREMIUM ==================== */}

          <motion.div variants={itemVariants}>
            <GlassCard variant="thick" className="h-full relative overflow-hidden group">
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-pink-500/10"
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-cyberpunk-secondary text-sm font-semibold uppercase tracking-wider mb-2">
                      🔥 Current Streak
                    </p>
                    <p className="text-6xl md:text-7xl font-display font-black text-orange-400">
                      {streak}
                    </p>
                    <p className="text-cyberpunk-secondary mt-2">
                      days in a row 🚀
                    </p>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-5xl"
                  >
                    🔥
                  </motion.div>
                </div>

                {/* Progress bar */}
                <div className="mt-8 pt-8 border-t border-orange-400/20">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-cyberpunk-secondary font-semibold">
                      Keep it up!
                    </span>
                    <span className="text-sm text-orange-400 font-bold">
                      {Math.min(streak, 30)}/30
                    </span>
                  </div>
                  <div className="h-2 bg-orange-400/10 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full"
                      style={{
                        width: `${Math.min((streak / 30) * 100, 100)}%`,
                      }}
                      animate={{ boxShadow: ['0 0 10px rgba(255, 107, 0, 0.5)', '0 0 20px rgba(255, 107, 0, 0.8)', '0 0 10px rgba(255, 107, 0, 0.5)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* ==================== QUICK ACTIONS ==================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16"
        >
          {/* AI Assistant */}
          <motion.div variants={itemVariants}>
            <GlassCard
              hover
              glow="cyan"
              className="h-full cursor-pointer transition-all"
              onClick={() => navigate('/ai-assistant')}
            >
              <div className="flex items-start justify-between mb-6">
                <Cpu className="text-cyan-400" size={32} />
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-cyan-400"
                />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">
                AI Assistant
              </h3>
              <p className="text-cyberpunk-secondary mb-6">
                Get personalized explanations and hints powered by AI.
              </p>
              <div className="flex items-center text-cyan-400 font-semibold">
                Get Help <ArrowRight size={18} className="ml-2" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Analytics */}
          <motion.div variants={itemVariants}>
            <GlassCard
              hover
              glow="purple"
              className="h-full cursor-pointer"
              onClick={() => navigate('/analytics')}
            >
              <div className="flex items-start justify-between mb-6">
                <TrendingUp className="text-purple-400" size={32} />
                <Badge color="purple" variant="solid">
                  Live
                </Badge>
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">
                Analytics
              </h3>
              <p className="text-cyberpunk-secondary mb-6">
                Track your progress with detailed insights and trends.
              </p>
              <div className="flex items-center text-purple-400 font-semibold">
                View Stats <ArrowRight size={18} className="ml-2" />
              </div>
            </GlassCard>
          </motion.div>

          {/* Profile */}
          <motion.div variants={itemVariants}>
            <GlassCard
              hover
              glow="pink"
              className="h-full cursor-pointer"
              onClick={() => navigate('/profile')}
            >
              <div className="flex items-start justify-between mb-6">
                <Award className="text-pink-400" size={32} />
                <Badge color="pink" variant="solid">
                  {badges?.length || 0}
                </Badge>
              </div>
              <h3 className="text-2xl font-display font-bold mb-2">
                Profile & Badges
              </h3>
              <p className="text-cyberpunk-secondary mb-6">
                Showcase your achievements and unlock new badges.
              </p>
              <div className="flex items-center text-pink-400 font-semibold">
                View Profile <ArrowRight size={18} className="ml-2" />
              </div>
            </GlassCard>
          </motion.div>
        </motion.div>

        {/* ==================== BOTTOM CTA ==================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="relative"
        >
          <div className="glass rounded-2xl p-8 md:p-12 border-cyan-400/30 text-center relative overflow-hidden group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mb-4 text-4xl md:text-5xl"
              >
                ⚡
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                Ready to Master New Skills?
              </h3>

              <p className="text-cyberpunk-secondary text-lg mb-8 max-w-2xl mx-auto">
                Our AI-powered quiz engine adapts to your learning pace, providing personalized questions and instant feedback.
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                whileHover={{ scale: 1.02 }}
              >
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/topics')}
                  icon={Rocket}
                  className="flex-1 sm:flex-auto"
                >
                  Start Learning Now
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => navigate('/analytics')}
                  icon={TrendingUp}
                  className="flex-1 sm:flex-auto"
                >
                  View Progress
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard