export const newRootCode = `import React from 'react'
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

export const oldRootCode = `import React from 'react'
import { createSystem } from '@vtex/admin-ui'
import { createRoot } from 'react-dom/client'
import './styles.css'

import App from './App'

const [ThemeProvider] = createSystem({ key: 'admin-ui-docs' })

const root = createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)`

export function getRootCode(version: string) {
  switch (version) {
    case '0.131.x':
      return oldRootCode
      break

    case '0.132.x':
      return oldRootCode
      break

    default:
      return newRootCode
  }
}
