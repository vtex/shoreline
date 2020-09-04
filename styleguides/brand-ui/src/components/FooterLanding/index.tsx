import React, { PropsWithChildren } from 'react'
import { Box, Flex } from 'theme-ui'

import IconVTEX from './IconVTEX'
import Footer from '../Footer'

const FooterLanding = ({ children }: PropsWithChildren<{}>) => (
  <Box
    as="footer"
    sx={{
      width: '100%',
      bg: 'secondary.base',
      color: 'background',
      paddingLeft: '2rem',
      paddingRight: '1.5em',
    }}
  >
    <Flex
      sx={{
        maxWidth: '70rem',
        margin: '0 auto',
        paddingY: '4rem',
        flexDirection: ['column', 'column', 'row'],
        justifyContent: 'space-between',
        alignItems: ['start', 'start', 'center'],
      }}
    >
      <Flex
        sx={{ color: 'white', justifyContent: 'center', alignItems: 'center' }}
      >
        <IconVTEX width={80} height={42} />
      </Flex>
      <Box
        sx={{
          display: ['grid', 'grid', 'flex'],
          gridTemplateColumns: 'repeat(2, 1fr)',
          alignItems: 'end',
          columnGap: '1rem',
          width: ['100%', '100%', 'auto'],
          marginTop: ['2rem', '2rem', '0'],
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          lineHeight: '2rem',
        }}
      >
        {children}
      </Box>
    </Flex>
  </Box>
)

FooterLanding.Link = Footer.Link

export default FooterLanding
