import { motion } from 'framer-motion'
import AIAssistant from '../components/AIAssistant'
import { SectionTitle } from '../components/UIComponents'

const AI = () => {
  return (
    <div className="min-h-screen w-full relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="glass rounded-3xl border border-cyberpunk-blue/20 p-8 shadow-neon"
      >
        <SectionTitle>AI Assistant</SectionTitle>
        <p className="text-cyberpunk-text-secondary max-w-3xl leading-relaxed">
          Ask the assistant for quiz explanations, study tips, topic recommendations, and motivation.
          The system is connected to the backend AI chat endpoint for responsive guidance.
        </p>
      </motion.div>

      <div className="mt-8">
        <AIAssistant fullPage />
      </div>
    </div>
  )
}

export default AI
