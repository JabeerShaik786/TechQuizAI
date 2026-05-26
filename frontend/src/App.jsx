import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthStore, useSettingsStore } from './store/index'
import ErrorBoundary from './components/ErrorBoundary'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import TopicSelection from './pages/TopicSelection'
import QuizGenerator from './pages/QuizGenerator'
import Quiz from './pages/Quiz'
import Results from './pages/Results'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import AI from './pages/AI'

const AuthLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#020617] text-white px-4">
    <div className="text-center">
      <div className="mb-4 h-12 w-12 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin mx-auto" />
      <p className="text-lg font-semibold">Checking authentication...</p>
    </div>
  </div>
)

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isHydrated, user } = useAuthStore()
  console.debug('ProtectedRoute auth state:', { isAuthenticated, isHydrated, user })

  if (!isHydrated) {
    return <AuthLoader />
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const { darkMode } = useSettingsStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.documentElement.classList.toggle('light', !darkMode)
  }, [darkMode])

  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={darkMode ? 'dark' : 'light'}
      />

      <ErrorBoundary>
        <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/topics"
          element={
            <ProtectedRoute>
              <MainLayout>
                <TopicSelection />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/quiz/generate"
          element={
            <ProtectedRoute>
              <MainLayout>
                <QuizGenerator />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Quiz />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/results/:quizId"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Results />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Analytics />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Profile />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai-assistant"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AI />
              </MainLayout>
            </ProtectedRoute>
          }
        />
        
        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </ErrorBoundary>
    </Router>
  )
}

export default App
