import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, LogOut, Moon, Sun } from 'lucide-react'
import { useAuthStore, useStatsStore, useSettingsStore } from '../store/index'
import { useAuthService } from '../hooks/useAuthService'

const NavBar = ({ onMenuClick }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, isAuthenticated } = useAuthStore()
  const { handleLogout } = useAuthService()
  const { xp, level } = useStatsStore()
  const { darkMode, toggleDarkMode } = useSettingsStore()

  const handleLogoutClick = async () => {
    await handleLogout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-40 glass-lg border-b border-cyberpunk-blue/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={isAuthenticated ? '/dashboard' : '/'} className="flex items-center gap-2">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-2xl font-bold bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple bg-clip-text text-transparent"
            >
              ⚡ TechQuiz AI
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated && (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={toggleDarkMode}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-cyberpunk-blue/10 border border-cyberpunk-blue/20 text-cyberpunk-blue hover:bg-cyberpunk-blue/20 transition-all"
                >
                  {darkMode ? <Sun size={18} /> : <Moon size={18} />}
                  <span className="text-sm">{darkMode ? 'Light' : 'Dark'}</span>
                </motion.button>

                <div className="flex items-center gap-2 px-4 py-2 glass-sm rounded-lg">
                  <span className="text-cyberpunk-blue text-sm">Level {level}</span>
                  <span className="text-cyberpunk-text-secondary text-sm">• {xp} XP</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white font-semibold hover:shadow-neon transition-all"
                >
                  <LogOut size={18} />
                  Logout
                </motion.button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-cyberpunk-blue/10 rounded-lg transition-colors"
          >
            <Menu className="text-cyberpunk-blue" size={24} />
          </motion.button>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
