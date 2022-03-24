import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { jsx } from '@vtex/admin-ui-react'
import { experimental_Bleed as Bleed } from '../../experimental'
import { Set } from '../Set'
import { Center } from '../Center'
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
        children: <Bleed left={0.5}>{children}</Bleed>,
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
        children: <Bleed right={0.5}>{children}</Bleed>,
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
        <Set spacing="$l">
          <Center csx={{ padding: '$xs' }}>
            <Skeleton csx={{ size: '1.5rem' }} />
          </Center>
          <Skeleton csx={{ width: '8rem', height: '1rem' }} />
        </Set>
      </TopbarStart>
      <TopbarCenter>
        <Skeleton csx={{ width: '13.75rem', height: '2rem' }} />
      </TopbarCenter>
      <TopbarEnd>
        <Set spacing="$m">
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
        </Set>
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
