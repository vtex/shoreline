import '../../../dist/styles.min.css'
import '../virtual.css'
import '../../table/table.css'

import React, { Fragment, useRef } from 'react'
import { faker } from '@faker-js/faker'

import {
  Virtual,
  VirtualContainer,
  VirtualItem,
  useVirtualizerModel,
} from '../index'
import {
  Table,
  TableHeader,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
} from '../../table'
import { useVirtualizer } from '@tanstack/react-virtual'

export default {
  title: 'shoreline-components/virtual',
}

const data = Array(100)
  .fill(1)
  .map((_, id) => {
    return {
      id,
      name: faker.person.firstName(),
      job: faker.person.jobTitle(),
    }
  })

export function RawTableVirtualization() {
  const virtualizer = useVirtualizerModel({
    count: data.length,
  })

  return (
    <div
      role="table"
      data-sl-table
      ref={virtualizer.ref}
      style={{ height: 500, overflow: 'auto' }}
    >
      <div data-sl-table-header role="presentation">
        <div data-sl-table-row role="row">
          <div data-sl-table-header-cell role="columnheader">
            Index
          </div>
        </div>
      </div>
      <div data-sl-table-body role="presentation">
        {virtualizer.top > 0 && (
          <div role="row" data-sl-table-row>
            <TableCell style={{ height: `${virtualizer.top}px` }} />
          </div>
        )}
        {virtualizer.virtualItems.map((row) => {
          return (
            <div key={row.index} role="row" data-sl-table-row>
              <div data-sl-table-cell role="cell">
                rowIndex: {row.index}
              </div>
            </div>
          )
        })}
        {virtualizer.bottom > 0 && (
          <div role="row" data-sl-table-row>
            <TableCell style={{ height: `${virtualizer.bottom}px` }} />
          </div>
        )}
      </div>
    </div>
  )
}
