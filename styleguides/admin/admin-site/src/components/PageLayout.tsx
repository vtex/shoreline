import React, { PropsWithChildren, ReactNode } from 'react'
import { Box, Flex } from '@vtex/admin-ui'

import { Sidebar } from './Sidebar'
import { TableOfContents } from './TableOfContents'
import Header from './Header'
import { SearchProvider, useSearchState } from './Search'

const styles = {
  container: {
    display: 'block',
    margin: 'auto',
    maxWidth: '90rem',
  },
}

function StickyBlock(props: PropsWithChildren<{}>) {
  return (
    <Box
      csx={{
        width: '20%',
        maxWidth: '18rem',
        position: 'static',
        paddingTop: 0,
        overflowY: 'visible',
        height: 'auto',
        display: 'block',
        zIndex: 40,
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        flex: 'none',
      }}
    >
      <Box
        csx={{
          top: '4.5rem',
          position: 'sticky',
          marginRight: 0,
          height: 'auto',
          display: 'block',
          overflowY: 'auto',
          overflow: 'hidden',
        }}
      >
        {props.children}
      </Box>
    </Box>
  )
}

/**
 * Full site adaptable layout
 */
export function PageLayout(props: Props) {
  const {
    data,
    children,
    pageContext: { sourceUrl = '', readmeUrl = '', tableOfContentsAst = {} },
  } = props

  const title = data?.markdownRemark?.title
  const search = useSearchState()

  return (
    <SearchProvider value={search}>
      <Box csx={styles.container}>
        <Header />
        <Flex justify="center" csx={{ width: '100%', marginTop: 'content' }}>
          <StickyBlock>
            <Sidebar />
          </StickyBlock>
          <Flex
            direction="column"
            csx={{
              width: '80%',
              flex: 1,
              padding: 4,
              maxWidth: '64rem',
            }}
          >
            {children}
          </Flex>
          {title && props.pageContext.tableOfContentsAst && (
            <StickyBlock>
              <TableOfContents
                sourceUrl={sourceUrl}
                readmeUrl={readmeUrl}
                tableOfContentsAst={tableOfContentsAst}
                title={title}
              />
            </StickyBlock>
          )}
        </Flex>
      </Box>
    </SearchProvider>
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
