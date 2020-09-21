import React, { PropsWithChildren } from 'react'
import { Box, Flex, SxStyleProp } from 'theme-ui'

import IconVTEXExpanded from './IconVTEXExpanded'

interface HeaderProps {
  sx?: SxStyleProp
}

export const Header = ({ children, sx }: PropsWithChildren<HeaderProps>) => {
  return (
    <Box
      sx={{
        width: '100vw',
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: 'primary.contrast',
        borderBottom: 'solid',
        borderBottomWidth: '1px',
        borderBottomColor: 'muted.3',
        height: '5.1rem',
      }}
    >
      <Box
        sx={{
          display: ['flex', 'flex', 'flex', 'grid'],
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gridTemplateColumns: '0.75fr 4.5fr 2fr 2fr 0.75fr',
          gridTemplateAreas: '"brand leftlinks search rightlinks actionbutton"',
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

const Brand = () => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        color: 'primary.base',
        padding: '0.75rem',
        gridArea: 'brand',
      }}
    >
      <IconVTEXExpanded width={85} height={30} />
    </Flex>
  )
}

const LeftLinks = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      sx={{
        display: ['none', 'none', 'none', 'flex'],
        gridArea: 'leftlinks',
        width: '100%',
        marginTop: ['0.75rem', 0, 0],
        paddingTop: ['0.75rem', 0, 0],
        '> a': {
          minWidth: 'max-content',
          textDecoration: 'none',
          transition: 'color 0.15s ease-in',
          marginX: 5,
          paddingX: 1,
          paddingY: '1.875rem',
          color: 'secondary.base',
          '&:hover': {
            color: 'primary.base',
          },
        },
      }}
    >
      {children}
    </Box>
  )
}

const RightLinks = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      sx={{
        display: ['none', 'none', 'none', 'flex'],
        gridArea: 'rightlinks',
        width: '100%',
        justifyContent: 'flex-end',
        marginTop: ['0.75rem', 0, 0],
        paddingTop: ['0.75rem', 0, 0],
        textTransform: 'uppercase',
        '> a': {
          minWidth: 'max-content',
          textDecoration: 'none',
          transition: 'color 0.15s ease-in',
          color: 'muted.0',
          marginX: 4,
          paddingX: 1,
          fontSize: '0.875rem',
          fontWeight: 'medium',
        },
      }}
    >
      {children}
    </Box>
  )
}

const ActionButton = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex
      sx={{
        gridArea: 'actionbutton',
        height: '100%',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {children}
    </Flex>
  )
}

Header.LeftLinks = LeftLinks
Header.RightLinks = RightLinks
Header.Brand = Brand
Header.ActionButton = ActionButton
