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
  foreground: {
    base: '#111',
  },
  background: {
    muted: '#cecece',
  },
  borderColor: {
    container: '#000',
  },
})

// atoms function
const { atoms } = createRuntime(theme, emotion)

export function FrameworkdAgnostic() {
  return (
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
  )
}
