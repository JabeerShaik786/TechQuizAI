import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { X, Home, BookOpen, Zap, TrendingUp, Settings, LogOut, Menu } from 'lucide-react'
import { useAuthStore } from '../store/index'
import { useAuthService } from '../hooks/useAuthService'
import { useNavigate } from 'react-router-dom'

const Sidebar = ({ isOpen, onClose, isCollapsed, onToggleCollapse }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const { handleLogout } = useAuthService()

  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

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
      initial={{ x: isDesktop ? 0 : -300 }}
      animate={{ 
        x: isDesktop ? 0 : (isOpen ? 0 : -300),
        width: isDesktop ? (isCollapsed ? 72 : 240) : 240
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen bg-gradient-cyber glass-lg border-r border-cyberpunk-blue/20 z-50 md:relative overflow-hidden flex flex-col"
    >
      {/* Close Button (Mobile Only) */}
      <motion.button
        whileHover={{ rotate: 90 }}
        onClick={onClose}
        className="absolute top-4 right-4 p-2 md:hidden hover:bg-cyberpunk-blue/10 rounded-lg z-50"
      >
        <X className="text-cyberpunk-blue" size={24} />
      </motion.button>

      {/* Sidebar Content */}
      <div className={`p-6 pt-16 md:pt-6 h-full flex flex-col flex-1 ${isCollapsed && isDesktop ? 'px-2 items-center' : ''}`}>
        {/* Top Header with Logo and Collapse Toggle */}
        <div className={`flex items-center mb-8 w-full ${isCollapsed && isDesktop ? 'justify-center' : 'justify-between'}`}>
          {(!isCollapsed || !isDesktop) && (
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-2"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-2xl font-bold bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple bg-clip-text text-transparent whitespace-nowrap"
              >
                ⚡ TechQuiz
              </motion.div>
            </Link>
          )}
          {isCollapsed && isDesktop && (
            <Link
              to="/dashboard"
              onClick={onClose}
              className="text-2xl font-bold text-cyberpunk-blue"
              title="TechQuiz"
            >
              ⚡
            </Link>
          )}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            onClick={onToggleCollapse}
            className="hidden md:block p-1.5 rounded-lg hover:bg-cyberpunk-blue/10 text-cyberpunk-blue"
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            <Menu size={20} />
          </motion.button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 w-full">
          <div className="space-y-2 w-full">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <motion.div key={item.name} whileHover={{ x: isCollapsed && isDesktop ? 0 : 5 }}>
                  <Link
                    to={item.href}
                    onClick={onClose}
                    title={isCollapsed && isDesktop ? item.name : ''}
                    className={`flex items-center rounded-lg transition-all ${
                      isCollapsed && isDesktop ? 'justify-center p-3' : 'gap-3 px-4 py-3'
                    } ${
                      isActive
                        ? 'bg-gradient-to-r from-cyberpunk-blue to-cyberpunk-purple text-white shadow-neon'
                        : 'text-cyberpunk-text-secondary hover:bg-cyberpunk-blue/10'
                    }`}
                  >
                    <item.icon size={20} className="flex-shrink-0" />
                    {(!isCollapsed || !isDesktop) && (
                      <span className="font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="w-full mt-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            onClick={handleLogoutClick}
            title={isCollapsed && isDesktop ? "Logout" : ''}
            className={`flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all font-medium ${
              isCollapsed && isDesktop ? 'p-3 w-auto mx-auto' : 'w-full gap-2 px-4 py-3'
            }`}
          >
            <LogOut size={20} className="flex-shrink-0" />
            {(!isCollapsed || !isDesktop) && <span className="whitespace-nowrap">Logout</span>}
          </motion.button>
        </div>
      </div>
    </motion.aside>
  )
}

export default Sidebar
