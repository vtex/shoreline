import type { AnyObject } from '@vtex/admin-ui-util'
import { createContext, useContext } from 'react'

interface CheckboxGroupContextType {
  register: AnyObject
}

const CheckboxGroupContext = createContext<CheckboxGroupContextType | null>(
  null
)

function useCheckboxGroupContext() {
  return useContext(CheckboxGroupContext)
}

const { Provider } = CheckboxGroupContext

export { Provider as CheckboxGroupContextProvider, useCheckboxGroupContext }
