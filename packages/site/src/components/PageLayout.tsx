import type { PropsWithChildren, ReactNode } from 'react'
import React from 'react'
import { Flex, tag } from '@vtex/admin-ui'

import { Sidebar } from './Sidebar'
import { TableOfContents } from './TableOfContents'
import Header from './Header'

function StickyBlock(props: PropsWithChildren<{ top?: string; pl?: number }>) {
  const { top = '0rem', pl = 0, children } = props

  return (
    <tag.div
      csx={{
        width: '20%',
        maxWidth: '16rem',
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
    pageContext: { tableOfContents = {} },
  } = props

  const title = data?.mdx?.frontmatter?.title
  const fullPage = data?.mdx?.frontmatter?.fullPage

  return (
    <tag.div
      csx={{
        margin: 'auto',
        maxWidth: '90rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Header />
      <StickyBlock>
        <Sidebar />
      </StickyBlock>
      <Flex
        direction="column"
        csx={{
          width: fullPage ? '100%' : '80%',
          flex: '1 1 0',
          maxWidth: fullPage ? 'unset' : '64rem',
          overflow: 'auto',
        }}
      >
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
      {!fullPage && title && tableOfContents && (
        <StickyBlock top="11.2rem" pl={48}>
          <TableOfContents items={tableOfContents.items} />
        </StickyBlock>
      )}
    </tag.div>
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
    tableOfContents?: Record<string, any>
  }
  data?: {
    mdx?: {
      body?: string
      excerpt?: Record<string, unknown>
      frontmatter?: {
        title?: string
        path?: string
        experimental?: boolean
        fullPage?: boolean
      }
    }
  }
}
