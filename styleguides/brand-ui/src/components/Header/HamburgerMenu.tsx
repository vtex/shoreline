/** @jsxRuntime classic */
/** @jsx jsx */
import { Box, Link, SxProps, jsx } from 'theme-ui'
import { Disclosure, DisclosureContent, useDisclosureState } from 'reakit'
import { PropsWithChildren, Fragment } from 'react'

import { IconExit, IconHamburger } from '../../icons'
import { LinksProps } from '.'

export const HamburgerMenu = ({ children, sx }: PropsWithChildren<SxProps>) => {
  const disclosure = useDisclosureState({ visible: false })

  return (
    <Fragment>
      <Disclosure
        {...disclosure}
        role="presentation"
        sx={{ variant: 'hamburgerMenu' }}
      >
        {disclosure.visible ? (
          <Box sx={{ color: 'secondary.base' }}>
            <IconExit size={24} />
          </Box>
        ) : (
          <IconHamburger size={24} />
        )}
      </Disclosure>
      <DisclosureContent
        {...disclosure}
        sx={{ ...sx, variant: 'hamburgerMenu.open' }}
      >
        {children}
      </DisclosureContent>
    </Fragment>
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
