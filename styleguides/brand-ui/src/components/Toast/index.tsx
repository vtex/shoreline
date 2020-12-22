import React, {
  PropsWithChildren,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { Box } from 'theme-ui'

import ToastContext from './ToastContext'

const TOAST_TIMER = 3000

export interface ToastProps {
  actionText?: string
  onActionClick?: () => void
  closeOnAction?: boolean
}

export const ToastProvider = ({ children }: PropsWithChildren<{}>) => {
  const [toasts, setToasts] = useState<ReactNode[]>([])

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts((staleToasts) => staleToasts.slice(1)),
        TOAST_TIMER
      )

      return () => clearTimeout(timer)
    }

    return () => {}
  }, [toasts])

  const addToast = useCallback(
    (toast: ReactNode) => {
      setToasts((staleToasts) => [...staleToasts, toast])
    },
    [setToasts]
  )

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <Box variant="toast.container">
        {toasts.map((toast, index) => (
          <Box key={`toast--${index}`} variant="toast.wrapper">
            {toast}
          </Box>
        ))}
      </Box>
    </ToastContext.Provider>
  )
}
