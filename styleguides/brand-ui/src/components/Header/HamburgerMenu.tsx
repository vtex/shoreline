import React, { PropsWithChildren, useState, Fragment } from 'react'
import { Box, Flex, SxStyleProp } from 'theme-ui'

import IconExit from './IconExit'
import IconHamburger from './IconHamburger'

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

const Menu = ({ children, sx }: PropsWithChildren<HamburgerMenuProps>) => {
  return (
    <Flex variant="hamburgerMenu.menu" sx={sx}>
      {children}
    </Flex>
  )
}

interface ActionButtonProps {
  sx?: SxStyleProp
}

const ActionButton = ({
  children,
  sx,
}: PropsWithChildren<ActionButtonProps>) => {
  return (
    <Box variant="hamburgerMenu.actionButton" sx={sx}>
      {children}
    </Box>
  )
}

HamburgerMenu.Menu = Menu
HamburgerMenu.ActionButton = ActionButton

export default HamburgerMenu
