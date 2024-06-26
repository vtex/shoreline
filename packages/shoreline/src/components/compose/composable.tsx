import type { RenderProps } from '@vtex/shoreline-utils'
import type { ReactElement, ReactNode } from 'react'
import { isValidElement } from 'react'

/**
 * Defines a composable child inside of a Compose component
 * @example
 * function Button({ asChild, children, ...props }){
 *  const Composition = asChild ? Compose : 'button'
 *  return (
 *    <Composition {...props}>
 *      Prefix <Composable>{children}</Composable>
 *    </Composition>
 *  )
 * }
 */
export function Composable(props: ComposableProps) {
  const { render = (node) => <>{node}</>, children } = props

  return <>{render(children)}</>
}

export function isComposable(child: ReactNode): child is ReactElement {
  return isValidElement(child) && child.type === Composable
}

export interface ComposableOptions {
  /**
   * Render function. Use it to wrap the root with containers
   */
  render?: RenderProps
  /**
   * Defines the composition root
   */
  children: ReactNode
}

export type ComposableProps = ComposableOptions
