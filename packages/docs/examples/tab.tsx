import { Tab, TabList, TabPanel, TabProvider } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
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
