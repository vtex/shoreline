import React, { forwardRef } from 'react'
import type { HTMLProps } from 'react'
import type { AnyObject } from '@vtex/admin-ui-util'
import { hasOwnProperty } from '@vtex/admin-ui-util'
import type { StyleProp } from '@vtex/admin-ui-core'

import { useSystem } from './context'
import type { __element } from './symbols'

export interface SystemStyles {
  baseStyle?: StyleProp
  csx?: StyleProp
  css?: any
}

export type ComponentStyleProps = Omit<SystemStyles, 'baseStyle'>

export type RenderProp<P = AnyObject> = (props: P) => JSX.Element | null

type MergeLeft<A, B> = A & Omit<B, keyof A>

type Join<A, B> = A & B

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements

export type ComponentInfer<T> = T extends
  | IntrinsicElementsKeys
  | React.ComponentType<any>
  ? T
  : never

export type ComponentInference<
  T extends React.ElementType,
  Props extends {} = {}
> = T extends string
  ? AdminUIElement<T, Props>
  : T extends {
      [__element]: infer TT
    }
  ? AdminUIElement<TT, Props>
  : AdminUIComponent<T, Props>

export interface AdminUIElement<Type, Props extends {}>
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
  [__element]: Type
}

export interface AdminUIComponent<Type, Props extends {}>
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
  [__element]: Type
}

type PrivateProps<
  As extends React.ElementType,
  P extends {}
> = As extends string
  ? MergeLeft<P, React.HTMLProps<As>> & SystemStyles & P
  : MergeLeft<P, React.ComponentPropsWithRef<As>> & SystemStyles & P

type PublicProps<As extends React.ElementType> = PrivateProps<As, {}>

export type Hook<As extends React.ElementType, P extends {}> = {
  (props?: PrivateProps<As, P>): PublicProps<As>
  displayName?: string
}

export function isRenderProp(children: any): children is RenderProp {
  return typeof children === 'function'
}

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

export function createComponent<
  As extends React.ElementType,
  P extends {} = {}
>(render: (props: PrivateProps<As, P>) => JSX.Element | null) {
  const AdminUIComponent = (props: any, ref: React.Ref<any>) =>
    render({ ref, ...props })

  return forwardRef(AdminUIComponent) as unknown as ComponentInference<As, P>
}

export function createHook<As extends React.ElementType, P extends {} = {}>(
  useProps: (props: any) => HTMLProps<As> & SystemStyles
) {
  const useComponent = (props: any) => {
    const htmlProps = useProps(props)
    const copy = {} as typeof htmlProps

    for (const prop in htmlProps) {
      if (hasOwnProperty(htmlProps, prop) && htmlProps[prop] !== undefined) {
        copy[prop] = htmlProps[prop]
      }
    }

    return copy
  }

  return useComponent as Hook<As, P>
}
