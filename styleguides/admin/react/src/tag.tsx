import React, { ComponentPropsWithoutRef } from 'react'
import { StyleObject, useSystem } from '@vtex/admin-core'
import { isFunction, capitalize } from '@vtex/onda-util'

import { As, ExtractHTMLAttributes, RenderProp } from './types'
import { DOMElements, domElements } from './domElements'

/**
 * Creates onda jsx elements
 * @param type jsx tag
 * @example
 * const Box = createElement('div')
 *
 * // with styles
 * <Box csx={{ bg: 'pink' }} />
 *
 * // polymorphism
 * import { Link } from 'gatsby'
 *
 * <Box as={Link} to="/">Gatsby Link</Box>
 */
export function createElement<T extends As, Props>(
  type: T
): OndaElement<T, Props> {
  function Element(props: ElementPropsWithAs<Props, T>, ref: React.Ref<T>) {
    const {
      as: ElementCall = type,
      children,
      className,
      csx = {},
      ...forwardProps
    } = props
    const { cn, cx } = useSystem()

    return (
      <ElementCall
        ref={ref}
        className={cx(className, cn(csx))}
        {...(forwardProps as any)}
      >
        {isFunction(children) ? children(forwardProps) : children}
      </ElementCall>
    )
  }

  Element.displayName = capitalize(String(type) ?? 'Onda')

  return (React.forwardRef(Element) as unknown) as OndaElement<T, Props>
}

/**
 * Onda jsx elements factory
 * @example
 * // rendering elements (you can replace div for any valid jsx tag)
 * <tag.div csx={{ color: 'pink' }}>Onda styled div</tag.div>
 *
 * // polymorphism
 * <tag.button as={ExternalLibButton} csx={{ bg: 'pink' }} >🦄 this is magic</tag.button>
 */
export const tag = createElement as InlineCreateComponent & HTMLAdminComponents

domElements.forEach((t) => {
  tag[t] = createElement(t)
})

export type HTMLAdminComponents = {
  [Tag in DOMElements]: OndaElement<Tag, {}>
}

export type InlineCreateComponent = {
  <T extends As>(type: T): OndaElement<T, {}>
}

export type OndaElement<T extends As, Props> = {
  <TT extends As>(
    props: ElementPropsWithAs<Props, TT> & { as: TT }
  ): JSX.Element
  (props: ElementPropsWithAs<Props, T>): JSX.Element
}

export type ElementPropsWithAs<Props, T extends As> = Props &
  Omit<ComponentPropsWithoutRef<T>, 'as' | keyof Props> & {
    csx?: StyleObject
    className?: string
    css?: any
    as?: T
    children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>
  }
