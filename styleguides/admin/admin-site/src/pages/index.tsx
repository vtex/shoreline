/** @jsx jsx */
import { jsx, Box, Text, ThemeProvider } from '@vtex/admin-ui'
import { useRef, useLayoutEffect } from 'react'

import Seo from '../components/SEO'
import IndexIllustration from '../icons/IndexIllustration'

export default function IndexPage() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useLayoutEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  return (
    <ThemeProvider>
      <Seo title="AdminUI - VTEX admin component library" />
      <Box
        display="flex"
        justify="around"
        items="center"
        sx={{
          height: '100vh',
          position: 'relative',
          width: 'full',
          bg: 'black',
        }}
      >
        <Box
          sx={{
            backgroundImage: (theme) =>
              `radial-gradient(${theme.colors.text} 4px, transparent 4px)`,
            backgroundSize: 'calc(10 * 2px) calc(10 * 2px)',
            backgroundClip: 'text',
            maxWidth: 256,
            marginLeft: 60,
          }}
        >
          <Text
            fw={800}
            sx={{
              fontSize: 140,
              color: 'background',
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
