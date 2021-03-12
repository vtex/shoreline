import React from 'react'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/react'

import Heading from '../components/Heading'
import Seo from '../components/SEO'
import DocsBackNext from '../components/DocsBackNext'
import { renderAst } from './renderAst'

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

export default function Docs({ data, pageContext }: DocsProps) {
  const {
    markdownRemark: { title, htmlAst, excerpt },
  } = data

  const { nextPagePath, prevPagePath } = pageContext

  return (
    <>
      <Global
        styles={css`
          pre {
            font-family: monospace !important;
          }

          code {
            font-family: monospace !important;
          }

          pre > code {
            font-family: monospace !important;
          }

          .token {
            font-family: monospace !important;
            display: inline-block;
            vertical-align: middle;
            line-height: 1;
            font-size: 14px;
          }

          textArea {
            font-family monospace !important;
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
            margin: 16px 0px;
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
