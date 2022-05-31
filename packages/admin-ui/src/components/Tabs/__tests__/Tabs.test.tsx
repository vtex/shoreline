import React from 'react'
import { render, axe } from '../../../test-utils'

import type { TabStateReturn } from '../index'
import { Tabs, TabList, Tab, TabPanel, useTabState } from '../index'

function TabsState({
  children,
}: {
  children: (state: TabStateReturn) => JSX.Element
}) {
  const state = useTabState({ baseId: 'tabs-test' })

  return children(state)
}

describe('Tabs', () => {
  it('should not have any violations', async () => {
    const { container } = render(
      <TabsState>
        {(state) => (
          <Tabs state={state}>
            <TabList fluid aria-label="tabs">
              <Tab id="1">Tab 1</Tab>
              <Tab id="2">Tab 2</Tab>
            </TabList>
            <TabPanel id="1">Tab 1 Content</TabPanel>
            <TabPanel id="2">Tab 2 Content</TabPanel>
          </Tabs>
        )}
      </TabsState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
