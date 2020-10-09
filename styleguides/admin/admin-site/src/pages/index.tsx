/** @jsx jsx */
import { jsx, Box, Text, ThemeProvider } from '@vtex/admin-ui'
import { useRef, useLayoutEffect } from 'react'

import motion from '../images/motion.mp4'
import Seo from '../components/SEO'

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
        justify="start"
        items="center"
        sx={{
          height: '100vh',
          position: 'relative',
          // maxHeight: 800,
          // minHeight: 800,
          width: 'full',
        }}
      >
        <div
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            zIndex: -1,
            width: 'full',
            height: 'full',
            overflow: 'hidden',
          }}
        >
          <video
            title="VTEX brand motion"
            sx={{ height: 'full' }}
            ref={videoRef}
            muted
            src={motion}
          />
        </div>
        <Box
          sx={{
            backgroundImage: (theme) =>
              `radial-gradient(${theme.colors.muted[0]} 1px, transparent 1px)`,
            backgroundSize: 'calc(10 * 1px) calc(10 * 1px)',
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
      </Box>
    </ThemeProvider>
  )
}
