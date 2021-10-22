import React from 'react'
import { Paragraph, useSystem, tag, Grid, palette } from '@vtex/admin-ui'
import * as AdminUI from '@vtex/admin-ui'

import Anchor from './Anchor'
import List from './List'
import { Kbd } from './Kbd'
import { Blockquote } from './Blockquote'
import Heading from './Heading'
import { ColorCard } from './ColorCard'
import { tokens, TokensTable } from './TokensTable'
import { componentsStatus, StatusTable } from './StatusTable'
import { SemanticTable } from './SemanticTable'
import { Code } from './Code'
import { TypefaceShowcase } from './TypefaceShowcase'

export const MDXComponents = {
  ...AdminUI,
  Grid: (props: any) => <Grid {...props} csx={{ marginY: 4, ...props?.csx }} />,
  a: Anchor,
  ColorCard,
  TypefaceShowcase,
  p: (props: any) => (
    <Paragraph
      csx={{
        marginTop: '.8rem',
        marginBottom: '1rem',
        textAlign: 'left',
        color: 'base',
        fontSize: '1rem',
        lineHeight: '24px',
        code: {
          fontFamily:
            'VTEX Trust, -apple-system, system-ui, BlinkMacSystemFont, sans-serif !important',
          color: 'highlight',
          bg: 'transparent',
        },
      }}
      {...props}
    />
  ),
  ul: List,
  ol: (props: any) => <List el="ol" {...props} />,
  kbd: Kbd,
  blockquote: Blockquote,
  h1: Heading,
  h2: (props: any) => <Heading as="h2" {...props} />,
  h3: (props: any) => <Heading as="h3" {...props} />,
  h4: (props: any) => <Heading as="h4" {...props} />,
  h5: (props: any) => <Heading as="h5" {...props} />,
  h6: (props: any) => <Heading as="h6" {...props} />,
  pre: (props: any) => {
    if (!props?.children) {
      return null
    }

    const codeElement = props.children.props
    const { className = '', children, ...restProps } = codeElement

    return (
      <Code
        codeString={children?.trim()}
        className={className}
        language={className.replace(/language-/, '')}
        {...restProps}
      />
    )
  },
  table: (props: any) => (
    <tag.table
      csx={{
        borderRadius: 3,
        borderCollapse: 'collapse',
        verticalAlign: 'middle',
        width: '100%',
        marginTop: '-1',
        marginBottom: 4,
      }}
      {...props}
    />
  ),
  tr: (props: any) => (
    <tag.tr csx={{ textAlign: 'left', height: 48 }} {...props} />
  ),
  th: (props: any) => (
    <tag.th
      csx={{
        paddingX: 3,
        borderBottomColor: 'base',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        verticalAlign: 'middle',
      }}
      {...props}
    />
  ),
  td: (props: any) => {
    const { cn } = useSystem()

    return (
      <td
        className={cn({
          paddingX: 3,
          borderBottomColor: 'base',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          verticalAlign: 'middle',
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          code: {
            color: 'highlight',
            bg: 'transparent',
            padding: 2,
            borderRadius: 4,
            ...palette('purple'),
            lineHeight: 1.8,
            fontSize: 1,
          },
        })}
        {...props}
      />
    )
  },
  TokensTable: () => <TokensTable items={tokens} />,
  StatusTable: () => <StatusTable items={componentsStatus} />,
  SemanticTable,
  img: (props: any) => (
    <tag.img
      csx={{
        width: '100%',
        borderRadius: 4,
      }}
      {...props}
    />
  ),
}
