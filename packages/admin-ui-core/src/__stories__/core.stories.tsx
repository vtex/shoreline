import React from 'react'
import type { Meta } from '@storybook/react'
import createEmotion from '@emotion/css/create-instance'

import { css } from '../stitches'
import { createCsx } from '../index'

export default {
  title: 'admin-ui-core/core',
} as Meta

// create a emotion instance
const emotion = createEmotion({
  key: 'admin-ui-core',
})

// join the parser w/ emotion.css
const csx = createCsx(emotion)

export function FrameworkdAgnostic() {
  return (
    <div
      className={csx({
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

export function Stitches() {
  return (
    <div
      className={css({
        backgroundColor: '$bg-secondary',
        color: '$fg-primary',
        border: '1px solid $bc-neutral',
        padding: '$1',
        marginY: '$2',
        height: 150,
        width: 150,
        borderRadius: 4,
        text: '$body',
      })()}
    >
      Framework Agnostic Box
    </div>
  )
}
