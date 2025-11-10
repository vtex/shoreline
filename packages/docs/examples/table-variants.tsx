import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Stack,
  Text,
  Tag,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Standard Table</Text>
      <Table
        columnWidths={[
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
        ]}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>john@example.com</TableCell>
            <TableCell>
              <Tag variant="secondary" color="green">
                Active
              </Tag>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>jane@example.com</TableCell>
            <TableCell>
              <Tag variant="secondary" color="green">
                Active
              </Tag>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Text variant="emphasis">Table With Many Columns</Text>
      <Table
        columnWidths={[
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
        ]}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Product</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Stock</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>001</TableCell>
            <TableCell>iPhone 15</TableCell>
            <TableCell>Electronics</TableCell>
            <TableCell>$999</TableCell>
            <TableCell>50</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>002</TableCell>
            <TableCell>MacBook Pro</TableCell>
            <TableCell>Computers</TableCell>
            <TableCell>$2499</TableCell>
            <TableCell>25</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Text variant="emphasis">Compact Table</Text>
      <Table
        columnWidths={[
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
        ]}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Item</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell>$150</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Tax</TableCell>
            <TableCell>$15</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  )
}
