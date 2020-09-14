import React from 'react'
import { Box, Text } from 'theme-ui'

import { footerGroups, links } from './mockLinks'
import { Footer } from './index'

export default {
  title: 'Work in progress/Footer',
  component: Footer,
}

const Template = () => (
  <Footer>
    <Footer.LinkGroups>
      {footerGroups.map((group) => (
        <Footer.Group key={group.title} title={group.title}>
          {group.links.map((groupLink) => (
            <Box
              key={groupLink.title}
              sx={{
                display: ['grid', 'grid', 'flex'],
                fontSize: 3,
                marginBottom: 3,
                maxWidth: '9rem',
                alignItems: 'center',
                width: ['100%', 'auto'],
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                lineHeight: 'action',
              }}
            >
              <Footer.Link href={groupLink.href}>{groupLink.title}</Footer.Link>
            </Box>
          ))}
        </Footer.Group>
      ))}
    </Footer.LinkGroups>
    <Footer.Extra>
      <Footer.SocialMedia />
      <Footer.ExtraLinks>
        {links.map((link, index) => (
          <Text
            key={link.title}
            sx={{
              marginRight: index !== links.length - 1 ? 6 : 0,
            }}
          >
            <Footer.Link key={link.title} href={link.href}>
              {link.title}
            </Footer.Link>
          </Text>
        ))}
      </Footer.ExtraLinks>
    </Footer.Extra>
  </Footer>
)

export const Playground = Template.bind({})
