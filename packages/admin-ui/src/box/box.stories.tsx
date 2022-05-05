import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { Box } from './index'

export default {
  title: 'admin-ui/box',
} as Meta

export const Basic: Story = () => {
  return <Box>Cool Box</Box>
}

export const CsxProp: Story = () => {
  return (
    <Box
      csx={{
        fontSize: 64,
        zIndex: 'over',
      }}
    >
      Huge Text
    </Box>
  )
}

export const ConsumingAdminUiTheme: Story = () => {
  return (
    <Box
      csx={{
        fontSize: 64,
        bg: '$primary',
        color: '$primary',
        borderRadius: 4,
      }}
    >
      Primary Box
    </Box>
  )
}

export const Polymorphism: Story = () => {
  return (
    <Box as="a" href="https://reakit.io/docs/role/" target="blank">
      Link
    </Box>
  )
}

export const UsingClassNames: Story = () => {
  return (
    <Box csx={{ bg: '$primary', color: '$primary' }} className="my-className">
      Box
    </Box>
  )
}
