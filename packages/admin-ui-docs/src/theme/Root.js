import React from 'react'

import {
  createSystem,
  theme,
  ToastProvider,
  unstableCreateAdminUI
} from '@vtex/admin-ui'


const unstableSystem = unstableCreateAdminUI(theme)
const [ThemeProvider] = createSystem({
  key: 'admin-ui-provider',
  unstableSystem,
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
