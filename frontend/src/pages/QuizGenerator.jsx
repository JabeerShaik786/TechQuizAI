import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

import {
  Play,
  Loader,
} from 'lucide-react'

import { useQuizStore } from '../store/index'
import { useToast } from '../hooks/useToast'

import {
  GlassCard,
  Button,
  SectionTitle,
  ToastContainer,
} from '../components/UIComponents'

import {
  containerVariants,
  itemVariants,
} from '../animations/variants'

// Import professional quiz database and randomization engine
import advancedQuizDatabase, {
  QuizEngine,
} from '../data/advancedQuizDatabase'

// ============================================================================
// QUIZ GENERATOR - Professional Randomization with Fisher-Yates
// ============================================================================
const QuizGenerator = () => {
  const navigate = useNavigate()
  const { toasts, showToast } = useToast()

  // ========== STATE MANAGEMENT ==========
  const [difficulty, setDifficulty] = useState('mixed')
  const [questionCount, setQuestionCount] = useState(10)
  const [isGenerating, setIsGenerating] = useState(false)
  const [sessionUsedQuestions, setSessionUsedQuestions] = useState(new Set())

  // Redux/Zustand store
  const {
    currentQuiz,
    setCurrentQuiz,
  } = useQuizStore()

  // ========== LOAD SESSION DATA ==========
  // Restore used questions from session storage on mount
  useEffect(() => {
    const storedUsedQuestions = sessionStorage.getItem('usedQuestionIds')
    if (storedUsedQuestions) {
      try {
        setSessionUsedQuestions(new Set(JSON.parse(storedUsedQuestions)))
      } catch (e) {
        console.warn('Could not restore used questions:', e)
      }
    }
  }, [])

  // ========== VALIDATION ==========
  if (!currentQuiz) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <GlassCard className="text-center p-10 max-w-lg">
          <p className="text-xl text-cyberpunk-secondary mb-6">
            Please select a topic first
          </p>

          <Button
            onClick={() =>
              navigate('/topics')
            }
            variant="primary"
          >
            Go to Topics
          </Button>
        </GlassCard>
      </div>
    )
  }

  // ========== GENERATE QUIZ WITH FISHER-YATES SHUFFLE ==========
  const handleGenerateQuiz = async () => {
    setIsGenerating(true)

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      // Create QuizEngine instance
      const engine = new QuizEngine(
        currentQuiz.topic,
        difficulty,
        questionCount
      )

      // Set previous session used IDs for cross-session tracking
      engine.setPreviousSessionUsedIds(sessionUsedQuestions)

      // Generate unique questions using Fisher-Yates shuffle
      const questions = engine.generateQuiz()

      if (questions.length === 0) {
        showToast('No questions available for this topic with selected difficulty', 'warning')
        setIsGenerating(false)
        return
      }

      // If fewer questions than requested, notify user
      if (questions.length < questionCount) {
        console.warn(
          `Requested ${questionCount} questions, but only ${questions.length} unique questions available`
        )
        showToast(
          `Only ${questions.length} questions available for this configuration`,
          'info'
        )
      }

      // Track used questions in this session
      engine.markQuestionsAsUsed()
      const usedIds = Array.from(engine.sessionUsedQuestionIds)
      sessionStorage.setItem('usedQuestionIds', JSON.stringify(usedIds))
      setSessionUsedQuestions(new Set(usedIds))

      // Create quiz object with validation
      const quiz = {
        id: Date.now(),
        topic: currentQuiz.topic || 'Python',
        difficulty: difficulty || 'mixed',
        questionCount: questions.length || 0,
        questions: Array.isArray(questions) ? questions : [],
        createdAt: new Date(),
      }

      // Validate quiz object before storing
      if (!quiz.questions || quiz.questions.length === 0) {
        showToast('Failed to generate quiz. No questions available.', 'error')
        setIsGenerating(false)
        return
      }

      // Ensure each question has required fields
      const allQuestionsValid = quiz.questions.every(q =>
        q.id &&
        q.question &&
        Array.isArray(q.options) &&
        q.options.length > 0 &&
        (q.correctAnswer !== null && q.correctAnswer !== undefined)
      )

      if (!allQuestionsValid) {
        console.error('Invalid question structure detected:', quiz.questions)
        showToast('Quiz contains invalid questions. Please try again.', 'error')
        setIsGenerating(false)
        return
      }

      // Update store and navigate
      setCurrentQuiz(quiz)
      setIsGenerating(false)
      showToast(`Quiz ready with ${questions.length} questions!`, 'success')
      navigate('/quiz')
    } catch (error) {
      console.error('Error generating quiz:', error)
      showToast('Error generating quiz. Please try again.', 'error')
      setIsGenerating(false)
    }
  }

  // ========== GET AVAILABLE QUESTIONS COUNT ==========
  const getAvailableQuestionsCount = () => {
    const allQuestions = advancedQuizDatabase[currentQuiz.topic] || []
    if (difficulty === 'mixed') {
      return allQuestions.length
    }
    return allQuestions.filter(q => q.difficulty === difficulty).length
  }

  const availableQuestions = getAvailableQuestionsCount()
  const maxQuestions = Math.min(20, availableQuestions)

  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">

        <SectionTitle>
          Generate{' '}
          {currentQuiz.topic} Quiz
        </SectionTitle>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl mx-auto"
        >

          {/* ==================== QUIZ CONFIGURATION ==================== */}

          <motion.div
            variants={itemVariants}
          >
            <GlassCard className="mb-8 p-8">

              <h3 className="text-3xl font-bold mb-8">
                Quiz Configuration
              </h3>

              {/* DIFFICULTY LEVEL */}

              <div className="mb-10">
                <label className="block text-lg font-semibold mb-5">
                  Difficulty Level
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { value: 'easy', label: 'Easy' },
                    { value: 'medium', label: 'Medium' },
                    { value: 'hard', label: 'Hard' },
                    { value: 'mixed', label: 'Mixed' },
                  ].map((level) => (
                    <motion.button
                      key={level.value}
                      whileHover={{
                        scale: 1.03,
                      }}
                      onClick={() =>
                        setDifficulty(
                          level.value
                        )
                      }
                      className={`p-4 rounded-2xl font-semibold transition-all ${
                        difficulty ===
                        level.value
                          ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-neon'
                          : 'glass border border-cyan-400/20 hover:border-cyan-400/60 text-cyberpunk-secondary'
                      }`}
                    >
                      {level.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* QUESTION COUNT */}

              <div>
                <label className="block text-lg font-semibold mb-4">
                  Number of Questions: <span className="text-cyan-400">{questionCount}</span>
                </label>

                <input
                  type="range"
                  min="3"
                  max={maxQuestions}
                  value={
                    questionCount
                  }
                  onChange={(e) =>
                    setQuestionCount(
                      Math.min(
                        Number(e.target.value),
                        maxQuestions
                      )
                    )
                  }
                  className="w-full accent-cyan-400"
                />

                <div className="flex justify-between text-sm text-cyberpunk-secondary mt-3">
                  <span>3</span>
                  <span>{Math.floor(maxQuestions / 2)}</span>
                  <span>{maxQuestions}</span>
                </div>

                <p className="text-sm text-cyan-400/70 mt-3">
                  📊 Available: <strong>{availableQuestions}</strong> unique questions in {difficulty} difficulty
                </p>
              </div>
            </GlassCard>
          </motion.div>

          {/* ==================== QUIZ SUMMARY ==================== */}

          <motion.div
            variants={itemVariants}
          >
            <GlassCard className="mb-8 p-8 bg-gradient-to-br from-cyan-400/10 to-purple-500/10 border border-cyan-400/20">

              <h4 className="text-2xl font-bold mb-6">
                Quiz Summary
              </h4>

              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span className="font-semibold text-cyan-300">
                    Topic:
                  </span>
                  <span className="text-white">
                    {currentQuiz.topic}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-cyan-300">
                    Difficulty:
                  </span>
                  <span className="text-white capitalize">
                    {difficulty}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-semibold text-cyan-300">
                    Questions:
                  </span>
                  <span className="text-white">
                    {questionCount}
                  </span>
                </div>

                <div className="border-t border-cyan-400/30 pt-4 mt-4">
                  <p className="text-sm text-cyan-400/70">
                    ✅ No questions will repeat within this quiz
                  </p>
                  <p className="text-sm text-cyan-400/70">
                    🎯 Fisher-Yates randomization ensures true randomness
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* ==================== START BUTTON ==================== */}

          <motion.div
            variants={itemVariants}
          >
            <Button
              onClick={
                handleGenerateQuiz
              }
              disabled={
                isGenerating ||
                questionCount > availableQuestions
              }
              variant="primary"
              size="lg"
              className="w-full flex justify-center"
            >
              {isGenerating ? (
                <>
                  <Loader
                    className="animate-spin mr-2"
                    size={20}
                  />

                  Generating Quiz...
                </>
              ) : (
                <>
                  <Play size={20} className="mr-2" />
                  Start Quiz
                </>
              )}
            </Button>

            {questionCount > availableQuestions && (
              <p className="text-red-400/70 text-center mt-4">
                ⚠️ Not enough unique questions available. Max: {availableQuestions}
              </p>
            )}
          </motion.div>
        </motion.div>
      </div>

      <ToastContainer toasts={toasts} />
    </div>
  )
}

export default QuizGenerator