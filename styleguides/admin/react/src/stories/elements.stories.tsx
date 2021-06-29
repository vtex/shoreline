import React from 'react'
import { Meta } from '@storybook/react'
import { ThemeProvider } from '@vtex/admin-core'
import { useMenuState, Menu, MenuItem, MenuButton } from 'reakit/Menu'

import { tag } from '../index'

export default {
  title: 'react/tag',
} as Meta

export function WithStyles() {
  return (
    <ThemeProvider>
      <tag.div
        csx={{
          bg: 'blue',
          color: 'light.primary',
          size: 120,
        }}
      >
        Div element
      </tag.div>
    </ThemeProvider>
  )
}

export function Polymorphism() {
  const menu = useMenuState()
  return (
    <ThemeProvider>
      <tag.button
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
      </tag.button>
      <tag.div
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
        <tag.button as={MenuItem} {...menu}>
          Settings
        </tag.button>
        <tag.button as={MenuItem} {...menu}>
          Extensions
        </tag.button>
        <tag.button as={MenuItem} {...menu}>
          Keyboard shortcuts
        </tag.button>
      </tag.div>
    </ThemeProvider>
  )
}
