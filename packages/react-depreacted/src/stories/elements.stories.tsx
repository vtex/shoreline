import React from 'react'
import { Meta } from '@storybook/react'
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu'

import { onda } from '../index'
import { ThemeProvider } from './setup'

export default {
  title: 'onda elements',
} as Meta

export function WithStyles() {
  return (
    <ThemeProvider>
      <onda.div
        csx={{
          bg: 'blue',
          color: 'light.primary',
          size: 120,
        }}
      >
        Div element
      </onda.div>
    </ThemeProvider>
  )
}

export function Polymorphism() {
  const menu = useMenuState()
  return (
    <ThemeProvider>
      <onda.button
        as={MenuButton}
        {...menu}
        csx={{
          bg: 'blue',
          color: 'light.primary',
          height: 32,
          borderRadius: 4,
          cursor: 'pointer',
        }}
      >
        Preferences
      </onda.button>
      <onda.div
        as={Menu}
        {...menu}
        aria-label="Preferences"
        csx={{
          border: '1px solid',
          borderColor: 'dark.secondary',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 4,
          '> button': {
            borderRadius: 4,
            height: 32,
            cursor: 'pointer',
            bg: 'light.primary',
            ':hover': {
              bg: 'light.secondary',
            },
            ':active': {
              bg: 'mid.tertiary',
            },
          },
          hr: {
            height: '1px',
            bg: 'dark.primary',
          },
        }}
      >
        <onda.button as={MenuItem} {...menu}>
          Settings
        </onda.button>
        <onda.button as={MenuItem} {...menu}>
          Extensions
        </onda.button>
        <onda.button as={MenuItem} {...menu}>
          Keyboard shortcuts
        </onda.button>
      </onda.div>
    </ThemeProvider>
  )
}
