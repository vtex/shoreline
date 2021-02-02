import { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'

import { OmitNotAllowedProps, Overridable } from '../../types'
import { Primitive, PrimitiveProps } from '../Primitive'

/**
 * Component to add links within an admin page
 */
export const Anchor = createComponent(Primitive, useAnchor)

function useAnchor(props: AnchorProps): PrimitiveProps<'a'> {
  const { styleOverrides, ...primitiveProps } = props

  return {
    styles: styleOverrides,
    element: 'a',
    themeKey: 'components.anchor',
    ...primitiveProps,
  }
}

export interface AnchorProps
  extends Overridable,
    OmitNotAllowedProps<
      React.DetailedHTMLProps<
        React.AnchorHTMLAttributes<HTMLAnchorElement>,
        HTMLAnchorElement
      >
    > {
  /**
   * anchor children
   */
  children?: ReactNode
}
