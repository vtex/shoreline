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
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <TabsState>
        {(state) => (
          <Tabs state={state}>
            <TabList
              aria-label="overridable-tabs"
              data-testid="tabs-list"
              csx={{ bg: 'azure' }}
            >
              <Tab data-testid="tabs-tab" csx={{ bg: 'azure' }} id="1">
                Tab 1
              </Tab>
            </TabList>
            <TabPanel data-testid="tabs-content" id="1" csx={{ bg: 'azure' }}>
              Tab 1 Content
            </TabPanel>
          </Tabs>
        )}
      </TabsState>
    )

    expect(getByTestId('tabs-list')).toHaveStyleRule('background', 'azure')
    expect(getByTestId('tabs-tab')).toHaveStyleRule('background', 'azure')
    expect(getByTestId('tabs-content')).toHaveStyleRule('background', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <TabsState>
          {(state) => (
            <Tabs state={state}>
              <TabList aria-label="fixed-tabs">
                <Tab id="1">Tab 1</Tab>
                <Tab id="2">Tab 2</Tab>
              </TabList>
              <TabPanel id="1">Tab 1 Content</TabPanel>
              <TabPanel id="2">Tab 2 Content</TabPanel>
            </Tabs>
          )}
        </TabsState>
        <TabsState>
          {(state) => (
            <Tabs state={state}>
              <TabList fluid aria-label="fluid-tabs">
                <Tab id="1">Tab 1</Tab>
                <Tab id="2">Tab 2</Tab>
              </TabList>
              <TabPanel id="1">Tab 1 Content</TabPanel>
              <TabPanel id="2">Tab 2 Content</TabPanel>
            </Tabs>
          )}
        </TabsState>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

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
