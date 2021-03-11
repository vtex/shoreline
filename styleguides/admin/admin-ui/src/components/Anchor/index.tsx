import { ReactNode } from 'react'
import { createComponent } from '@vtex/admin-core'

import { SystemComponentProps } from '../../types'
import { Primitive, PrimitiveProps } from '@vtex/admin-primitives'

/**
 * Component to add links within an admin page
 */
export const Anchor = createComponent(Primitive, useAnchor)

function useAnchor(props: AnchorProps): PrimitiveProps<'a'> {
  const { csx, ...primitiveProps } = props

  return {
    element: 'a',
    csx: {
      themeKey: 'components.anchor',
      ...csx,
    },
    ...primitiveProps,
  }
}

type AnchorOwnProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>

export interface AnchorProps extends SystemComponentProps<AnchorOwnProps> {
  /**
   * anchor children
   */
  children?: ReactNode
}
