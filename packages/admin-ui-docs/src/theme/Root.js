import React from 'react'
import {
  createSystem,
  ToastProvider,
} from '@vtex/admin-ui'


const [ThemeProvider] = createSystem({
  key: 'admin-ui-provider',
})

function Root({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        {children}
      </ToastProvider>
    </ThemeProvider>
  )
}

export default Root
