import React, { PropsWithChildren } from 'react'
import { Box, Flex } from 'theme-ui'

import { IconVTEX } from '../../icons'
import Footer from '../Footer'

const FooterLanding = ({ children }: PropsWithChildren<{}>) => (
  <Box
    as="footer"
    sx={{
      width: '100%',
      bg: 'secondary.base',
      color: 'background',
      paddingX: 6,
    }}
  >
    <Flex
      sx={{
        maxWidth: '70rem',
        margin: '0 auto',
        paddingY: 7,
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
          alignItems: 'center',
          columnGap: 4,
          width: ['100%', '100%', 'auto'],
          marginTop: [6, 6, 0],
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          lineHeight: 'action',
        }}
      >
        {children}
      </Box>
    </Flex>
  </Box>
)

FooterLanding.Link = Footer.Link

export default FooterLanding
