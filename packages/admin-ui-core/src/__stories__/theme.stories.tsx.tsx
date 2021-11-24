import React, { useState } from 'react'
import type { Meta } from '@storybook/react'
import createEmotion from '@emotion/css/create-instance'
import { createTheme, createRuntime } from '..'

export default {
  title: 'admin-ui-core/core/theme',
} as Meta

// create a emotion instance
const emotion = createEmotion({
  key: 'admin-ui-core',
})

// theme creation
const { theme, cssVariables } = createTheme(
  {
    modes: {
      dark: {
        foreground: {
          base: '#fff',
        },
        background: {
          muted: '#111',
        },
        borderColor: {
          container: '#1fe',
        },
      },
    },
    foreground: {
      base: '#111',
    },
    background: {
      muted: '#cecece',
    },
    borderColor: {
      container: '#1fe',
    },
  },
  {
    enableModes: true,
  }
)

// atoms function
const { atoms } = createRuntime(theme, emotion)

console.log(cssVariables)

export function CSSVariables() {
  return (
    <div className={atoms(cssVariables.main)}>
      <div
        className={atoms({
          bg: 'muted',
          color: 'base',
          borderColor: 'container',
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 1,
          marginY: 2,
          size: 150,
          borderRadius: 4,
        })}
      >
        Framework Agnostic Box
      </div>
    </div>
  )
}

export function ModeSwitch() {
  const [theme, setTheme] = useState('main')

  return (
    <div
      data-theme={theme}
      className={atoms({
        '&[data-theme="main"]': cssVariables.main,
        '&[data-theme="dark"]': cssVariables.dark,
      })}
    >
      <div
        className={atoms({
          bg: 'muted',
          color: 'base',
          borderColor: 'container',
          borderWidth: 1,
          borderStyle: 'solid',
          padding: 1,
          marginY: 2,
          size: 150,
          borderRadius: 4,
        })}
      >
        Framework Agnostic Box
      </div>
      <button onClick={() => setTheme((t) => (t === 'main' ? 'dark' : 'main'))}>
        Toggle
      </button>
    </div>
  )
}
