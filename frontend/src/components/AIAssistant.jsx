import { motion, AnimatePresence } from 'framer-motion'
import {
  MessageCircle,
  Send,
  X,
  Sparkles,
  BookOpen,
  TrendingUp,
  Zap,
  Heart,
  ChevronDown,
  Clock,
  Trash2,
} from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useAuthStore, useStatsStore, useAIStore } from '../store/index'
import { authService } from '../services/api'

const AIAssistant = ({ fullPage = false }) => {
  const { isAuthenticated } = useAuthStore()
  const { quizzesCompleted, totalAccuracy } = useStatsStore()
  const { currentConversation, addMessage, clearConversation, saveConversation, chatHistory, loadConversation, deleteConversation, setIsOpen, isOpen: aiOpen } = useAIStore()

  const [isOpen, setIsOpenLocal] = useState(fullPage)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [currentConversation, isOpen, isLoading])

  const quickActions = [
    { icon: <Sparkles size={16} />, label: 'Explain Concept', prompt: 'Explain a concept I ask about' },
    { icon: <BookOpen size={16} />, label: 'Study Plan', prompt: 'Create a personalized study plan for me' },
    { icon: <TrendingUp size={16} />, label: 'My Progress', prompt: "How's my learning progress?" },
    { icon: <Zap size={16} />, label: 'Weak Areas', prompt: 'What topics should I focus on?' },
    { icon: <Heart size={16} />, label: 'Motivation', prompt: 'Motivate me to keep learning' },
    { icon: <BookOpen size={16} />, label: 'Interview Tips', prompt: 'Give me interview preparation tips' },
  ]

  const getAIResponse = async (text, history = []) => {
    try {
      const response = await authService.chatAssistant(text, history)
      return response.data?.response || null
    } catch (error) {
      console.error('AI chat error', error)
      return null
    }
  }

  const handleSendMessage = async (messageText = input) => {
    const text = messageText?.trim()
    if (!text || isLoading) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text,
      timestamp: new Date(),
    }

    addMessage(userMessage)
    setInput('')

    if (!isAuthenticated) {
      addMessage({
        id: Date.now() + 1,
        type: 'bot',
        text: '🔐 Please sign in to chat with the AI assistant.',
        timestamp: new Date(),
      })
      return
    }

    setIsLoading(true)

    try {
      const responseText = await getAIResponse(text, [...currentConversation, userMessage])

      if (responseText) {
        // Add message with typing effect
        const botMessage = {
          id: Date.now() + 2,
          type: 'bot',
          text: responseText,
          timestamp: new Date(),
        }
        addMessage(botMessage)
      } else {
        addMessage({
          id: Date.now() + 3,
          type: 'bot',
          text: "I had trouble processing that. Could you rephrase your question? I'm here to help! 💡",
          timestamp: new Date(),
        })
      }
    } catch (error) {
      addMessage({
        id: Date.now() + 4,
        type: 'bot',
        text: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date(),
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickAction = (prompt) => {
    handleSendMessage(prompt)
    inputRef.current?.focus()
  }

  const handleOpenChange = (open) => {
    setIsOpenLocal(open)
    setIsOpen(open)
  }

  const handleClearChat = () => {
    clearConversation()
    toast.info('Chat cleared')
  }

  const handleSaveChat = () => {
    saveConversation(`Chat - ${new Date().toLocaleString()}`)
    toast.success('Chat saved!')
  }

  // Empty state with personalized greeting
  const renderEmptyState = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex h-full flex-col items-center justify-center gap-4 p-4 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-4 text-white"
      >
        <Sparkles size={32} />
      </motion.div>

      <div>
        <h3 className="text-lg font-bold text-white">Hey there! 👋</h3>
        <p className="mt-2 text-sm text-cyberpunk-text-secondary max-w-xs">
          {quizzesCompleted > 0
            ? `You've taken ${quizzesCompleted} quizzes with ${totalAccuracy?.toFixed(0) || 0}% accuracy. Ready to improve? Ask me anything!`
            : "I'm your AI learning companion. Ask me to explain concepts, create study plans, or give you motivation!"}
        </p>
      </div>
    </motion.div>
  )

  const renderChatPanel = () => (
    <motion.div
      initial={{ opacity: 0, scale: fullPage ? 1 : 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col z-50 rounded-3xl border border-cyberpunk-blue/30 bg-gradient-to-br from-[#070918] via-[#0a0f1a] to-[#070918] shadow-2xl ${
        fullPage
          ? 'relative mx-auto w-full max-w-5xl h-[80vh]'
          : 'fixed bottom-24 right-6 w-96 h-[500px]'
      }`}
      style={{
        background: 'rgba(7, 9, 24, 0.8)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-cyberpunk-blue/20 p-4">
        <div className="flex items-center gap-3 flex-1">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 p-2 text-white"
          >
            <Sparkles size={18} />
          </motion.div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400">AI Learning</p>
            <h3 className="text-lg font-bold text-white">Your AI Tutor</h3>
          </div>
        </div>

        {!fullPage && (
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSidebar(!showSidebar)}
              className="rounded-lg p-2 hover:bg-cyberpunk-blue/10 transition"
              title="Chat history"
            >
              <Clock size={18} className="text-cyberpunk-text-secondary" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleOpenChange(false)}
              className="rounded-lg p-2 hover:bg-cyberpunk-blue/10 transition"
            >
              <X size={18} className="text-cyberpunk-text-secondary" />
            </motion.button>
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Chat area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyberpunk-blue/20">
            <AnimatePresence mode="popLayout">
              {currentConversation.length === 0 ? (
                renderEmptyState()
              ) : (
                currentConversation.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: idx * 0.05 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs rounded-2xl px-4 py-3 ${
                        msg.type === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white shadow-lg shadow-cyan-500/30'
                          : 'bg-gradient-to-br from-purple-500/20 to-cyan-500/10 text-cyberpunk-text-secondary border border-purple-500/20'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.type === 'user' ? 'text-white/60' : 'text-cyberpunk-text-secondary/60'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </motion.div>
                ))
              )}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 px-4 py-3 border border-purple-500/20">
                    <div className="flex gap-2 items-center">
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-2 w-2 bg-cyan-400 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, delay: 0.2, repeat: Infinity }}
                        className="h-2 w-2 bg-cyan-400 rounded-full"
                      />
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.5, delay: 0.4, repeat: Infinity }}
                        className="h-2 w-2 bg-cyan-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-cyberpunk-blue/20 p-4 space-y-3">
            {/* Quick actions */}
            {currentConversation.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-2 gap-2"
              >
                {quickActions.map((action, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAction(action.prompt)}
                    className="rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 border border-purple-500/30 px-3 py-2 text-left text-xs text-white transition hover:border-purple-500/60 hover:bg-purple-500/20 flex items-center gap-2"
                  >
                    <span className="text-cyan-400">{action.icon}</span>
                    <span className="font-medium">{action.label}</span>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* Message input */}
            <div className="flex items-end gap-2">
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                placeholder={isAuthenticated ? 'Ask me anything...' : 'Sign in to chat'}
                disabled={!isAuthenticated || isLoading}
                className="flex-1 rounded-2xl border border-cyberpunk-blue/20 bg-cyberpunk-glass px-4 py-3 text-sm text-white outline-none focus:border-cyan-400 focus:shadow-lg focus:shadow-cyan-500/20 transition disabled:cursor-not-allowed disabled:opacity-60"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading || !isAuthenticated}
                className="rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-600 p-3 text-white shadow-lg shadow-cyan-500/30 disabled:opacity-50 transition"
              >
                <Send size={18} />
              </motion.button>
            </div>

            {/* Chat controls */}
            {currentConversation.length > 0 && (
              <div className="flex gap-2 text-xs">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSaveChat}
                  className="flex-1 rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-3 py-2 text-emerald-300 transition hover:bg-emerald-500/30"
                >
                  💾 Save
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleClearChat}
                  className="flex-1 rounded-lg bg-red-500/20 border border-red-500/30 px-3 py-2 text-red-300 transition hover:bg-red-500/30"
                >
                  🗑️ Clear
                </motion.button>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar - Chat history */}
        {!fullPage && showSidebar && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-48 border-l border-cyberpunk-blue/20 bg-[#0a0f1a]/50 p-3 flex flex-col gap-2 overflow-y-auto"
          >
            <p className="text-xs font-semibold text-cyan-400 uppercase tracking-[0.2em]">History</p>
            {chatHistory.length === 0 ? (
              <p className="text-xs text-cyberpunk-text-secondary">No saved chats yet</p>
            ) : (
              chatHistory.map((chat) => (
                <motion.div
                  key={chat.id}
                  whileHover={{ scale: 1.02 }}
                  className="group rounded-lg bg-purple-500/10 border border-purple-500/20 p-2 hover:bg-purple-500/20 transition cursor-pointer"
                  onClick={() => loadConversation(chat.id)}
                >
                  <p className="text-xs text-white truncate font-medium">{chat.title}</p>
                  <p className="text-xs text-cyberpunk-text-secondary">{chat.messages.length} messages</p>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteConversation(chat.id)
                    }}
                    className="opacity-0 group-hover:opacity-100 mt-1 text-red-400 hover:text-red-300 transition"
                  >
                    <Trash2 size={12} />
                  </motion.button>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  )

  // Floating button
  if (!fullPage && !isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleOpenChange(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 text-white shadow-lg shadow-cyan-500/50"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
        >
          <MessageCircle size={24} />
        </motion.div>
      </motion.button>
    )
  }

  // Panel
  return (
    <AnimatePresence>
      {(fullPage || isOpen) && renderChatPanel()}
    </AnimatePresence>
  )
}

export default AIAssistant
