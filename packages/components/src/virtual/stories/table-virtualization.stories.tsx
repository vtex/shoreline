import '../../../dist/styles.min.css'
import '../virtual.css'

import React, { Fragment, useMemo, useState } from 'react'
import { faker } from '@faker-js/faker'

import {
  Virtual,
  VirtualContainer,
  VirtualItem,
  useVirtualizerModel,
} from '../index'
import { Stack } from '../../stack'
import { Checkbox } from '../../checkbox'
import { Text } from '../../text'
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '../../table'

export default {
  title: 'shoreline-components/virtual',
}

const data = Array(100)
  .fill(1)
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.person.firstName(),
      job: faker.person.jobTitle(),
    }
  })

export function TableVirtualization() {
  const virtualizer = useVirtualizerModel({ items: data })

  console.log({ items: virtualizer.virtualItems })

  return (
    <Table
      columnWidths={[`repeat(2, var(--sl-table-default-column-width))`]}
      asChild
    >
      <Virtual virtualizer={virtualizer}>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Job</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody asChild>
          <VirtualContainer virtualizer={virtualizer}>
            <VirtualItem asChild>
              {({ index }) => (
                <TableRow>
                  <TableCell>{index}</TableCell>
                  <TableCell>{data[index].job}</TableCell>
                </TableRow>
              )}
            </VirtualItem>
          </VirtualContainer>
        </TableBody>
      </Virtual>
    </Table>
  )
}
