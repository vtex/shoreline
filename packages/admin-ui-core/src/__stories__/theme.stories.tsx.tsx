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
        fg: {
          primary: '#fff',
        },
        bg: {
          secondary: '#111',
        },
        border: {
          neutral: '1px solid #1fe',
        },
      },
    },
    fg: {
      primary: '#111',
    },
    bg: {
      secondary: '#cecece',
    },
    border: {
      neutral: '1px solid #1fe',
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
          bg: '$secondary',
          color: '$primary',
          border: '$neutral',
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
          bg: '$secondary',
          color: '$primary',
          border: '$neutral',
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
