import React from 'react'
import {
  Text,
  tag,
} from '@vtex/admin-ui'

import { renderAst } from './renderAst'

export function TableOfContents(props: TableOfContentsProps) {
  const { tableOfContentsAst } = props

  return (
    <tag.aside
      csx={{
        paddingLeft: 7,
        display: ['none', 'none', 'none', 'initial'],
        nav: {
          listStyle: 'none',
          margin: 0,
          paddingLeft: 4,
          li: {
            display: 'flex',
            flexDirection: 'column',
          },
          ul: {
            paddingY: 1,
            listStyle: 'none',
            paddingLeft: 3,
          },
        },
      }}
    >
      <Text>On this page</Text>
      <tag.nav>

          {renderAst(tableOfContentsAst)}

      </tag.nav>
    </tag.aside>
  )
}

interface TableOfContentsProps {
  readmeUrl: string
  sourceUrl: string
  title: string
  tableOfContentsAst: Record<string, unknown>
}
