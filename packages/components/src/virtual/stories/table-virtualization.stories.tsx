import '../../../dist/styles.min.css'
import React, { useMemo, useState } from 'react'
import { faker } from '@faker-js/faker'

import { Virtual } from '../index'
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

const data = Array(50000)
  .fill(1)
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.person.firstName(),
      job: faker.person.jobTitle(),
    }
  })

export function TableVirtualization() {
  return (
    <Virtual items={data}>
      {({ items: rows, bottom, getItem, top, ref }) => (
        <Table
          style={{
            height: `400px`,
            overflow: 'auto',
          }}
          ref={ref}
          columnWidths={[`repeat(2, var(--sl-table-default-column-width))`]}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Job</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {top > 0 && (
              <TableRow>
                <TableCell style={{ height: `${top}px` }} />
                <TableCell style={{ height: `${top}px` }} />
              </TableRow>
            )}

            {rows.map((row) => (
              <TableRow key={row.index}>
                <TableHeaderCell>{getItem(row).name}</TableHeaderCell>
                <TableHeaderCell>{getItem(row).job}</TableHeaderCell>
              </TableRow>
            ))}
            {bottom > 0 && (
              <TableRow>
                <TableCell style={{ height: `${bottom}px` }} />
                <TableCell style={{ height: `${bottom}px` }} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </Virtual>
  )
}
