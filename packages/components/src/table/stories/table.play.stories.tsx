import React from 'react'

import type { TableProps } from '../index'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../index'

export default {
  title: 'components/table',
  argTypes: {
    density: {
      description: 'Table density',
      default: 'default',
      options: ['default', 'comfortable', 'compact'],
      control: { type: 'radio' },
    },
    columnWidths: {
      description: 'Array of column widths',
      options: [
        ['minmax(min-content, auto)', 'minmax(min-content, auto)'],
        ['1fr', '1fr'],
        ['1fr', '2fr'],
        ['2fr', '1fr'],
      ],
      control: { type: 'radio' },
    },
  },
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function Play(props: TableProps) {
  const {
    density,
    columnWidths = ['minmax(min-content, auto)', 'minmax(min-content, auto)'],
  } = props

  return (
    <Table columnWidths={columnWidths} density={density}>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Anita</TableCell>
          <TableCell>anita.paes@vtex.com.br</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lucas</TableCell>
          <TableCell>lucas.nascimento@vtex.com.br</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Marcelo</TableCell>
          <TableCell>marcelo.cardoso@vtex.com.br</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Matheus</TableCell>
          <TableCell>matheus.procopio@vtex.com.br</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
