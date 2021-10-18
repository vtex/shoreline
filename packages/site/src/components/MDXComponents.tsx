import React from 'react'
import { Paragraph, useSystem, tag, get } from '@vtex/admin-ui'

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

export const MDXComponents = {
  a: Anchor,
  LightColors,
  DarkColors,
  MidColors,
  ComplementaryColors,
  SemanticColor,
  p: (props: any) => (
    <Paragraph
      csx={{
        marginY: 2,
        textAlign: 'left',
        color: 'base',
        fontSize: '16px',
        lineHeight: '24px',
        code: {
          fontFamily:
            'VTEX Trust, -apple-system, system-ui, BlinkMacSystemFont, sans-serif !important',
          bg: 'muted',
          color: 'muted',
        },
      }}
      {...props}
    />
  ),
  ul: List,
  ol: (props: any) => <List el="ol" {...props} />,
  kbd: Kbd,
  blockquote: Blockquote,
  h1: (props: any) => <Heading {...props} />,
  h2: function Render(props: any) {
    return <Heading as="h2" {...props} />
  },
  h3: function Render(props: any) {
    return <Heading as="h3" {...props} />
  },
  h4: function Render(props: any) {
    return <Heading as="h4" {...props} />
  },
  h5: function Render(props: any) {
    return <Heading as="h5" {...props} />
  },
  h6: function Render(props: any) {
    return <Heading as="h6" {...props} />
  },
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
  table: function Render(props: any) {
    const { cn } = useSystem()

    return (
      <table
        className={cn({
          borderRadius: 3,
          borderCollapse: 'collapse',
          verticalAlign: 'middle',
          width: '100%',
          marginTop: '-1',
          marginBottom: 4,
        })}
        {...props}
      />
    )
  },
  tr: function Render(props: any) {
    const { cn } = useSystem()

    return <tr className={cn({ textAlign: 'left', height: 48 })} {...props} />
  },
  th: function Render(props: any) {
    const { cn } = useSystem()

    return (
      <th
        className={cn({
          paddingX: 3,
          borderBottomColor: 'base',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          verticalAlign: 'middle',
        })}
        {...props}
      />
    )
  },
  td: function Render(props: any) {
    const { cn } = useSystem()

    return (
      <td
        className={cn({
          paddingX: 3,
          borderBottomColor: 'base',
          borderBottomWidth: 1,
          borderBottomStyle: 'solid',
          verticalAlign: 'middle',
          code: {
            color: 'highlight',
            bg: 'transparent',
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
