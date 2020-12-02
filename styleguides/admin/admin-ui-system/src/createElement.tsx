/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Ref,
  ReactNode,
  ComponentType,
  PropsWithChildren,
  ElementType,
} from 'react'

import { isFunction } from './util'

/**
 * calls react.createElement within a reakit component
 * @example
 * ```jsx
 * import { forwardRef } from 'react'
 * import { SomeReakitComponent } from 'reakit'
 * import { createElement } from '@vtex/admin-ui-sytem'
 *
 * cosnt Element = forwardRef((props, ref) => (
 *  return createElement({
 *    component: SomeReakitComponent,
 *    element: 'div'
 *    ref
 *  })
 * ))
 * ```
 */
export function createElement<T>(params: CreateElementParams<T>) {
  const { children, component, htmlProps, element, ref } = params

  /** ⤵️ Render props composition */
  if (isFunction(children)) {
    return children(htmlProps)
  }

  return React.createElement(
    component,
    // ✨ Reakit as composition
    // 🚫 components, just plain elements
    { as: element, ...(htmlProps as any), ref },
    children ?? htmlProps?.children
  )
}

export interface CreateElementParams<T> {
  /**
   * base component
   * * ✅ do: pass a reakit component
   */
  component: string | ComponentType<T>
  /**
   * optional children
   * * ℹ️ normally it comes within htmlProps
   */
  children?: ReactNode | ((props?: T) => JSX.Element)
  /**
   * tag to render
   * * ✅ do: pass a string of a valid html element
   * ! 🚫 dont: pass components
   */
  element?: ElementType
  /**
   * * HTMLProps
   */
  htmlProps?: PropsWithChildren<T>
  /**
   * ref to dom node
   */
  ref?: Ref<HTMLElement>
}
