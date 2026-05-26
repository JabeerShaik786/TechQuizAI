import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSettingsStore } from '../store/index'
import NavBar from '../components/NavBar'
import Sidebar from '../components/Sidebar'

const MainLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { darkMode } = useSettingsStore()

  return (
    <div className={`min-h-screen w-full overflow-x-hidden bg-[#020617] ${darkMode ? 'text-white' : 'text-slate-100'}`}>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="min-h-screen flex flex-col w-full">
        <NavBar onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-[#020617]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8 py-6 md:py-8">
              {children}
            </div>
          </motion.div>
        </main>
      </div>

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
