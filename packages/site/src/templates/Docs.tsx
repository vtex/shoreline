import React from 'react'
import { graphql } from 'gatsby'
import { tag } from '@vtex/admin-ui'

import Seo from '../components/SEO'
import DocsBackNext from '../components/DocsBackNext'
import { renderAst } from './renderAst'
import { PageHeader } from '../components/PageHeader'

export const pageQuery = graphql`
  query ($path: String!) {
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

export default function Docs({ data, pageContext }: DocsProps) {
  const {
    markdownRemark: { title, htmlAst, excerpt },
  } = data

  const { nextPagePath, prevPagePath } = pageContext

  return (
    <>
      <Seo title={`${title} – AdminUI`} description={excerpt} />
      <PageHeader>{title}</PageHeader>
      <tag.div csx={{ paddingX: 4 }}>{renderAst(htmlAst)}</tag.div>
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
