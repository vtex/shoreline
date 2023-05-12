import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { useBulkActions } from './bulk-actions.state'
import { BulkActions } from './bulk-actions'
import { Flex } from '../flex'
import { Checkbox } from '../checkbox'
import { Button } from '../button'
import { Pagination, usePaginationState } from '../pagination'
import { IconCopy, IconPencil, IconTrash } from '@vtex/phosphor-icons'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/bulk-actions',
} as Meta

const items = [
  { id: 1, name: 'Batata' },
  { id: 2, name: 'Cenoura' },
  { id: 3, name: 'Abacate' },
  { id: 4, name: 'Pipoca' },
  { id: 5, name: 'Banana' },
  { id: 6, name: 'Maçã' },
  { id: 7, name: 'Melancia' },
  { id: 8, name: 'Cocada' },
  { id: 9, name: 'Cebola' },
  { id: 10, name: 'Colve' },
  { id: 11, name: 'Kiwi' },
]

export const Basic: Story = () => {
  const pagination = usePaginationState({ pageSize: 4, total: items.length })

  const pageItems = React.useMemo(
    () => items.slice(pagination.range[0] - 1, pagination.range[1]),
    [pagination.currentPage]
  )

  const state = useBulkActions({
    pageItems,
    pageSize: pageItems.length,
    totalItems: pagination.total,
  })

  return (
    <div className={csx({ margin: '$space-8' })}>
      <Flex>
        <Checkbox
          state={{
            value: state.allSelected || state.root,
            setValue: state.setRoot,
          }}
          disabled={state.allSelected}
        />
        Root
      </Flex>
      <ul>
        {pageItems.map((item) => (
          <Flex as="li" key={item.id}>
            <Checkbox
              value={item.id}
              state={{
                value:
                  (state.allSelected ? state.pageIds : null) ||
                  state.selectedItemsIds,
                setValue: state.setSelectedItemsIds,
              }}
              disabled={state.allSelected}
              label={item.name}
            />
          </Flex>
        ))}
      </ul>
      <BulkActions state={state}>
        <Button
          onClick={() => {
            // api call => state.selectedItems || allSelected
          }}
          variant="tertiary"
          icon={<IconPencil />}
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            // api call => state.selectedItems || allSelected
          }}
          variant="tertiary"
          icon={<IconCopy />}
        >
          Duplicate
        </Button>
        <Button
          onClick={() => {
            // api call => state.selectedItems || allSelected
          }}
          variant="criticalTertiary"
          icon={<IconTrash />}
        >
          Delete
        </Button>
      </BulkActions>
      <Pagination state={pagination} />
      <div>{state.getSelectedIds().join(',')}</div>
      <div>{state.allSelected ? 'all selected' : 'not all selected'}</div>
    </div>
  )
}
