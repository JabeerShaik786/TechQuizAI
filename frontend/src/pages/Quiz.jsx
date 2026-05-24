import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Check,
  SkipForward,
  Clock,
  Target,
  Zap,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import {
  useQuizStore,
  useStatsStore,
} from '../store/index'

import {
  Button,
  GlassCard,
  Badge,
  LoadingSpinner,
} from '../components/UIComponents'

import {
  containerVariants,
  itemVariants,
  tabVariants,
  glowPulsePurpleVariants,
  buttonPressVariants,
} from '../animations/variants'

const fallbackQuestions = [
  {
    id: 1,
    question: 'What is Python?',
    options: [
      'Programming Language',
      'Database',
      'Browser',
      'Operating System',
    ],
    correctAnswer: 0,
  },
  {
    id: 2,
    question: 'Which keyword is used to define a function in Python?',
    options: ['func', 'define', 'def', 'function'],
    correctAnswer: 2,
  },
  {
    id: 3,
    question: 'Which data type is immutable in Python?',
    options: ['List', 'Dictionary', 'Set', 'Tuple'],
    correctAnswer: 3,
  },
]

const Quiz = () => {
  const navigate = useNavigate()

  const {
    currentQuiz,
    currentQuestion,
    answers,
    setCurrentQuestion,
    addAnswer,
    setScore,
  } = useQuizStore()

  const [timeLeft, setTimeLeft] = useState(600)
  const [answered, setAnswered] = useState(false)

  const quizQuestions =
    currentQuiz?.questions?.length > 0
      ? currentQuiz.questions
      : fallbackQuestions

  const question = quizQuestions[currentQuestion]

  const [selectedAnswer, setSelectedAnswer] = useState(
    answers[question?.id]?.toString() || ''
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner fullScreen size="lg" />
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100

  const handleSelectAnswer = (index) => {
    setSelectedAnswer(index.toString())
    addAnswer(question.id, index)
    setAnswered(true)
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer('')
      setAnswered(false)
    } else {
      handleSubmitQuiz()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      setSelectedAnswer('')
      setAnswered(false)
    }
  }

  const handleSubmitQuiz = () => {
    let correctCount = 0

    quizQuestions.forEach((q) => {
      if (
        answers[q.id]?.toString() ===
        q.correctAnswer?.toString()
      ) {
        correctCount++
      }
    })

    const score = Math.round(
      (correctCount / quizQuestions.length) * 100
    )

    setScore(score)

    const stats = useStatsStore.getState()
    stats.addQuiz(currentQuiz.topic || 'Python', score)
    stats.addXP(score)

    navigate(`/results/${currentQuiz.id || 1}`)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const timeWarning = timeLeft < 60

  return (
    <div className="min-h-screen w-full flex flex-col relative overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute -top-40 right-20 w-96 h-96 rounded-full bg-purple-500/5 blur-3xl"
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 left-20 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{ y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Main content */}
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 lg:py-10 relative z-10">

        {/* ==================== HEADER ==================== */}

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 md:mb-12 gap-4"
        >
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-400/30">
                <Target className="text-purple-400" size={20} />
              </div>
              <span className="text-sm font-mono text-purple-400 font-bold">
                EXAMINATION CHAMBER
              </span>
            </motion.div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-black text-white mb-1">
              {currentQuiz.topic || 'Python'}
            </h1>

            <p className="text-cyberpunk-secondary text-sm md:text-base">
              Question <span className="text-cyan-400 font-bold">{currentQuestion + 1}</span> of{' '}
              <span className="text-cyan-400 font-bold">{quizQuestions.length}</span>
            </p>
          </div>

          {/* Timer */}
          <motion.div
            animate={timeWarning ? glowPulsePurpleVariants.pulse : {}}
            className={`glass px-6 py-4 rounded-2xl flex items-center gap-3 flex-shrink-0 border ${
              timeWarning ? 'border-red-400/50 bg-red-500/10' : 'border-cyan-400/30'
            }`}
          >
            <Clock
              size={24}
              className={timeWarning ? 'text-red-400 animate-pulse' : 'text-cyan-400'}
            />
            <span
              className={`font-display font-bold text-2xl ${
                timeWarning ? 'text-red-400' : 'text-white'
              }`}
            >
              {formatTime(timeLeft)}
            </span>
          </motion.div>
        </motion.div>

        {/* ==================== PROGRESS BAR ==================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-10 md:mb-12"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-cyberpunk-secondary">Progress</span>
            <Badge color="cyan" variant="solid">
              {Math.round(progress)}%
            </Badge>
          </div>

          <div className="relative h-3 rounded-full overflow-hidden bg-white/5 border border-cyan-400/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full shadow-neon"
            />
          </div>
        </motion.div>

        {/* ==================== QUESTION CARD ==================== */}

        {question && (
          <motion.div
            key={currentQuestion}
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="mb-8 md:mb-12"
          >
            <GlassCard variant="thick" className="p-8 md:p-10 lg:p-12">
              {/* Question header */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/30 to-pink-500/20 border border-purple-400/30">
                    <Zap className="text-purple-400" size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-mono text-purple-400 mb-1">Question {currentQuestion + 1}/{quizQuestions.length}</p>
                    <p className="text-xs text-cyberpunk-tertiary">AI-Adapted Difficulty Level</p>
                  </div>
                </div>
              </motion.div>

              {/* Question text */}
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold mb-10 leading-relaxed text-white"
              >
                {question.question}
              </motion.h2>

              {/* Answer options */}
              <motion.div
                className="space-y-4 md:space-y-5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectAnswer(index)}
                    className={`w-full p-5 md:p-6 rounded-2xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                      selectedAnswer === index.toString()
                        ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 border-purple-400 shadow-neon-purple'
                        : 'glass border-cyan-400/30 hover:border-cyan-400/60 hover:bg-white/5'
                    }`}
                  >
                    {/* Animated background */}
                    {selectedAnswer === index.toString() && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-transparent to-pink-400/20"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}

                    <div className="relative z-10 flex items-center gap-4">
                      {/* Radio button */}
                      <div
                        className={`w-7 h-7 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          selectedAnswer === index.toString()
                            ? 'bg-purple-400 border-purple-300 shadow-neon-purple'
                            : 'border-cyan-400/50 group-hover:border-cyan-400'
                        }`}
                      >
                        {selectedAnswer === index.toString() && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', stiffness: 200 }}
                          >
                            <Check size={16} className="text-white" />
                          </motion.div>
                        )}
                      </div>

                      {/* Option text */}
                      <span
                        className={`text-base md:text-lg font-semibold transition-colors ${
                          selectedAnswer === index.toString()
                            ? 'text-white'
                            : 'text-cyberpunk-secondary group-hover:text-white'
                        }`}
                      >
                        {option}
                      </span>

                      {/* Selected indicator */}
                      {selectedAnswer === index.toString() && (
                        <motion.div
                          initial={{ opacity: 0, x: 10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="ml-auto flex items-center gap-2 text-purple-300 font-semibold"
                        >
                          <span className="text-sm">Selected</span>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                          >
                            <Zap size={16} />
                          </motion.div>
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </motion.div>
            </GlassCard>
          </motion.div>
        )}

        {/* ==================== NAVIGATION BUTTONS ==================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            variant="secondary"
            size="lg"
            icon={ChevronLeft}
            className="flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </Button>

          <Button
            variant="secondary"
            size="lg"
            icon={SkipForward}
            className="flex-1"
          >
            Skip Question
          </Button>

          <Button
            onClick={handleNext}
            variant="primary"
            size="lg"
            icon={currentQuestion === quizQuestions.length - 1 ? Check : ChevronRight}
            className="flex-1"
            disabled={!answered}
          >
            {currentQuestion === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

export default Quiz