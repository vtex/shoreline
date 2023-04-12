import { useEffect, useState, useRef, useCallback } from 'react'

interface UseTimeoutProps {
  onTimeout: () => void
  duration: number
}
export function useTimeout(props: UseTimeoutProps) {
  const { onTimeout, duration } = props

  const [activated, setActivated] = useState(true)
  const timeoutRef = useRef<number | undefined>()

  const stopTimeout = useCallback(() => {
    window.clearTimeout(timeoutRef.current)
    setActivated(false)
  }, [])

  useEffect(() => {
    if (!activated) return

    timeoutRef.current = window.setTimeout(() => {
      onTimeout()
    }, duration)

    return () => {
      stopTimeout()
    }
  }, [onTimeout, activated, duration, stopTimeout])

  const startTimeout = useCallback(() => {
    setActivated(true)
  }, [])

  return {
    stopTimeout,
    startTimeout,
  }
}
