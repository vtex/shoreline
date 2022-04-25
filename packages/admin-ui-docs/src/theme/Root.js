import React from 'react'
import {
  createSystem,
  ToastProvider,
} from '@vtex/admin-ui'


const [ThemeProvider] = createSystem({
  key: 'example',
  experimentalDisabledGlobalStyles: false,
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
