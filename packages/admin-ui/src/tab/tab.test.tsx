import React from 'react'

import { render } from '../test-utils'
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
  it('renders', async () => {
    const { container } = render(<Example />)

    expect(container).toBeInTheDocument()
  })
})
