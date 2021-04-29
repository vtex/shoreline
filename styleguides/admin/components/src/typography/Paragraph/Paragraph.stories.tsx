import React from 'react'
import { Meta, Story } from '@storybook/react'

import { Paragraph } from './index'

export default {
  title: 'typography/Paragraph',
  component: Paragraph,
} as Meta

export const Playground: Story = (args) => {
  return <Paragraph {...args} />
}

Playground.args = {
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a aliquam ex, quis pretium enim. Sed cursus quam ac lorem efficitur, ac sodales lorem convallis. Ut scelerisque mauris velit, sit amet iaculis elit feugiat commodo. Etiam egestas ante nibh, eget pulvinar erat ultrices et. In quis ante aliquam, ullamcorper leo et, porta sapien. Quisque lobortis eu velit at molestie. Ut vel gravida lorem, in efficitur nulla. Vestibulum tincidunt, nulla in semper dignissim, eros lacus molestie quam, sit amet tempus ante quam at mauris. Duis urna eros, cursus eget leo sit amet, sollicitudin blandit nibh. Cras pellentesque sapien nibh, eget finibus neque ultrices ut. Phasellus fermentum urna at ex rhoncus aliquam.',
}

export function Csx() {
  return (
    <Paragraph csx={{ bg: 'light.secondary', color: 'blue' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
      aliquam ex, quis pretium enim. Sed cursus quam ac lorem efficitur, ac
      sodales lorem convallis. Ut scelerisque mauris velit, sit amet iaculis
      elit feugiat commodo. Etiam egestas ante nibh, eget pulvinar erat ultrices
      et. In quis ante aliquam, ullamcorper leo et, porta sapien. Quisque
      lobortis eu velit at molestie. Ut vel gravida lorem, in efficitur nulla.
      Vestibulum tincidunt, nulla in semper dignissim, eros lacus molestie quam,
      sit amet tempus ante quam at mauris. Duis urna eros, cursus eget leo sit
      amet, sollicitudin blandit nibh. Cras pellentesque sapien nibh, eget
      finibus neque ultrices ut. Phasellus fermentum urna at ex rhoncus aliquam.
    </Paragraph>
  )
}

export function TextPattern() {
  return (
    <Paragraph csx={{ text: 'small' }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
      aliquam ex, quis pretium enim. Sed cursus quam ac lorem efficitur, ac
      sodales lorem convallis. Ut scelerisque mauris velit, sit amet iaculis
      elit feugiat commodo. Etiam egestas ante nibh, eget pulvinar erat ultrices
      et. In quis ante aliquam, ullamcorper leo et, porta sapien. Quisque
      lobortis eu velit at molestie. Ut vel gravida lorem, in efficitur nulla.
      Vestibulum tincidunt, nulla in semper dignissim, eros lacus molestie quam,
      sit amet tempus ante quam at mauris. Duis urna eros, cursus eget leo sit
      amet, sollicitudin blandit nibh. Cras pellentesque sapien nibh, eget
      finibus neque ultrices ut. Phasellus fermentum urna at ex rhoncus aliquam.
    </Paragraph>
  )
}
