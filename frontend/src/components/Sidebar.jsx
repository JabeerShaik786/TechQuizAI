import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Home, BookOpen, Zap, TrendingUp, Users, Settings, LogOut } from 'lucide-react'
import { useAuthStore } from '../store/index'
import { useAuthService } from '../hooks/useAuthService'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { handleLogout } = useAuthService()

  const handleLogoutClick = async () => {
    await handleLogout()
    onClose()
    navigate('/')
  }

  const menuItems = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Topics', icon: BookOpen, href: '/topics' },
    { name: 'Analytics', icon: TrendingUp, href: '/analytics' },
    { name: 'Profile', icon: Settings, href: '/profile' },
  ]

  return (
    <motion.aside
      initial={{ x: -300 }}
      animate={{ x: isOpen ? 0 : -300 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen w-64 bg-gradient-cyber glass-lg border-r border-cyberpunk-blue/20 z-50 md:relative md:translate-x-0"
    >
      {/* Close Button */}
      <motion.button
        whileHover={{ rotate: 90 }}
        onClick={onClose}
        className="absolute top-4 right-4 p-2 md:hidden hover:bg-cyberpunk-blue/10 rounded-lg"
      >
        <X className="text-cyberpunk-blue" size={24} />
      </motion.button>

      {/* Sidebar Content */}
      <div className="p-6 pt-16 md:pt-6 h-full flex flex-col">
        {/* Logo */}
        <Link
          to="/dashboard"
          onClick={onClose}
          className="flex items-center gap-2 mb-8"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="text-2xl font-bold bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple bg-clip-text text-transparent"
          >
            ⚡ TechQuiz
          </motion.div>
        </Link>

        {/* Navigation Menu */}
        <nav className="flex-1">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <motion.div key={item.name} whileHover={{ x: 5 }}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white shadow-neon'
                        : 'text-cyberpunk-text-secondary hover:bg-cyberpunk-blue/10'
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          onClick={handleLogoutClick}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all font-medium"
        >
          <LogOut size={20} />
          Logout
        </motion.button>
      </div>
    </motion.aside>
  )
}

export default Sidebar
