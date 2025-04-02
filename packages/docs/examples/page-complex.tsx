import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderRow,
  PageHeading,
  IconButton,
  Bleed,
  Button,
  Tag,
  Flex,
  Stack,
  Menu,
  MenuItem,
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
  IconArrowLeft,
  TabList,
  Tab,
  TabProvider,
  TabPanel,
  DrawerProvider,
  DrawerPopover,
  DrawerHeader,
  DrawerHeading,
  DrawerDismiss,
  DrawerContent,
  DrawerFooter,
  Text,
  Heading,
} from '@vtex/shoreline'
import { useState } from 'react'

export default function Example() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  const handleCampaignDetailsClick = () => {
    setDrawerOpen(true)
  }

  return (
    <Page>
      <TabProvider>
        <PageHeader>
          <PageHeaderRow>
            <Flex align="center">
              <Bleed top="$space-2" bottom="$space-2">
                <IconButton
                  label="Return"
                  asChild
                  variant="tertiary"
                  size="large"
                >
                  <IconArrowLeft />
                </IconButton>
              </Bleed>
              <PageHeading>Campaign Analytics</PageHeading>
              <Tag variant="secondary">Status: Active</Tag>
            </Flex>
            <Stack space="$space-4" horizontal>
              <Bleed top="$space-2" bottom="$space-2">
                <Button variant="primary" size="large">
                  Save
                </Button>
              </Bleed>
              <Bleed top="$space-2" bottom="$space-2">
                <Menu label="Actions" type="actions" iconOnly size="large">
                  <MenuItem onClick={handleCampaignDetailsClick}>
                    Campaign Details
                  </MenuItem>
                  <MenuItem>Export Data</MenuItem>
                  <MenuItem>Generate Report</MenuItem>
                  <MenuItem>Share</MenuItem>
                </Menu>
              </Bleed>
            </Stack>
          </PageHeaderRow>
          <PageHeaderRow>
            <TabList>
              <Tab>Overview</Tab>
              <Tab>Performance</Tab>
              <Tab>Audience</Tab>
            </TabList>
          </PageHeaderRow>
        </PageHeader>

        <PageContent layout="standard">
          <TabPanel>
            {/* Overview Tab */}
            <Collection>
              <CollectionRow>
                <Search messages={{ placeholder: 'Search campaigns...' }} />
                <Pagination page={1} total={18} />
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
                  ]}
                >
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>Campaign</TableHeaderCell>
                      <TableHeaderCell>Status</TableHeaderCell>
                      <TableHeaderCell>Budget</TableHeaderCell>
                      <TableHeaderCell>Spend</TableHeaderCell>
                      <TableHeaderCell>Conversions</TableHeaderCell>
                      <TableHeaderCell>ROI</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Summer Sale 2023</TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="green">
                          Active
                        </Tag>
                      </TableCell>
                      <TableCell>$10,000</TableCell>
                      <TableCell>$7,849</TableCell>
                      <TableCell>256</TableCell>
                      <TableCell>3.2x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Back to School</TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="green">
                          Active
                        </Tag>
                      </TableCell>
                      <TableCell>$5,000</TableCell>
                      <TableCell>$2,156</TableCell>
                      <TableCell>98</TableCell>
                      <TableCell>2.8x</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Holiday Special</TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="blue">
                          Scheduled
                        </Tag>
                      </TableCell>
                      <TableCell>$15,000</TableCell>
                      <TableCell>$0</TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Spring Collection</TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="gray">
                          Ended
                        </Tag>
                      </TableCell>
                      <TableCell>$8,000</TableCell>
                      <TableCell>$8,000</TableCell>
                      <TableCell>315</TableCell>
                      <TableCell>3.9x</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CollectionView>
              <CollectionRow justify="flex-end">
                <Pagination page={1} total={18} />
              </CollectionRow>
            </Collection>
          </TabPanel>

          <TabPanel>
            {/* Performance Tab */}
            <Collection>
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
                      <TableHeaderCell>Metric</TableHeaderCell>
                      <TableHeaderCell>Today</TableHeaderCell>
                      <TableHeaderCell>Last Week</TableHeaderCell>
                      <TableHeaderCell>Last Month</TableHeaderCell>
                      <TableHeaderCell>Change</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Click-through Rate</TableCell>
                      <TableCell>3.7%</TableCell>
                      <TableCell>3.2%</TableCell>
                      <TableCell>2.9%</TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="green">
                          +15.6%
                        </Tag>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cost per Click</TableCell>
                      <TableCell>$0.42</TableCell>
                      <TableCell>$0.48</TableCell>
                      <TableCell>$0.51</TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="green">
                          -12.5%
                        </Tag>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Conversion Rate</TableCell>
                      <TableCell>2.8%</TableCell>
                      <TableCell>2.5%</TableCell>
                      <TableCell>2.3%</TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="green">
                          +12.0%
                        </Tag>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Avg. Order Value</TableCell>
                      <TableCell>$68.42</TableCell>
                      <TableCell>$65.19</TableCell>
                      <TableCell>$62.75</TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="green">
                          +4.9%
                        </Tag>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CollectionView>
            </Collection>
          </TabPanel>

          <TabPanel>
            {/* Audience Tab */}
            <Collection>
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
                      <TableHeaderCell>Demographic</TableHeaderCell>
                      <TableHeaderCell>Impressions</TableHeaderCell>
                      <TableHeaderCell>Clicks</TableHeaderCell>
                      <TableHeaderCell>Conversions</TableHeaderCell>
                      <TableHeaderCell>Conversion Rate</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>18-24 years</TableCell>
                      <TableCell>42,568</TableCell>
                      <TableCell>3,245</TableCell>
                      <TableCell>87</TableCell>
                      <TableCell>2.7%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>25-34 years</TableCell>
                      <TableCell>78,912</TableCell>
                      <TableCell>6,789</TableCell>
                      <TableCell>216</TableCell>
                      <TableCell>3.2%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>35-44 years</TableCell>
                      <TableCell>56,423</TableCell>
                      <TableCell>4,321</TableCell>
                      <TableCell>142</TableCell>
                      <TableCell>3.3%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>45+ years</TableCell>
                      <TableCell>31,256</TableCell>
                      <TableCell>2,154</TableCell>
                      <TableCell>52</TableCell>
                      <TableCell>2.4%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CollectionView>
            </Collection>
          </TabPanel>
        </PageContent>
      </TabProvider>

      {/* Campaign Details Drawer */}
      <DrawerProvider open={drawerOpen} onOpenChange={setDrawerOpen}>
        <DrawerPopover>
          <DrawerHeader>
            <DrawerHeading>Campaign Details</DrawerHeading>
            <DrawerDismiss />
          </DrawerHeader>
          <DrawerContent>
            <Stack space="$space-6">
              <Stack space="$space-3">
                <Heading level={2}>Summer Sale 2023</Heading>
                <Table
                  columnWidths={[
                    'minmax(min-content, auto)',
                    'minmax(min-content, auto)',
                  ]}
                >
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <strong>Status</strong>
                      </TableCell>
                      <TableCell>
                        <Tag variant="secondary" color="green">
                          Active
                        </Tag>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Start Date</strong>
                      </TableCell>
                      <TableCell>June 1, 2023</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>End Date</strong>
                      </TableCell>
                      <TableCell>August 31, 2023</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Target Audience</strong>
                      </TableCell>
                      <TableCell>25-45 years, Urban demographics</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Channels</strong>
                      </TableCell>
                      <TableCell>Email, Social Media, Display Ads</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <strong>Budget Allocation</strong>
                      </TableCell>
                      <TableCell>
                        $10,000 ($5,000 Social, $3,000 Display, $2,000 Email)
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Stack>

              <Stack space="$space-3">
                <Heading level={2}>Campaign Summary</Heading>
                <Text>
                  Our Summer Sale 2023 campaign targets customers during the
                  peak summer shopping season. The campaign focuses on seasonal
                  products with discounts ranging from 20-50% off. So far, it
                  has generated 256 conversions with an impressive ROI of 3.2x.
                </Text>
              </Stack>

              <Stack space="$space-3">
                <Heading level={2}>Primary Objectives</Heading>
                <Text>
                  • Increase sales of summer products by 30%
                  <br />• Grow email subscriber list by 15%
                  <br />• Boost social media engagement by 25%
                  <br />• Achieve overall ROI target of 3.5x
                </Text>
              </Stack>
            </Stack>
          </DrawerContent>
          <DrawerFooter>
            <Button onClick={() => setDrawerOpen(false)} size="large">
              Close
            </Button>
            <Button variant="primary" size="large">
              Edit Campaign
            </Button>
          </DrawerFooter>
        </DrawerPopover>
      </DrawerProvider>
    </Page>
  )
}
