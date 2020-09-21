import React, { PropsWithChildren, useState, Fragment } from 'react'
import { Box, Flex } from 'theme-ui'

import IconExit from './IconExit'
import IconHamburger from './IconHamburger'

const HamburgerMenu = ({ children }: PropsWithChildren<{}>) => {
  const [open, setOpen] = useState(false)

  return (
    <Fragment>
      <Box
        role="presentation"
        sx={{
          display: ['flex', 'flex', , 'none'],
          height: '100%',
          paddingX: 6,
          paddingY: 5,
          justifyContent: 'end',
          alignItems: 'center',
          color: 'primary.base',
          borderLeft: 'solid',
          borderLeftWidth: '1px',
          borderLeftColor: 'muted.3',
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
      </Box>
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
            top: '0',
          }}
        >
          <Flex
            sx={{
              height: '100%',
              flexDirection: 'column',
              justifyContent: 'space-between',
              backgroundColor: 'muted.4',
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
        paddingY: 4,
        '> a': {
          textDecoration: 'none',
          transition: 'color 0.15s ease-in',
          color: 'secondary.base',
          marginY: 4,
          paddingX: 6, // AJUSTAR ISSO
        },
      }}
    >
      {children}
    </Flex>
  )
}

const ActionButton = ({ children }: PropsWithChildren<{}>) => {
  return (
    <Box
      sx={{
        zIndex: 2147483647,
        borderTop: 'solid',
        borderTopWidth: '1px',
        borderTopColor: 'muted.3',
      }}
    >
      {children}
    </Box>
  )
}

HamburgerMenu.Menu = Menu
HamburgerMenu.ActionButton = ActionButton

export default HamburgerMenu
