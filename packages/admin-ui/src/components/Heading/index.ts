import type { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'
import { Primitive } from '@vtex/admin-primitives'

import type { SystemComponent } from '../../types'

export const Heading = createComponent(Primitive, useHeading)

export function useHeading(props: HeadingProps) {
  const { csx, element = 'h1', ...htmlProps } = props

  return {
    element,
    csx: {
      text: 'headline',
      ...csx,
    },
    ...htmlProps,
  }
}

export interface HeadingProps extends SystemComponent {
  /**
   * Element to render
   * @default h1
   */
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  /**
   * heading children
   */
  children?: ReactNode
}
