/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {
  Ref,
  ReactNode,
  PropsWithChildren,
  ElementType,
  Attributes,
  FunctionComponent,
  ComponentClass,
  ReactElement,
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
 *  return jsx({
 *    component: SomeReakitComponent,
 *    element: 'div'
 *    ref
 *  })
 * ))
 * ```
 */
export function jsxs<P extends {}>(params: JSXSParams<P>): ReactElement<P> {
  const { children, component, props, element, ref } = params

  /** ⤵️ Render props composition */
  if (isFunction(children)) {
    return children(props)
  }

  return React.createElement(
    component,
    // ✨ Reakit as composition
    // 🚫 components, just plain elements
    { as: element, ...(props as any), ref },
    children ?? props?.children
  )
}

export interface JSXSParams<P> {
  /**
   * base component
   * * ✅ do: pass a reakit component
   */
  component: FunctionComponent<P> | ComponentClass<P> | string
  /**
   * optional children
   * * ℹ️ normally it comes within htmlProps
   */
  children?: ReactNode | ((props?: P) => JSX.Element)
  /**
   * tag to render
   * * ✅ do: pass a string of a valid html element
   * ! 🚫 dont: pass components
   */
  element?: ElementType
  /**
   * * HTMLProps
   */
  props?: PropsWithChildren<(Attributes & P) | null>
  /**
   * ref to dom node
   */
  ref?: Ref<HTMLElement>
}
