import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { Bleed } from '../../bleed'
import { Inline } from '../../inline'
import { Center } from '../../center'
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
    borderBottom: '$neutral',
    zIndex: 'topbar',
    paddingX: '$xl',
    bg: '$primary',
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
 * Topbar content positioned in the start.
 */
export const TopbarStart = jsx('div')(
  {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gridArea: 'start',
  },
  {
    options: [],
    useOptions(_, props) {
      const { children, ...htmlProps } = props

      return {
        ...htmlProps,
        children: <Bleed left="0.5rem">{children}</Bleed>,
      }
    },
  }
)

/**
 * Topbar content positioned in the center.
 */
export const TopbarCenter = jsx('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gridArea: 'center',
})

/**
 * Topbar content positioned in the end.
 */
export const TopbarEnd = jsx('div')(
  {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gridArea: 'end',
  },
  {
    options: [],
    useOptions(_, props) {
      const { children, ...htmlProps } = props

      return {
        ...htmlProps,
        children: <Bleed right="0.5rem">{children}</Bleed>,
      }
    },
  }
)

/**
 * Topbar loading Skeleton
 */
export function TopbarSkeleton() {
  return (
    <Fragment>
      <TopbarStart>
        <Inline hSpace="$l" align="center">
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.5rem' }} />
          </Center>
          <Skeleton csx={{ width: '8rem', height: '1rem' }} />
        </Inline>
      </TopbarStart>
      <TopbarCenter>
        <Skeleton csx={{ width: '13.75rem', height: '2rem' }} />
      </TopbarCenter>
      <TopbarEnd>
        <Inline hSpace="$m" align="center">
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ height: '1.25rem', width: '5.563rem' }} />
          </Center>
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.25rem' }} />
          </Center>
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.25rem' }} />
          </Center>
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.5rem' }} />
          </Center>
        </Inline>
      </TopbarEnd>
    </Fragment>
  )
}

export interface TopbarOptions {
  /**
   * Whether the topbar is loading or not
   * @default false
   */
  loading?: boolean
}

export type TopbarProps = ComponentPropsWithRef<typeof Topbar>
