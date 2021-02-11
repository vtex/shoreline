import { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'

import { SystemComponent } from '../../types'
import { Primitive } from '../Primitive'

export const Heading = createComponent(Primitive, useHeading)

export function useHeading(props: HeadingProps) {
  const { styleOverrides, element = 'h1', ...htmlProps } = props

  return {
    element,
    styles: {
      text: 'headline',
      ...styleOverrides,
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
