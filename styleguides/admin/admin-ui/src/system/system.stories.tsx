import React from 'react'
import { Meta, Story } from '@storybook/react'

import { cx, cn } from './index'

export default {
  title: 'system',
} as Meta

export const cxAndCn: Story = () => {
  return (
    <div
      className={cx(
        'my-className',
        cn({ bg: 'blue', color: 'light.primary' })
      )}
    >
      Cn
    </div>
  )
}
