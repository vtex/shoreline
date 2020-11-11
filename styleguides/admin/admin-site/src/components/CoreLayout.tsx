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
        marginBottom: 72,
        marginRight: [2, 2, 8, 256, 'auto'],
        marginLeft: [2, 2, 256, 280, 'auto'],
      }
    : {}

  const homeSx = isHome
    ? {
        minWidth: 'full',
        maxWidth: 'full',
        marginTop: 0,
        marginBottom: 0,
      }
    : {}

  return (
    <ThemeProvider>
      <Header isHome={isHome} />

      {title && (
        <Box
          styles={{
            position: 'fixed',
            bg: 'muted.4',
            width: 256,
            zIndex: 'plain',
            left: 0,
            top: 60,
            height: 'calc(100vh - 60px)',
            paddingBottom: 100,
            overflow: 'auto',
            padding: 4,
            display: ['none', 'none', 'initial'],
          }}
        >
          <DocsNavigation />
        </Box>
      )}
      <Box
        element="main"
        palette="base"
        styles={{
          code: {
            borderRadius: 3,
            padding: '0.2em 0.4em',
          },
          maxWidth: ['full', 640, 640, 640, 820],
          paddingX: [8, 8, 8, 8, 8],
          ...withTitleSx,
          ...homeSx,
        }}
      >
        {children}
      </Box>
      {title && props.pageContext.tableOfContentsAst && (
        <Box
          element="aside"
          styles={{
            position: 'fixed',
            right: 0,
            width: 256,
            bg: 'background',
            overflow: 'auto',
            paddingX: 4,
            top: 80,
            paddingY: '72px',
            height: 'calc(100vh - 60px)',
            display: ['none', 'none', 'none', 'initial'],
          }}
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
        <Box styles={{ marginTop: 100 }}>
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
