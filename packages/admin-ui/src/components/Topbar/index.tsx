import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { Skeleton } from '../Skeleton'

/**
 * Topbar component.
 *
 * @example
 * ```jsx
 * import { Topbar } from `@vtex/admin-ui`
 *
 * <Topbar>
 *    <TopbarStart>
 *      {children}
 *    </TopbarStart>
 *    <TopbarCenter>
 *      {children}
 *    </TopbarCenter>
 *    <TopbarEnd>
 *      {children}
 *    </TopbarEnd>
 * </Topbar>
 * ```
 */
export const Topbar = jsx('div')(
  {
    display: 'grid',
    gridTemplateAreas: '"start center end"',
    gridTemplateColumns: 'repeat(3, 1fr)',
    height: '3.5rem',
    border: 'divider-bottom',
    paddingX: 3,
    zIndex: 'topbar',
    bg: 'base',
  },
  {
    options: ['loading'],
    useOptions(options: TopbarOptions, props) {
      const { children, ...topbarProps } = props
      const { loading } = options

      return {
        ...topbarProps,
        children: loading ? <TopbarSkeleton /> : children,
      }
    },
  }
)

/**
 * Topbar loading Skeleton
 */
function TopbarSkeleton() {
  return (
    <Fragment>
      <TopbarStart>
        <Skeleton csx={{ height: '1.5rem', width: '100%' }} />
      </TopbarStart>
      <TopbarEnd>
        <Skeleton csx={{ height: '1.5rem', width: '100%' }} />
      </TopbarEnd>
    </Fragment>
  )
}

/**
 * Topbar content positioned in the start.
 */
export const TopbarStart = jsx('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
  gridArea: 'start',
})

/**
 * Topbar content positioned in the center.
 */
export const TopbarCenter = jsx('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  gridArea: 'center',
})

/**
 * Topbar content positioned in the end.
 */
export const TopbarEnd = jsx('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '100%',
  gridArea: 'end',
})

export interface TopbarOptions {
  /**
   * Whether the topbar is loading or not
   * @default false
   */
  loading?: boolean
}

export type TopbarProps = ComponentPropsWithRef<typeof Topbar>
