import React from 'react'
import { render, axe } from '../../test-utils'

import type { TabStateReturn } from './index'
import { Tabs, useTabState } from './index'

function TabsState({
  children,
}: {
  children: (state: TabStateReturn) => JSX.Element
}) {
  const state = useTabState({ baseId: 'tabs-test' })

  return children(state)
}

describe('Tabs tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <TabsState>
        {(state) => (
          <Tabs state={state}>
            <Tabs.List
              aria-label="overridable-tabs"
              data-testid="tabs-list"
              csx={{ bg: 'azure' }}
            >
              <Tabs.Tab
                data-testid="tabs-tab"
                csx={{ bg: 'azure' }}
                label="Tab 1"
                id="1"
              />
            </Tabs.List>
            <Tabs.Content
              data-testid="tabs-content"
              id="1"
              csx={{ bg: 'azure' }}
            >
              Tab 1 Content
            </Tabs.Content>
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
              <Tabs.List aria-label="fixed-tabs">
                <Tabs.Tab label="Tab 1" id="1" />
                <Tabs.Tab label="Tab 2" id="2" />
              </Tabs.List>
              <Tabs.Content id="1">Tab 1 Content</Tabs.Content>
              <Tabs.Content id="2">Tab 2 Content</Tabs.Content>
            </Tabs>
          )}
        </TabsState>
        <TabsState>
          {(state) => (
            <Tabs state={state}>
              <Tabs.List fluid aria-label="fluid-tabs">
                <Tabs.Tab label="Tab 1" id="1" />
                <Tabs.Tab label="Tab 2" id="2" />
              </Tabs.List>
              <Tabs.Content id="1">Tab 1 Content</Tabs.Content>
              <Tabs.Content id="2">Tab 2 Content</Tabs.Content>
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
            <Tabs.List fluid aria-label="tabs">
              <Tabs.Tab label="Tab 1" id="1" />
              <Tabs.Tab label="Tab 2" id="2" />
            </Tabs.List>
            <Tabs.Content id="1">Tab 1 Content</Tabs.Content>
            <Tabs.Content id="2">Tab 2 Content</Tabs.Content>
          </Tabs>
        )}
      </TabsState>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
