import React, { PropsWithChildren, useState, Fragment } from 'react'
import { Box, Flex, SxStyleProp, Link } from 'theme-ui'

import { IconExit, IconHamburger } from '../../icons'

interface HamburgerProps {
  sx?: SxStyleProp
}

const HamburgerMenu = ({ children, sx }: PropsWithChildren<HamburgerProps>) => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Box
        role="presentation"
        variant="hamburgerMenu"
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <Box sx={{ color: 'secondary.base' }}>
            <IconExit />
          </Box>
        ) : (
          <IconHamburger />
        )}
      </Box>
      {open && (
        <Flex variant="hamburgerMenu.open" sx={sx}>
          {children}
        </Flex>
      )}
    </Fragment>
  )
}

interface HamburgerMenuProps {
  sx?: SxStyleProp
}

const Menu = ({ children, sx }: PropsWithChildren<HamburgerMenuProps>) => (
  <Box variant="hamburgerMenu.menu" sx={sx}>
    {children}
  </Box>
)

interface LinksProps {
  sx?: SxStyleProp
  to: string
  active?: boolean
}

const Links = ({
  children,
  to,
  sx,
  active = false,
}: PropsWithChildren<LinksProps>) => {
  const variant = `hamburgerMenu.${active ? 'activeLink' : 'links'}`

  return (
    <Link href={to} variant={variant} sx={sx}>
      {children}
    </Link>
  )
}

interface ActionButtonProps {
  sx?: SxStyleProp
}

const ActionButton = ({
  children,
  sx,
}: PropsWithChildren<ActionButtonProps>) => (
  <Box variant="hamburgerMenu.actionButton" sx={sx}>
    {children}
  </Box>
)

HamburgerMenu.Menu = Menu
Menu.Links = Links
HamburgerMenu.ActionButton = ActionButton

export default HamburgerMenu
