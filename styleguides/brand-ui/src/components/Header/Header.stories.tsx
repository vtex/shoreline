import React from 'react'
import { Link, Input } from 'theme-ui'

import Header from '.'
import HamburgerMenu from './HamburgerMenu'

export default {
  title: 'Work in progress/Header',
  component: Header,
}

const Template = () => (
  <Header>
    <Header.Brand />
    <Header.LeftLinks>
      <Link href="/">Status</Link>
      <Link href="/">History</Link>
    </Header.LeftLinks>
    <Header.RightLinks>
      <Link href="/">CONTACT</Link>
      <Link href="/">Help Center</Link>
    </Header.RightLinks>
    <Header.ActionButton>
      <HamburgerMenu>
        <HamburgerMenu.Menu>
          <Link href="/">Status</Link>
          <Link href="/">History</Link>
          <Link href="/">Help Center</Link>
        </HamburgerMenu.Menu>
      </HamburgerMenu>
    </Header.ActionButton>
  </Header>
)

export const Playground = Template.bind({})
