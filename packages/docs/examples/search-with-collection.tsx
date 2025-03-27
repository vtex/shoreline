import { useState } from 'react'
import {
  Collection,
  CollectionRow,
  Search,
  Table,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableBody,
  TableCell,
  Pagination,
} from '@vtex/shoreline'

export default function Example() {
  const [searchValue, setSearchValue] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Mock data
  const allItems = [
    { id: 1, name: 'Product A', category: 'Electronics' },
    { id: 2, name: 'Product B', category: 'Furniture' },
    { id: 3, name: 'Device C', category: 'Electronics' },
    { id: 4, name: 'Item D', category: 'Clothing' },
    { id: 5, name: 'Gadget E', category: 'Electronics' },
  ]

  // Filter items based on search
  const filteredItems = allItems.filter((item) => {
    if (!searchValue) return true

    return (
      item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.category.toLowerCase().includes(searchValue.toLowerCase())
    )
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleClear = () => {
    setSearchValue('')
    setCurrentPage(1)
  }

  return (
    <Collection>
      <CollectionRow>
        <Search
          value={searchValue}
          onChange={handleSearchChange}
          onClear={handleClear}
          messages={{ placeholder: 'Search products or categories' }}
        />
      </CollectionRow>

      <Table
        columnWidths={[
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
          'minmax(min-content, auto)',
        ]}
      >
        <TableHeader>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Category</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {filteredItems.length > 0 && (
        <CollectionRow align="flex-end">
          <Pagination
            page={currentPage}
            onPageChange={(page) => setCurrentPage(page)}
            total={filteredItems.length}
            size={10}
          />
        </CollectionRow>
      )}
    </Collection>
  )
}
