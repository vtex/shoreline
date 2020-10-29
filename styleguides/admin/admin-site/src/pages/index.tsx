/** @jsx jsx */
import {
  jsx,
  Box,
  Text,
  unstableThemeProvider as ThemeProvider,
  theme,
} from '@vtex/admin-ui'

import Seo from '../components/SEO'
import IndexIllustration from '../icons/IndexIllustration'

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme as any}>
      <Seo title="AdminUI - VTEX admin component library" />
      <Box
        display="flex"
        justify="around"
        items="center"
        sx={{
          height: '100vh',
          position: 'relative',
          width: 'full',
          bg: 'background',
        }}
      >
        <Box
          sx={{
            backgroundImage: (th) =>
              `radial-gradient(${th.colors.muted[4]} 4px, transparent 4px)`,
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
