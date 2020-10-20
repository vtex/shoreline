import React from 'react'
import { Meta } from '@storybook/react'

import {
  unstableHeading as Heading,
  unstableParagraph as Paragraph,
  TextBlock,
} from './index'
import { unstableThemeProvider as ThemeProvider } from '../unstableThemeProvider'

export default {
  title: 'system-next/typography',
} as Meta

export function heading() {
  return (
    <ThemeProvider>
      <Heading>Heading 1</Heading>
      <Heading element="h2">Heading 2</Heading>
      <Heading element="h3">Heading 3</Heading>
      <Heading element="h4">Heading 4</Heading>
      <Heading element="h5">Heading 5</Heading>
      <Heading element="h6">Heading 6</Heading>
    </ThemeProvider>
  )
}

export function smartHeading() {
  return (
    <ThemeProvider>
      <TextBlock>
        <Heading>Heading 1</Heading>
        <TextBlock>
          <Heading>Heading 2</Heading>
          <TextBlock>
            <Heading>Heading 3</Heading>
          </TextBlock>
        </TextBlock>
      </TextBlock>
      <TextBlock>
        <Heading>Heading 1</Heading>
        <TextBlock>
          <Heading>Heading 2</Heading>
        </TextBlock>
      </TextBlock>
    </ThemeProvider>
  )
}

export function paragraph() {
  return (
    <ThemeProvider>
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
      </Paragraph>
    </ThemeProvider>
  )
}
