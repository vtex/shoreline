import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Heading } from './index'

export default {
  title: 'admin-ui/Heading',
  component: Heading,
} as Meta

export const Playground: Story = (args) => {
  return <Heading {...args} />
}

Playground.args = {
  children: 'Heading',
}

export function HeadingLevels() {
  return (
    <>
      <Heading>Heading 1</Heading>
      <Heading as="h2">Heading 2</Heading>
      <Heading as="h3">Heading 3</Heading>
      <Heading as="h4">Heading 4</Heading>
      <Heading as="h5">Heading 5</Heading>
      <Heading as="h6">Heading 6</Heading>
    </>
  )
}

export function Csx() {
  return <Heading csx={{ color: 'blue' }}>Heading 1</Heading>
}
