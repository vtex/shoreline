import React from 'react'
import type { Meta } from '@storybook/react'

import { DataViewHeader, DataViewActions } from '../index'
import { Button } from '../../button'

import { Flex, FlexSpacer } from '../../flex'
import { IconPlus } from '@vtex/phosphor-icons'
import { Pagination, usePaginationState } from '../../pagination'
import { Stack } from '../../stack'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/data-view',
  component: DataViewHeader,
} as Meta

export function Actions() {
  const hundred = usePaginationState({
    pageSize: 25,
    total: 999,
  })

  const tenThousand = usePaginationState({
    pageSize: 25,
    total: 9999,
  })

  const hundredThousand = usePaginationState({
    pageSize: 25,
    total: 99999,
  })

  const million = usePaginationState({
    pageSize: 25,
    total: 999999,
  })

  return (
    <Stack>
      <DataViewHeader>
        <Flex justify="space-between" className={csx({ width: '100%' })}>
          <FlexSpacer />
          <DataViewActions>
            <Button variant="neutralTertiary" icon={<IconPlus />}>
              Label
            </Button>
            <Button variant="neutralTertiary" icon={<IconPlus />}>
              Label
            </Button>
            <Pagination state={hundred} />
          </DataViewActions>
        </Flex>
      </DataViewHeader>
      <DataViewHeader>
        <Flex justify="space-between" className={csx({ width: '100%' })}>
          <FlexSpacer />
          <DataViewActions>
            <Button variant="neutralTertiary" icon={<IconPlus />}>
              Label
            </Button>
            <Button variant="neutralTertiary" icon={<IconPlus />}>
              Label
            </Button>
            <Pagination state={tenThousand} />
          </DataViewActions>
        </Flex>
      </DataViewHeader>
      <DataViewHeader>
        <Flex justify="space-between" className={csx({ width: '100%' })}>
          <FlexSpacer />
          <DataViewActions>
            <Button variant="neutralTertiary" icon={<IconPlus />}>
              Label
            </Button>
            <Button variant="neutralTertiary" icon={<IconPlus />}>
              Label
            </Button>
            <Pagination state={hundredThousand} />
          </DataViewActions>
        </Flex>
      </DataViewHeader>
      <DataViewHeader>
        <Flex justify="space-between" className={csx({ width: '100%' })}>
          <FlexSpacer />
          <DataViewActions>
            <Button variant="neutralTertiary" icon={<IconPlus />}>
              Label
            </Button>
            <Button variant="neutralTertiary" icon={<IconPlus />}>
              Label
            </Button>
            <Pagination state={million} />
          </DataViewActions>
        </Flex>
      </DataViewHeader>
    </Stack>
  )
}
