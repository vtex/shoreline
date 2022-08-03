import React from 'react'
import type { Story, Meta } from '@storybook/react'

import { useBulkActions } from './bulk-actions.state'
import { BulkActions } from './bulk-actions'
import { Box } from '../box'
import { Flex } from '../flex'
import { Checkbox } from '../checkbox'
import { Button } from '../button'
import { Pagination, usePaginationState } from '../components/Pagination'

import { IconCopy, IconPencil, IconTrash } from '@vtex/phosphor-icons'

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

  const pageItems = items.slice(pagination.range[0] - 1, pagination.range[1])

  const state = useBulkActions({
    pageItems,
    currentPage: pagination.currentPage,
    totalItems: items.length,
  })

  return (
    <Box csx={{ margin: 8 }}>
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
      <Box as="ul">
        {pageItems.map((item) => (
          <Flex as="li" key={item.id}>
            <Checkbox
              value={item.id}
              checked={state.allSelected || state.isItemSelected(item)}
              onChange={() => {
                state.toggleItem(item)
              }}
              label={item.name}
            />
          </Flex>
        ))}
      </Box>
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
      <Pagination
        state={pagination}
        preposition="of"
        subject="results"
        prevLabel="Previous"
        nextLabel="Next"
      />
      <Box>{state.selectedItems.map((i) => i.name).join(',')}</Box>
      <Box>{state.allSelected ? 'all selected' : 'not all selected'}</Box>
    </Box>
  )
}
