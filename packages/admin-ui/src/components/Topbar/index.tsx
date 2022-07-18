import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

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
export const Topbar = createComponent<'div', TopbarOptions>((props) => {
  const { children, loading, ...restProps } = props

  return useElement('div', {
    baseStyle: {
      display: 'grid',
      gridTemplateAreas: '"start center end"',
      gridTemplateColumns: 'repeat(3, 1fr)',
      height: '3.5rem',
      borderBottom: '$neutral',
      zIndex: 'topbar',
      paddingX: '$xl',
      bg: '$primary',
    },
    ...restProps,
    children: loading ? <TopbarSkeleton /> : children,
  })
})

/**
 * Topbar content positioned in the start.
 */
export const TopbarStart = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    baseStyle: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gridArea: 'start',
    },
    children: <Bleed left="0.5rem">{children}</Bleed>,
    ...restProps,
  })
})

/**
 * Topbar content positioned in the center.
 */
export const TopbarCenter = createComponent<'div'>((props) => {
  return useElement('div', {
    baseStyle: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gridArea: 'center',
    },
    ...props,
  })
})

/**
 * Topbar content positioned in the end.
 */
export const TopbarEnd = createComponent<'div'>((props) => {
  const { children, ...restProps } = props

  return useElement('div', {
    baseStyle: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      gridArea: 'end',
    },
    children: <Bleed right="0.5rem">{children}</Bleed>,
    ...restProps,
  })
})

/**
 * Topbar loading Skeleton
 */
export function TopbarSkeleton() {
  return (
    <Fragment>
      <TopbarStart>
        <Inline hSpace="$l" spaceInside align="center">
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
        <Inline hSpace="$m" spaceInside align="center">
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
