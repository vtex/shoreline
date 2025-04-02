import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderRow,
  PageHeading,
  Button,
  Bleed,
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
        <PageHeaderRow>
          <PageHeading>Orders</PageHeading>
          <Bleed top="$space-2" bottom="$space-2">
            <Button variant="primary" size="large">
              Create Order
            </Button>
          </Bleed>
        </PageHeaderRow>
      </PageHeader>
      <PageContent>
        <Collection>
          <CollectionRow>
            <Search messages={{ placeholder: 'Search orders...' }} />
            <Pagination page={1} total={42} />
          </CollectionRow>
          <CollectionView status="ready">
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
                  <TableHeaderCell>Order ID</TableHeaderCell>
                  <TableHeaderCell>Customer</TableHeaderCell>
                  <TableHeaderCell>Date</TableHeaderCell>
                  <TableHeaderCell>Total</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>#12345</TableCell>
                  <TableCell>John Smith</TableCell>
                  <TableCell>2023-05-15</TableCell>
                  <TableCell>$126.50</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      Delivered
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#12346</TableCell>
                  <TableCell>Sarah Johnson</TableCell>
                  <TableCell>2023-05-16</TableCell>
                  <TableCell>$89.99</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="blue">
                      Shipped
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>#12347</TableCell>
                  <TableCell>Michael Brown</TableCell>
                  <TableCell>2023-05-16</TableCell>
                  <TableCell>$215.75</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="yellow">
                      Processing
                    </Tag>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CollectionView>
          <CollectionRow justify="flex-end">
            <Pagination page={1} total={42} />
          </CollectionRow>
        </Collection>
      </PageContent>
    </Page>
  )
}
