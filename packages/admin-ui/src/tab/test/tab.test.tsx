import React from 'react'

import { render, axe } from '../../test-utils'
import { TabList, Tab, TabPanel, useTabState } from '../index'

function Example() {
  const state = useTabState()

  return (
    <>
      <TabList state={state}>
        <Tab>Tab 1</Tab>
        <Tab>Tab 2</Tab>
      </TabList>
      <TabPanel state={state}>Panel 1</TabPanel>
      <TabPanel state={state}>Panel 2</TabPanel>
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
