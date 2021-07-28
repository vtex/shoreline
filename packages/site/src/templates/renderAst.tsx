import React, { createElement } from 'react'
import RehypeReact from 'rehype-react'
import { Paragraph, Text, useSystem } from '@vtex/admin-ui'

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
import PropDetails from '../components/PropDetails'
import { IconPage } from '../components/IconsPage'
import IconPropDetails from '../components/IconPropDetails'
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
        <Text
          {...restProps}
          padding={1}
          csx={{ bg: 'light.secondary', color: 'dark.primary' }}
        >
          {message}
        </Text>
      )
    },
    iconpropdetails: IconPropDetails,
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
            text: 'body',
            textAlign: 'justify',
            color: 'dark.primary',
            fontSize: 2,
            code: {
              fontFamily:
                'VTEXTrustVF, -apple-system, system-ui, BlinkMacSystemFont, sans-serif !important',
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
    propdetails: PropDetails,
    collapsible: Collapsible,
    h1: Heading,
    h2: function Render(props) {
      return <Heading element="h2" {...props} />
    },
    h3: function Render(props) {
      return <Heading element="h3" {...props} />
    },
    h4: function Render(props) {
      return <Heading element="h4" {...props} />
    },
    h5: function Render(props) {
      return <Heading element="h5" {...props} />
    },
    h6: function Render(props) {
      return <Heading element="h6" {...props} />
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
            borderBottomColor: 'mid.secondary',
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
            borderBottomColor: 'mid.secondary',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
            verticalAlign: 'middle',
            code: {
              color: 'purple',
              fontSize: 1,
            },
          })}
          {...props}
        />
      )
    },
  },
})

export { renderAst }
