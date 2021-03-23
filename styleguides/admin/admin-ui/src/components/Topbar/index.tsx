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
 *    <Topbar.Left>
 *      {children}
 *    </Topbar.Left>
 *    <Topbar.Center>
 *      {children}
 *    </Topbar.Center>
 *    <Topbar.Right>
 *      {children}
 *    </Topbar.Right>
 * </Topbar>
 * ```
 */
export function Topbar(props: TopbarProps) {
  const { children, csx, loading, ...restProps } = props

  return (
    <Grid
      templateAreas={['left center right']}
      csx={{ height: 56, border: 'divider-bottom', paddingX: 3, ...csx }}
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
      <Topbar.Left>
        <Skeleton csx={{ height: 24, width: '100%' }} />
      </Topbar.Left>
      <Topbar.Right>
        <Skeleton csx={{ height: 24, width: '100%' }} />
      </Topbar.Right>
    </Fragment>
  )
}

export function TopbarLeft(props: FlexProps) {
  const { children, csx, ...restProps } = props
  return (
    <Grid.Item
      element={Flex}
      area="left"
      align="center"
      csx={{ height: '100%', ...csx }}
      {...restProps}
    >
      {children}
    </Grid.Item>
  )
}

export function TopbarRight(props: FlexProps) {
  const { children, csx, ...restProps } = props
  return (
    <Grid.Item
      element={Flex}
      area="right"
      align="center"
      csx={{ height: '100%', ...csx }}
      {...restProps}
    >
      {children}
    </Grid.Item>
  )
}

export function TopbarCenter(props: FlexProps) {
  const { children, csx, ...restProps } = props
  return (
    <Grid.Item
      element={Flex}
      area="center"
      align="center"
      csx={{ height: '100%', ...csx }}
      {...restProps}
    >
      {children}
    </Grid.Item>
  )
}

/**
 * Topbar content positioned in the left.
 */
Topbar.Left = TopbarLeft
/**
 * Topbar content positioned in the right.
 */
Topbar.Right = TopbarRight
/**
 * Topbar content positioned in the center.
 */
Topbar.Center = TopbarCenter

export interface TopbarProps extends SystemComponent, GridProps {
  loading?: boolean
}
