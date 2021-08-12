import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'
import { Flex, tag, useSearchState } from '@vtex/admin-ui'

import { Sidebar } from './Sidebar'
import { TableOfContents } from './TableOfContents'
import Header from './Header'
import { SearchProvider } from './Search'

function StickyBlock(props: PropsWithChildren<{ top?: number; pl?: number }>) {
  const { top = 0, pl = 0, children } = props

  return (
    <tag.div
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
      <tag.div
        csx={{
          top,
          paddingLeft: pl,
          position: 'sticky',
          marginRight: 0,
          height: 'auto',
          display: 'block',
          overflowY: 'auto',
        }}
      >
        {children}
      </tag.div>
    </tag.div>
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
      <tag.div
        csx={{
          margin: 'auto',
          maxWidth: '90rem',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StickyBlock>
          <Sidebar />
        </StickyBlock>
        <Flex
          direction="column"
          csx={{
            width: '80%',
            flex: '1 1 0',
            maxWidth: '64rem',
            overflow: 'auto',
          }}
        >
          <Header />
          <tag.div
            csx={{
              padding: 4,
              marginTop: 64,
              width: '100%',
            }}
          >
            {children}
          </tag.div>
        </Flex>
        {title && props.pageContext.tableOfContentsAst && (
          <StickyBlock top={80} pl={48}>
            <TableOfContents
              sourceUrl={sourceUrl}
              readmeUrl={readmeUrl}
              tableOfContentsAst={tableOfContentsAst}
              title={title}
            />
          </StickyBlock>
        )}
      </tag.div>
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
