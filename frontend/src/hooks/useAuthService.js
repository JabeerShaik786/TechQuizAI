import { useAuthStore } from '../store/index'
import { authService } from '../services/api'

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const ensureBackendAwake = async (attempts = 3, delayMs = 2000) => {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      await authService.health()
      return null
    } catch (error) {
      const retryText = attempt < attempts ? 'Retrying...' : 'Unable to reach backend.'
      console.warn(`Backend health check failed (attempt ${attempt}):`, error, retryText)
      if (attempt === attempts) {
        const message =
          error.userMessage ||
          error.response?.data?.error ||
          error.response?.data?.message ||
          'Backend is unavailable. Please try again later.'
        return `Server waking up or unreachable. ${message}`
      }
      await sleep(delayMs)
    }
  }
  return 'Backend is unavailable. Please try again later.'
}

export const useAuthService = () => {
  const { login, logout, setUser, setToken } = useAuthStore()

  const handleLogin = async (email, password) => {
    try {
      const wakeError = await ensureBackendAwake()
      if (wakeError) {
        return {
          success: false,
          error: wakeError,
        }
      }

      console.log('🔐 Attempting login with:', email)
      
      const response = await authService.login({
        email,
        password,
      })

      console.log('✅ Login response:', response.data)

      const { user, token } = response.data

      if (!user || !token) {
        throw new Error('Invalid response structure from server')
      }

      // Update Zustand store with user and token
      login(user, token)
      
      console.log('✅ Auth store updated:', { user, token: token.substring(0, 20) + '...' })

      return {
        success: true,
        user,
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      
      // Use user-friendly message from API interceptor, fallback to error details
      const errorMessage = 
        error.userMessage ||
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Login failed'
      
      const errorDetails = error.response?.data?.details || error.details || null
      return {
        success: false,
        error: errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage,
      }
    }
  }

  const handleSignup = async (userData) => {
    try {
      const wakeError = await ensureBackendAwake()
      if (wakeError) {
        return {
          success: false,
          error: wakeError,
        }
      }

      console.log('🆕 Attempting signup with:', userData.email)
      
      const response = await authService.signup(userData)

      console.log('✅ Signup response:', response.data)

      const { user, token } = response.data

      if (!user || !token) {
        throw new Error('Invalid response structure from server')
      }

      // Update Zustand store with user and token
      login(user, token)
      
      console.log('✅ Auth store updated:', { user, token: token.substring(0, 20) + '...' })

      return {
        success: true,
        user,
      }
    } catch (error) {
      console.error('❌ Signup error:', error)
      
      // Use user-friendly message from API interceptor, fallback to error details
      const errorMessage = 
        error.userMessage ||
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Signup failed'
      
      const errorDetails = error.response?.data?.details || error.details || null
      return {
        success: false,
        error: errorDetails ? `${errorMessage}: ${errorDetails}` : errorMessage,
      }
    }
  }

  const handleLogout = async () => {
    try {
      console.log('🚪 Attempting logout')
      
      await authService.logout()
      logout()
      
      console.log('✅ Logged out successfully')

      return {
        success: true,
      }
    } catch (error) {
      console.warn('⚠️ Logout error (clearing local state anyway):', error)
      
      // Clear local state even if API call fails
      logout()

      return {
        success: true,
      }
    }
  }

  const handleChangePassword = async (currentPassword, newPassword) => {
    try {
      const response = await authService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      })

      return {
        success: true,
        data: response.data,
      }
    } catch (error) {
      console.error('❌ Password change error:', error)
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Unable to change password'
      return {
        success: false,
        error: errorMessage,
      }
    }
  }

  return {
    handleLogin,
    handleSignup,
    handleLogout,
    handleChangePassword,
  }
}