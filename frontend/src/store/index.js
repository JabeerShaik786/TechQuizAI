import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const localJSONStorage = {
  getItem: (name) => {
    const item = localStorage.getItem(name)
    return item ? JSON.parse(item) : null
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value))
  },
  removeItem: (name) => {
    localStorage.removeItem(name)
  },
}

// Auth Store
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),

      login: (user, token) => {
        const profile = {
          ...user,
          avatar: user?.avatar || null,
          bio: user?.bio || '',
          joinedAt: user?.created_at || new Date().toISOString(),
        }

        set({
          user: profile,
          token,
          isAuthenticated: true,
        })
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      updateProfile: (updates) =>
        set((state) => ({
          user: {
            ...state.user,
            ...updates,
          },
        })),

      setAvatar: (avatar) =>
        set((state) => ({
          user: {
            ...state.user,
            avatar,
          },
        })),

      removeAvatar: () =>
        set((state) => ({
          user: {
            ...state.user,
            avatar: null,
          },
        })),

      resetProfile: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: 'auth-storage',
      storage: localJSONStorage,
    }
  )
)

// Quiz Store
export const useQuizStore = create((set) => ({
  currentQuiz: null,
  quizzes: [],
  currentQuestion: 0,
  answers: {},
  score: 0,

  setCurrentQuiz: (quiz) =>
    set({ currentQuiz: quiz, currentQuestion: 0, answers: {}, score: 0 }),
  setCurrentQuestion: (index) => set({ currentQuestion: index }),
  addAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),
  setScore: (score) => set({ score }),
  resetQuiz: () => set({ currentQuiz: null, currentQuestion: 0, answers: {}, score: 0 }),
}))

// User Stats Store
export const useStatsStore = create(
  persist(
    (set, get) => ({
      xp: 0,
      level: 1,
      streak: 0,
      quizzesCompleted: 0,
      totalAccuracy: 0,
      badges: [],
      topicPerformance: {},
      history: [],

      addXP: (amount) =>
        set((state) => {
          const newXP = state.xp + amount
          const newLevel = Math.floor(newXP / 1000) + 1
          return { xp: newXP, level: newLevel }
        }),

      addQuiz: (topic, accuracy) =>
        set((state) => {
          const totalQuizzes = state.quizzesCompleted + 1
          const totalAccuracy =
            state.quizzesCompleted === 0
              ? accuracy
              : ((state.totalAccuracy * state.quizzesCompleted + accuracy) / totalQuizzes)
          return {
            quizzesCompleted: totalQuizzes,
            totalAccuracy: Number(totalAccuracy.toFixed(1)),
            topicPerformance: {
              ...state.topicPerformance,
              [topic]: (state.topicPerformance[topic] || 0) + accuracy,
            },
          }
        }),

      addBadge: (badge) =>
        set((state) => ({
          badges: state.badges.some((existing) => existing.name === badge.name)
            ? state.badges
            : [...state.badges, badge],
        })),

      updateStreak: () => set((state) => ({ streak: state.streak + 1 })),
      resetStreak: () => set({ streak: 0 }),

      addHistory: (entry) =>
        set((state) => ({
          history: [entry, ...state.history].slice(0, 50),
        })),

      resetAllStats: () =>
        set({
          xp: 0,
          level: 1,
          streak: 0,
          quizzesCompleted: 0,
          totalAccuracy: 0,
          badges: [],
          topicPerformance: {},
          history: [],
        }),

      exportData: () => {
        const state = get()
        return {
          xp: state.xp,
          level: state.level,
          streak: state.streak,
          quizzesCompleted: state.quizzesCompleted,
          totalAccuracy: state.totalAccuracy,
          badges: state.badges,
          topicPerformance: state.topicPerformance,
          history: state.history,
        }
      },
    }),
    {
      name: 'stats-storage',
      storage: localJSONStorage,
    }
  )
)

// Settings Store
export const useSettingsStore = create(
  persist(
    (set) => ({
      notificationsEnabled: true,
      darkMode: true,
      analyticsEnabled: true,

      toggleNotifications: () =>
        set((state) => ({ notificationsEnabled: !state.notificationsEnabled })),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      setDarkMode: (value) => set({ darkMode: value }),

      clearSettings: () =>
        set({
          notificationsEnabled: true,
          darkMode: true,
          analyticsEnabled: true,
        }),
    }),
    {
      name: 'settings-storage',
      storage: localJSONStorage,
    }
  )
)

// Theme Store (legacy support)
export const useThemeStore = create(
  persist(
    (set) => ({
      isDark: true,
      toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
    }),
    {
      name: 'theme-storage',
      storage: localJSONStorage,
    }
  )
)

// AI Assistant Store
export const useAIStore = create(
  persist(
    (set, get) => ({
      chatHistory: [],
      isOpen: false,
      currentConversation: [],

      addMessage: (message) =>
        set((state) => ({
          currentConversation: [...state.currentConversation, message],
        })),

      clearConversation: () =>
        set({
          currentConversation: [],
        }),

      saveConversation: (title) => {
        const state = get()
        if (state.currentConversation.length === 0) return

        const conversation = {
          id: Date.now(),
          title: title || `Chat - ${new Date().toLocaleDateString()}`,
          messages: state.currentConversation,
          createdAt: new Date().toISOString(),
        }

        set((state) => ({
          chatHistory: [conversation, ...state.chatHistory].slice(0, 20), // Keep last 20
          currentConversation: [],
        }))
      },

      loadConversation: (id) => {
        const state = get()
        const conversation = state.chatHistory.find((c) => c.id === id)
        if (conversation) {
          set({
            currentConversation: conversation.messages,
          })
        }
      },

      deleteConversation: (id) =>
        set((state) => ({
          chatHistory: state.chatHistory.filter((c) => c.id !== id),
        })),

      setIsOpen: (isOpen) => set({ isOpen }),

      resetAI: () =>
        set({
          chatHistory: [],
          currentConversation: [],
          isOpen: false,
        }),
    }),
    {
      name: 'ai-storage',
      storage: localJSONStorage,
    }
  )
)
