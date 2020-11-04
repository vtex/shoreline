import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react'

import { Link, LinkProps } from './index'
import { Set } from '../Set'
import { Paragraph } from '../Paragraph'

export default {
  title: 'beta/link',
  component: Link,
} as Meta

export const Basic: Story<LinkProps> = () => {
  return (
    // <Set orientation="horizontal">
    //   <Link variant="primary" to="http://localhost:6006">
    //     Link 1
    //   </Link>

    // </Set>
    <Link variant="primary" to="http://localhost:6006">
      Link 2
    </Link>
  )
}

export const Variants: Story<LinkProps> = () => {
  return (
    <Set>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
        aliquam ex, quis pretium enim. Sed cursus quam ac lorem efficitur, ac
        sodales lorem convallis. Ut scelerisque mauris velit, sit amet iaculis
        elit feugiat commodo. Etiam egestas ante nibh, eget pulvinar erat
        ultrices et. In quis ante aliquam, ullamcorper leo et, porta sapien.
        Quisque lobortis eu velit at molestie. Ut vel gravida lorem, in
        efficitur nulla. Vestibulum tincidunt, nulla in semper dignissim, eros
        lacus molestie quam, sit amet tempus ante quam at mauris. Duis urna
        eros, cursus eget leo sit amet, sollicitudin blandit nibh. Cras
        pellentesque sapien nibh, eget finibus neque ultrices ut. Phasellus
        fermentum urna at ex rhoncus aliquam.
        <Link variant="primary" to="http://localhost:6006">
          Link 1
        </Link>
      </Paragraph>
      <Paragraph>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas a
        aliquam ex, quis pretium enim. Sed cursus quam ac lorem efficitur, ac
        sodales lorem convallis. Ut scelerisque mauris velit, sit amet iaculis
        elit feugiat commodo. Etiam egestas ante nibh, eget pulvinar erat
        ultrices et. In quis ante aliquam, ullamcorper leo et, porta sapien.
        Quisque lobortis eu velit at molestie. Ut vel gravida lorem, in
        efficitur nulla. Vestibulum tincidunt, nulla in semper dignissim, eros
        lacus molestie quam, sit amet tempus ante quam at mauris. Duis urna
        eros, cursus eget leo sit amet, sollicitudin blandit nibh. Cras
        pellentesque sapien nibh, eget finibus neque ultrices ut. Phasellus
        fermentum urna at ex rhoncus aliquam.
        <Link variant="underlined" to="http://localhost:6006">
          Link 2
        </Link>
      </Paragraph>
    </Set>
  )
}
