import React, { PropsWithChildren } from 'react'
import { Box, Flex } from 'theme-ui'

import IconVTEXExpanded from './IconVTEXExpanded'

const Header = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        top: '0',
        left: '0',
        backgroundColor: 'primary.contrast',
        borderBottom: '1px solid #e3e4e6',
        height: '5.1rem',
      }}
    >
      <Flex
        sx={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {children}
      </Flex>
    </Box>
  )
}

const Brand = () => {
  return (
    <Flex
      sx={{
        alignItems: 'center',
        color: 'primary.base',
        cursor: 'pointer',
      }}
    >
      <Flex
        sx={{
          width: ['8rem', '16rem'],
          height: '100%',
          padding: '0.75rem',
        }}
      >
        <IconVTEXExpanded />
      </Flex>
    </Flex>
  )
}

const LeftLinks = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      sx={{
        display: ['none', 'none', 'none', 'flex'],
        width: '100%',
        borderTop: ['1px solid #e3e4e6', 0, 0],
        marginTop: ['0.75rem', 0, 0],
        paddingTop: ['0.75rem', 0, 0],
        '> a': {
          textDecoration: 'none',
          transition: 'color 0.15s ease-in',
          marginX: '1.5rem',
          paddingX: '0.125rem',
          paddingY: '1.875rem',
          color: '#3f3f40',
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
        width: '100%',
        justifyContent: 'flex-end',
        borderTop: ['1px solid #e3e4e6', 0, 0],
        marginTop: ['0.75rem', 0, 0],
        paddingTop: ['0.75rem', 0, 0],
        textTransform: 'uppercase',
        '> a': {
          textDecoration: 'none',
          transition: 'color 0.15s ease-in',
          color: '#727273',
          marginX: 4,
          paddingX: '0.25rem',
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

export default Header
