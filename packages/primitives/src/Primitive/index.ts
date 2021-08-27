import type { ReactElement, ElementType, ComponentProps } from 'react'
import { Box as ReakitBox } from 'reakit'
import { useSystem } from '@vtex/admin-ui-core'
import { createComponent } from '@vtex/admin-jsxs'

import type { SystemPrimitive } from '../types'

/**
 * primitive default element
 */
export const defaultElement = 'div'

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

  return { ...elementProps, as: element as string }
}

/**
 * hook that isolates the primitive style
 * @param props
 */
export function usePrimitiveStyle(props: Omit<PrimitiveOwnProps, 'element'>) {
  const { csx = {}, className, ...htmlProps } = props
  const { cn, cx } = useSystem()

  return { ...htmlProps, className: cx(cn(csx), className) }
}

export interface PrimitiveOwnProps<E extends ElementType = ElementType>
  extends SystemPrimitive {
  /**
   * element that should be rendered
   * @default div
   */
  element?: E
  /**
   * component className
   */
  className?: string
}

export type PrimitiveProps<E extends ElementType> = PrimitiveOwnProps<E> &
  Omit<ComponentProps<E>, keyof PrimitiveOwnProps>
