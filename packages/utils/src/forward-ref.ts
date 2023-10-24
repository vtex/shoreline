import * as React from 'react'

/**
 * Augmented forwardRef function to support generics
 */
export function forwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => React.ReactNode | null
): (props: P & React.RefAttributes<T>) => React.ReactNode | null {
  return React.forwardRef(render) as unknown as (
    props: P & React.RefAttributes<T>
  ) => React.ReactNode | null
}
