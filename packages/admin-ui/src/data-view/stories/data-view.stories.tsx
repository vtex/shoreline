import React, { useMemo } from 'react'
import type { Meta } from '@storybook/react'

import {
  DataView,
  useDataViewState,
  DataViewHeader,
  DataViewActions,
} from '../index'
import { Button } from '../../button'
import { Spinner } from '../../spinner'
import { Stack } from '../../stack'
import { Pagination, usePaginationState } from '../../pagination'
import { Flex } from '../../flex'
import { Search } from '../../search'
import { IconPlus } from '@vtex/phosphor-icons'

export default {
  title: 'admin-ui-review/data-view',
  component: DataView,
} as Meta

const allStatus = [
  { type: 'ready' },
  { type: 'loading' },
  { type: 'not-found' },
  { type: 'empty', action: { text: 'Create item', onClick: () => {} } },
  { type: 'error', action: { text: 'Try again', onClick: () => {} } },
]

export function Status() {
  const view = useDataViewState()

  const content = useMemo(() => {
    switch (view.status) {
      case 'loading': {
        return <Spinner size={50} />
      }

      case 'ready': {
        return <p>Data View Content</p>
      }

      default: {
        return null
      }
    }
  }, [view.status])

  return (
    <Stack>
      <Stack direction="row">
        {allStatus.map((item, index) => {
          return (
            <Button
              variant="neutralTertiary"
              key={index}
              onClick={() => view.setStatus(item as any)}
            >
              {item.type}
            </Button>
          )
        })}
      </Stack>
      <DataView state={view}>{content}</DataView>
    </Stack>
  )
}

export function Header() {
  const view = useDataViewState()

  const pagination = usePaginationState({ total: 100, pageSize: 5 })

  const content = useMemo(() => {
    switch (view.status) {
      case 'loading': {
        return <Spinner size={50} />
      }

      case 'ready': {
        return <p>Data View Content</p>
      }

      default: {
        return null
      }
    }
  }, [view.status])

  return (
    <Stack>
      <Stack direction="row">
        {allStatus.map((item, index) => {
          return (
            <Button
              variant="neutralTertiary"
              key={index}
              onClick={() => view.setStatus(item as any)}
            >
              {item.type}
            </Button>
          )
        })}
      </Stack>

      <DataView state={view}>
        <DataViewHeader>
          <Flex justify="space-between" csx={{ width: '100%' }}>
            <Search />

            <DataViewActions>
              <Button variant="neutralTertiary" icon={<IconPlus />}>
                Label
              </Button>
              <Pagination state={pagination} />
            </DataViewActions>
          </Flex>
        </DataViewHeader>
        {content}
      </DataView>
    </Stack>
  )
}

export function InitialState() {
  const view = useDataViewState({
    loading: true,
    notFound: false,
    error: null,
    empty: null,
  })

  const pagination = usePaginationState({ total: 100, pageSize: 5 })

  const content = useMemo(() => {
    switch (view.status) {
      case 'loading': {
        return <Spinner size={50} />
      }

      case 'ready': {
        return <p>Data View Content</p>
      }

      default: {
        return null
      }
    }
  }, [view.status])

  return (
    <DataView state={view}>
      <DataViewHeader>
        <Flex justify="space-between" csx={{ width: '100%' }}>
          <Search />

          <DataViewActions>
            <Pagination state={pagination} />
          </DataViewActions>
        </Flex>
      </DataViewHeader>
      {content}
    </DataView>
  )
}
