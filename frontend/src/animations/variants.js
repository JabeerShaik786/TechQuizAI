/* ==================== CONTAINER & STAGGER ANIMATIONS ==================== */

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

export const containerFastVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const containerSlowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

/* ==================== ITEM ANIMATIONS ==================== */

export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 10,
    },
  },
}

export const itemSlideInVariants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 12,
    },
  },
}

export const itemScaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 110,
      damping: 10,
    },
  },
}

/* ==================== FADE ANIMATIONS ==================== */

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6 },
  },
}

export const fadeInFastVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
}

export const fadeInSlowVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 1 },
  },
}

/* ==================== SLIDE ANIMATIONS ==================== */

export const slideInVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

export const slideInFromRightVariants = {
  hidden: { x: 50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

export const slideUpVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

export const slideDownVariants = {
  hidden: { y: -50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

/* ==================== SCALE ANIMATIONS ==================== */

export const scaleVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 12,
    },
  },
}

export const scalePulseVariants = {
  hidden: { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
    },
  },
}

/* ==================== HOVER EFFECTS ==================== */

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
}

export const hoverScaleSmall = {
  whileHover: { scale: 1.03 },
  whileTap: { scale: 0.98 },
}

export const hoverScaleLarge = {
  whileHover: { scale: 1.1 },
  whileTap: { scale: 0.9 },
}

export const hoverGlowVariants = {
  whileHover: {
    scale: 1.05,
    boxShadow: '0 0 40px rgba(0, 245, 255, 0.8)',
  },
  whileTap: { scale: 0.95 },
}

export const hoverGlowPinkVariants = {
  whileHover: {
    scale: 1.05,
    boxShadow: '0 0 40px rgba(236, 72, 153, 0.8)',
  },
  whileTap: { scale: 0.95 },
}

export const hoverGlowPurpleVariants = {
  whileHover: {
    scale: 1.05,
    boxShadow: '0 0 40px rgba(139, 92, 246, 0.8)',
  },
  whileTap: { scale: 0.95 },
}

export const hoverLiftVariants = {
  whileHover: {
    y: -8,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
  },
  whileTap: { y: -2 },
}

/* ==================== ROTATE ANIMATIONS ==================== */

export const rotateVariants = {
  hidden: { rotate: -10, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
}

export const rotateSpinVariants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

export const rotateSlowVariants = {
  spin: {
    rotate: 360,
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

/* ==================== PULSE & GLOW ANIMATIONS ==================== */

export const pulseVariants = {
  pulse: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.9, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const pulseFastVariants = {
  pulse: {
    scale: [1, 1.08, 1],
    opacity: [1, 0.85, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const glowPulseVariants = {
  pulse: {
    boxShadow: [
      '0 0 20px rgba(0, 245, 255, 0.4)',
      '0 0 50px rgba(0, 245, 255, 0.8)',
      '0 0 20px rgba(0, 245, 255, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const glowPulsePinkVariants = {
  pulse: {
    boxShadow: [
      '0 0 20px rgba(236, 72, 153, 0.4)',
      '0 0 50px rgba(236, 72, 153, 0.8)',
      '0 0 20px rgba(236, 72, 153, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const glowPulsePurpleVariants = {
  pulse: {
    boxShadow: [
      '0 0 20px rgba(139, 92, 246, 0.4)',
      '0 0 50px rgba(139, 92, 246, 0.8)',
      '0 0 20px rgba(139, 92, 246, 0.4)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/* ==================== FLOAT & BOUNCE ANIMATIONS ==================== */

export const floatVariants = {
  float: {
    y: [-10, 10, -10],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const floatSlowVariants = {
  float: {
    y: [-15, 15, -15],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

export const bounceVariants = {
  bounce: {
    y: [0, -20, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/* ==================== MORPHING ANIMATIONS ==================== */

export const morphVariants = {
  morph: {
    borderRadius: ['20%', '60%', '20%'],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
}

/* ==================== SHIMMER ANIMATIONS ==================== */

export const shimmerVariants = {
  shimmer: {
    backgroundPosition: ['-1000px 0', '1000px 0'],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
}

/* ==================== BUTTON ANIMATIONS ==================== */

export const buttonHoverVariants = {
  whileHover: {
    scale: 1.05,
    boxShadow: '0 0 40px rgba(0, 245, 255, 0.6)',
    transition: { duration: 0.2 },
  },
  whileTap: {
    scale: 0.95,
  },
}

export const buttonPressVariants = {
  whileHover: {
    y: -3,
    boxShadow: '0 10px 30px rgba(0, 245, 255, 0.4)',
  },
  whileTap: {
    y: 0,
    boxShadow: '0 0 15px rgba(0, 245, 255, 0.2)',
  },
}

/* ==================== TAB/CARD ANIMATIONS ==================== */

export const tabVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
    },
  },
}

export const cardFlipVariants = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
}

/* ==================== COMPLEX SEQUENCES ==================== */

export const heroVariants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 80,
      damping: 15,
      delay: 0.1,
    },
  },
}

export const heroTitleVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      damping: 12,
      delay: 0.2,
    },
  },
}

export const heroParagraphVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 90,
      damping: 10,
      delay: 0.3,
    },
  },
}

export const pageTransitionVariants = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -100,
    transition: {
      duration: 0.4,
      ease: 'easeIn',
    },
  },
}

/* ==================== MODAL ANIMATIONS ==================== */

export const modalBackdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
}

export const modalContentVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    transition: {
      duration: 0.2,
    },
  },
}
