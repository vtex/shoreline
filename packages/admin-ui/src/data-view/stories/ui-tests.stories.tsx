import React from 'react'
import type { Meta } from '@storybook/react'

import {
  DataView,
  useDataViewState,
  DataViewHeader,
  DataViewActions,
} from '../index'
import { Flex } from '../../flex'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/data-view',
  component: DataView,
} as Meta

const defaultState = {
  loading: false,
  error: null,
  empty: null,
  notFound: false,
}

export function UITests() {
  const ready = useDataViewState()
  const error = useDataViewState({
    ...defaultState,
    error: {
      action: { onClick: () => {}, text: 'Try again' },
    },
  })

  const notFound = useDataViewState({
    ...defaultState,
    notFound: true,
  })

  const loading = useDataViewState({
    ...defaultState,
    loading: true,
  })

  const empty = useDataViewState({
    ...defaultState,
    empty: {
      action: { onClick: () => {}, text: 'Try again' },
    },
  })

  return (
    <div>
      <DataView state={ready}>
        <DataViewHeader>
          <Flex justify="space-between" className={csx({ width: '100%' })}>
            <input placeholder="search" />

            <DataViewActions>
              <button>Action 1</button>
              <button>Action 2</button>
              <div>Pagination</div>
            </DataViewActions>
          </Flex>
          <Flex>
            <button>filter 1</button>
            <button>filter 2</button>
          </Flex>
        </DataViewHeader>
        <Flex
          justify="center"
          align="center"
          className={csx({ height: 300, bg: '#F4F4F4', width: '100%' })}
        >
          content
        </Flex>
      </DataView>

      <br />

      <DataView state={loading}>
        <div>loading</div>
      </DataView>

      <br />
      <DataView state={error} />

      <br />

      <DataView state={notFound} />

      <br />

      <DataView state={empty}>
        <DataViewHeader>Header</DataViewHeader>
        <div>content</div>
      </DataView>

      <br />
    </div>
  )
}

UITests.parameters = {
  chromatic: { disableSnapshot: false },
}
