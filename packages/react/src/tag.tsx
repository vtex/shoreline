import React from 'react'
import { useSystem } from '@vtex/onda-core'
import { isFunction, capitalize } from '@vtex/onda-util'

import type { CsxCall, ExtractHTMLAttributes, RenderProp } from './types'
import type { DOMElements } from './domElements'
import { domElements } from './domElements'

/**
 * Creates onda jsx elements
 * @param type jsx tag
 * @example
 * const Box = _jsx('div')
 *
 * // with styles
 * <Box csx={{ bg: 'pink' }} />
 *
 * // polymorphism
 * import { Link } from 'gatsby'
 *
 * <Box as={Link} to="/">Gatsby Link</Box>
 */
function _tag<T extends React.ElementType, Props>(
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

  return React.forwardRef(Element) as unknown as OndaElement<T, Props>
}

/**
 * Onda jsx elements factory
 * @example
 * // standalone
 * const Box = tag('div')
 *
 * // rendering elements (you can replace div for any valid jsx tag)
 * <tag.div csx={{ color: 'pink' }}>Onda styled div</tag.div>
 *
 * // polymorphism
 * <tag.button as={ExternalLibButton} csx={{ bg: 'pink' }} >🦄 this is magic</tag.button>
 */
export const tag = _tag as typeof _tag &
  {
    [Tag in DOMElements]: OndaElement<Tag, {}>
  }

domElements.forEach((t) => {
  tag[t] = _tag(t)
})

export type OndaElement<T extends React.ElementType, Props> = {
  <TT extends React.ElementType>(
    props: ElementPropsWithAs<Props, TT> & { as: TT }
  ): JSX.Element
  (props: ElementPropsWithAs<Props, T>): JSX.Element
}

export type ElementPropsWithAs<Props, T extends React.ElementType> = Props &
  Omit<React.ComponentPropsWithRef<T>, 'as' | keyof Props> &
  CsxCall & {
    className?: string
    as?: T
    children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>
  }
