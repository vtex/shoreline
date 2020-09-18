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
        backgroundColor: '#fff',
        borderBottom: '1 solid muted.4',
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
        width: '16rem',
        alignItems: 'center',
        color: 'primary.base',
      }}
    >
      <Flex
        sx={{
          height: '100%',
          justifyContent: 'space-around',
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
        display: ['none', 'none', 'flex'],
        width: '100%',
        borderTop: ['1px solid muted.4', 0, 0],
        marginTop: ['0.75rem', 0, 0],
        paddingTop: ['0.75rem', 0, 0],
        '> a': {
          textDecoration: 'none',
          transition: 'color 0.15s ease-in',
          marginLeft: '1.5rem',
          marginRight: '1.5rem',
          paddingLeft: '0.125rem',
          paddingRight: '0.125rem',
          paddingTop: '1.875rem',
          paddingBottom: '1.875rem',
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
        display: ['none', 'none', 'flex'],
        width: '100%',
        justifyContent: 'end',
        borderTop: ['1px solid muted.4', 0, 0],
        marginTop: ['0.75rem', 0, 0],
        paddingTop: ['0.75rem', 0, 0],
        textTransform: 'uppercase',
        '> a': {
          textDecoration: 'none',
          transition: 'color 0.15s ease-in',
          color: '#727273',
          marginLeft: '1rem',
          marginRight: '1rem',
          paddingLeft: '0.25rem',
          paddingRight: '0.25rem',
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
