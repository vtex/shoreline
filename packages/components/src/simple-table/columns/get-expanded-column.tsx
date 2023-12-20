import React from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { IconCaretDown, IconCaretRight } from '@vtex/shoreline-icons'

import { Action } from '../../action'
import { VisuallyHidden } from '../../visually-hidden'
import { Bleed } from '../../bleed'

export function getExpandedColumn<T>(): ColumnDef<T> {
  return {
    id: 'sl-expanded-column',
    header: () => <VisuallyHidden>Expand</VisuallyHidden>,
    cell: ({ row }) => {
      return (
        row.getCanExpand() && (
          <Bleed horizontal="0.5rem" vertical="0.5rem">
            <Action
              label="Expand row"
              onClick={row.getToggleExpandedHandler()}
              iconOnly
            >
              {row.getIsExpanded() ? <IconCaretDown /> : <IconCaretRight />}
            </Action>
          </Bleed>
        )
      )
    },
  }
}
