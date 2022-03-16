import React, { forwardRef } from 'react'

import { useSystem } from './context'
import type { RenderProp, PublicProps, PrivateProps, Component } from './types'

function isRenderProp(children: any): children is RenderProp {
  return typeof children === 'function'
}

/**
 * Create an element that has base styles and supports 'as', and render props
 * @example
 * useElement('div', {})
 * useElement(Component, {})
 */
export function useElement<T extends React.ElementType>(
  Type: T,
  props: PublicProps<T>
) {
  const {
    as: As,
    baseStyle = {},
    csx: customStyle = {},
    className: htmlClassName = '',
    ...rest
  } = props

  const { cn, cx } = useSystem()
  const className = cx(cn(baseStyle), cn(customStyle), htmlClassName)

  const htmlProps = {
    className,
    ...rest,
  }

  if (isRenderProp(htmlProps.children)) {
    const { children, ...propsWithoutChildren } = htmlProps

    return children(propsWithoutChildren)
  }

  if (As) {
    return <As {...htmlProps} />
  }

  const Component = Type as any

  return <Component {...htmlProps} />
}

/**
 * Create a component typed with the as prop & admin-ui styles
 * @example
 * type Props = {}
 * const Component = createComponent<'element or component', Props>(props => {
 *  return useElement('element or component', props)
 * })
 */
export function createComponent<
  As extends React.ElementType,
  P extends {} = {}
>(
  render: (props: PrivateProps<As, P>) => JSX.Element | null
): Component<As, P> {
  const AdminUIComponent = (props: any, ref: React.Ref<any>) =>
    render({ ref, ...props })

  return forwardRef(AdminUIComponent) as unknown as Component<As, P>
}

type Hook<As extends React.ElementType, P extends {}> = {
  /**
   * Describe the hook behavior
   */
  (props: PrivateProps<As, P>): PublicProps<As>
}

/**
 * Create a hook to hold a component behavior
 * @example
 * type Props = {}
 * const useComponent = createHook<'element or component', Props>(props => props)
 */
export function createHook<As extends React.ElementType, P extends {} = {}>(
  useProps: (props: PrivateProps<As, P>) => PublicProps<As>
): Hook<As, P> {
  const useComponent: Hook<As, P> = (props) => {
    const htmlProps = useProps(props)
    const copy = {} as typeof htmlProps

    for (const prop in htmlProps) {
      if (htmlProps?.[prop] !== undefined) {
        copy[prop] = htmlProps[prop]
      }
    }

    return copy
  }

  return useComponent
}
