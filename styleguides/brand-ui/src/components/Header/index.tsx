import React, { PropsWithChildren } from 'react'
import { Box, Flex, Link, Text, SxProps } from 'theme-ui'

import IconVTEXStatus from '../../icons/VTEXStatus'

export { HamburgerMenu } from './HamburgerMenu'
export { LocaleSwitcher } from './LocaleSwitcher'

interface BrandProps {
  noMargin?: boolean
}

export interface LinksProps extends SxProps {
  title: string
  to: string
  active?: boolean
}

export const Header = ({ children, sx }: PropsWithChildren<SxProps>) => (
  <Box variant="header" sx={sx}>
    {children}
  </Box>
)

const Brand = ({ noMargin = false }: BrandProps) => {
  const sx = noMargin ? { marginX: '0' } : {}

  return (
    <Flex variant="header.brand" sx={sx}>
      <IconVTEXStatus />
    </Flex>
  )
}

const LeftLinks = ({ children, sx }: PropsWithChildren<SxProps>) => {
  return (
    <Box variant="header.leftLinks" sx={sx}>
      {children}
    </Box>
  )
}

const Links = ({ title, to, sx, active = false }: LinksProps) => {
  const variant = `header.leftLinks.links.${active ? 'active' : 'noActive'}`

  return (
    <Link href={to} variant={variant} sx={sx}>
      {title}
    </Link>
  )
}

const RightLinks = ({ children, sx }: PropsWithChildren<SxProps>) => (
  <Box variant="header.rightLinks" sx={sx}>
    {children}
  </Box>
)

const ActionButton = ({ children, sx }: PropsWithChildren<SxProps>) => (
  <Flex variant="header.actionButton" sx={sx}>
    {children}
  </Flex>
)

Header.LeftLinks = LeftLinks
LeftLinks.Links = Links
Header.RightLinks = RightLinks
Header.Brand = Brand
Header.ActionButton = ActionButton
