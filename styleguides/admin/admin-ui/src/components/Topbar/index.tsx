import React, { Fragment } from 'react'
import { Flex, FlexProps, Grid, GridProps } from '@vtex/admin-primitives'
import { SystemComponent } from '../../types'
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
      csx={{ height: '3.5rem', border: 'divider-bottom', paddingX: 3, ...csx }}
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

export function TopbarStart(props: FlexProps) {
  const { children, csx, ...restProps } = props
  return (
    <Flex
      align="center"
      justify="flex-start"
      csx={{ height: '100%', gridArea: 'start', ...csx }}
      {...restProps}
    >
      {children}
    </Flex>
  )
}

export function TopbarCenter(props: FlexProps) {
  const { children, csx, ...restProps } = props
  return (
    <Flex
      align="center"
      csx={{ height: '100%', gridArea: 'center', ...csx }}
      {...restProps}
    >
      {children}
    </Flex>
  )
}

export function TopbarEnd(props: FlexProps) {
  const { children, csx, ...restProps } = props
  return (
    <Flex
      align="center"
      justify="flex-end"
      csx={{ height: '100%', gridArea: 'end', ...csx }}
      {...restProps}
    >
      {children}
    </Flex>
  )
}

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
