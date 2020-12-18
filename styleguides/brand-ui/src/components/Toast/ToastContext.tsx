import { createContext, ReactNode } from 'react'

interface ToastContextProps {
  addToast: (toast: ReactNode) => void
}

export default createContext<ToastContextProps>({
  addToast: () => {},
})
