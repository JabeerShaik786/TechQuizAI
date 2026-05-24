import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'
import { useSettingsStore } from '../store/index'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navigate = useNavigate()
  const { darkMode } = useSettingsStore()

  return (
    <div className={`flex h-screen w-screen ${darkMode ? 'bg-cyberpunk-dark' : 'bg-slate-950'} overflow-hidden`}>
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* NavBar */}
        <NavBar onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Content Area - Centered Container */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gradient-cyber w-full">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              {children}
            </div>
          </motion.div>
        </main>
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default MainLayout
