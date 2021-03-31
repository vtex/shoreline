import React from 'react'
import { StatefulTable, StatefulTableProps } from './Stateful'
import { Box } from '@vtex/admin-primitives'
import { Input } from '../Input'
import { Toolbar, useToolbarState } from '../Toolbar'
import { IconSearch } from '@vtex/admin-ui'

export function TableToolbar() {
  const toolbarState = useToolbarState()

  return (
    <Toolbar state={toolbarState} csx={{ paddingY: '4' }}>
      <Toolbar.Item>
        {(itemProps) => (
          <Input
            icon={<IconSearch />}
            csx={{
              height: 32,
              ':hover': {
                borderColor: 'mid.primary',
              },
              ':focus': {
                borderShadow: 'none',
                borderColor: 'blue',
              },
              svg: {
                marginTop: '6px',
              },
            }}
            label="search"
            {...itemProps}
          />
        )}
      </Toolbar.Item>
      <Toolbar.Item>{(itemProps) => <div {...itemProps}>oi</div>}</Toolbar.Item>
      <Toolbar.Item>{(itemProps) => <div {...itemProps}>oi</div>}</Toolbar.Item>
    </Toolbar>
  )
}

export function PowerfulTable<T>(props: PowerfulTableProps<T>) {
  return (
    <Box>
      <TableToolbar />
      <StatefulTable {...props}>oi</StatefulTable>
    </Box>
  )
}

export interface PowerfulTableProps<T> extends StatefulTableProps<T> {}
