import React from 'react'
import { graphql } from 'gatsby'
import { Global, css } from '@emotion/react'
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
      <Global
        styles={css`
        @font-face {
          font-family: "VTEX Trust";
          src: url("https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-VF.woff2");
          unicode-range: U+0020-007E, U+00A0-0107, U+010A-0113, U+0116-011B,
              U+011E-0123, U+0126-0127, U+012A-012B, U+012E-0131, U+0136-0137,
              U+0139-0148, U+014A-014D, U+0150-015B, U+015E-0167, U+016A-016B,
              U+016E-017E, U+0192, U+01EA-01EB, U+0218-021B, U+0237, U+02C6-02C7,
              U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030C, U+0312,
              U+0326-0328, U+0335, U+0337-0338, U+0394, U+03A9, U+03BC, U+03C0,
              U+0E3F, U+1E80-1E85, U+1E9E, U+1EF2-1EF3, U+2000-200B, U+2013-2014,
              U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+202F-2030,
              U+2032-2033, U+2039-203A, U+2044, U+205F, U+2070, U+2074-2079,
              U+2080-2089, U+20A1, U+20A4, U+20A9-20AE, U+20B1, U+20B4, U+20B8-20BA,
              U+20BF, U+2117, U+2122, U+215D, U+2202, U+220F, U+2211-2212, U+221A,
              U+221E, U+222B, U+2248, U+2260, U+2264-2265, U+25CA, U+FB01-FB02;
        }
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
            top: 12px;
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
