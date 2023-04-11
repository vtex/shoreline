import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'
import { csx, PageContent } from '@vtex/admin-ui'

export default function BlogLayout(props) {
  const { tag, permalink, sidebar, toc, children, ...layoutProps } = props

  return (
    <Layout {...layoutProps}>
      <div
        className={csx({
          marginTop: '2.75rem',
        })}
      >
        <PageContent
          className={csx({
            maxWidth: '100%',
            paddingTop: 'none',
            gridTemplateColumns: '256px 1fr 256px',
            bg: 'blue',
          })}
        >
          <BlogSidebar sidebar={sidebar} tag={tag} />
          <main
            className={csx({
              paddingRight: '2rem',
            })}
            itemScope
            itemType="http://schema.org/Blog"
          >
            {children}
          </main>
          {toc && <div>{toc}</div>}
        </PageContent>
      </div>
    </Layout>
  )
}
