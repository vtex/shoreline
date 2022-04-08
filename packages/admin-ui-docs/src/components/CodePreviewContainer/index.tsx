import type { ReactNode } from 'react'
import React from 'react'

import { tag, useMediaQuery } from '@vtex/admin-ui'

import './styles.scss'

export interface CodeSectionProps {
  children: ReactNode
  columnsCount: number
  layout: 'grid' | null
}

export function CodePreviewContainer(props: CodeSectionProps) {
  const [isTabletScreen] = useMediaQuery('(min-width: 768px)')
  const isGridLayout = props.layout === 'grid'
  const className = isGridLayout
    ? 'preview-grid-container'
    : 'preview-default-container'

  return (
    <tag.div
      className={className}
      csx={{
        gridTemplateColumns:
          props?.columnsCount && isTabletScreen
            ? `repeat(${props.columnsCount}, 1fr)`
            : `1fr`,
      }}
    >
      {props.children}
    </tag.div>
  )
}
