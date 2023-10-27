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
import { LinkBox } from '../../link-box'

export default {
  title: 'shoreline-components/table',
}

export function Default() {
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

export function RowAsLink() {
  return (
    <Table
      columnWidths={['minmax(min-content, auto)', 'minmax(min-content, auto)']}
    >
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Services</TableHeaderCell>
          <TableHeaderCell>Price</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow asChild>
          <LinkBox href="https://vercel.com" target="_blank">
            <TableCell>Vercel</TableCell>
            <TableCell>20 USD / Dev / Year</TableCell>
          </LinkBox>
        </TableRow>
        <TableRow asChild>
          <LinkBox href="https://netlify.com">
            <TableCell>Netlify</TableCell>
            <TableCell>19 USD / Dev / Year</TableCell>
          </LinkBox>
        </TableRow>
        <TableRow asChild>
          <LinkBox href="https://www.azion.com">
            <TableCell>Azion</TableCell>
            <TableCell>300 USD / Year</TableCell>
          </LinkBox>
        </TableRow>
      </TableBody>
    </Table>
  )
}
