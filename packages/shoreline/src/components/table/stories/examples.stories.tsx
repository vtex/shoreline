import { LinkBox } from '../../link-box'
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../index'

export default {
  title: 'components/table/examples',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
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
