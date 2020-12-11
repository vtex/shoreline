import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-ui-system'

import { Box } from '../../Box'
import { useStylesContext } from '../context'
import { Overridable } from '../../../types'

export const TableRow = forwardRef(function Tr(
  props: TableRowProps,
  ref: Ref<HTMLElement>
) {
  const { styleOverrides = {}, element = 'div', ...boxProps } = props

  const { variants, dir } = useStylesContext()

  return (
    <Box
      ref={ref}
      dir={dir}
      role="row"
      themeKey={`${variants.row}-${dir}`}
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
}
