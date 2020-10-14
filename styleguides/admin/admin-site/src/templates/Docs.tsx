/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import * as React from 'react'
import { graphql } from 'gatsby'
import RehypeReact from 'rehype-react'
import {
  PlaygroundPreview,
  PlaygroundEditor,
  usePlaygroundState,
  PlaygroundStateReturn,
} from 'reakit-playground'
import * as emotion from 'emotion'
import * as styled from 'styled-components'
import * as AdminUI from '@vtex/admin-ui'

import Anchor from '../components/Anchor'
import List from '../components/List'
import Kbd from '../components/Kbd'
import Blockquote from '../components/Blockquote'
import Nightly from '../icons/Nightly'
import Heading from '../components/Heading'
import Seo from '../components/SEO'
import DocsBackNext from '../components/DocsBackNext'
import Summary from '../components/Summary'
import { Proptypes } from '../components/Proptypes'

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
      htmlAst: object
      excerpt: string
      frontmatter: {
        path: string
        nightly: boolean
      }
    }
  }
}

function getChildrenCode(props: { children?: React.ReactNode }) {
  const children = React.Children.toArray(props.children)
  const [code] = children

  if (code && typeof code === 'object' && 'type' in code) {
    return code.type === 'code' ? code : null
  }

  return null
}

interface PlaygroundProps {
  dynamic: boolean
  mode: string
  state: PlaygroundStateReturn
  maxHeight?: string
}

function Playground({
  dynamic,
  mode,
  state,
  maxHeight,
  ...props
}: PlaygroundProps) {
  return (
    <>
      {dynamic && (
        <PlaygroundPreview
          unstyled
          modules={{
            '@vtex/admin-ui': AdminUI,
            emotion,
            'styled-components': styled,
          }}
          {...state}
        />
      )}
      <PlaygroundEditor
        readOnly={!dynamic}
        mode={mode}
        maxHeight={maxHeight}
        {...state}
        {...props}
      />
    </>
  )
}

function CodeBlock(props: React.HTMLAttributes<unknown>) {
  const codeElement = getChildrenCode(props)

  const { static: isStatic, maxHeight, className } = codeElement?.props

  const [, language] = className.match(/language-(.+)/) ?? []

  const modeMap = {
    html: 'htmlmixed',
    js: 'javascript',
  }

  const mode = modeMap?.[language as keyof typeof modeMap] ?? language

  const isDynamic = !isStatic && mode === 'jsx'

  const [code] = codeElement?.props?.children
  const state = usePlaygroundState({ code })

  React.useEffect(() => {
    state.update(code)
  }, [state.update, code])

  return codeElement ? (
    <Playground
      state={state}
      mode={mode}
      dynamic={isDynamic}
      maxHeight={maxHeight}
      {...props}
    />
  ) : (
    <pre {...props} />
  )
}

const { Compiler: renderAst } = new RehypeReact({
  createElement: React.createElement,
  components: {
    a: Anchor,
    p: (props) => <AdminUI.Text el="p" fs="2" {...props} />,
    proptypes: Proptypes,
    ul: List,
    ol: (props) => <List el="ol" {...props} />,
    kbd: Kbd,
    blockquote: Blockquote,
    summary: Summary,
    h1: Heading,
    h2: (props) => <Heading as="h2" {...props} />,
    h3: (props) => <Heading as="h3" {...props} />,
    h4: (props) => <Heading as="h4" {...props} />,
    h5: (props) => <Heading as="h5" {...props} />,
    h6: (props) => <Heading as="h6" {...props} />,
    span: (props: React.HTMLAttributes<unknown>) => {
      if (props.title === 'Nightly') {
        return (
          <span {...props}>
            <Nightly />
          </span>
        )
      }

      return <span {...props} />
    },
    pre: CodeBlock,
    table: (props) => (
      <AdminUI.Box
        el="table"
        br="3"
        sx={{
          borderCollapse: 'collapse',
        }}
        {...props}
      />
    ),
    tr: (props) => <AdminUI.Box ta="left" el="tr" h={48} {...props} />,
    colorblock: (props) => (
      <AdminUI.Box
        w="full"
        bc="muted.2"
        bw="1"
        bs="solid"
        h={32}
        br="3"
        sx={{
          boxShadow: 'subtle',
        }}
        {...props}
      />
    ),
    th: (props) => (
      <AdminUI.Box
        px="3"
        el="th"
        bbc="muted.2"
        bbw="1"
        bbs="solid"
        {...props}
      />
    ),
    td: (props) => (
      <AdminUI.Box
        px="3"
        el="td"
        bbc="muted.2"
        bbw="1"
        bbs="solid"
        {...props}
      />
    ),
  },
})

export default function Docs({ data, pageContext }: DocsProps) {
  const {
    markdownRemark: { title, htmlAst, excerpt },
  } = data

  const { nextPagePath, prevPagePath } = pageContext

  return (
    <AdminUI.ThemeProvider>
      <Seo title={`${title} – AdminUI`} description={excerpt} />
      <Heading>{title}</Heading>
      {renderAst(htmlAst)}
      <DocsBackNext nextPath={nextPagePath} prevPath={prevPagePath} />
    </AdminUI.ThemeProvider>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      title
      htmlAst
      excerpt
      frontmatter {
        path
      }
    }
  }
`
