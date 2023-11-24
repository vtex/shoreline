import '../virtual.css'
import '../../table/table.css'

import React from 'react'
import { faker } from '@faker-js/faker'

import { useVirtualizerModel } from '../index'

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
    <table
      data-sl-table
      ref={virtualizer.ref}
      style={{ height: 500, overflow: 'auto' }}
    >
      <thead data-sl-table-header role="presentation">
        <tr data-sl-table-row>
          <td data-sl-table-header-cell>Index</td>
        </tr>
      </thead>
      <tbody data-sl-table-body role="presentation">
        {virtualizer.top > 0 && (
          <tr data-sl-table-row>
            <td data-sl-table-cell style={{ height: `${virtualizer.top}px` }} />
          </tr>
        )}
        {virtualizer.virtualItems.map((row) => {
          return (
            <tr key={row.index} data-sl-table-row>
              <td data-sl-table-cell>rowIndex: {row.index}</td>
            </tr>
          )
        })}
        {virtualizer.bottom > 0 && (
          <tr data-sl-table-row>
            <td
              data-sl-table-cell
              style={{ height: `${virtualizer.bottom}px` }}
            />
          </tr>
        )}
      </tbody>
    </table>
  )
}
