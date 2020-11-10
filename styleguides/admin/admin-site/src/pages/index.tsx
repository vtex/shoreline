import React from 'react'
import { Box, Text, ThemeProvider, get } from '@vtex/admin-ui'

import Seo from '../components/SEO'
import IndexIllustration from '../icons/IndexIllustration'

export default function IndexPage() {
  return (
    <ThemeProvider>
      <Seo title="AdminUI - VTEX admin component library" />
      <Box
        styles={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '100vh',
          position: 'relative',
          width: 'full',
          bg: 'background',
        }}
      >
        <Box
          styles={{
            backgroundImage: (theme) =>
              `radial-gradient(${get(
                theme,
                'colors.muted.4'
              )} 4px, transparent 4px)`,
            backgroundSize: 'calc(10 * 2px) calc(10 * 2px)',
            backgroundClip: 'text',
            maxWidth: 256,
            marginLeft: 60,
          }}
        >
          <Text
            styleOverrides={{
              fontSize: 140,
            }}
          >
            VTEX ADMIN UI
          </Text>
        </Box>
        <IndexIllustration />
      </Box>
    </ThemeProvider>
  )
}
