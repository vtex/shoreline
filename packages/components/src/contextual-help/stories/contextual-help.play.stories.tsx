import React from 'react'
import type { Meta } from '@storybook/react'

import type { ContextualHelpProps } from '../index'
import { ContextualHelp } from '../index'
import { Stack } from '../../stack'
import './contextual-help-stories.css'

type BasePlacement = 'top' | 'bottom' | 'left' | 'right'
type Placement =
  | BasePlacement
  | `${BasePlacement}-start`
  | `${BasePlacement}-end`

const placementOptions: Placement[] = [
  'top-start',
  'top-end',
  'bottom-start',
  'bottom-end',
]

export function Play(props: ContextualHelpProps) {
  const { label, children, ...otherProps } = props

  return (
    <Stack className="ch-examples ch-center ch-decorative-box">
      <ContextualHelp label={label} {...otherProps}>
        {children}
      </ContextualHelp>
    </Stack>
  )
}

const meta: Meta<typeof ContextualHelp> = {
  title: 'components/contextual-help',
  argTypes: {
    placement: {
      options: placementOptions,
      control: { type: 'radio' },
      description: 'Popover placement',
      defaultValue: 'bottom',
    },
    label: {
      control: { type: 'text' },
      description: 'aria-abel for the contextual help trigger',
    },
    children: {
      control: { type: 'text' },
      description: 'Content of the contextual help',
    },
  },
  args: {
    label: 'Meaningful label',
    placement: 'bottom-end',
    children: `Some helpful message here to help merchants contextually understand
      the definition of an item`,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export default meta
