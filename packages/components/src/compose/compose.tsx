import React, { Fragment, forwardRef } from 'react'
import type { HTMLAttributes, ReactNode } from 'react'

import { createComposition } from './create-composition'

/**
 * Composes immediate child with its props and child own props.
 * Used to implement Shoreline composition
 * @example
 * function Button({ asChild, ...props }){
 *  const Composition = asChild ? Compose : 'button'
 *  return <Composition {...props} />
 * }
 */
export const Compose = forwardRef<any, ComposeProps>(function Compose(
  props,
  ref
) {
  const { children, ...rootProps } = props

  return (
    <Fragment>
      {createComposition({
        element: children,
        props: rootProps,
        ref,
      })}
    </Fragment>
  )
})

export interface ComposeProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode
}
