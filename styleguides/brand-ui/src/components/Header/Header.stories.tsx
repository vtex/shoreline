import React, { useState } from 'react'
import { Link, Box } from 'theme-ui'

import { Header, HamburgerMenu, LinksProps, LocaleSwitcher } from '.'
import { IconExternalLink } from '../../icons'
import { LocaleOption } from './LocaleSwitcher'

export default {
  title: 'beta/Header',
  component: Header,
}

const Template = (args: LinksProps) => {
  const [locale, setLocale] = useState('en')
  const options: LocaleOption[] = [
    {
      label: 'EN',
      value: 'en',
    },
    {
      label: 'PT | BR',
      value: 'pt-br',
    },
    {
      label: 'ES',
      value: 'es',
    },
    {
      label: 'ES | LATAM',
      value: 'es-latam',
    },
    {
      label: 'IT',
      value: 'it',
    },
  ]

  return (
    <Header>
      <Header.Brand title="Status" />
      <Header.LeftLinks>
        <Header.LeftLinks.Links {...args} />
        <Header.LeftLinks.Links to="/" title="History" />
      </Header.LeftLinks>
      <Header.RightLinks>
        <Link href="/">CONTACT</Link>
        <Link href="/">
          Help Center
          <Box sx={{ paddingLeft: 3 }}>
            <IconExternalLink size={14} />
          </Box>
        </Link>
      </Header.RightLinks>
      <Header.ActionButton>
        <HamburgerMenu>
          <HamburgerMenu.Menu>
            <HamburgerMenu.Menu.Links {...args} />
            <HamburgerMenu.Menu.Links to="/" title="History" />
            <HamburgerMenu.Menu.Links to="/" title="Help Center" />
            <HamburgerMenu.Menu.Links to="/" title="Elaia" />
            <LocaleSwitcher
              locale={locale}
              options={options}
              onChange={setLocale}
            />
          </HamburgerMenu.Menu>
        </HamburgerMenu>
        <LocaleSwitcher
          locale={locale}
          options={options}
          onChange={setLocale}
        />
      </Header.ActionButton>
    </Header>
  )
}

export const Playground = Template.bind({})
Playground.args = {
  title: 'Status',
  to: '/',
  active: true,
}

export const LandingPage = () => (
  <Header
    sx={{
      display: ['flex', 'flex', 'flex', 'flex'],
      paddingX: [4, 4, 6, 10],
    }}
  >
    <Header.Brand noMargin />
    <Box
      sx={{
        width: 'min-content',
      }}
    >
      Accelerate Commerce Transformation
    </Box>
  </Header>
)
