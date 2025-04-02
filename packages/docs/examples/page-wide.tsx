import {
  Page,
  PageContent,
  PageHeader,
  PageHeading,
  Collection,
  CollectionRow,
  CollectionView,
  Pagination,
  Search,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Tag,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Page>
      <PageHeader>
        <PageHeading>Inventory Dashboard</PageHeading>
      </PageHeader>
      <PageContent layout="wide">
        <Collection>
          <CollectionRow>
            <Search messages={{ placeholder: 'Search products...' }} />
            <Pagination page={1} total={120} />
          </CollectionRow>
          <CollectionView status="ready">
            <Table
              columnWidths={[
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
              ]}
            >
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>SKU</TableHeaderCell>
                  <TableHeaderCell>Product</TableHeaderCell>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>In Stock</TableHeaderCell>
                  <TableHeaderCell>Reserved</TableHeaderCell>
                  <TableHeaderCell>Available</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>SKU12345</TableCell>
                  <TableCell>Wireless Headphones</TableCell>
                  <TableCell>Electronics</TableCell>
                  <TableCell>156</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>132</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      In Stock
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SKU12346</TableCell>
                  <TableCell>Smartphone Case</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell>423</TableCell>
                  <TableCell>51</TableCell>
                  <TableCell>372</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      In Stock
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SKU12347</TableCell>
                  <TableCell>Bluetooth Speaker</TableCell>
                  <TableCell>Electronics</TableCell>
                  <TableCell>89</TableCell>
                  <TableCell>35</TableCell>
                  <TableCell>54</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      In Stock
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SKU12348</TableCell>
                  <TableCell>USB-C Cable</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell>278</TableCell>
                  <TableCell>42</TableCell>
                  <TableCell>236</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      In Stock
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SKU12349</TableCell>
                  <TableCell>Wireless Mouse</TableCell>
                  <TableCell>Peripherals</TableCell>
                  <TableCell>12</TableCell>
                  <TableCell>10</TableCell>
                  <TableCell>2</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="yellow">
                      Low Stock
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>SKU12350</TableCell>
                  <TableCell>External Hard Drive</TableCell>
                  <TableCell>Storage</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>0</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="red">
                      Out of Stock
                    </Tag>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CollectionView>
          <CollectionRow justify="flex-end">
            <Pagination page={1} total={120} />
          </CollectionRow>
        </Collection>
      </PageContent>
    </Page>
  )
}
