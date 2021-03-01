import { ReactElement, ElementType, ComponentProps } from 'react'
import { Box as ReakitBox } from 'reakit'
import { useSystem, createComponent } from '@vtex/admin-core'
import { SystemPrimitive } from '../types'

/**
 * primitive default element
 */
const defaultElement = 'div'

/**
 * primitive is the most abstract component of admin-ui
 * it renders a div element by default
 */
export const Primitive: <E extends ElementType = typeof defaultElement>(
  props: PrimitiveProps<E>
) => ReactElement | null = createComponent(ReakitBox, usePrimitive)

/**
 * hook that isolates the Primitive behavior
 * @param props
 */
export function usePrimitive(props: PrimitiveOwnProps) {
  const { element = defaultElement, ...rest } = props
  const elementProps = usePrimitiveStyle(rest)

  return { ...elementProps, as: element as any }
}

/**
 * hook that isolates the primitive style
 * @param props
 */
export function usePrimitiveStyle(props: Omit<PrimitiveOwnProps, 'element'>) {
  const { themeKey, csx, className, ...htmlProps } = props
  const { cn, cx } = useSystem()
  const styledCn = cn({ ...csx, themeKey })

  return { ...htmlProps, className: cx(styledCn, className) }
}

export interface PrimitiveOwnProps<E extends ElementType = ElementType>
  extends SystemPrimitive {
  /**
   * element that should be rendered
   * @default div
   */
  element?: E
  /**
   * theme key to me consumed from admin-ui-theme
   * @private this is for internal usage only
   */
  themeKey?: string | Record<string, Record<string, string>>
  /**
   * component className
   */
  className?: string
}

export type PrimitiveProps<E extends ElementType> = PrimitiveOwnProps<E> &
  Omit<ComponentProps<E>, keyof PrimitiveOwnProps | 'style'>
