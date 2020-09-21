import React from 'react'
import { Link, Box } from 'theme-ui'

import { Header } from '.'
import HamburgerMenu from './HamburgerMenu'

export default {
  title: 'Work in progress/Header',
  component: Header,
}

const Template = () => (
  <Header>
    <Header.Brand />
    <Header.LeftLinks>
      <Link href="/?path=/story/work-in-progress-header--playground">
        Status
      </Link>
      <Link href="/?path=/story/work-in-progress-header--playground">
        History
      </Link>
    </Header.LeftLinks>
    <Header.RightLinks>
      <Link href="/?path=/story/work-in-progress-header--playground">
        CONTACT
      </Link>
      <Link href="/?path=/story/work-in-progress-header--playground">
        Help Center
      </Link>
    </Header.RightLinks>
    <Header.ActionButton>
      <HamburgerMenu>
        <HamburgerMenu.Menu>
          <Link href="/?path=/story/work-in-progress-header--playground">
            Status
          </Link>
          <Link href="/?path=/story/work-in-progress-header--playground">
            History
          </Link>
          <Link href="/?path=/story/work-in-progress-header--playground">
            Help Center
          </Link>
        </HamburgerMenu.Menu>
      </HamburgerMenu>
    </Header.ActionButton>
  </Header>
)

export const LandingPage = () => (
  <Header sx={{ display: 'flex' }}>
    <Header.Brand />
    <Box
      sx={{
        width: '6.25rem',
        marginX: [4, 4, 6, 10],
      }}
    >
      Accelerate Commerce Transformation
    </Box>
  </Header>
)

export const Playground = Template.bind({})
