import React, { PropsWithChildren } from 'react'
import { Box, Flex, SxStyleProp } from 'theme-ui'

import IconVTEXExpanded from './IconVTEXExpanded'

interface HeaderProps {
  sx?: SxStyleProp
}

export const Header = ({ children, sx }: PropsWithChildren<HeaderProps>) => (
  <Box variant="header" sx={sx}>
    {children}
  </Box>
)

const Brand = () => (
  <Flex variant="header.brand">
    <IconVTEXExpanded width={85} height={30} />
  </Flex>
)

interface LeftLinksProps {
  sx?: SxStyleProp
}

const LeftLinks = ({ children, sx }: PropsWithChildren<LeftLinksProps>) => (
  <Box variant="header.leftLinks" sx={sx}>
    {children}
  </Box>
)

interface RightLinksProps {
  sx?: SxStyleProp
}

const RightLinks = ({ children, sx }: PropsWithChildren<RightLinksProps>) => (
  <Box variant="header.rightLinks" sx={sx}>
    {children}
  </Box>
)

interface ActionButtonProps {
  sx?: SxStyleProp
}

const ActionButton = ({
  children,
  sx,
}: PropsWithChildren<ActionButtonProps>) => (
  <Flex variant="header.actionButton" sx={sx}>
    {children}
  </Flex>
)

Header.LeftLinks = LeftLinks
Header.RightLinks = RightLinks
Header.Brand = Brand
Header.ActionButton = ActionButton
