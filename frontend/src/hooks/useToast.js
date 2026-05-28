import { useState, useCallback } from 'react'

/**
 * useToast Hook - Simple toast notification management
 * Usage:
 *   const { toasts, showToast } = useToast()
 *   showToast('Success!', 'success')
 *   showToast('Error occurred', 'error')
 */
export const useToast = () => {
  const [toasts, setToasts] = useState([])

  const showToast = useCallback(
    (message, type = 'info', duration = 4000) => {
      const id = Date.now()
      const newToast = { id, message, type }

      setToasts((prev) => [...prev, newToast])

      // Auto-remove toast after duration
      const timeout = setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, duration)

      // Return function to manually remove toast
      return () => {
        clearTimeout(timeout)
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }
    },
    []
  )

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    showToast,
    removeToast,
    clearAll,
  }
}
