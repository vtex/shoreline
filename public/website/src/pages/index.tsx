/** @jsx jsx */
import { jsx, Box, Text, ThemeProvider } from '@vtex/admin-ui'

import Seo from '../components/SEO'

export default function IndexPage() {
  return (
    <ThemeProvider>
      <Seo title="Reakit – Toolkit for building accessible UIs" />
      <Box
        display="flex"
        justify="center"
        items="center"
        w="full"
        minH={560}
        maxH={800}
        bg="primary.base"
        sx={{
          height: ['auto', 'auto', 'calc(100vh - 80px)'],
        }}
      >
        <Text
          c="background"
          sx={{
            fontSize: 64,
          }}
        >
          Admin UI
        </Text>
      </Box>
    </ThemeProvider>
  )
}
