import type { ReactNode } from 'react'
import React from 'react'

import type { BulkActionsState } from './bulk-actions.state'
import { Inline } from '../inline'
import { Flex } from '../flex'
import { Button } from '../button'
import { Text } from '../components/Text'

interface BulkActionsProps {
  state: BulkActionsState<any>
  children: ReactNode
}

export function BulkActions(props: BulkActionsProps) {
  const { children, state } = props

  const { allSelected, totalItems, selectedItems, selectAll } = state

  return (
    <Flex justify="center">
      <Inline
        hSpace="$2xl"
        spaceInside
        csx={{
          width: 'fit-content',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '$l',
          bg: '$primary',
          border: '$neutral',
          borderRadius: '$default',
        }}
      >
        <Inline
          hSpace="$m"
          spaceInside
          csx={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: '$l',
          }}
        >
          <Text tone="secondary">
            {allSelected ? totalItems : selectedItems.length} of {totalItems}{' '}
            selected
          </Text>

          <Button
            variant="neutralTertiary"
            onClick={selectAll}
            disabled={allSelected}
          >
            Select All
          </Button>
        </Inline>
        <Inline
          hSpace="$m"
          spaceInside
          csx={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: '$l',
          }}
        >
          {children}
        </Inline>
      </Inline>
    </Flex>
  )
}
