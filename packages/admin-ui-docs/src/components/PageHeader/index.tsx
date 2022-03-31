import React from 'react'
import { tag } from '@vtex/admin-ui-react'

import styles from './styles'

interface PageHeaderProps {
  title: string
  componentPath: string
}
const GITHUB_BASE_URL =
  'https://github.com/vtex/admin-ui/tree/main/packages/admin-ui/src/'

export function PageHeader(props: PageHeaderProps) {
  const breadcrumbs = window.location.pathname.split('/').filter(Boolean)
  const firstBreadcrumb = breadcrumbs[0] ?? 'introduction'

  return (
    <tag.header csx={styles.container}>
      <tag.div csx={styles.caption}>
        <tag.p csx={styles.breadcrumb}>{firstBreadcrumb}</tag.p>
        {props.componentPath && (
          <tag.a
            csx={styles.gitHubUrl}
            href={`${GITHUB_BASE_URL}${props.componentPath}`}
            target="_blank"
            aria-label="GitHub repository"
          />
        )}
      </tag.div>
      <tag.h1 csx={styles.title}>{props.title}</tag.h1>
    </tag.header>
  )
}
