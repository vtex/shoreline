import React from 'react'
import { Text } from 'theme-ui'

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
          marginRight: [0, 0, index !== links.length - 1 ? 4 : 0],
          marginBottom: [4, 4, 0],
        }}
      >
        <FooterLanding.Link sx={{ fontSize: 2 }} href={link.href}>
          {link.name}
        </FooterLanding.Link>
      </Text>
    ))}
  </FooterLanding>
)

export const Playground = Template.bind({})
