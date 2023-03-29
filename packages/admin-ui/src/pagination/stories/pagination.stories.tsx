import React from 'react'
import type { Meta } from '@storybook/react'

import {
  Pagination,
  usePaginationState,
  useQueryPaginationState,
} from '../index'
import { Stack } from '../../stack'
import { Flex } from '../../flex'
import { TextInput } from '../../text-input'
import { QueryStateProvider } from '@vtex/admin-ui-hooks'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/pagination',
  component: Pagination,
} as Meta

export function Basic() {
  const state = usePaginationState({ pageSize: 5, total: 74 })

  return (
    <Flex justify="flex-end" className={csx({ width: 400 })}>
      <Pagination state={state} />
    </Flex>
  )
}

export function InitialState() {
  const state = usePaginationState({
    pageSize: 5,
    initialPage: 2,
    total: 74,
  })

  return (
    <Flex justify="flex-end" className={csx({ width: 400 })}>
      <Pagination state={state} />
    </Flex>
  )
}

export function Loading() {
  const state = usePaginationState({
    pageSize: 5,
    initialPage: 2,
    total: 74,
  })

  return (
    <Flex justify="flex-end" className={csx({ width: 400 })}>
      <Pagination loading state={state} />
    </Flex>
  )
}

export function SinglePage() {
  const state = usePaginationState({
    pageSize: 25,
    total: 25,
  })

  return (
    <Flex justify="flex-end" className={csx({ width: 400 })}>
      <Pagination state={state} />
    </Flex>
  )
}

export function PersistedPaginationWithQuery() {
  const Content = () => {
    const state = useQueryPaginationState({
      pageSize: 20,
      total: 150,
    })

    return (
      <Stack>
        <TextInput
          label="Current URL:"
          id="current-url-input"
          value={window.location.href}
          disabled
          helpText="You can copy the part with page in your URL to see the page
            load directly on choosed page"
        />
        <Flex justify="flex-end" className={csx({ width: 500 })}>
          <Pagination state={state} />
        </Flex>
      </Stack>
    )
  }

  return (
    <QueryStateProvider>
      <Content />
    </QueryStateProvider>
  )
}

export function UITests() {
  const singlePage = usePaginationState({
    pageSize: 25,
    total: 25,
  })

  const firstPage = usePaginationState({
    pageSize: 5,
    total: 25,
  })

  const lastPage = usePaginationState({
    pageSize: 5,
    total: 10,
    initialPage: 2,
  })

  return (
    <>
      <Pagination state={singlePage} />
      <br />
      <Pagination state={firstPage} loading />
      <br />
      <Pagination state={firstPage} />
      <br />
      <Pagination state={lastPage} />
    </>
  )
}

UITests.parameters = {
  chromatic: { disableSnapshot: false },
}
