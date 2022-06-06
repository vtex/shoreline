import React from 'react'
import type { Meta } from '@storybook/react'

import { createCsx } from '../index'
import { theme } from '../theme'

export default {
  title: 'admin-ui-core/core',
} as Meta

// join the parser w/ emotion.css
const csx = createCsx(theme)

export function FrameworkdAgnostic() {
  return (
    <div
      className={csx({
        bg: '$action.neutral.tertiary',
        color: '$primary',
        border: '$neutral',
        ':hover': {
          bg: '$action.neutral.tertiaryHover',
        },
        div: {
          bg: '$secondary',
        },
        padding: 1,
        marginY: 2,
        size: 150,
        borderRadius: 4,
      })}
    >
      <div className={csx({ '+ button': { bg: '$action.critical.primary' } })}>
        Framework Agnostic Box
      </div>
      <button>test button</button>
    </div>
  )
}
