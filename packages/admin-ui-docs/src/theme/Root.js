import React from 'react'
import {
  createSystem,
  ToastProvider,
  experimental_I18nProvider as I18nProvider,
} from '@vtex/admin-ui'

const [ThemeProvider] = createSystem({
  experimentalDisabledGlobalStyles: false,
})

function Root({ children }) {
  return (
    <ThemeProvider>
      <ToastProvider>
        <I18nProvider locale="en-US">{children}</I18nProvider>
      </ToastProvider>
    </ThemeProvider>
  )
}

export default Root
