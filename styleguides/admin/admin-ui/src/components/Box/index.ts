import {
  forwardRef,
  Ref,
  ReactElement,
  ElementType,
  ComponentProps,
} from 'react'
import { Box as ReakitBox } from 'reakit'

import { jsxs, StyleProp, useSystem } from '../../system'

/**
 * box default element
 */
const defaultElement = 'div'

/**
 * Box is the most abstract component of admin-ui
 * It renders a div element by default
 */
export const Box: <E extends ElementType = typeof defaultElement>(
  props: BoxProps<E>
) => ReactElement | null = forwardRef(function Box(
  props: BoxOwnProps,
  ref: Ref<HTMLDivElement>
) {
  const { element = defaultElement, ...propsWithoutElement } = props
  const boxProps = useBox(propsWithoutElement)

  return jsxs({
    component: ReakitBox,
    props: boxProps,
    element,
    ref,
  })
})

export function useBox(props: BoxOwnProps) {
  const { themeKey, styles, className, ...htmlProps } = props
  const { cn , cx} = useSystem()

  const styledCn = cn({ ...styles, themeKey })

  return { ...htmlProps, className: cx(styledCn, className) }
}

export interface BoxOwnProps<E extends ElementType = ElementType> {
  /**
   * element that should be rendered
   * @default div
   */
  element?: E
  /**
   * styles of box
   * @default {}
   * @see https://admin-ui-docs.vercel.app/theming/style-object/
   */
  styles?: StyleProp
  /**
   * theme key to me consumed from admin-ui-theme
   * @private this is for internal usage only
   */
  themeKey?: string
  /**
   * component className
   */
  className?: string
}

export type BoxProps<E extends ElementType> = BoxOwnProps<E> &
  Omit<ComponentProps<E>, keyof BoxOwnProps | 'style'>
