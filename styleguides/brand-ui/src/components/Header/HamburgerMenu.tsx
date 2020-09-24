import React, { PropsWithChildren, useState } from 'react'
import { Box, Flex, Link, SxProps } from 'theme-ui'

import { IconExit, IconHamburger } from '../../icons'
import { LinksProps } from '.'

const HamburgerMenu = ({ children, sx }: PropsWithChildren<SxProps>) => {
  const [open, setOpen] = useState(false)

  return (
    <Box
      role="presentation"
      variant="hamburgerMenu"
      onClick={() => setOpen(!open)}
    >
      {open ? (
        <>
          <Box sx={{ color: 'secondary.base' }}>
            <IconExit />
          </Box>
          <Flex variant="hamburgerMenu.open" sx={sx}>
            {children}
          </Flex>
        </>
      ) : (
        <IconHamburger />
      )}
    </Box>
  )
}

const Menu = ({ children, sx }: PropsWithChildren<SxProps>) => (
  <Box variant="hamburgerMenu.menu" sx={sx}>
    {children}
  </Box>
)

const Links = ({
  title,
  to,
  sx,
  active = false,
}: PropsWithChildren<LinksProps>) => {
  const variant = `hamburgerMenu.${active ? 'activeLink' : 'links'}`

  return (
    <Link href={to} variant={variant} sx={sx}>
      {title}
    </Link>
  )
}

const ActionButton = ({ children, sx }: PropsWithChildren<SxProps>) => (
  <Box variant="hamburgerMenu.actionButton" sx={sx}>
    {children}
  </Box>
)

HamburgerMenu.Menu = Menu
Menu.Links = Links
HamburgerMenu.ActionButton = ActionButton

export default HamburgerMenu
