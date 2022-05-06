import React from 'react'
import type { Meta } from '@storybook/react'
import type { CSSObject } from '../createStitches'
import { css } from '../createStitches'
import { createCsx, style } from '../index'

export default {
  title: 'admin-ui-core/core',
} as Meta

const csx = createCsx()

type ActionTone = 'main' | 'critical' | 'neutral'
type ActionVariant = 'primary' | 'secondary' | 'tertiary'

interface ActionOptions {
  tone: ActionTone
  variant: ActionVariant
}

function action(options: ActionOptions): CSSObject {
  const { tone, variant } = options

  return {
    color: `$fg-action-${tone}-${variant}`,
    backgroundColor: `$bg-action-${tone}-${variant}`,
    '&:hover': {
      color: `$fg-action-${tone}-${variant}Hover`,
      backgroundColor: `$bg-action-${tone}-${variant}Hover`,
    },
    '&:active': {
      color: `$fg-action-${tone}-${variant}Pressed`,
      backgroundColor: `$bg-action-${tone}-${variant}Pressed`,
    },
    '&:disabled': {
      backgroundColor: variant === 'tertiary' ? 'transparent' : '$bg-disabled',
      color: '$fg-disabled',
    },
  }
}

export function FrameworkdAgnostic() {
  const button = css({
    borderRadius: '$default',
    border: 'none',
    cursor: 'pointer',
    margin: 4,

    variants: {
      variant: {
        primary: action({
          tone: 'main',
          variant: 'primary',
        }),
        secondary: action({
          tone: 'main',
          variant: 'secondary',
        }),
        tertiary: action({
          tone: 'main',
          variant: 'tertiary',
        }),
        critical: action({
          tone: 'critical',
          variant: 'primary',
        }),
        criticalSecondary: action({
          tone: 'critical',
          variant: 'secondary',
        }),
        criticalTertiary: action({
          tone: 'critical',
          variant: 'tertiary',
        }),
        neutralTertiary: action({
          tone: 'neutral',
          variant: 'tertiary',
        }),
      },
      size: {
        normal: {
          padding: '$s',
          height: '2.25rem',
        },
        large: {
          padding: '$m',
          height: '2.75rem',
        },
      },
    },
  })

  return (
    <button className={button({ variant: 'primary', size: 'normal' })}>
      Admin UI Button
    </button>
  )
}
