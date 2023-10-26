import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { IconCaretDown, IconCaretRight } from '@vtex/shoreline-icons'

import { Action } from '../../action'
import { VisuallyHidden } from '../../visually-hidden'

export function getExpandedColumn<T>(): ColumnDef<T> {
  return {
    id: 'sl-expanded-column',
    header: () => <VisuallyHidden>Expand</VisuallyHidden>,
    cell: ({ row }) => {
      return (
        row.getCanExpand() && (
          <Action
            label="Expand row"
            onClick={row.getToggleExpandedHandler()}
            iconOnly
          >
            {row.getIsExpanded() ? <IconCaretDown /> : <IconCaretRight />}
          </Action>
        )
      )
    },
  }
}
