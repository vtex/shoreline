import React, { ReactNode } from 'react'
import { Box, ThemeProvider } from '@vtex/admin-ui'

import DocsNavigation from './DocsNavigation'
import DocsInnerNavigation from './DocsInnerNavigation'
import Footer from './Footer'
import Header from './Header'

/**
 * Full site adaptable layout
 */
export default function CoreLayout(props: Props) {
  const {
    data,
    location,
    children,
    pageContext: { sourceUrl = '', readmeUrl = '', tableOfContentsAst = {} },
  } = props

  const title = data?.markdownRemark?.title

  const isHome = location.pathname === '/'

  const withTitleSx = title
    ? {
        marginTop: [120, 120, 100],
        marginRight: [0, 0, 256, 'auto'],
        marginBottom: 72,
        marginLeft: [0, 0, 300, 'auto'],
        padding: 2,
      }
    : {}

  const homeSx = isHome
    ? {
        minWidth: 'full',
        maxWidth: 'full',
      }
    : {}

  return (
    <ThemeProvider>
      <Header />
      {title && (
        <Box
          position="fixed"
          bg="background"
          w={270}
          z="over"
          left="0"
          sx={{
            top: 100,
            height: 'calc(100vh - 60px)',
            paddingBottom: 100,
          }}
          overflow="auto"
          p="4"
          display={['none', 'none', 'initial']}
        >
          <DocsNavigation />
        </Box>
      )}
      <Box
        el="main"
        id="main"
        maxW={1200}
        sx={{
          code: {
            borderRadius: 3,
            padding: '0.2em 0.4em',
          },
          ...withTitleSx,
          ...homeSx,
        }}
      >
        {children}
      </Box>
      {title && props.pageContext.tableOfContentsAst && (
        <Box
          el="aside"
          position="fixed"
          sx={{
            top: 80,
            paddingY: '72px',
            height: 'calc(100vh - 60px)',
          }}
          right="0"
          w={210}
          bg="background"
          overflow="auto"
          display={['none', 'none', 'initial']}
          px="4"
        >
          <DocsInnerNavigation
            sourceUrl={sourceUrl}
            readmeUrl={readmeUrl}
            tableOfContentsAst={tableOfContentsAst}
            title={title}
          />
        </Box>
      )}
      {!isHome && (
        <Box sx={{ marginTop: 100 }}>
          <Footer />
        </Box>
      )}
    </ThemeProvider>
  )
}

interface Props {
  children: ReactNode
  location: {
    pathname: string
  }
  pageContext: {
    sourceUrl?: string
    readmeUrl?: string
    tableOfContentsAst?: object
  }
  data?: {
    markdownRemark?: {
      title?: string
      htmlAst?: object
      frontmatter?: {
        path?: string
        experimental?: boolean
      }
    }
  }
}
