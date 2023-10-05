import type { ForwardedRef, ReactNode } from 'react'
import { Children, cloneElement } from 'react'
import type { AnyObject, ElementWithRef, RenderProps } from './utility-types'
import { mergeProps } from './merge-props'
import { mergeRefs } from './merge-refs'

export function composeElement(props: ComposeElementArgs) {
  const { element, props: rootProps, ref, renderChildren } = props

  const rootElement = Children.only(element) as ElementWithRef
  const {
    props: { children, ...ownProps },
    ref: ownRef,
  } = rootElement

  return cloneElement(rootElement, {
    ...mergeProps(rootProps, ownProps),
    ref: ownRef ? mergeRefs(ref, ownRef) : ref,
    children: renderChildren?.(children) ?? children,
  })
}

interface ComposeElementArgs {
  element: ReactNode
  props: AnyObject
  ref: ForwardedRef<any>
  renderChildren?: RenderProps
}
