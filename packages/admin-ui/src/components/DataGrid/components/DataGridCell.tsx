import { jsx } from '@vtex/admin-ui-react'

import type { DataGridColumn } from '../typings'

export const Cell = jsx('td')(
  {
    flex: 1,
    text: '$body',
    display: 'table-cell',
    borderBottom: '$neutral',
    verticalAlign: 'middle',
    paddingX: 2,
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
      const { onClick, csx, ...cellProps } = props

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
        onClick,
        csx: {
          minWidth: column?.width,
          maxWidth: column?.width,
          width: column?.width,
          ...clickableCsx,
          ...csx,
        },
      }
    },
    options: ['column'],
  }
)

Cell.defaultProps = {
  density: 'regular',
  role: 'cell',
}

export interface CellOptions {
  column: DataGridColumn<any>
}
