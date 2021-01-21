import React from 'react'
import { Meta, Story } from '@storybook/react'

import { useSystem } from './index'

export default {
  title: 'system',
} as Meta

export const cxAndCn: Story = () => {
  const { cn, cx } = useSystem()

  return (
    <div
      className={cx('my-className', cn({ bg: 'blue', color: 'light.primary' }))}
    >
      Cn
    </div>
  )
}
