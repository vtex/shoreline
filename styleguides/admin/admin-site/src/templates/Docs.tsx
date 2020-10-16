/** @jsx jsx */
import { jsx } from '@vtex/admin-ui'
import { graphql } from 'gatsby'
import RehypeReact from 'rehype-react'
import * as AdminUI from '@vtex/admin-ui'
import React, { createElement } from 'react'

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
import CodeBlock from '../components/Codeblock'

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

const { Compiler: renderAst } = new RehypeReact({
  createElement,
  components: {
    a: Anchor,
    proptypes: Proptypes,
    p: function Render(props) {
      return <AdminUI.Text el="p" fs="2" {...props} />
    },
    ul: List,
    ol: function Render(props) {
      return <List el="ol" {...props} />
    },
    kbd: Kbd,
    blockquote: Blockquote,
    summary: Summary,
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
      return (
        <span {...props}>
          {children}
          {title === 'Nightly' && <Nightly />}
        </span>
      )
    },
    pre: CodeBlock,
    table: function Render(props) {
      return (
        <table
          sx={{
            borderRadius: 3,
            borderCollapse: 'collapse',
          }}
          {...props}
        />
      )
    },
    tr: function Render(props) {
      return <tr sx={{ textAlign: 'left', height: 48 }} {...props} />
    },
    colorblock: function Render(props) {
      return (
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
      )
    },
    th: function Render(props) {
      return (
        <th
          sx={{
            paddingX: 3,
            borderBottomColor: 'muted.2',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
          }}
          {...props}
        />
      )
    },
    td: function Render(props) {
      return (
        <td
          sx={{
            paddingX: 3,
            borderBottomColor: 'muted.2',
            borderBottomWidth: 1,
            borderBottomStyle: 'solid',
          }}
          {...props}
        />
      )
    },
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
