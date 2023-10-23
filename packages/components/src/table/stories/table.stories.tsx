import '../../../dist/styles.min.css'
import '../table.css'
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
  title: 'shoreline-components/table',
}

export function Default() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Anita</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Lucas</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Marcelo</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Matheus</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
