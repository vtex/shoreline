import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { VariantProps } from '@vtex/admin-ui-core'

import * as style from './skeleton.style'

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
 *  return loading ? <Skeleton /> : <h1>{data}</h1>
 * }
 *
 */
export const Skeleton = createComponent<'div', SkeletonOptions>((props) => {
  const { shape = 'rect', ...restProps } = props

  return useElement('div', {
    ...restProps,
    baseStyle: {
      ...style.baseline,
      ...style.variants({ shape }),
    },
  })
})

export type SkeletonOptions = VariantProps<typeof style.variants>

export type SkeletonProps = ComponentPropsWithRef<typeof Skeleton>
