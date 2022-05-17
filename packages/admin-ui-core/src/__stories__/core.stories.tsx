import React from 'react'
import type { Meta } from '@storybook/react'

import { createCsx } from '../index'

export default {
  title: 'admin-ui-core/core',
} as Meta

// join the parser w/ emotion.css
const csx = createCsx()

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
        padding: 1,
        marginY: 2,
        size: 150,
        borderRadius: 4,
      })}
    >
      <div className="test">Framework Agnostic Box</div>
    </div>
  )
}
