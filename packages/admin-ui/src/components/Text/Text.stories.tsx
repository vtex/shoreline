import React from 'react'
import type { Meta, Story } from '@storybook/react'

import { Text } from './index'

export default {
  title: 'admin-ui/Text',
  component: Text,
} as Meta

export const Playground: Story = (args) => {
  return <Text {...args} />
}

Playground.args = {
  children: 'Text!',
}

export function As() {
  return (
    <>
      <Text as="strong">Bold</Text>
      <br />
      <Text as="i">Italic</Text>
      <br />
      <Text as="u">Underline</Text>
      <br />
      <Text as="abbr">I18N</Text>
      <br />
      <Text as="cite">Citation</Text>
      <br />
      <Text as="del">Deleted</Text>
      <br />
      <Text as="em">Emphasis</Text>
      <br />
      <Text as="ins">Inserted</Text>
      <br />
      <Text as="kbd">Ctrl + C</Text>
      <br />
      <Text as="mark">Highlighted</Text>
      <br />
      <Text as="s">Strikethrough</Text>
      <br />
      <Text as="samp">Sample</Text>
      <br />
      <Text as="sub">sub</Text>
      <br />
      <Text as="sup">sup</Text>
    </>
  )
}

export function Csx() {
  return <Text csx={{ fontSize: 50 }}>Primary text</Text>
}
