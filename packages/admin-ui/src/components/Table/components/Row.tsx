import type { ElementType, ReactNode, Ref } from 'react'
import React from 'react'
import { forwardRef } from '@vtex/admin-core'
import { Box } from '@vtex/admin-primitives'

import { useStylesContext } from '../context'
import type { SystemComponent } from '../../../types'

export const TableRow = forwardRef(function Tr(
  props: TableRowProps,
  ref: Ref<HTMLElement>
) {
  const { csx = {}, element = 'div', onClick, ...boxProps } = props

  const { variants, dir } = useStylesContext()
  const themeKey = onClick
    ? `${variants.rowClickable}-${dir}`
    : `${variants.row}-${dir}`

  return (
    <Box
      ref={ref}
      dir={dir}
      role="row"
      onClick={onClick}
      element={element}
      csx={{ themeKey, ...csx }}
      {...boxProps}
    />
  )
})

export type TableRowProps = SystemComponent & {
  /**
   * element to be rendered
   * @default div
   */
  element?: ElementType
  /**
   * children
   */
  children?: ReactNode
  /**
   * html id
   */
  id?: string
  /**
   * row ref
   */
  ref?: Ref<HTMLElement>
  /**
   * action to dispatch on click
   */
  onClick?: () => void
}
