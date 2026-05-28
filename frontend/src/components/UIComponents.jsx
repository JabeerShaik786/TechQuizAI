import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Zap } from 'lucide-react'
import {
  hoverGlowVariants,
  glowPulseVariants,
  buttonHoverVariants,
} from '../animations/variants'

/* ==================== GLASS CARD ==================== */

export const GlassCard = ({
  children,
  className = '',
  hover = true,
  glow = 'cyan',
  variant = 'default',
  ...props
}) => {
  const glassClassMap = {
    default: 'glass',
    pink: 'glass glass-pink',
    purple: 'glass glass-purple',
    thick: 'glass-thick',
  }

  const glassClass = glassClassMap[variant] || glassClassMap.default

  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -5,
              boxShadow:
                glow === 'pink'
                  ? '0 0 40px rgba(236, 72, 153, 0.4)'
                  : glow === 'purple'
                    ? '0 0 40px rgba(139, 92, 246, 0.4)'
                    : '0 0 40px rgba(0, 245, 255, 0.4)',
            }
          : {}
      }
      transition={{ duration: 0.3 }}
      className={`${glassClass} rounded-2xl p-6 relative overflow-hidden ${className}`}
      {...props}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity rounded-2xl`} />
      </div>
      {children}
    </motion.div>
  )
}

/* ==================== PREMIUM BUTTON ==================== */

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  loading = false,
  ...props
}) => {
  const baseClasses =
    'font-semibold rounded-xl transition-all flex items-center justify-center gap-2 relative overflow-hidden'

  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-400 via-cyan-500 to-purple-600 text-white shadow-neon hover:shadow-neon-strong',
    secondary:
      'bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-400/50 text-purple-300 hover:border-purple-300/80 hover:shadow-neon-purple',
    danger:
      'bg-gradient-to-r from-red-500/10 to-red-600/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-400',
    outline:
      'border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400/10 hover:shadow-neon',
    ghost: 'text-cyan-300 hover:text-cyan-100 hover:bg-cyan-400/5',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg font-bold',
    xl: 'px-10 py-5 text-xl font-bold',
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      disabled={loading}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </>
      ) : (
        <>
          {Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </motion.button>
  )
}

/* ==================== SECTION TITLE ==================== */

export const SectionTitle = ({
  children,
  subtitle,
  icon: Icon,
  glow = 'cyan',
  size = 'lg',
}) => {
  const sizeClasses = {
    sm: 'text-2xl md:text-3xl',
    md: 'text-3xl md:text-4xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-5xl md:text-6xl',
  }

  const glowClasses = {
    cyan: 'from-cyan-400 to-purple-500',
    pink: 'from-pink-400 to-purple-500',
    purple: 'from-purple-400 to-pink-500',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="flex items-center gap-4 mb-3">
        {Icon && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/30">
            <Icon className="text-cyan-400" size={28} />
          </div>
        )}
        <h2
          className={`${sizeClasses[size]} font-display font-bold bg-gradient-to-r ${glowClasses[glow]} bg-clip-text text-transparent`}
        >
          {children}
        </h2>
      </div>
      {subtitle && (
        <p className="text-cyberpunk-secondary text-lg md:text-xl max-w-2xl pl-16">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

/* ==================== TOGGLE SWITCH ==================== */

export const ToggleSwitch = ({
  checked,
  onChange,
  label,
  onLabel = 'On',
  offLabel = 'Off',
  disabled = false,
  className = '',
}) => {
  return (
    <motion.div
      className={`flex items-center justify-between gap-4 rounded-2xl border border-cyberpunk-blue/20 bg-cyberpunk-glass px-5 py-4 transition-all duration-300 hover:border-cyberpunk-blue/40 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${className}`}
      whileHover={!disabled ? { borderColor: 'rgba(0, 245, 255, 0.6)' } : {}}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-cyberpunk-text-secondary leading-none mb-1.5">{label}</p>
        <motion.p 
          key={`${label}-${checked}`}
          initial={{ opacity: 0, y: -2 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-base font-semibold text-white"
        >
          {checked ? onLabel : offLabel}
        </motion.p>
      </div>

      <motion.button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={`${label}: ${checked ? onLabel : offLabel}`}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-10 w-16 flex-shrink-0 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:ring-offset-2 focus:ring-offset-[#070918] ${
          checked
            ? 'bg-gradient-to-r from-cyan-500/80 to-cyan-400/60 shadow-lg shadow-cyan-500/40'
            : 'bg-slate-700/40'
        }`}
      >
        {/* Background glow effect */}
        {checked && (
          <motion.div
            layoutId="toggle-glow"
            className="absolute inset-0 rounded-full bg-cyan-400/20 blur-md"
            initial={false}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* Animated thumb */}
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`absolute top-1 h-8 w-8 rounded-full bg-white shadow-lg ${
            checked ? 'left-7' : 'left-1'
          }`}
        >
          {/* Thumb glow when active */}
          {checked && (
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-400 blur-md opacity-50"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.5, scale: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </motion.div>
      </motion.button>
    </motion.div>
  )
}

/* ==================== MODAL WINDOW ==================== */

export const Modal = ({
  open,
  onClose,
  title,
  subtitle,
  children,
  footer,
  className = '',
}) => {
  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    >
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className={`w-full max-w-3xl rounded-3xl border border-cyberpunk-blue/30 bg-[#070918]/95 p-6 shadow-neon ${className}`}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            {subtitle && <p className="text-cyberpunk-text-secondary mt-2">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-cyberpunk-blue/20 bg-cyberpunk-glass p-3 text-cyberpunk-blue transition hover:bg-cyberpunk-blue/10"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">{children}</div>

        {footer && <div className="mt-6">{footer}</div>}
      </motion.div>
    </motion.div>
  )
}

/* ==================== BADGE ==================== */

export const Badge = ({
  children,
  color = 'blue',
  variant = 'default',
  icon: Icon,
}) => {
  const colorClasses = {
    blue: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
    pink: 'bg-pink-500/20 text-pink-300 border-pink-400/30',
    green: 'bg-green-500/20 text-green-300 border-green-400/30',
  }

  const variantClasses = {
    default: `px-4 py-1.5 rounded-full text-sm font-semibold border ${colorClasses[color]}`,
    solid: `px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${
      color === 'blue'
        ? 'from-cyan-500 to-cyan-600'
        : color === 'purple'
          ? 'from-purple-500 to-purple-600'
          : color === 'pink'
            ? 'from-pink-500 to-pink-600'
            : 'from-green-500 to-green-600'
    }`,
  }

  return (
    <motion.span
      whileHover={{ scale: 1.05 }}
      className={`inline-flex items-center gap-2 ${variantClasses[variant]}`}
    >
      {Icon && <Icon size={16} />}
      {children}
    </motion.span>
  )
}

/* ==================== LOADING SPINNER ==================== */

export const LoadingSpinner = ({ fullScreen = false, size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  }

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-50"
      >
        <motion.div
          className={`${sizeClasses[size]} border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin shadow-neon`}
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>
    )
  }

  return (
    <motion.div
      className={`${sizeClasses[size]} border-cyan-400/30 border-t-cyan-400 rounded-full mx-auto shadow-neon`}
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
    />
  )
}

/* ==================== STAT CARD ==================== */

export const StatCard = ({
  icon: Icon,
  label,
  value,
  color = 'cyan',
  trend,
  trendUp = true,
}) => {
  const gradients = {
    cyan: 'from-cyan-400/30 to-cyan-600/30',
    purple: 'from-purple-400/30 to-purple-600/30',
    pink: 'from-pink-400/30 to-pink-600/30',
    green: 'from-green-400/30 to-green-600/30',
  }

  const textColors = {
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    pink: 'text-pink-400',
    green: 'text-green-400',
  }

  const iconBgColors = {
    cyan: 'from-cyan-500 to-cyan-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    green: 'from-green-500 to-green-600',
  }

  return (
    <GlassCard variant="default" hover className="h-full">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-cyberpunk-secondary text-sm font-medium mb-2">
            {label}
          </p>
          <p className={`text-4xl md:text-5xl font-bold font-display mb-3 ${textColors[color]}`}>
            {value}
          </p>
          {trend && (
            <div className="flex items-center gap-2">
              <span className={`text-sm font-semibold ${trendUp ? 'text-green-400' : 'text-red-400'}`}>
                {trendUp ? '+' : '-'}
                {trend}%
              </span>
              <span className="text-cyberpunk-tertiary text-sm">vs last week</span>
            </div>
          )}
        </div>
        <div className={`p-4 rounded-2xl bg-gradient-to-br ${iconBgColors[color]} shadow-lg`}>
          <Icon className="text-white" size={28} />
        </div>
      </div>
    </GlassCard>
  )
}

/* ==================== CTA CARD ==================== */

export const CTACard = ({
  title,
  description,
  icon: Icon,
  buttonText = 'Get Started',
  onButtonClick,
  gradient = 'from-cyan-500 to-purple-600',
  animated = true,
}) => {
  return (
    <motion.div
      initial={animated ? { opacity: 0, y: 20 } : {}}
      animate={animated ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`relative overflow-hidden rounded-2xl p-8 md:p-12 bg-gradient-to-br ${gradient} border border-white/10`}
    >
      {/* Animated background effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-white/10 blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-start gap-6 mb-6">
          {Icon && (
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="p-4 rounded-xl bg-white/20 backdrop-blur"
            >
              <Icon size={32} className="text-white" />
            </motion.div>
          )}
          <div>
            <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">
              {title}
            </h3>
            <p className="text-white/80 text-lg">{description}</p>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={onButtonClick}
          className="mt-8 w-full md:w-auto"
        >
          {buttonText}
          <ArrowRight size={20} />
        </Button>
      </div>
    </motion.div>
  )
}

/* ==================== ANIMATED COUNTER ==================== */

export const AnimatedCounter = ({
  from = 0,
  to = 100,
  duration = 2,
  suffix = '',
  prefix = '',
  className = '',
}) => {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        from={{ value: from }}
        to={{ value: to }}
        transition={{ duration, ease: 'easeOut' }}
        children={({ value }) => (
          <span>
            {prefix}
            {Math.floor(value.get())}
            {suffix}
          </span>
        )}
      />
    </motion.span>
  )
}

/* ==================== GRADIENT TEXT ==================== */

export const GradientText = ({
  children,
  className = '',
  gradient = 'from-cyan-400 to-purple-600',
  animated = false,
}) => {
  return (
    <motion.span
      className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent font-bold ${className} ${
        animated ? 'bg-300% animate-gradient-shift' : ''
      }`}
      animate={animated ? { backgroundPosition: ['0%', '100%', '0%'] } : {}}
      transition={animated ? { duration: 3, repeat: Infinity } : {}}
    >
      {children}
    </motion.span>
  )
}

/* ==================== FEATURE PILL ==================== */

export const FeaturePill = ({
  icon: Icon,
  text,
  variant = 'default',
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm transition-all ${
        variant === 'default'
          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 hover:border-cyan-300'
          : variant === 'purple'
            ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30 hover:border-purple-300'
            : 'bg-pink-500/20 text-pink-300 border border-pink-400/30 hover:border-pink-300'
      }`}
    >
      {Icon && <Icon size={16} />}
      {text}
    </motion.div>
  )
}

/* ==================== HOLOGRAPHIC CARD ==================== */

export const HolographicCard = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`holographic rounded-2xl p-8 relative overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      </div>
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

/* ==================== TOAST NOTIFICATION ==================== */

export const Toast = ({
  message = '',
  type = 'info',
  onClose = () => {},
  duration = 4000,
}) => {
  const bgColorMap = {
    success: 'bg-green-500/90',
    error: 'bg-red-500/90',
    warning: 'bg-yellow-500/90',
    info: 'bg-blue-500/90',
  }

  const textColorMap = {
    success: 'text-green-100',
    error: 'text-red-100',
    warning: 'text-yellow-100',
    info: 'text-blue-100',
  }

  const bgColor = bgColorMap[type] || bgColorMap.info
  const textColor = textColorMap[type] || textColorMap.info

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`${bgColor} ${textColor} px-6 py-3 rounded-lg backdrop-blur-md border border-white/20 shadow-2xl max-w-sm`}
    >
      <p className="text-sm font-medium">{message}</p>
    </motion.div>
  )
}

/* ==================== TOAST CONTAINER (USE WITH STATE) ==================== */

export const ToastContainer = ({ toasts = [] }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-auto">
      {toasts && toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={toast.onClose}
        />
      ))}
    </div>
  )
}
