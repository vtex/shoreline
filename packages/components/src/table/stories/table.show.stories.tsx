import React from 'react'

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
}

export function Show() {
  return (
    <Table
      columnWidths={['minmax(min-content, auto)', 'minmax(min-content, auto)']}
    >
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
