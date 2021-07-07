import { jsx } from '@vtex/onda-react'

import { Column } from '../typings'
import { useCellRoleContext } from '../context'

export const Cell = jsx.td(
  {
    flex: 1,
    borderBottomWidth: 1,
    fontSize: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: 'mid.tertiary',
    display: 'table-cell',
    verticalAlign: 'middle',
    paddingX: 2,
    variant: 'text.body',
    '[role="columnheader"]': {
      height: 48
    },
    variants: {
      density: {
        regular: {
          height: 80,
        },
        compact: {
          height: 48,
        },
        variable: {
          verticalAlign: 'top',
          minHeight: 48,
          paddingY: 4,
        },
      },
    },
  },
  {
    useOptions: (options: CellOptions, props) => {
      const { column } = options
      const { onClick, ...cellProps } = props

      const role = useCellRoleContext()

      const clickableCsx = onClick
        ? {
            cursor: 'pointer',
            userSelect: 'none',
            ':focus:not([data-focus-visible-added])': {
              outline: 'none',
              boxShadow: 'none',
            },
            ':focus': {
              outlineColor: 'focus',
            },
          }
        : {}

      return {
        ...cellProps,
        role,
        csx: {
          minWidth: column?.width,
          maxWidth: column?.width,
          ...clickableCsx,
        },
      }
    },
    options: ['column'],
  }
)

Cell.defaultProps = {
  density: 'regular',
}

export interface CellOptions {
  column: Column<any>
}
