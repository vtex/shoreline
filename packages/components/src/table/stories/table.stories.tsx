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
}

export function Default(props) {
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
        <TableRow>
          <LinkBox href="https://vercel.com" asChild>
            <TableCell>Vercel</TableCell>
          </LinkBox>
          <LinkBox href="https://vercel.com" asChild>
            <TableCell>20 USD / Dev / Year</TableCell>
          </LinkBox>
        </TableRow>
        <TableRow>
          <LinkBox href="https://netlify.com" asChild>
            <TableCell>Netlify</TableCell>
          </LinkBox>
          <LinkBox href="https://netlify.com" asChild>
            <TableCell>19 USD / Dev / Year</TableCell>
          </LinkBox>
        </TableRow>
        <TableRow>
          <LinkBox href="https://www.azion.com" asChild>
            <TableCell>Azion</TableCell>
          </LinkBox>
          <LinkBox href="https://www.azion.com" asChild>
            <TableCell>300 USD / Year</TableCell>
          </LinkBox>
        </TableRow>
      </TableBody>
    </Table>
  )
}
