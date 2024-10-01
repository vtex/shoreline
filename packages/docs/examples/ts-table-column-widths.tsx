import { TsTable } from '@vtex/shoreline-ts-table'
import { Tag } from '@vtex/shoreline'

interface Product {
  name: string
  description: string
  brand: string
  category: string
}

const data: Product[] = [
  {
    name: 'iPhone 16',
    description: 'An Apple phone',
    brand: 'Apple',
    category: 'smartphones',
  },
  {
    name: 'Galaxy S24',
    description: 'A Samsung phone',
    brand: 'Samsung',
    category: 'smartphones',
  },
]

export default function Example() {
  return (
    <TsTable
      data={data}
      columnWidths={['minmax(auto, 480px)', 'auto', 'auto', 'auto']}
      columns={[
        { accessorKey: 'name' },
        { accessorKey: 'description' },
        {
          accessorKey: 'brand',
          cell: (cell) => <Tag>{cell.renderValue()}</Tag>,
        },
        { accessorKey: 'category' },
      ]}
    />
  )
}
