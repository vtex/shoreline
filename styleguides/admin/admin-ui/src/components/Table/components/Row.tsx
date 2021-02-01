import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-core'

import { Box } from '../../Box'
import { useStylesContext } from '../context'
import { Overridable } from '../../../types'

export const TableRow = forwardRef(function Tr(
  props: TableRowProps,
  ref: Ref<HTMLElement>
) {
  const { styleOverrides = {}, element = 'div', onClick, ...boxProps } = props

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
      themeKey={themeKey}
      element={element}
      styles={styleOverrides}
      {...boxProps}
    />
  )
})

export type TableRowProps = Overridable & {
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
