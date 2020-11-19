import React from 'react'
import { Story, Meta } from '@storybook/react'

import { Box } from './index'
import { Button } from '../Button'

export default {
  title: 'primitives/box',
} as Meta

export const Basic: Story = () => {
  return <Box>Cool Box</Box>
}

export const Styles: Story = () => {
  return (
    <Box
      styles={{
        fontSize: 64,
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
        bg: 'primary.base',
        color: 'primary.accent',
        borderRadius: 4,
      }}
    >
      Primary Box
    </Box>
  )
}

export const Surfaces: Story = () => {
  return (
    <>
      <Box palette="base" border="default">
        Default Box
      </Box>
      <Box palette="inverted">Inverted Box</Box>
      <Box palette="primary">Primary Box</Box>
    </>
  )
}

export const Texts: Story = () => {
  return (
    <>
      <Box text="headline">Headline</Box>
      <Box text="subtitle">Subtitle</Box>
      <Box text="action">Box with actions text</Box>
      <Box text="highlight">Highlight text</Box>
      <Box text="body">Box with body text</Box>
      <Box text="small">Box with small text</Box>
    </>
  )
}

export const Divider: Story = () => {
  return (
    <>
      <Box text="headline" border="divider-bottom" width={100}>
        Headline
      </Box>
      <Box text="subtitle">Subtitle</Box>
      <Box text="action">Box with actions text</Box>
      <Box text="highlight">Highlight text</Box>
      <Box text="body">Box with body text</Box>
      <Box text="small">Box with small text</Box>
    </>
  )
}

export const Polymorphism: Story = () => {
  return (
    <>
      <Box element="a" href="https://reakit.io/docs/role/" target="blank">
        Link
      </Box>
      <Box element={Button} variant="tertiary">
        Tertiary Button
      </Box>
    </>
  )
}
