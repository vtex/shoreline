/** @jsx jsx */
import { jsx, Box, Text, ThemeProvider } from '@vtex/admin-ui'

import Seo from '../components/SEO'

export default function IndexPage() {
  return (
    <ThemeProvider>
      <Seo title="AdminUI - VTEX admin component library" />
      <Box
        display="flex"
        justify="start"
        items="center"
        w="full"
        minH={560}
        maxH={800}
        sx={{
          bg: '#1E1F20',
          height: 'calc(100vh - 60px)',
        }}
      >
        <Box
          sx={{
            backgroundImage: (theme) =>
              `radial-gradient(${theme.colors.text} 1px, transparent 1px)`,
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
