import React from 'react'
import { Box } from '@vtex/admin-ui'
import { useSidebarBreadcrumbs } from '@docusaurus/theme-common'

import { PAGE_LINK } from './links'
import styles from './styles'

interface PageHeaderProps {
  title: string
}

const GITHUB_BASE_URL =
  'https://github.com/vtex/admin-ui/tree/main/packages/admin-ui/src/'

const FIGMA_URL =
  'https://www.figma.com/file/sepBhrHViUHyrTnktkuHaW/Admin-UI-%E2%80%93-Components?node-id=586%3A243904'

export function PageHeader(props: PageHeaderProps) {
  const breadcrumbs = useSidebarBreadcrumbs()
  const firstBreadcrumb = breadcrumbs?.[0].label ?? ''
  const pathGithub = PAGE_LINK?.[props.title]?.github ?? ''

  return (
    <Box as="header" csx={styles.container}>
      <Box csx={styles.caption}>
        <Box as="p" csx={styles.breadcrumb}>
          {firstBreadcrumb}
        </Box>
        {pathGithub && (
          <Box as="span" csx={styles.logosContainer}>
            <Box
              as="a"
              csx={styles.gitHubUrl}
              href={`${GITHUB_BASE_URL}${pathGithub}`}
              target="_blank"
              aria-label="Component url in the GitHub repository"
            />
            <Box
              as="a"
              csx={styles.figma}
              href={FIGMA_URL}
              target="_blank"
              aria-label="Component url in the Figma"
            />
          </Box>
        )}
      </Box>
      <Box as="h1" csx={styles.title}>
        {props.title}
      </Box>
    </Box>
  )
}
