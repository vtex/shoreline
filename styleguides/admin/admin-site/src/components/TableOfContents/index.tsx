import React from 'react'
import { tag } from '@vtex/admin-ui'
import { unstable_useId as useId } from 'reakit'

import { CollectionProvider, renderAst, ScrollSpyProvider } from './renderAst'

export function TableOfContents(props: TableOfContentsProps) {
  const { tableOfContentsAst } = props
  const { id } = useId()

  return (
    <CollectionProvider>
      <ScrollSpyProvider>
        <tag.aside
          csx={{
            display: ['none', 'none', 'none', 'initial'],
            nav: {
              listStyle: 'none',
              margin: 0,
              border: 'none',
              li: {
                display: 'flex',
                flexDirection: 'column',
                
                paddingLeft: 2,
                lineHeight: 1.5,
                
              },
              ul: {
                listStyle: 'none',
                borderLeft: '1px solid #2121',
                ':first-child': {
                  borderLeft: 'none',
                }
              },
            },
          }}
        >
          <tag.p
            csx={{
              text: 'body',
            }}
            id={id}
          >
            On this page
          </tag.p>
          <tag.nav aria-labelledby={id}>
            {renderAst(tableOfContentsAst)}
          </tag.nav>
        </tag.aside>
      </ScrollSpyProvider>
    </CollectionProvider>
  )
}

interface TableOfContentsProps {
  readmeUrl: string
  sourceUrl: string
  title: string
  tableOfContentsAst: Record<string, unknown>
}
