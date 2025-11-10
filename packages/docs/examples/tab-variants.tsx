import {
  Tab,
  TabList,
  TabPanel,
  TabProvider,
  Stack,
  Text,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Stack fluid>
      <Text variant="emphasis">Standard Tabs</Text>
      <TabProvider>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>
        <TabPanel>
          <div
            style={{
              padding: '1rem',
              background: '#f0f0ff',
              borderRadius: '4px',
            }}
          >
            Content for Tab 1
          </div>
        </TabPanel>
        <TabPanel>
          <div
            style={{
              padding: '1rem',
              background: '#f0fff0',
              borderRadius: '4px',
            }}
          >
            Content for Tab 2
          </div>
        </TabPanel>
        <TabPanel>
          <div
            style={{
              padding: '1rem',
              background: '#fff0f0',
              borderRadius: '4px',
            }}
          >
            Content for Tab 3
          </div>
        </TabPanel>
      </TabProvider>

      <Text variant="emphasis">Many Tabs</Text>
      <TabProvider>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Details</Tab>
          <Tab>Analytics</Tab>
          <Tab>Settings</Tab>
          <Tab>History</Tab>
        </TabList>
        <TabPanel>
          <Text>Overview content</Text>
        </TabPanel>
        <TabPanel>
          <Text>Details content</Text>
        </TabPanel>
        <TabPanel>
          <Text>Analytics content</Text>
        </TabPanel>
        <TabPanel>
          <Text>Settings content</Text>
        </TabPanel>
        <TabPanel>
          <Text>History content</Text>
        </TabPanel>
      </TabProvider>

      <Text variant="emphasis">Few Tabs</Text>
      <TabProvider>
        <TabList>
          <Tab>Active</Tab>
          <Tab>Inactive</Tab>
        </TabList>
        <TabPanel>
          <Text>Active items</Text>
        </TabPanel>
        <TabPanel>
          <Text>Inactive items</Text>
        </TabPanel>
      </TabProvider>
    </Stack>
  )
}
