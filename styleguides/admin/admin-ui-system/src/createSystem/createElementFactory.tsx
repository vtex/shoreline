/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Ref,
  ReactNode,
  ComponentType,
  PropsWithChildren,
  ElementType,
} from 'react'

import { isFunction, cleanProps, merge } from '../util'

/**
 * calls react.createElement within a reakit component
 * @example
 * ```jsx
 * import { forwardRef } from 'react'
 * import { SomeReakitComponent } from 'reakit'
 * import { createElement } from 'system-next'
 *
 * cosnt NewComponent = forwardRef((props, ref) => (
 *  return createElement({
 *    component: SomeReakitComponent,
 *    element: 'div'
 *    ref
 *  })
 * ))
 * ```
 */
// export function createElement<T>(params: CreateElementParams<T>) {
//   const { children, component, htmlProps, element, ref } = params

//   /** ⤵️ Render props composition */
//   if (isFunction(children)) {
//     return children(htmlProps)
//   }

//   const safeProps = cleanProps(htmlProps, availableStyleProps)

//   return React.createElement(
//     component,
//     // ✨ Reakit as composition
//     // 🚫 components, just plain elements
//     { as: element, ...safeProps, ref },
//     children ?? safeProps?.children
//   )
// }

export function createElementFactory(coreProps: string[]) {
  return function createElement<T>(params: CreateElementParams<T>) {
    const { children, component, htmlProps, element, ref, state = {} } = params

    /** ⤵️ Render props composition */
    if (isFunction(children)) {
      return children(htmlProps)
    }

    const safeProps = cleanProps(htmlProps, coreProps)
    const componentProps = merge(safeProps, state)

    return React.createElement(
      component,
      // ✨ Reakit as composition
      // 🚫 components, just plain elements
      { as: element, ...componentProps, ref },
      children ?? safeProps?.children
    )
  }
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
  /**
   * reakit states
   */
  state?: any
}
