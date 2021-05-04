import { createContext } from 'react'

export interface SystemContextType {}

export const SystemContext = createContext<SystemContextType>({
  theme: {},
})
