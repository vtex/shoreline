/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react'
import { csx } from '@vtex/admin-ui'
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
    <header className={csx(styles.container)}>
      <div className={csx(styles.caption)}>
        <p className={csx(styles.breadcrumb)}>{firstBreadcrumb}</p>
        {pathGithub && (
          <span className={csx(styles.logosContainer)}>
            <a
              className={csx(styles.gitHubUrl)}
              href={`${GITHUB_BASE_URL}${pathGithub}`}
              target="_blank"
              aria-label="Component url in the GitHub repository"
              rel="noreferrer"
            />
            <a
              className={csx(styles.figma)}
              href={FIGMA_URL}
              target="_blank"
              aria-label="Component url in the Figma"
              rel="noreferrer"
            />
          </span>
        )}
      </div>
      <h1 className={csx(styles.title)}>{props.title}</h1>
    </header>
  )
}
