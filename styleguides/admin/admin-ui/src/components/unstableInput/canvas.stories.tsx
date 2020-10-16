import React from 'react'
import { Story, Meta } from '@storybook/react'

import { unstableInput as Input } from './index'
import { ThemeProviderNext } from '../../system-next'
import { baseTheme } from '../../themes-next'

export default {
  title: 'system-next/input',
} as Meta

export const Base: Story = () => {
  return (
    <ThemeProviderNext theme={baseTheme}>
      <Input border="default" aria-label="Label" />
    </ThemeProviderNext>
  )
}
