import * as React from 'react'

/**
 * Augmented forwardRef function to support generics
 */
export function forwardRef<T, P = {}>(
  render: (props: P, ref: React.Ref<T>) => JSX.Element | null
): (props: P & React.RefAttributes<T>) => JSX.Element | null {
  return React.forwardRef(render as any) as unknown as (
    props: P & React.RefAttributes<T>
  ) => JSX.Element | null
}
