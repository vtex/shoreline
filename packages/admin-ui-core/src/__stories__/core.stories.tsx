import React from 'react'
import type { Meta } from '@storybook/react'
import createEmotion from '@emotion/css/create-instance'
import { createTheme, createRuntime } from '..'

export default {
  title: 'admin-ui-core/core',
} as Meta

// create a emotion instance
const emotion = createEmotion({
  key: 'admin-ui-core',
})

// theme creation
const { theme } = createTheme({
  fg: {
    primary: '#111',
  },
  bg: {
    secondary: '#cecece',
  },
  border: {
    neutral: '1px solid #000',
  },
})

// atoms function
const { atoms } = createRuntime(theme, emotion)

export function FrameworkdAgnostic() {
  return (
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
  )
}
