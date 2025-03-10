import {
  Page,
  PageContent,
  PageHeader,
  PageHeading,
  Table,
  TableBody,
  TableCell,
  TableHeaderCell,
  TableRow,
  TableHeader,
  TabProvider,
  TabList,
  Tab,
  TabPanel,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Page>
      <PageHeader>
        <PageHeading>Account Settings</PageHeading>
      </PageHeader>
      <TabProvider>
        <PageContent layout="narrow">
          <TabList>
            <Tab>Personal Information</Tab>
            <Tab>Company Details</Tab>
            <Tab>Security</Tab>
          </TabList>

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
                  <TableHeaderCell>Full Name</TableHeaderCell>
                  <TableHeaderCell>Email Address</TableHeaderCell>
                  <TableHeaderCell>Phone Number</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Jane Smith</TableCell>
                  <TableCell>jane.smith@example.com</TableCell>
                  <TableCell>+1 (555) 123-4567</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>John Doe</TableCell>
                  <TableCell>john.doe@example.com</TableCell>
                  <TableCell>+1 (555) 987-6543</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Maria Garcia</TableCell>
                  <TableCell>maria.garcia@example.com</TableCell>
                  <TableCell>+1 (555) 456-7890</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Alex Johnson</TableCell>
                  <TableCell>alex.johnson@example.com</TableCell>
                  <TableCell>+1 (555) 234-5678</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Table
              columnWidths={[
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
              ]}
            >
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Field</TableHeaderCell>
                  <TableHeaderCell>Value</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Company Name</TableCell>
                  <TableCell>Acme Corporation</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Position</TableCell>
                  <TableCell>Product Manager</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell>Marketing</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabPanel>

          <TabPanel>
            <Table
              columnWidths={[
                'minmax(min-content, auto)',
                'minmax(min-content, auto)',
              ]}
            >
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Field</TableHeaderCell>
                  <TableHeaderCell>Value</TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Last Password Change</TableCell>
                  <TableCell>3 months ago</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Two-Factor Authentication</TableCell>
                  <TableCell>Enabled</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TabPanel>
        </PageContent>
      </TabProvider>
    </Page>
  )
}
