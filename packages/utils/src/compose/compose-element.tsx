import type { AnyObject, ElementWithRef } from '../utility-types'
import { mergeProps } from '../merge-props'
import { mergeRefs } from '../merge-refs'

import type { ForwardedRef, ReactNode } from 'react'
import { cloneElement } from 'react'

/**
 * Clone element merging its props and refs with passed props and refs.
 * @example
 * const element: React.ReactNode = ...
 * const props = {}
 * cosnt ref = useRef()
 *
 * composeElement({
 *  element,
 *  props,
 *  ref,
 * })
 */
export function composeElement({ element, props, ref }: ComposeElementArgs) {
  const {
    props: { children, ...ownProps },
    ref: ownRef,
  } = element as ElementWithRef

  return cloneElement(
    element as ElementWithRef,
    {
      ...mergeProps(props, ownProps),
      ref: ownRef ? mergeRefs(ref, ownRef) : ref,
    },
    children
  )
}

export interface ComposeElementArgs {
  /**
   * Element to clone
   */
  element: ReactNode
  /**
   * Props to merge with element props
   */
  props: AnyObject
  /**
   * Ref to merge with element ref
   */
  ref: ForwardedRef<any>
}
