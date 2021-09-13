import React from 'react'
import { render, axe } from '../../../test-utils'

import type { TabStateReturn } from '../index'
import { Tabs, TabsList, Tab, TabContent, useTabState } from '../index'

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
            <TabsList
              aria-label="overridable-tabs"
              data-testid="tabs-list"
              csx={{ bg: 'azure' }}
            >
              <Tab
                data-testid="tabs-tab"
                csx={{ bg: 'azure' }}
                label="Tab 1"
                id="1"
              />
            </TabsList>
            <TabContent data-testid="tabs-content" id="1" csx={{ bg: 'azure' }}>
              Tab 1 Content
            </TabContent>
          </Tabs>
        )}
      </TabsState>
    )

    expect(getByTestId('tabs-list')).toHaveStyleRule(
      'background-color',
      'azure'
    )
    expect(getByTestId('tabs-tab')).toHaveStyleRule('background-color', 'azure')
    expect(getByTestId('tabs-content')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <TabsState>
          {(state) => (
            <Tabs state={state}>
              <TabsList aria-label="fixed-tabs">
                <Tab label="Tab 1" id="1" />
                <Tab label="Tab 2" id="2" />
              </TabsList>
              <TabContent id="1">Tab 1 Content</TabContent>
              <TabContent id="2">Tab 2 Content</TabContent>
            </Tabs>
          )}
        </TabsState>
        <TabsState>
          {(state) => (
            <Tabs state={state}>
              <TabsList fluid aria-label="fluid-tabs">
                <Tab label="Tab 1" id="1" />
                <Tab label="Tab 2" id="2" />
              </TabsList>
              <TabContent id="1">Tab 1 Content</TabContent>
              <TabContent id="2">Tab 2 Content</TabContent>
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
            <TabsList fluid aria-label="tabs">
              <Tab label="Tab 1" id="1" />
              <Tab label="Tab 2" id="2" />
            </TabsList>
            <TabContent id="1">Tab 1 Content</TabContent>
            <TabContent id="2">Tab 2 Content</TabContent>
          </Tabs>
        )}
      </TabsState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
