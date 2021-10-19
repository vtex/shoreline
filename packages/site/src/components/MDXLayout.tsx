import React from 'react'
import { graphql } from 'gatsby'
import { tag } from '@vtex/admin-ui'
import { MDXProvider } from '@mdx-js/react'
import { MDXRenderer } from 'gatsby-plugin-mdx'

import Seo from './SEO'
import DocsBackNext from './DocsBackNext'
import { MDXComponents } from './MDXComponents'

export const pageQuery = graphql`
  query ($path: String!) {
    mdx(frontmatter: { path: { eq: $path } }) {
      body
      excerpt
      frontmatter {
        title
        path
        fullPage
      }
    }
  }
`

export default function MDXLayout({ data, pageContext }: DocsProps) {
  const {
    mdx: {
      body,
      excerpt,
      frontmatter: { title },
    },
  } = data

  console.log(title)

  const { nextPagePath, prevPagePath } = pageContext

  return (
    <>
      <Seo title={`Admin UI - ${title}`} description={excerpt} />
      <tag.div csx={{ paddingX: 3 }}>
        <MDXProvider components={MDXComponents}>
          <MDXRenderer>{body}</MDXRenderer>
        </MDXProvider>
      </tag.div>
      <DocsBackNext nextPath={nextPagePath} prevPath={prevPagePath} />
    </>
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
    mdx: {
      excerpt: string
      body: any
      frontmatter: {
        title: string
        path: string
        experimental: boolean
      }
    }
  }
}
