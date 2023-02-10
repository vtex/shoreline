import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Heading, HeadingLevel } from './index'

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

export function Standalone() {
  return <Heading>Heading 1</Heading>
}

export function HeadingLevels() {
  return (
    <HeadingLevel>
      <Heading>Heading 1</Heading>
      <HeadingLevel>
        <Heading>Heading 2</Heading>
        <HeadingLevel>
          <Heading>Heading 3</Heading>
          <HeadingLevel>
            <Heading>Heading 4</Heading>
            <HeadingLevel>
              <Heading>Heading 5</Heading>
              <HeadingLevel>
                <Heading>Heading 6</Heading>
              </HeadingLevel>
            </HeadingLevel>
          </HeadingLevel>
        </HeadingLevel>
      </HeadingLevel>
    </HeadingLevel>
  )
}

export function DeprecatedHeadingLevels() {
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
