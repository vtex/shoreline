import type { AnyObject, ElementWithRef } from '@vtex/shoreline-utils'
import { mergeProps, mergeRefs } from '@vtex/shoreline-utils'
import type { ForwardedRef, ReactNode } from 'react'
import { Children, cloneElement } from 'react'

export function composeElement({ element, props, ref }: ComposeElementArgs) {
  const rootElement = Children.only(element) as ElementWithRef
  const {
    props: { children, ...ownProps },
    ref: ownRef,
  } = rootElement

  return cloneElement(rootElement, {
    ...mergeProps(props, ownProps),
    ref: ownRef ? mergeRefs(ref, ownRef) : ref,
  })
}

export interface ComposeElementArgs {
  element: ReactNode
  props: AnyObject
  ref: ForwardedRef<any>
}
