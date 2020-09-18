import React, { PropsWithChildren, useState, Fragment } from 'react'
import { Box, Flex } from 'theme-ui'

import IconExit from './IconExit'
import IconHamburger from './IconHamburger'

const HamburgerMenu = ({ children }: PropsWithChildren<{}>) => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Flex
        role="presentation"
        sx={{
          height: '100%',
          paddingLeft: '2rem',
          paddingRight: '2rem',
          paddingTop: '1.5rem',
          paddingBottom: '1.5rem',
          justifyContent: 'end',
          alignItems: 'center',
          color: 'primary.base',
        }}
        onClick={() => setOpen(!open)}
      >
        {open ? (
          <Box sx={{ color: 'secondary.base' }}>
            <IconExit />
          </Box>
        ) : (
          <IconHamburger />
        )}
      </Flex>
      {open && (
        <Box
          sx={{
            position: 'absolute',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'muted.5',
            marginTop: '5.1rem',
            left: '0',
            bottom: '0',
          }}
        >
          <Flex
            sx={{
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: '#f7f9fa',
              paddingBottom: '5.1rem',
            }}
          >
            {children}
          </Flex>
        </Box>
      )}
    </Fragment>
  )
}

const Menu = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Flex
      sx={{
        flexDirection: 'column',
        paddingTop: '1rem',
        paddingBottom: '1rem',
        '> a': {
          textDecoration: 'none',
          transition: 'color 0.15s ease-in',
          color: 'secondary.base',
          marginTop: '1rem',
          marginBottom: '1rem',
          paddingLeft: '2rem',
          paddingRight: '2rem', // AJUSTAR ISSO
        },
      }}
    >
      {children}
    </Flex>
  )
}

const ActionButton = ({ children }: PropsWithChildren<{}>) => {
  return <Box sx={{ zIndex: 2147483647 }}>{children}</Box>
}

HamburgerMenu.Menu = Menu
HamburgerMenu.ActionButton = ActionButton

export default HamburgerMenu
