import React from 'react'

import { render, axe } from '../../test-utils'
import { TabList, Tab, TabPanel, TabPanelList, useTabState } from '../index'

function Example() {
  const state = useTabState()

  return (
    <>
      <TabList state={state}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanelList state={state}>
        <TabPanel>Panel 1</TabPanel>
        <TabPanel>Panel 2</TabPanel>
      </TabPanelList>
    </>
  )
}

describe('tab', () => {
  it('should not have any violations', async () => {
    const { container } = render(<Example />)
    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
