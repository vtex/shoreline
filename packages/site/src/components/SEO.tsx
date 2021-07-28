import React from 'react'
import { Helmet } from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby'

const defaultKeywords = ['react', 'accessibility', 'components', 'ui', 'a11y']

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site {
      siteMetadata {
        title
        description
        siteUrl
        author
      }
    }
  }
`

export default function SEO({
  description,
  lang = 'en',
  meta = [],
  keywords = [],
  title,
}: SEOProps) {
  const data = useStaticQuery(detailsQuery)
  const metaDescription = description ?? data.site.siteMetadata.description
  const metaTitle = title || data.site.siteMetadata.title
  const url = data.site.siteMetadata.siteUrl as string

  return (
    <Helmet
      htmlAttributes={{ lang }}
      title={metaTitle}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: metaTitle,
        },
        {
          property: 'og:url',
          content: url,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'keywords',
          content: defaultKeywords.concat(keywords).join(', '),
        },
      ].concat(meta)}
    />
  )
}

export interface SEOProps {
  description?: string
  lang?: string
  meta?: Array<{ property: string; content: string }>
  keywords?: string[]
  title: string
}
