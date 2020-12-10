import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-ui-system'

import { Box } from '../../Box'
import { useStylesContext, CellRoleContext } from '../context'
import { Overridable } from '../../../types'

export const TableHead = forwardRef(function Thead(
  props: TableHeadProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'header', children, styleOverrides, ...boxProps } = props

  const { dir, variants } = useStylesContext()

  return (
    <Box
      element={element}
      ref={ref}
      themeKey={variants.header}
      styles={styleOverrides}
      role="rowgroup"
      dir={dir}
      {...boxProps}
    >
      <CellRoleContext.Provider value="columnheader">
        {children}
      </CellRoleContext.Provider>
    </Box>
  )
})

export type TableHeadProps = Overridable & {
  /**
   * element to be rendered
   * @default header
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
   * head ref
   */
  ref?: Ref<HTMLElement>
}
