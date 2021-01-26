import React, { createElement } from 'react'
import { graphql } from 'gatsby'
import RehypeReact from 'rehype-react'
import { Global, css } from '@emotion/react'

import {
  ThemeProvider,
  Paragraph,
  Text,
  useSystem,
  createSystem,
} from '@vtex/admin-ui'
import Anchor from '../components/Anchor'
import List from '../components/List'
import Kbd from '../components/Kbd'
import Blockquote from '../components/Blockquote'
import Experimental from '../icons/Experimental'
import Heading from '../components/Heading'
import Seo from '../components/SEO'
import DocsBackNext from '../components/DocsBackNext'
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
import ThemeAwareProps from '../components/ThemeAwareProps'
import { IconPage } from '../components/IconsPage'
import IconPropDetails from '../components/IconPropDetails'
import Collapsible from '../components/Collapsible'
import { Code } from '../components/Code'

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      title
      htmlAst
      excerpt
      frontmatter {
        path
        fullPage
      }
    }
  }
`

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
          styles={{ bg: 'light.secondary', color: 'dark.primary' }}
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
    themeawareprops: ThemeAwareProps,
    p: function Render(props) {
      return (
        <Paragraph
          text="body"
          styleOverrides={{
            color: 'dark.primary',
            fontSize: 2,
            marginY: 4,
            textAlign: 'justify',
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
      return (
        <span {...props}>
          {children}
          {title === 'Experimental' && <Experimental />}
        </span>
      )
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

          const {
            static: isStatic,
            maxHeight,
            className = '',
            ...props
          } = codeElement?.props

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
          })}
          {...props}
        />
      )
    },
  },
})

const system = createSystem('docs')
export default function Docs({ data, pageContext }: DocsProps) {
  const {
    markdownRemark: { title, htmlAst, excerpt },
  } = data

  const { nextPagePath, prevPagePath } = pageContext

  return (
    <ThemeProvider system={system}>
      <Global
        styles={css`
          *,
          *::after,
          *::before {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-size: 16px;
            text-rendering: optimizelegibility;
            -webkit-font-smoothing: antialiased;
            overflow: hidden;
          }
          h1 {
            font-size: 32px;
            font-weight: bold;
            margin-bottom: 24px;
          }
          h2 {
            font-size: 24px;
          }
          h3 {
            font-size: 18px;
          }
          h4 {
            font-size: 16px;
          }
          h2,
          h3,
          h4,
          h5,
          h6 {
            margin: 24px 0 16px 0;
            font-weight: bold;
          }
          p {
            font-size: 16px;
            line-height: 28px;
            margin-bottom: 16px;
            font-weight: 400;
          }
          code.inline-code {
            display: inline-block;
            vertical-align: middle;
            line-height: 1;
            padding: 0.2em;
            background-color: #44475a;
            color: rgba(248, 248, 242);
            font-size: 14px;
            border-radius: 3px;
            font-feature-settings: 'clig' 0, 'calt' 0;
            font-variant: no-common-ligatures no-discretionary-ligatures
              no-historical-ligatures no-contextual;
          }
          h1 code.inline-code,
          h2 code.inline-code {
            font-size: calc(100% - 5px);
            padding: 4px;
          }
          blockquote {
            margin-bottom: 16px;
            width: 100%;
            p {
              padding: 1rem;
              border-radius: 5px;
              margin: 0;
            }
          }
          hr {
            border: 0;
            height: 0;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          }
          table {
            border-collapse: separate;
            border-spacing: 0 4px;
            margin-top: -4px;
            margin-bottom: 16px;
            width: 100%;
            th,
            td {
              margin: 0;
              border-style: solid none;
              padding: 12px;
              :first-of-type {
                border-left-style: solid;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
              }
              :last-child {
                border-right-style: solid;
                border-bottom-right-radius: 5px;
                border-top-right-radius: 5px;
              }
            }
            tr {
              th {
                text-align: left;
                font-weight: bold;
              }
            }
          }
          iframe {
            margin-bottom: 16px;
          }
          img {
            max-width: 100%;
          }
          ul,
          ol {
            padding-left: 15px;
            margin-bottom: 16px;
            li {
              line-height: 28px;
            }
          }
          li ul,
          li ol {
            margin-bottom: 0;
          }
          .gatsby-highlight {
            font-family: Hack, SFMono-Regular, Menlo, Monaco, Consolas,
              'Liberation Mono', 'Courier New', monospace;
            font-variant: no-common-ligatures no-discretionary-ligatures
              no-historical-ligatures no-contextual;
            position: relative;
            z-index: 0;
            margin: 0 0 16px 0;
            overflow: auto;
            .token {
              font-style: normal !important;
            }
          }
          pre[class*='language-'] code {
            font-family: inherit;
          }
          pre[class*='language-']::before {
            background: #d9d7e0;
            border-radius: 0 0 4px 4px;
            color: #232129;
            font-size: 12px;
            font-family: inherit;
            letter-spacing: 0.075em;
            line-height: 1;
            padding: 0.25rem 0.5rem;
            position: absolute;
            left: 1rem;
            text-align: right;
            text-transform: uppercase;
            top: 0;
          }
          pre[class~='language-js']::before,
          pre[class~='language-javascript']::before {
            content: 'js';
            background: #f7df1e;
          }
          pre[class~='language-jsx']::before {
            content: 'jsx';
            background: #61dafb;
          }
          pre[class~='language-typescript']::before,
          pre[class~='language-ts']::before {
            content: 'ts';
            background: #294e80;
            color: #fff;
          }
          pre[class~='language-tsx']::before {
            content: 'tsx';
            background: #294e80;
            color: #fff;
          }
          pre[class~='language-graphql']::before {
            content: 'GraphQL';
            background: #e10098;
            color: #fff;
          }
          pre[class~='language-html']::before {
            content: 'html';
            background: #005a9c;
            color: #fff;
          }
          pre[class~='language-css']::before {
            content: 'css';
            background: #ff9800;
            color: #fff;
          }
          pre[class~='language-mdx']::before {
            content: 'mdx';
            background: #f9ac00;
            color: #fff;
          }
          pre[class~='language-shell']::before {
            content: 'shell';
          }
          pre[class~='language-sh']::before {
            content: 'sh';
          }
          pre[class~='language-bash']::before {
            content: 'bash';
          }
          pre[class~='language-yaml']::before,
          pre[class~='language-yml']::before {
            content: 'yaml';
            background: #ffa8df;
          }
          pre[class~='language-markdown']::before {
            content: 'md';
          }
          pre[class~='language-json']::before,
          pre[class~='language-json5']::before {
            content: 'json';
            background: linen;
          }
          pre[class~='language-diff']::before {
            content: 'diff';
            background: #e6ffed;
          }
          pre[class~='language-text']::before {
            content: 'text';
            background: #fff;
          }
          pre[class~='language-flow']::before {
            content: 'flow';
            background: #e8bd36;
          }
        `}
      />
      <Seo title={`${title} – AdminUI`} description={excerpt} />
      <Heading>{title}</Heading>
      {renderAst(htmlAst)}
      <DocsBackNext nextPath={nextPagePath} prevPath={prevPagePath} />
    </ThemeProvider>
  )
}

type DocsProps = {
  pageContext: {
    sourceUrl: string
    readmeUrl: string
    tableOfContentsAst: string
    nextPagePath: string
    prevPagePath: string
  }
  data: {
    markdownRemark: {
      title: string
      htmlAst: Record<string, unknown>
      excerpt: string
      frontmatter: {
        path: string
        experimental: boolean
      }
    }
  }
}
