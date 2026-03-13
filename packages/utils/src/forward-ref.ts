import * as React from 'react'
import type { AnyObject } from './utility-types'

/**
 * Augmented forwardRef function to support generics
 */
export function forwardRef<T, P = AnyObject>(
  render: (props: P, ref: React.Ref<T>) => React.ReactElement | null
): (props: P & React.RefAttributes<T>) => React.ReactElement | null {
  return React.forwardRef(render as any) as unknown as (
    props: P & React.RefAttributes<T>
  ) => React.ReactElement | null
}
