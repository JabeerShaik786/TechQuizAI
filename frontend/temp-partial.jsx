import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuthStore, useSettingsStore, useStatsStore } from '../store/index'
import { authService } from '../services/api'
import { GlassCard, SectionTitle, Button, ToggleSwitch, Modal } from '../components/UIComponents'
import {
  Camera,
  Edit3,
  User,
  Mail,
  Lock,
  Download,
  Trash2,
  RefreshCcw,
  Eye,
  EyeOff,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  X,
} from 'lucide-react'

const acceptedImageTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
const maxUploadSize = 5 * 1024 * 1024

const readFileAsDataURL = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })

const Profile = () => {
  const navigate = useNavigate()
  const inputRef = useRef(null)

  const { user, updateProfile, setAvatar, removeAvatar, logout } = useAuthStore()
  const { notificationsEnabled, darkMode, toggleNotifications, toggleDarkMode, clearSettings } = useSettingsStore()
  const { xp, level, streak, quizzesCompleted, totalAccuracy, badges, history, resetAllStats } = useStatsStore()

  const [editOpen, setEditOpen] = useState(false)
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [clearOpen, setClearOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [savingProfile, setSavingProfile] = useState(false)
  const [changingPassword, setChangingPassword] = useState(false)
  const [exporting, setExporting] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [clearing, setClearing] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadError, setUploadError] = useState('')
  const [removeAvatarFlag, setRemoveAvatarFlag] = useState(false)

  const [formValues, setFormValues] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: user?.bio || '',
  })

  const [avatarFile, setAvatarFile] = useState(null)
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '')

  const [passwordValues, setPasswordValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswords, setShowPasswords] = useState(false)

  useEffect(() => {
    setFormValues({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    })
    setAvatarPreview(user?.avatar || '')
    setRemoveAvatarFlag(false)
  }, [user])

  useEffect(() => {
    if (!avatarFile) return
    readFileAsDataURL(avatarFile)
      .then((result) => setAvatarPreview(result))
      .catch(() => {
        setUploadError('Unable to preview image. Please try a different file.')
      })
  }, [avatarFile])

  const avatarInitials = user?.name
    ? user.name
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
    : 'AI'

  const profileFields = [
    { label: 'Full Name', value: user?.name || 'Your Name', icon: User },
    { label: 'Email Address', value: user?.email || 'your@email.com', icon: Mail },
    { label: 'Member Since', value: new Date(user?.joinedAt || Date.now()).toLocaleDateString(), icon: Sparkles },
  ]

  const progressData = [
    { label: 'XP', value: xp, color: 'cyan' },
    { label: 'Level', value: level, color: 'purple' },
    { label: 'Streak', value: streak, color: 'pink' },
    { label: 'Accuracy', value: `${Math.round(totalAccuracy)}%`, color: 'green' },
  ]

  const handleFile = (file) => {
    setUploadError('')

    if (!file) {
      return
    }

    if (!acceptedImageTypes.includes(file.type)) {
      setUploadError('Please upload a JPG, PNG, JPEG, or WEBP file.')
      toast.error('Unsupported image format.')
      return
    }

    if (file.size > maxUploadSize) {
      setUploadError('File must be smaller than 5MB.')
      toast.error('Image size too large.')
      return
    }

    setRemoveAvatarFlag(false)
    setAvatarFile(file)
  }

  const handleDragEvents = (event) => {
    event.preventDefault()
    event.stopPropagation()

    if (event.type === 'dragenter' || event.type === 'dragover') {
      setDragActive(true)
    } else if (event.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (event) => {
    event.preventDefault()
    event.stopPropagation()
    setDragActive(false)

    const file = event.dataTransfer.files?.[0]
    handleFile(file)
  }

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    handleFile(file)
  }

  const resetProfileForm = () => {
    setAvatarFile(null)
    setAvatarPreview(user?.avatar || '')
    setRemoveAvatarFlag(false)
    setFormValues({
      name: user?.name || '',
      email: user?.email || '',
      bio: user?.bio || '',
    })
    setUploadError('')
  }

  const handleSaveProfile = async (event) => {
    event.preventDefault()
    const { name, email, bio } = formValues

    if (!name.trim() || !email.trim()) {
      toast.error('Name and email are required.')
      return
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(email)) {
      toast.error('Please enter a valid email address.')
      return
    }

    setSavingProfile(true)

    try {
      const updates = {
        name: name.trim(),
        email: email.trim(),
        bio: bio.trim(),
      }

      if (avatarFile) {
        updates.avatar = avatarFile
      }

      if (removeAvatarFlag) {
        updates.removeAvatar = true
      }

      const response = await authService.updateProfile(updates)

      if (response?.data?.user) {
        const updatedUser = response.data.user
        updateProfile({
          name: updatedUser.name,
          email: updatedUser.email,
          bio: updatedUser.bio || '',
          avatar: updatedUser.avatar || null,
        })

        setAvatarPreview(updatedUser.avatar || '')
        setRemoveAvatarFlag(false)
        setAvatarFile(null)
        toast.success('Profile updated successfully.')
        setEditOpen(false)
        resetProfileForm()
      } else {
        toast.error('Unable to update profile. Please try again.')
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Profile update failed.'
      toast.error(errorMessage)
      console.error('Profile update error:', error)
    } finally {
      setSavingProfile(false)
    }
  }

  const handleSavePassword = async (event) => {
    event.preventDefault()
    const { currentPassword, newPassword, confirmPassword } = passwordValues

    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please complete all password fields.')
      return
    }

    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters.')
      return
    }

    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match.')
      return
    }

    setChangingPassword(true)

    try {
      const { data } = await authService.changePassword({
        current_password: currentPassword,
        new_password: newPassword,
      })

      if (data?.message) {
        toast.success(data.message)
        setPasswordValues({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setPasswordOpen(false)
      } else {
        toast.error('Unable to update password.')
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        'Password change failed.'
      toast.error(errorMessage)
    } finally {
      setChangingPassword(false)
    }
  }

  const handleExportProfile = async () => {
    setExporting(true)

    try {
      const payload = {
        profile: {
          name: user?.name || 'Anonymous',
          email: user?.email || '',
          bio: user?.bio || '',
          joinedAt: user?.joinedAt || new Date().toISOString(),
        },
        stats: {
          xp,
          level,
          streak,
          quizzesCompleted,
          totalAccuracy,
          badges,
          history,
        },
        settings: {
          notificationsEnabled,
          darkMode,
          analyticsEnabled: true,
        },
        exportedAt: new Date().toISOString(),
      }

      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json',
      })
      const anchor = document.createElement('a')
      anchor.href = URL.createObjectURL(blob)
      anchor.download = `techquiz-ai-export-${Date.now()}.json`
      anchor.click()
      URL.revokeObjectURL(anchor.href)
      toast.success('Data exported successfully.')
    } catch (error) {
      toast.error('Unable to export data. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  const handleDeleteAccount = async () => {
    setDeleting(true)
    try {
      localStorage.clear()
      resetAllStats()
      clearSettings()
      logout()
      toast.success('Account deleted successfully.')
      navigate('/login')
    } catch (error) {
      toast.error('Unable to delete account right now.')
    } finally {
      setDeleting(false)
    }
  }

  const handleClearData = async () => {
    setClearing(true)
    try {
      resetAllStats()
      clearSettings()
      localStorage.removeItem('stats-storage')
      localStorage.removeItem('settings-storage')
      toast.success('App data has been cleared.')
      setClearOpen(false)
    } catch (error) {
      toast.error('Unable to clear data at this time.')
    } finally {
      setClearing(false)
    }
  }

  if (!user) {
    return (
      <div className="p-6">
        <SectionTitle>Profile</SectionTitle>
        <GlassCard className="p-8 text-center">
          <p className="text-cyberpunk-text-secondary">Loading your profile...</p>
        </GlassCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle>Your Profile</SectionTitle>

        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <GlassCard className="flex flex-col xl:flex-row items-center gap-8 p-8 lg:p-10">
          <div className="relative flex items-center justify-center">
            <div
              className={`relative h-36 w-36 rounded-full border-2 border-cyberpunk-blue/30 bg-gradient-to-br from-cyberpunk-blue/15 to-purple-500/15 shadow-neon ${dragActive ? 'ring-4 ring-cyberpunk-blue/30' : ''}`}
              onDragEnter={handleDragEvents}
              onDragOver={handleDragEvents}
              onDragLeave={handleDragEvents}
              onDrop={handleDrop}
            >
              {avatarPreview ? (
                <img
                  src={avatarPreview}
                  alt="Profile avatar"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-cyberpunk-blue/10 text-4xl font-bold text-cyberpunk-blue">
                  {avatarInitials}
                </div>
              )}

              <div className="absolute -bottom-2 right-0 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  className="rounded-full bg-cyberpunk-blue p-3 text-white shadow-neon transition hover:bg-cyberpunk-blue/90"
                >
                  <Camera size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    removeAvatar()
                    setRemoveAvatarFlag(true)
                    setAvatarPreview('')
                    setAvatarFile(null)
                    toast.success('Avatar removed')
                  }}
                  className="rounded-full bg-white/10 p-3 text-cyberpunk-text-secondary transition hover:bg-white/20"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-cyberpunk-text-secondary uppercase tracking-[0.3em] text-xs mb-2">Account overview</p>
                <h1 className="text-4xl md:text-5xl font-bold text-white">{user.name}</h1>
                <p className="mt-2 text-cyberpunk-secondary">{user.email}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button size="md" onClick={() => setEditOpen(true)}>
                  <Edit3 size={18} />
                  Edit Profile
                </Button>
                <Button variant="secondary" size="md" onClick={() => setPasswordOpen(true)}>
                  <Lock size={18} />
                  Change Password
                </Button>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {progressData.map((stat) => (
                <div key={stat.label} className="glass rounded-3xl p-5 border border-cyberpunk-blue/10 shadow-neon">
                  <p className="text-cyberpunk-text-secondary text-sm mb-3">{stat.label}</p>
                  <p className={`text-3xl font-semibold ${stat.color === 'green' ? 'text-emerald-300' : stat.color === 'purple' ? 'text-purple-300' : 'text-cyan-300'}`}>
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid gap-6 xl:grid-cols-3"
      >
        <GlassCard className="xl:col-span-2 p-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl font-bold">Profile Details</h2>
              <p className="text-cyberpunk-text-secondary">Manage your account, personal settings, and security.</p>
            </div>
            <div className="flex items-center gap-2 text-sm text-cyberpunk-text-secondary">
              <ShieldCheck size={18} />
              Secure, adaptive, and always live.
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {profileFields.map((field) => (
              <div key={field.label} className="glass p-5 rounded-3xl border border-cyberpunk-blue/10 shadow-neon">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 rounded-2xl bg-cyberpunk-blue/10 text-cyberpunk-blue">
                    <field.icon size={22} />
                  </div>
                  <div>
                    <p className="text-cyberpunk-text-secondary text-sm">{field.label}</p>
                    <p className="text-lg font-semibold text-white">{field.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 glass rounded-3xl border border-cyberpunk-blue/10 p-6">
            <h3 className="text-xl font-semibold mb-3">Bio</h3>
            <p className="text-cyberpunk-text-secondary leading-relaxed">
              {user.bio || 'Add a short bio to personalize your TechQuiz AI profile.'}
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-8 space-y-6">
          <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <p className="text-cyberpunk-text-secondary mt-2">Toggle notifications, theme, and export your data.</p>
          </div>

          <div className="space-y-4">
            <ToggleSwitch
              checked={notificationsEnabled}
              onChange={toggleNotifications}
              label="Email Notifications"
              onLabel="Enabled"
              offLabel="Disabled"
            />
            <ToggleSwitch
              checked={darkMode}
              onChange={toggleDarkMode}
              label="Dark Mode"
              onLabel="On"
              offLabel="Off"
            />
          </div>

          <div className="space-y-4 pt-4 border-t border-cyberpunk-blue/10">
            <Button loading={exporting} variant="outline" size="lg" onClick={handleExportProfile}>
              <Download size={18} />
              Export Data
            </Button>
            <div className="text-sm text-cyberpunk-text-secondary">
              Export your profile, stats, badges, and quiz history as a secure JSON file.
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6"
      >
        <h2 className="text-2xl font-bold mb-4">Danger Zone</h2>
        <GlassCard className="border-l-4 border-red-500/70 p-6">
          <p className="text-cyberpunk-text-secondary mb-4">
            These actions reset your learning progress or remove your account permanently.
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="danger"
              size="lg"
              onClick={() => setClearOpen(true)}
              className="w-full"
            >
              <RefreshCcw size={18} />
              Clear All Data
            </Button>
            <Button
              variant="danger"