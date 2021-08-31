import React, { Fragment } from 'react'
import type { GridProps } from '@vtex/admin-primitives'
import { Grid } from '@vtex/admin-primitives'
import { jsx } from '@vtex/admin-ui-react'

import type { SystemComponent } from '../../types'
import { Skeleton } from '../Skeleton'

/**
 * Topbar component.
 *
 * @example
 * ```jsx
 * import { Topbar } from `@vtex/admin-ui`
 *
 * <Topbar>
 *    <Topbar.Start>
 *      {children}
 *    </Topbar.Start>
 *    <Topbar.Center>
 *      {children}
 *    </Topbar.Center>
 *    <Topbar.End>
 *      {children}
 *    </Topbar.End>
 * </Topbar>
 * ```
 */
export function Topbar(props: TopbarProps) {
  const { children, csx, loading, ...restProps } = props

  return (
    <Grid
      templateAreas={['start center end']}
      csx={{
        height: '3.5rem',
        border: 'divider-bottom',
        paddingX: 3,
        zIndex: 'topbar',
        bg: 'light.primary',
        ...csx,
      }}
      {...restProps}
    >
      {loading ? <TopbarSkeleton /> : children}
    </Grid>
  )
}

/**
 * Topbar loading Skeleton
 */
function TopbarSkeleton() {
  return (
    <Fragment>
      <Topbar.Start>
        <Skeleton csx={{ height: '1.5rem', width: '100%' }} />
      </Topbar.Start>
      <Topbar.End>
        <Skeleton csx={{ height: '1.5rem', width: '100%' }} />
      </Topbar.End>
    </Fragment>
  )
}

export const TopbarStart = jsx.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '100%',
  gridArea: 'start',
})

export const TopbarCenter = jsx.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  gridArea: 'center',
})

export const TopbarEnd = jsx.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  height: '100%',
  gridArea: 'end',
})

/**
 * Topbar content positioned in the start.
 */
Topbar.Start = TopbarStart

/**
 * Topbar content positioned in the center.
 */
Topbar.Center = TopbarCenter

/**
 * Topbar content positioned in the end.
 */
Topbar.End = TopbarEnd

export interface TopbarProps extends SystemComponent, GridProps {
  /**
   * Whether the topbar is loading or not
   * @default false
   */

  loading?: boolean
}
