import React from 'react'
import type { Meta } from '@storybook/react'

import { createCsx } from '../index'
import { theme } from '../theme'
import { generateVars } from '../createTheme'

export default {
  title: 'admin-ui-core/core',
} as Meta

// join the parser w/ emotion.css
const csx = createCsx(theme)

export function FrameworkdAgnostic() {
  return (
    <div
      className={csx({
        border: '$neutral',
        ':hover': {
          bg: '$action.neutral.tertiaryHover',
        },
        div: {
          colorTheme: 'blue',
        },
        padding: '$space-1',
        marginY: '$space-2',
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

export const Utils = () => {
  return (
    <div
      className={csx({
        bg: '$critical',
        size: 200,
        marginX: '$space-5',
        paddingY: '$space-4',
      })}
    >
      Utils
    </div>
  )
}

export const Vars = () => {
  return (
    <button
      className={csx({ cursor: 'pointer' })}
      onClick={() =>
        console.log({
          vars: generateVars(theme),
        })
      }
    >
      Click to print vars
    </button>
  )
}
