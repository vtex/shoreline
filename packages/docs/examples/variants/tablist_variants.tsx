import { Tab, TabList, TabPanel, TabProvider } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export function DefaultTabList() {
  return (
    <TabProvider>
      <TabList>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanel>
        <DecorativeBox height="200px" color="blue" />
      </TabPanel>
      <TabPanel>
        <DecorativeBox height="200px" color="green" />
      </TabPanel>
    </TabProvider>
  )
}

export function TabListWithThreeTabs() {
  return (
    <TabProvider>
      <TabList>
        <Tab>Blue</Tab>
        <Tab>Green</Tab>
        <Tab>Purple</Tab>
      </TabList>
      <TabPanel>
        <DecorativeBox height="200px" color="blue" />
      </TabPanel>
      <TabPanel>
        <DecorativeBox height="200px" color="green" />
      </TabPanel>
      <TabPanel>
        <DecorativeBox height="200px" color="purple" />
      </TabPanel>
    </TabProvider>
  )
}

export function TabListWithMultiplePanels() {
  return (
    <TabProvider>
      <TabList>
        <Tab>Products</Tab>
        <Tab>Categories</Tab>
        <Tab>Analytics</Tab>
        <Tab>Settings</Tab>
      </TabList>
      <TabPanel>
        <DecorativeBox height="250px" color="blue" />
      </TabPanel>
      <TabPanel>
        <DecorativeBox height="250px" color="green" />
      </TabPanel>
      <TabPanel>
        <DecorativeBox height="250px" color="purple" />
      </TabPanel>
      <TabPanel>
        <DecorativeBox height="250px" color="orange" />
      </TabPanel>
    </TabProvider>
  )
}
