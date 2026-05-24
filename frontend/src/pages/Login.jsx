import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'
import { useAuthService } from '../hooks/useAuthService'
import { Button } from '../components/UIComponents'
import { FloatingParticles, GlowingGrid } from '../components/BackgroundEffects'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { handleLogin } = useAuthService()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    setIsLoading(true)
    const result = await handleLogin(formData.email, formData.password)
    setIsLoading(false)

    if (result.success) {
      toast.success('Logged in successfully!')
      navigate('/dashboard')
    } else {
      toast.error(result.error || 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-cyber flex items-center justify-center px-4 relative overflow-hidden">
      <FloatingParticles />
      <GlowingGrid />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md glass rounded-2xl p-8 relative z-10"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-cyberpunk-text-secondary">Login to your TechQuiz AI account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-3 text-cyberpunk-blue" size={20} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full pl-10 pr-4 py-3 bg-cyberpunk-glass border border-cyberpunk-blue/30 rounded-lg text-white placeholder-cyberpunk-text-secondary focus:outline-none focus:border-cyberpunk-blue focus:shadow-neon transition-all"
              required
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-cyberpunk-blue" size={20} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full pl-10 pr-10 py-3 bg-cyberpunk-glass border border-cyberpunk-blue/30 rounded-lg text-white placeholder-cyberpunk-text-secondary focus:outline-none focus:border-cyberpunk-blue focus:shadow-neon transition-all"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-cyberpunk-blue"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white font-semibold hover:shadow-neon transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? 'Logging in...' : 'Login'}
            <ArrowRight size={18} />
          </motion.button>
        </form>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cyberpunk-blue/20" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-gradient-cyber text-cyberpunk-text-secondary">Or</span>
          </div>
        </div>

        {/* Signup Link */}
        <p className="text-center text-cyberpunk-text-secondary">
          Don't have an account?{' '}
          <Link to="/signup" className="text-cyberpunk-blue hover:text-cyberpunk-purple transition-colors font-semibold">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login
