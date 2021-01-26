import React, { ReactNode } from 'react'
import { Box, ThemeProvider, createSystem } from '@vtex/admin-ui'

import DocsNavigation from './DocsNavigation'
import DocsInnerNavigation from './DocsInnerNavigation'
import Header from './Header'
import {
  ScrollSpyProvider,
  CollectionProvider,
  ScrollHandler,
} from './ScrollSpy'

const system = createSystem('core-layout')

/**
 * Full site adaptable layout
 */
export default function CoreLayout(props: Props) {
  const {
    data,
    children,
    pageContext: { sourceUrl = '', readmeUrl = '', tableOfContentsAst = {} },
  } = props

  const title = data?.markdownRemark?.title

  const fullPage = data?.markdownRemark?.frontmatter?.fullPage

  return (
    <ThemeProvider system={system}>
      <CollectionProvider>
        <ScrollSpyProvider>
          <Box
            styles={{
              display: 'grid',
              height: '100vh',
              width: '100vw',
              gridTemplateColumns: fullPage ? '1fr 4fr' : '1fr 3fr 1fr',
              gridTemplateRows: '80px calc(100vh - 80px)',
              gridTemplateAreas: fullPage
                ? '"header header" "leftnav main"'
                : '"header header header" "leftnav main toc"',
              overflow: 'hidden',
            }}
          >
            <Header />
            <Box
              styles={{
                gridArea: 'leftnav',
                bg: 'light.secondary',
                zIndex: 'plain',
                overflow: 'auto',
                display: ['none', 'none', 'initial'],
              }}
            >
              <DocsNavigation />
            </Box>
            <ScrollHandler>
              {({ handleScroll, ref }) => (
                <Box
                  ref={ref}
                  onScroll={handleScroll}
                  element="main"
                  styles={{
                    color: 'dark.primary',
                    bg: 'light.primary',
                    gridArea: 'main',
                    overflowY: 'auto',
                    scrollBehavior: 'smooth',
                    code: {
                      borderRadius: 3,
                      padding: '0.2em 0.4em',
                    },
                    padding: '64px',
                  }}
                >
                  {children}
                </Box>
              )}
            </ScrollHandler>

            {!fullPage && title && props.pageContext.tableOfContentsAst && (
              <Box
                element="aside"
                styles={{
                  gridArea: 'toc',
                  overflow: 'auto',
                  paddingX: 4,
                  paddingY: '72px',
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
          </Box>
        </ScrollSpyProvider>
      </CollectionProvider>
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
    tableOfContentsAst?: Record<string, unknown>
  }
  data?: {
    markdownRemark?: {
      title?: string
      htmlAst?: Record<string, unknown>
      frontmatter?: {
        path?: string
        experimental?: boolean
        fullPage?: boolean
      }
    }
  }
}
