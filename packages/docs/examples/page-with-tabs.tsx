import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderRow,
  PageHeading,
  Tab,
  TabProvider,
  TabList,
  TabPanel,
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
      <TabProvider>
        <PageHeader>
          <PageHeaderRow>
            <PageHeading>Products</PageHeading>
          </PageHeaderRow>
          <PageHeaderRow>
            <TabList>
              <Tab>Products</Tab>
              <Tab>Categories</Tab>
              <Tab>Analytics</Tab>
            </TabList>
          </PageHeaderRow>
        </PageHeader>
        <PageContent layout="standard">
          <TabPanel>
            <Collection>
              <CollectionRow>
                <Search />
                <Pagination page={1} total={74} />
              </CollectionRow>
              <CollectionView status="ready">
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
                      <TableHeaderCell>Product</TableHeaderCell>
                      <TableHeaderCell>Description</TableHeaderCell>
                      <TableHeaderCell>Brand</TableHeaderCell>
                      <TableHeaderCell>Category</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>iPhone 15</TableCell>
                      <TableCell>Latest model smartphone</TableCell>
                      <TableCell>Apple</TableCell>
                      <TableCell>
                        <Tag variant="secondary">Electronics</Tag>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>MacBook Pro</TableCell>
                      <TableCell>Powerful laptop for professionals</TableCell>
                      <TableCell>Apple</TableCell>
                      <TableCell>
                        <Tag variant="secondary">Electronics</Tag>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CollectionView>
              <CollectionRow justify="flex-end">
                <Pagination page={1} total={74} />
              </CollectionRow>
            </Collection>
          </TabPanel>
          <TabPanel>
            <Table
              columnWidths={[
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
              ]}
            >
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Category</TableHeaderCell>
                  <TableHeaderCell>Products Count</TableHeaderCell>
                  <TableHeaderCell>Status</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Electronics</TableCell>
                  <TableCell>235</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      Active
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Clothing</TableCell>
                  <TableCell>512</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      Active
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Home & Garden</TableCell>
                  <TableCell>189</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      Active
                    </Tag>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabPanel>
          <TabPanel>
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
                  <TableHeaderCell>Metric</TableHeaderCell>
                  <TableHeaderCell>Today</TableHeaderCell>
                  <TableHeaderCell>Last Week</TableHeaderCell>
                  <TableHeaderCell>Change</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Sessions</TableCell>
                  <TableCell>5,324</TableCell>
                  <TableCell>4,981</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      +6.8%
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Conversions</TableCell>
                  <TableCell>189</TableCell>
                  <TableCell>165</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      +14.5%
                    </Tag>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Revenue</TableCell>
                  <TableCell>$12,450</TableCell>
                  <TableCell>$11,280</TableCell>
                  <TableCell>
                    <Tag variant="secondary" color="green">
                      +10.4%
                    </Tag>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabPanel>
        </PageContent>
      </TabProvider>
    </Page>
  )
}
