import React, { createElement } from 'react'
import RehypeReact from 'rehype-react'
import { Paragraph, Text, useSystem, tag, get } from '@vtex/admin-ui'

import Anchor from '../components/Anchor'
import List from '../components/List'
import Kbd from '../components/Kbd'
import Blockquote from '../components/Blockquote'
import Heading from '../components/Heading'
import Summary from '../components/Summary'
import { Proptypes } from '../components/Proptypes'
import {
  MidColors,
  DarkColors,
  LightColors,
  ComplementaryColors,
  SemanticColor,
} from '../components/ColorBlock'

import { IconPage } from '../components/IconsPage'

import Collapsible from '../components/Collapsible'
import { Code } from '../components/Code'

const { Compiler: renderAst } = new RehypeReact({
  createElement,
  components: {
    a: Anchor,
    proptypes: Proptypes,
    highlight: function Render(props) {
      const { message, ...restProps } = props

      return (
        <Text {...restProps} padding={1} csx={{ bg: 'muted', color: 'base' }}>
          {message}
        </Text>
      )
    },
    iconpage: IconPage,
    lightcolors: LightColors,
    darkcolors: DarkColors,
    midcolors: MidColors,
    complementarycolors: ComplementaryColors,
    semanticcolor: SemanticColor,
    p: function Render(props) {
      return (
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
              bg: 'light.secondary',
              color: 'dark.primary',
            },
          }}
          {...props}
        />
      )
    },
    ul: List,
    ol: function Render(props) {
      return <List el="ol" {...props} />
    },
    kbd: Kbd,
    blockquote: Blockquote,
    summary: Summary,
    collapsible: Collapsible,
    h1: Heading,
    h2: function Render(props) {
      return <Heading as="h2" {...props} />
    },
    h3: function Render(props) {
      return <Heading as="h3" {...props} />
    },
    h4: function Render(props) {
      return <Heading as="h4" {...props} />
    },
    h5: function Render(props) {
      return <Heading as="h5" {...props} />
    },
    h6: function Render(props) {
      return <Heading as="h6" {...props} />
    },
    span: function Render({
      title,
      children,
      ...props
    }: React.HTMLAttributes<unknown>) {
      return <span {...props}>{children}</span>
    },
    pre: function RenderCode(prevProps) {
      function getChildrenCode(props: { children?: React.ReactNode }) {
        const children = React.Children.toArray(props.children)
        const [code] = children

        if (code && typeof code === 'object' && 'type' in code) {
          return code.type === 'code' ? code : null
        }

        return null
      }

      function preToCodeBlock(preProps: typeof prevProps) {
        if (preProps?.children) {
          const codeElement = getChildrenCode(preProps)

          const { maxHeight, className = '', ...props } = codeElement?.props

          const [code] = codeElement?.props?.children

          const match = className.match(/language-([\0-\uFFFF]*)/)

          return {
            codeString: code.trim(),
            className,
            language: match != null ? match[1] : '',
            ...props,
          }
        }

        return undefined
      }

      const props = preToCodeBlock(prevProps)

      if (props) {
        return <Code {...props} />
      }

      return <pre {...props} />
    },
    table: function Render(props) {
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
    tr: function Render(props) {
      const { cn } = useSystem()

      return <tr className={cn({ textAlign: 'left', height: 48 })} {...props} />
    },
    th: function Render(props) {
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
    td: function Render(props) {
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
    tone: function Render(props: {
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
  },
})

export { renderAst }
