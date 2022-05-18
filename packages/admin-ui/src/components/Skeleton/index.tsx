import { jsx } from '@vtex/admin-ui-react'
import type { ComponentPropsWithRef } from 'react'
import { keyframes } from '@vtex/admin-ui-core'

/**
 * Represents a UI that doesn’t contain actual content; instead, it shows the loading elements of a page in a shape similar to actual content.
 * It show users that content is loading, offering a vague preview of how content will look once it fully loads.
 * It's beeing used internally by AdminUI to handle the loading state of specyfic components.
 * @example
 * import { Skeleton } from 'admin-ui'
 *
 * const useFetch; ** hook that fetches content **
 *
 * function Component() {
 *  const { loading, data } = useFetch()
 *  return loading ? <Skeleton csx={{ ... }} /> : <h1>{data}</h1>
 * }
 *
 */
export const Skeleton = jsx('div')(
  {
    display: 'inline-block',
    width: 'full',
    height: 'full',
    bg: '$skeleton',
    backgroundSize: `200px 100%`,
    backgroundRepeat: 'no-repeat',
    lineHeight: 1,
    borderRadius: 3,

    variants: {
      shape: {
        rect: {
          borderRadius: 'default',
        },
        circle: {
          borderRadius: 'circle',
        },
      },
    },
  },
  {
    useOptions: (_, props) => {
      const { csx, ...restProps } = props

      const load = keyframes({
        '0%': { backgroundPosition: '-200px 0' },
        '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
      })

      return {
        ...restProps,
        csx: {
          animation: `${load} 1.2s ease-in-out infinite`,
          ...csx,
        },
      }
    },
  }
)

Skeleton.defaultProps = {
  shape: 'rect',
}

export type SkeletonProps = ComponentPropsWithRef<typeof Skeleton>
