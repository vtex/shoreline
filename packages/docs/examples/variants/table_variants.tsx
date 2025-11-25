import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tag,
} from '@vtex/shoreline'

export function DefaultTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Brand</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>iPhone 15</TableCell>
          <TableCell>A nice phone</TableCell>
          <TableCell>Apple</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Aventador SVJ</TableCell>
          <TableCell>Good italian car</TableCell>
          <TableCell>Lamborghini</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Uno with stair</TableCell>
          <TableCell>Fastest car on earth</TableCell>
          <TableCell>Fiat</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export function TableWithTags() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Brand</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>iPhone 15</TableCell>
          <TableCell>A nice phone</TableCell>
          <TableCell>Apple</TableCell>
          <TableCell>
            <Tag variant="secondary">smartphones</Tag>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Aventador SVJ</TableCell>
          <TableCell>Good italian car</TableCell>
          <TableCell>Lamborghini</TableCell>
          <TableCell>
            <Tag variant="secondary" color="cyan">
              cars
            </Tag>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Uno with stair</TableCell>
          <TableCell>Fastest car on earth</TableCell>
          <TableCell>Fiat</TableCell>
          <TableCell>
            <Tag variant="secondary" color="cyan">
              cars
            </Tag>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export function TableWithCustomWidths() {
  return (
    <Table
      columnWidths={[
        'minmax(min-content, auto)',
        'minmax(min-content, auto)',
        'minmax(min-content, auto)',
        'minmax(min-content, auto)',
      ]}
    >
      <TableHeader>
        <TableRow>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Brand</TableHeaderCell>
          <TableHeaderCell>Category</TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>iPhone 15</TableCell>
          <TableCell>A nice phone</TableCell>
          <TableCell>Apple</TableCell>
          <TableCell>
            <Tag variant="secondary">smartphones</Tag>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Aventador SVJ</TableCell>
          <TableCell>Good italian car</TableCell>
          <TableCell>Lamborghini</TableCell>
          <TableCell>
            <Tag variant="secondary" color="cyan">
              cars
            </Tag>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Uno with stair</TableCell>
          <TableCell>Fastest car on earth</TableCell>
          <TableCell>Fiat</TableCell>
          <TableCell>
            <Tag variant="secondary" color="cyan">
              cars
            </Tag>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
