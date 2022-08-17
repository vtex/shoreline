import React from 'react'
import clsx from 'clsx'
import Layout from '@theme/Layout'
import BlogSidebar from '@theme/BlogSidebar'
import { Box, PageContent } from '@vtex/admin-ui'

export default function BlogLayout(props) {
  const { tag, permalink, sidebar, toc, children, ...layoutProps } = props

  return (
    <Layout {...layoutProps}>
      <Box
        csx={{
          marginTop: '2.75rem',
        }}
      >
        <PageContent
          csx={{ maxWidth: '100%', paddingTop: 'none' }}
          template="256px 1fr 256px"
        >
          <BlogSidebar sidebar={sidebar} tag={tag} />
          <Box
            as="main"
            csx={{
              paddingRight: '2rem',
            }}
            itemScope
            itemType="http://schema.org/Blog"
          >
            {children}
          </Box>
          {toc && <Box>{toc}</Box>}
        </PageContent>
      </Box>
    </Layout>
  )
}
