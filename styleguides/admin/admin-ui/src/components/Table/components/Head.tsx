import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-core'

import { Box } from '../../Box'
import { useStylesContext, CellRoleContext } from '../context'
import { SystemComponent } from '../../../types'

export const TableHead = forwardRef(function Thead(
  props: TableHeadProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'div', children, styleOverrides, ...boxProps } = props

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

export type TableHeadProps = SystemComponent & {
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
