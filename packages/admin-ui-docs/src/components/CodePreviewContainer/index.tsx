import type { ReactNode } from 'react'
import React from 'react'
import { csx, cx, useMediaQuery } from '@vtex/admin-ui'

import './styles.scss'

export interface CodeSectionProps {
  children: ReactNode
  columnsCount?: string
  rowsCount?: string
  layout?: 'grid' | null
}

export function CodePreviewContainer(props: CodeSectionProps) {
  const [isTabletScreen] = useMediaQuery('(min-width: 768px)')
  const isGridLayout =
    props?.layout === 'grid' && props?.columnsCount && props?.rowsCount

  const className = isGridLayout
    ? 'preview-grid-container'
    : 'preview-default-container'

  const wrapperClassName = isGridLayout ? 'wrapper-container' : ''

  const gridTemplateColumns =
    isGridLayout && isTabletScreen
      ? `repeat(${props.columnsCount}, 1fr)`
      : `1fr`

  return (
    <div className={wrapperClassName}>
      <div className={cx(csx({ gridTemplateColumns }), className)}>
        {props.children}
      </div>
      {isGridLayout && (
        <div
          className={cx(
            'background-grid-container',
            csx({ gridTemplateColumns })
          )}
        >
          {props?.columnsCount &&
            props?.rowsCount &&
            Array(Number(props.columnsCount) * Number(props.rowsCount)).fill(
              <div className="grid-item" />
            )}
        </div>
      )}
    </div>
  )
}
