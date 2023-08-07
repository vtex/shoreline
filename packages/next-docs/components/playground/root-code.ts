export const rootCode = `import React from 'react'
import { ThemeProvider } from '@vtex/admin-ui'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './App'
const root = createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)`
