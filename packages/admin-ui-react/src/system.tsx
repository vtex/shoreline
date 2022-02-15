import React, { forwardRef } from 'react'
import type { AnyObject } from '@vtex/admin-ui-util'
import { hasOwnProperty } from '@vtex/admin-ui-util'
import type { StyleProp } from '@vtex/admin-ui-core'

import { useSystem } from './context'

const __as = Symbol('cached type')

interface SystemStyles {
  baseStyle?: StyleProp
  csx?: StyleProp
  css?: any
}

type ComponentStyleProps = Omit<SystemStyles, 'baseStyle'>

type RenderProp<P = AnyObject> = (props: P) => JSX.Element | null

type MergeLeft<A, B> = A & Omit<B, keyof A>

type Join<A, B> = A & B

type IntrinsicElementsKeys = keyof JSX.IntrinsicElements

type ComponentInfer<T> = T extends
  | IntrinsicElementsKeys
  | React.ComponentType<any>
  ? T
  : never

/**
 * Props that form the componets internally
 */
type PrivateProps<
  As extends React.ElementType,
  P extends {}
> = As extends string
  ? MergeLeft<P, React.HTMLProps<As>> & SystemStyles & P
  : MergeLeft<P, React.ComponentPropsWithRef<As>> & SystemStyles & P

/**
 * Props that are called by the user
 */
type PublicProps<As extends React.ElementType> = PrivateProps<As, {}>

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

interface AdminUIElement<Type, Props extends {}>
  extends React.ForwardRefExoticComponent<
    Join<
      MergeLeft<
        Props,
        Omit<React.ComponentPropsWithRef<ComponentInfer<Type>>, 'as'>
      >,
      ComponentStyleProps
    >
  > {
  /**
   * Prioritize elements over components
   * @example
   * const Button = jsx('button')()
   *
   * <Button href="" /> // 🚨 type error
   * <Button as="a" href="" /> // ✅ all good
   */
  <
    El extends IntrinsicElementsKeys = Type extends IntrinsicElementsKeys
      ? Type
      : never
  >(
    props: Join<
      MergeLeft<MergeLeft<{ as?: El }, Props>, React.ComponentPropsWithRef<El>>,
      ComponentStyleProps
    >
  ): JSX.Element
  /**
   * Handle a component type
   * @example
   * const Button = jsx('button')()
   *
   * <Button to="" /> // 🚨 type error
   * <Button as={GatsbyLink} to="" /> // ✅ all good
   */
  <
    As extends React.ComponentType = Type extends React.ComponentType
      ? Type
      : never
  >(
    props: Join<
      MergeLeft<MergeLeft<{ as: As }, Props>, React.ComponentPropsWithRef<As>>,
      ComponentStyleProps
    >
  ): JSX.Element
  displayName?: string
  [__as]: Type
}

interface AdminUIComponent<Type, Props extends {}>
  extends React.ForwardRefExoticComponent<
    Join<
      MergeLeft<
        Props,
        Omit<React.ComponentPropsWithRef<ComponentInfer<Type>>, 'as'>
      >,
      ComponentStyleProps
    >
  > {
  /**
   * Handle a component type
   * @example
   * const Button = jsx('button')()
   *
   * <Button to="" /> // 🚨 type error
   * <Button as={GatsbyLink} to="" /> // ✅ all good
   */
  <
    As extends React.ComponentType = Type extends React.ComponentType
      ? Type
      : never
  >(
    props: Join<
      MergeLeft<MergeLeft<{ as?: As }, Props>, React.ComponentPropsWithRef<As>>,
      ComponentStyleProps
    >
  ): JSX.Element

  /**
   * Prioritize elements over components
   * @example
   * const Button = jsx('button')()
   *
   * <Button href="" /> // 🚨 type error
   * <Button as="a" href="" /> // ✅ all good
   */
  <
    El extends IntrinsicElementsKeys = Type extends IntrinsicElementsKeys
      ? Type
      : never
  >(
    props: Join<
      MergeLeft<MergeLeft<{ as: El }, Props>, React.ComponentPropsWithRef<El>>,
      ComponentStyleProps
    >
  ): JSX.Element
  displayName?: string
  [__as]: Type
}

type Component<
  T extends React.ElementType,
  Props extends {} = {}
> = T extends string
  ? AdminUIElement<T, Props>
  : T extends {
      [__as]: infer TT
    }
  ? AdminUIElement<TT, Props>
  : AdminUIComponent<T, Props>

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
      if (hasOwnProperty(htmlProps, prop) && htmlProps[prop] !== undefined) {
        copy[prop] = htmlProps[prop]
      }
    }

    return copy
  }

  return useComponent
}
