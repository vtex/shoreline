import React, { ElementType, ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-core'

import { Box } from '@vtex/admin-primitives'
import { useStylesContext, CellRoleContext } from '../context'
import { SystemComponent } from '../../../types'

export const TableBody = forwardRef(function Tbody(
  props: TableBodyProps,
  ref: Ref<HTMLElement>
) {
  const { element = 'div', children, csx = {}, ...boxProps } = props

  const { dir, variants } = useStylesContext()

  return (
    <Box
      element={element}
      ref={ref}
      role="rowgroup"
      dir={dir}
      csx={{ themeKey: variants.body, ...csx }}
      {...boxProps}
    >
      <CellRoleContext.Provider value="cell">
        {children}
      </CellRoleContext.Provider>
    </Box>
  )
})

export type TableBodyProps = SystemComponent & {
  /**
   * Element to be rendered
   * @default div
   */
  element?: ElementType
  /**
   * children
   * should contain rows
   */
  children?: ReactNode
  /**
   * html id
   */
  id?: string
  /**
   * body ref
   */
  ref?: Ref<HTMLElement>
}
