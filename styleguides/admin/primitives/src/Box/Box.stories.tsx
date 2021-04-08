import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Box } from './index'

export default {
  title: 'Primitives/Box',
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
        bg: 'blue',
        color: 'light.primary',
        borderRadius: 4,
      }}
    >
      Primary Box
    </Box>
  )
}

export const Polymorphism: Story = () => {
  return (
    <Box element="a" href="https://reakit.io/docs/role/" target="blank">
      Link
    </Box>
  )
}

export const UsingClassNames: Story = () => {
  return (
    <Box
      csx={{ bg: 'primary.base', color: 'background' }}
      className="my-className"
    >
      Box
    </Box>
  )
}

export const WithMediaQueryAliases: Story = () => {
  return (
    <Box
      csx={{
        bg: 'yellow',
        '@tablet': { bg: 'green' },
        '@desktop': { bg: 'blue' },
        '@widescreen': { bg: 'red' },
      }}
    >
      Box
    </Box>
  )
}
