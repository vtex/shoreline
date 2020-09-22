import React, { PropsWithChildren } from 'react'
import { Box, Flex, SxStyleProp, Link, Text } from 'theme-ui'

import { IconVTEXExpanded } from '../../icons'

interface HeaderProps {
  sx?: SxStyleProp
}

interface LeftLinksProps {
  sx?: SxStyleProp
}

interface BrandProps {
  noMargin?: boolean
  title?: string
}

interface LinksProps {
  sx?: SxStyleProp
  to: string
  active?: boolean
}

interface RightLinksProps {
  sx?: SxStyleProp
}

interface ActionButtonProps {
  sx?: SxStyleProp
}

export const Header = ({ children, sx }: PropsWithChildren<HeaderProps>) => (
  <Box variant="header" sx={sx}>
    {children}
  </Box>
)

const Brand = ({ noMargin = false, title }: BrandProps) => {
  const sx = noMargin ? { marginX: '0' } : {}

  return (
    <Flex variant="header.brand" sx={sx}>
      <IconVTEXExpanded width={85} height={30} />
      <Text>{title}</Text>
    </Flex>
  )
}

const LeftLinks = ({ children, sx }: PropsWithChildren<LeftLinksProps>) => {
  return (
    <Box variant="header.leftLinks" sx={sx}>
      {children}
    </Box>
  )
}

const Links = ({
  children,
  to,
  sx,
  active = false,
}: PropsWithChildren<LinksProps>) => {
  const variant = `header.leftLinks.links.${active ? 'active' : 'noActive'}`

  return (
    <Link href={to} variant={variant} sx={sx}>
      {children}
    </Link>
  )
}

const RightLinks = ({ children, sx }: PropsWithChildren<RightLinksProps>) => (
  <Box variant="header.rightLinks" sx={sx}>
    {children}
  </Box>
)

const ActionButton = ({
  children,
  sx,
}: PropsWithChildren<ActionButtonProps>) => (
  <Flex variant="header.actionButton" sx={sx}>
    {children}
  </Flex>
)

Header.LeftLinks = LeftLinks
LeftLinks.Links = Links
Header.RightLinks = RightLinks
Header.Brand = Brand
Header.ActionButton = ActionButton
