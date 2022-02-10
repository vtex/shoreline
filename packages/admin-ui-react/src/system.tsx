import React, { forwardRef } from 'react'
import type { ElementType, HTMLProps, ComponentProps, ReactNode } from 'react'
import type { AnyObject } from '@vtex/admin-ui-util'
import { hasOwnProperty } from '@vtex/admin-ui-util'
import type { StyleProp } from '@vtex/admin-ui-core'
import { useSystem } from './context'

export interface SystemStyles {
  baseStyle?: StyleProp
  csx?: StyleProp
  css?: any
}

export type RenderProp<P = AnyObject> = (props: P) => JSX.Element | null

export type Props<T extends {}> = HTMLProps<T>

export type Component<
  P extends {} = {},
  T extends ElementType | null = null
> = {
  (
    props: T extends ElementType
      ? Omit<Props<T>, keyof P | 'children'> &
          Omit<SystemStyles, 'baseStyle'> &
          P & {
            children:
              | ReactNode
              | RenderProp<Omit<Props<T>, keyof P | 'ref'> & P>
          }
      : Omit<SystemStyles, 'baseStyle'> & P
  ): JSX.Element | null
  defaultProps?: T extends ElementType
    ? Omit<Props<T>, keyof P> & Omit<SystemStyles, 'baseStyle'> & P
    : Omit<SystemStyles, 'baseStyle'> & P
  displayName?: string
}

export type Hook<P extends {} = {}, T extends ElementType | null = null> = {
  (
    props?: T extends ElementType
      ? Omit<Props<T>, keyof P> & SystemStyles & P
      : SystemStyles & P
  ): T extends ElementType ? HTMLProps<T> & SystemStyles : SystemStyles
  displayName?: string
}

export function isRenderProp(children: any): children is RenderProp {
  return typeof children === 'function'
}

export function useElement<T extends ElementType = 'div'>(
  Type: T,
  props: T extends string
    ? HTMLProps<T> & SystemStyles
    : ComponentProps<T> & SystemStyles
) {
  const {
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

  const Component = Type as any

  return <Component {...htmlProps} />
}

export function createComponent<
  P extends {} = {},
  T extends ElementType | null = null
>(
  render: (
    props: T extends ElementType
      ? Omit<Props<T>, keyof P> & SystemStyles & P
      : SystemStyles & P
  ) => JSX.Element | null
) {
  const AdminUIComponent = (props: any, ref: React.Ref<any>) =>
    render({ ref, ...props })

  return forwardRef(AdminUIComponent) as unknown as Component<P, T>
}

export function createHook<
  P extends {} = {},
  T extends ElementType | null = null
>(
  useProps: (
    props: T extends ElementType
      ? Omit<Props<T>, keyof P> & SystemStyles & P
      : SystemStyles & P
  ) => HTMLProps<T> & SystemStyles
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

  return useComponent as Hook<P, T>
}
