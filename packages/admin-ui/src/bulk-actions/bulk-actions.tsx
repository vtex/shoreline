import type { ReactNode } from 'react'
import React from 'react'

// import type { BulkActionsState } from './bulk-actions.state'
import { Box } from '../box'
import { Inline } from '../inline'
import { Flex } from '../flex'
import { Button } from '../button'

interface BulkActionsProps {
  state: any
  children: ReactNode
}

export function BulkActions(props: BulkActionsProps) {
  const { children, state } = props

  return (
    <Flex justify="center">
      <Inline
        hSpace="$2xl"
        spaceInside
        csx={{
          width: 'fit-content',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '$xl',
          bg: '$primary',
          border: '$neutral',
          borderRadius: '$default',
        }}
      >
        <Inline
          hSpace="$xl"
          spaceInside
          csx={{
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Box as="p">
            {state.allSelected ? state.totalItems : state.selectedItems.length}{' '}
            of {state.totalItems}
          </Box>
          <Button variant="neutralTertiary" onClick={state.selectAll}>
            Select All
          </Button>
        </Inline>
        <Inline hSpace="$xl" spaceInside>
          {children}
        </Inline>
      </Inline>
    </Flex>
  )
}
