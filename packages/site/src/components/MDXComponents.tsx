import type { ReactNode } from 'react'
import React from 'react'
import { Paragraph, useSystem, tag, palette, get } from '@vtex/admin-ui'

import Anchor from './Anchor'
import List from './List'
import { Kbd } from './Kbd'
import { Blockquote } from './Blockquote'
import Heading from './Heading'
import {
  MidColors,
  DarkColors,
  LightColors,
  ComplementaryColors,
  SemanticColor,
} from './ColorBlock'
import { TokensTable, tokens } from './TokensTable'
import { Code } from './Code'

export const MDXComponents: Record<string, (props: any) => ReactNode> = {
  a: Anchor,
  LightColors,
  DarkColors,
  MidColors,
  ComplementaryColors,
  SemanticColor,
  p: (props) => (
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
  ol: (props) => <List el="ol" {...props} />,
  kbd: Kbd,
  blockquote: Blockquote,
  h1: Heading,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  h4: (props) => <Heading as="h4" {...props} />,
  h5: (props) => <Heading as="h5" {...props} />,
  h6: (props) => <Heading as="h6" {...props} />,
  pre: (props) => {
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
  table: (props) => (
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
  tr: (props) => <tag.tr csx={{ textAlign: 'left', height: 48 }} {...props} />,
  th: (props) => (
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
  td: (props) => {
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
  Tone: function Render(props: {
    bg: 'main' | 'critical' | 'warning' | 'positive' | 'neutral'
    desc: string
  }) {
    const { bg = 'main', desc = 'main' } = props

    const tone = {
      main: 'blue40',
      critical: 'red40',
      warning: 'orange40',
      positive: 'green40',
      neutral: 'grey50',
      info: 'lightBlue40',
    }[bg]

    return (
      <tag.div
        csx={{
          display: 'inline-block',
          borderRadius: 'pill',
          color: (theme) => get(theme, `colors.${tone}`),
          fontSettings: 'medium',
        }}
      >
        {desc}
      </tag.div>
    )
  },
  TokensTable: function Render(props: { type: keyof typeof tokens }) {
    return <TokensTable items={tokens[props.type]} type={props.type} />
  },
}
