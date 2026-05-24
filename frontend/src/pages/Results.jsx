import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router-dom'
import { CheckCircle, XCircle, Trophy, Share2 } from 'lucide-react'
import { useQuizStore, useStatsStore } from '../store/index'
import { Button, GlassCard, SectionTitle } from '../components/UIComponents'

const Results = () => {
  const navigate = useNavigate()
  const { quizId } = useParams()
  const { currentQuiz, score, answers } = useQuizStore()
  const { level } = useStatsStore()

  if (!currentQuiz || score === undefined) {
    return (
      <div className="p-4 md:p-8">
        <p className="text-xl text-cyberpunk-text-secondary">No quiz data available</p>
        <Button onClick={() => navigate('/dashboard')} variant="primary" className="mt-4">
          Back to Dashboard
        </Button>
      </div>
    )
  }

  const correctCount = Object.entries(answers).filter(
    ([id, answer]) => {
      const question = currentQuiz.questions?.find((q) => q.id.toString() === id)
      return question && answer?.toString() === question.correctAnswer?.toString()
    }
  ).length

  const accuracy = Math.round((correctCount / currentQuiz.questionCount) * 100)
  const xpEarned = Math.round((score / 100) * 100)

  const getPerformanceFeedback = () => {
    if (accuracy >= 90) return { text: 'Excellent! Outstanding performance!', emoji: '🌟' }
    if (accuracy >= 75) return { text: 'Great! Keep up the momentum!', emoji: '🚀' }
    if (accuracy >= 60) return { text: 'Good! Room to improve!', emoji: '💪' }
    return { text: 'Keep practicing! You\'ll improve!', emoji: '📚' }
  }

  const feedback = getPerformanceFeedback()

  return (
    <div className="p-4 md:p-8">
      {/* Celebration Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-center mb-8"
      >
        <div className="text-8xl mb-4">{feedback.emoji}</div>
        <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
        <p className="text-xl text-cyberpunk-text-secondary">{feedback.text}</p>
      </motion.div>

      {/* Score Circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="relative w-48 h-48 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple opacity-30"
          />
          <GlassCard className="flex flex-col items-center justify-center relative z-10">
            <p className="text-6xl font-bold bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple bg-clip-text text-transparent">
              {score}%
            </p>
            <p className="text-cyberpunk-text-secondary">Accuracy</p>
          </GlassCard>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="grid md:grid-cols-4 gap-4 mb-8"
      >
        {[
          { label: 'Correct Answers', value: correctCount, icon: CheckCircle },
          { label: 'Wrong Answers', value: currentQuiz.questionCount - correctCount, icon: XCircle },
          { label: 'XP Earned', value: xpEarned, icon: Trophy },
          { label: 'New Level', value: level, icon: Trophy },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.1 }}
          >
            <GlassCard className="flex flex-col items-center justify-center">
              <stat.icon className="text-cyberpunk-blue mb-2" size={32} />
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-cyberpunk-text-secondary text-sm text-center">{stat.label}</p>
            </GlassCard>
          </motion.div>
        ))}
      </motion.div>

      {/* Detailed Review */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mb-8"
      >
        <SectionTitle>Detailed Review</SectionTitle>
        <div className="space-y-4">
          {currentQuiz.questions?.slice(0, 5).map((question, index) => {
            const isCorrect = answers[question.id]?.toString() === question.correctAnswer?.toString()
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
              >
                <GlassCard className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                  <div className="flex items-start gap-4">
                    <div className="text-2xl">
                      {isCorrect ? <CheckCircle className="text-green-500" size={28} /> : <XCircle className="text-red-500" size={28} />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold mb-2">{question.question}</p>
                      <p className="text-sm text-cyberpunk-text-secondary">{question.explanation}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button onClick={() => navigate('/topics')} variant="primary" size="lg" className="flex-1">
          Take Another Quiz
        </Button>
        <Button onClick={() => navigate('/analytics')} variant="secondary" size="lg" className="flex-1">
          View Analytics
        </Button>
        <Button onClick={() => navigate('/dashboard')} variant="secondary" size="lg" className="flex-1">
          <Share2 size={20} />
          Dashboard
        </Button>
      </motion.div>
    </div>
  )
}

export default Results
