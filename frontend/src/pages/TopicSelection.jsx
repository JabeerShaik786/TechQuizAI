import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Code,
  Database,
  Brain,
  Shield,
  Network,
  Zap,
  ArrowRight,
  Sparkles,
  Target,
} from 'lucide-react'

import { useQuizStore } from '../store/index'

import {
  SectionTitle,
  Button,
  GlassCard,
  Badge,
  FeaturePill,
  CTACard,
} from '../components/UIComponents'

import {
  containerVariants,
  itemVariants,
  hoverGlowVariants,
  floatVariants,
} from '../animations/variants'

const quizDatabase = {
  Python: [
    {
      id: 1,
      question: 'What is Python?',
      options: ['Programming Language', 'Database', 'Browser', 'Operating System'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'Which keyword creates a function?',
      options: ['func', 'define', 'def', 'function'],
      correctAnswer: 2,
    },
    {
      id: 3,
      question: 'Which datatype is immutable?',
      options: ['List', 'Tuple', 'Dictionary', 'Set'],
      correctAnswer: 1,
    },
  ],
  'AI/ML': [
    {
      id: 1,
      question: 'What does ML stand for?',
      options: ['Machine Learning', 'Meta Learning', 'Managed Logic', 'Machine Logic'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'Popular AI library in Python?',
      options: ['TensorFlow', 'Bootstrap', 'Laravel', 'Express'],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: 'AI attempts to simulate?',
      options: ['Human intelligence', 'Hardware', 'Networks', 'Databases'],
      correctAnswer: 0,
    },
  ],
  'Data Science': [
    {
      id: 1,
      question: 'Data Science focuses on?',
      options: ['Data analysis', 'Gaming', 'Hardware', 'Networking'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'Popular data analysis library?',
      options: ['Pandas', 'React', 'Flask', 'Tailwind'],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: 'Visualization library?',
      options: ['Matplotlib', 'Express', 'MongoDB', 'Node'],
      correctAnswer: 0,
    },
  ],
  Cybersecurity: [
    {
      id: 1,
      question: 'What is phishing?',
      options: ['Cyber attack', 'Database', 'OS', 'Framework'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'HTTPS is used for?',
      options: ['Secure communication', 'Gaming', 'Storage', 'AI'],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: 'Firewall helps in?',
      options: ['Security', 'Rendering', 'Hosting', 'Gaming'],
      correctAnswer: 0,
    },
  ],
  Networking: [
    {
      id: 1,
      question: 'IP stands for?',
      options: ['Internet Protocol', 'Internal Process', 'Input Port', 'Integrated Protocol'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'Router is used for?',
      options: ['Routing traffic', 'Gaming', 'Storage', 'AI'],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: 'HTTP is used for?',
      options: ['Web browsing', 'Gaming', 'AI', 'Cloud'],
      correctAnswer: 0,
    },
  ],
  DBMS: [
    {
      id: 1,
      question: 'DBMS stands for?',
      options: ['Database Management System', 'Digital Base System', 'Database Main Server', 'None'],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: 'SQL is used for?',
      options: ['Database queries', 'Gaming', 'Styling', 'AI'],
      correctAnswer: 0,
    },
    {
      id: 3,
      question: 'Which is relational DB?',
      options: ['MySQL', 'MongoDB', 'Redis', 'Firebase'],
      correctAnswer: 0,
    },
  ],
}

const TopicSelection = () => {
  const navigate = useNavigate()
  const { setCurrentQuiz } = useQuizStore()

  const topics = [
    {
      id: 1,
      name: 'Python',
      icon: Code,
      description: 'Master Python fundamentals and advanced concepts',
      difficulty: 'Intermediate',
      questions: 3,
      color: 'cyan',
    },
    {
      id: 2,
      name: 'AI/ML',
      icon: Brain,
      description: 'Dive into machine learning and neural networks',
      difficulty: 'Advanced',
      questions: 3,
      color: 'purple',
    },
    {
      id: 3,
      name: 'Data Science',
      icon: Database,
      description: 'Learn data analysis and visualization techniques',
      difficulty: 'Intermediate',
      questions: 3,
      color: 'pink',
    },
    {
      id: 4,
      name: 'Cybersecurity',
      icon: Shield,
      description: 'Secure your systems and protect against threats',
      difficulty: 'Advanced',
      questions: 3,
      color: 'cyan',
    },
    {
      id: 5,
      name: 'Networking',
      icon: Network,
      description: 'Master networking fundamentals and protocols',
      difficulty: 'Beginner',
      questions: 3,
      color: 'purple',
    },
    {
      id: 6,
      name: 'DBMS',
      icon: Database,
      description: 'Database management systems and SQL',
      difficulty: 'Intermediate',
      questions: 3,
      color: 'pink',
    },
  ]

  const shuffleQuestions = (questions) => {
    return [...questions].sort(() => Math.random() - 0.5)
  }

  const startQuiz = (topic) => {
    const questions = shuffleQuestions(quizDatabase[topic.name] || [])

    setCurrentQuiz({
      id: topic.id,
      topic: topic.name,
      description: topic.description,
      questions,
      questionCount: questions.length,
    })

    navigate('/quiz/generate')
  }

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          animate={{ y: [0, 60, 0], x: [0, 40, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 left-32 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{ y: [0, -60, 0], x: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16 relative z-10">

        {/* ==================== HERO SECTION ==================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="mb-4 text-5xl"
          >
            🎯
          </motion.div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-black leading-tight mb-6 bg-gradient-to-r from-cyan-300 via-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Choose Your Learning Path
          </h1>

          <p className="text-xl sm:text-2xl text-cyberpunk-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
            Select a topic and embark on an AI-adaptive learning journey. Each quiz is personalized to your skill level with instant feedback and detailed analytics.
          </p>

          {/* Feature badges */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3 justify-center"
          >
            <FeaturePill icon={Zap} text="AI-Powered" variant="default" />
            <FeaturePill icon={Target} text="Adaptive Difficulty" variant="purple" />
            <FeaturePill icon={Sparkles} text="Real-Time Feedback" variant="pink" />
          </motion.div>
        </motion.div>

        {/* ==================== TOPICS GRID ==================== */}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16"
        >
          {topics.map((topic) => (
            <motion.div
              key={topic.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <GlassCard
                variant="default"
                hover
                glow={topic.color}
                className="h-full flex flex-col relative group cursor-pointer"
                onClick={() => startQuiz(topic)}
              >
                {/* Animated background glow */}
                <motion.div
                  className="absolute -inset-10 rounded-3xl opacity-0 group-hover:opacity-20"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                {/* Icon section */}
                <motion.div
                  animate={{ rotateY: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="mb-6 relative"
                >
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${
                      topic.color === 'cyan'
                        ? 'from-cyan-500/30 to-cyan-600/20'
                        : topic.color === 'purple'
                          ? 'from-purple-500/30 to-purple-600/20'
                          : 'from-pink-500/30 to-pink-600/20'
                    } border ${
                      topic.color === 'cyan'
                        ? 'border-cyan-400/30'
                        : topic.color === 'purple'
                          ? 'border-purple-400/30'
                          : 'border-pink-400/30'
                    } group-hover:shadow-neon transition-all`}
                  >
                    <topic.icon
                      className={`${
                        topic.color === 'cyan'
                          ? 'text-cyan-400'
                          : topic.color === 'purple'
                            ? 'text-purple-400'
                            : 'text-pink-400'
                      }`}
                      size={40}
                    />
                  </div>
                </motion.div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-display font-bold mb-2 text-white">
                    {topic.name}
                  </h3>

                  <p className="text-cyberpunk-secondary text-sm md:text-base mb-6 line-clamp-2">
                    {topic.description}
                  </p>

                  {/* Stats */}
                  <div className="flex gap-4 mb-6">
                    <Badge color={topic.color} variant="solid">
                      {topic.difficulty}
                    </Badge>
                    <Badge color={topic.color} variant="solid">
                      {topic.questions} Q's
                    </Badge>
                  </div>
                </div>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.05, x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => startQuiz(topic)}
                  className={`w-full flex items-center justify-between gap-3 px-5 py-3 rounded-lg font-semibold transition-all ${
                    topic.color === 'cyan'
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:bg-cyan-500/30 hover:border-cyan-400/60'
                      : topic.color === 'purple'
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:bg-purple-500/30 hover:border-purple-400/60'
                        : 'bg-pink-500/20 text-pink-300 border border-pink-400/30 hover:bg-pink-500/30 hover:border-pink-400/60'
                  }`}
                >
                  Start Quiz
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                </motion.button>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>

        {/* ==================== BOTTOM CTA ==================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="relative"
        >
          <CTACard
            title="Level Up Your Skills Today"
            description="Our advanced AI system creates personalized quizzes adapted to your learning pace. Get instant feedback, track your progress, and master new technologies."
            icon={Zap}
            buttonText="Start Learning Journey"
            gradient="from-purple-500/30 via-pink-600/20 to-cyan-500/30"
            onButtonClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </motion.div>
      </div>
    </div>
  )
}

export default TopicSelection