import type {
  AnyObject,
  ElementWithRef,
  RenderProps,
} from '@vtex/shoreline-utils'
import { mergeProps, mergeRefs } from '@vtex/shoreline-utils'
import type { ForwardedRef, ReactNode } from 'react'
import { cloneElement } from 'react'

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
  element: ReactNode
  props: AnyObject
  ref: ForwardedRef<any>
  wrap?: RenderProps
}
