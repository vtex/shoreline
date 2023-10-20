import React from 'react'
import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'

import { Table } from '../table'
import { TableHeader } from '../table-header'
import { TableRow } from '../table-row'
import { TableHeaderCell } from '../table-header-cell'
import { TableBody } from '../table-body'
import { TableCell } from '../table-cell'

describe('table', () => {
  test('renders', () => {
    const { container } = render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>heading</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    )

    expect(container.querySelector('[data-sl-table]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-table-header]')
    ).toBeInTheDocument()
    expect(container.querySelector('[data-sl-table-row]')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-table-body]')).toBeInTheDocument()
    expect(
      container.querySelector('[data-sl-table-header-cell]')
    ).toBeInTheDocument()
    expect(container.querySelector('[data-sl-table-cell]')).toBeInTheDocument()
  })
})