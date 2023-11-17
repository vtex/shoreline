import type { ReactNode } from 'react'
import React, { Children, isValidElement, cloneElement, Fragment } from 'react'
import type { RenderProps } from '@vtex/shoreline-utils'

import { isComposable } from './composable'
import type { ComposeElementArgs } from './compose-element'
import { composeElement } from './compose-element'

/**
 * Create a <Compose> instance
 */
export function createComposition({ props, ref, element }: ComposeElementArgs) {
  const childrenArray = Children.toArray(element)
  const composableElement = childrenArray.find(isComposable)

  if (composableElement) {
    const newElement = composableElement.props.children as ReactNode
    const render = composableElement.props.render as RenderProps

    const newChildren = childrenArray.map((child) => {
      if (child === composableElement) {
        if (Children.count(newElement) > 1) return Children.only(null)

        if (!isValidElement(newElement)) return null

        const {
          props: { children },
        } = newElement

        if (render) {
          return <Fragment key={child.key}>{render(children)}</Fragment>
        }

        return children
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
