import React from 'react'
import { Text } from 'theme-ui'
import { get } from '@vtex-components/theme'

import { links } from './mockLinks'
import FooterLanding from './index'

export default {
  title: 'Work in progress/Footer Landing',
  component: FooterLanding,
}

const Template = () => (
  <FooterLanding>
    {links.map((link, index) => (
      <Text
        key={link.name}
        sx={{
          marginRight: (theme) => [
            get(theme, 'space.0'),
            get(theme, 'space.0'),
            index !== links.length - 1 ? get(theme, 'space.4') : 0,
          ],
          marginBottom: (theme) => [
            get(theme, 'space.4'),
            get(theme, 'space.4'),
            get(theme, 'space.0'),
          ],
        }}
      >
        <FooterLanding.Link
          sx={{ fontSize: (theme) => get(theme, 'fontSizes.2') }}
          href={link.href}
        >
          {link.name}
        </FooterLanding.Link>
      </Text>
    ))}
  </FooterLanding>
)

export const Playground = Template.bind({})
