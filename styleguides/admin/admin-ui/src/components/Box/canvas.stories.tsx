import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Box } from './index'

export default {
  title: 'admin-ui/Box',
} as Meta

export const Basic: Story = () => {
  return <Box>Cool Box</Box>
}

export const Styles: Story = () => {
  return (
    <Box
      styles={{
        fontSize: 64,
        zIndex: 'over',
      }}
    >
      Huge Text
    </Box>
  )
}

export const ConsumeTheme: Story = () => {
  return (
    <Box
      styles={{
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

export const Divider: Story = () => {
  return (
    <>
      <Box
        styles={{
          text: 'headline',
          border: 'divider-bottom',
          width: 100,
        }}
      >
        Headline
      </Box>
      <Box
        styles={{
          text: 'subtitle',
        }}
      >
        Subtitle
      </Box>
    </>
  )
}

export const Polymorphism: Story = () => {
  return (
    <Box element="a" href="https://reakit.io/docs/role/" target="blank">
      Link
    </Box>
  )
}

export const WithClassName: Story = () => {
  return (
    <Box
      styles={{ bg: 'primary.base', color: 'background' }}
      className="my-className"
    >
      Box
    </Box>
  )
}
