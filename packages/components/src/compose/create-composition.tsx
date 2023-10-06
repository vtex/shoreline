import { Children, isValidElement, cloneElement } from 'react'
import { isComposable } from './composable'
import type { ComposeElementArgs } from './compose-element'
import { composeElement } from './compose-element'

export function createComposition({ props, ref, element }: ComposeElementArgs) {
  const childrenArray = Children.toArray(element)
  const composableElement = childrenArray.find(isComposable)

  if (composableElement) {
    const newElement = composableElement.props.children as React.ReactNode

    const newChildren = childrenArray.map((child) => {
      if (child === composableElement) {
        if (Children.count(newElement) > 1) return Children.only(null)

        return isValidElement(newElement)
          ? (newElement.props.children as React.ReactNode)
          : null
      }

      return child
    })

    return composeElement({
      element: cloneElement(newElement as any, undefined, newChildren),
      ref,
      props,
    })
  }

  return composeElement({
    element,
    props,
    ref,
  })
}
