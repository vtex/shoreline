import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { IconCaretDown, IconCaretRight } from '@vtex/shoreline-icons'
import { VisuallyHidden, IconButton } from '@vtex/shoreline-components'

export function getExpandedColumn<T>(): ColumnDef<T> {
  return {
    id: 'sl-expanded-column',
    header: () => <VisuallyHidden>Expand</VisuallyHidden>,
    cell: ({ row }) => {
      return (
        row.getCanExpand() && (
          <IconButton
            variant="tertiary"
            label="Expand row"
            onClick={row.getToggleExpandedHandler()}
          >
            {row.getIsExpanded() ? <IconCaretDown /> : <IconCaretRight />}
          </IconButton>
        )
      )
    },
  }
}