import React from 'react'

import { Tabs, Tab, TabList, useTabState, colors } from '@vtex/admin-ui'

import '@site/src/components/Page/styles.scss'

interface PageProps {
  children: Node
}
const getTabColor = (selectedId: any, tabId: string) => {
  const isTabSelected = selectedId === tabId
  const selectedTabColor = isTabSelected ? colors.pink40 : '$primary'

  return {
    color: selectedTabColor,
    'border-bottom-color': selectedTabColor,
    ':hover': {
      color: colors.pink40,
    },
  }
}

export function Page(props: PageProps) {
  const state = useTabState()

  return (
    <Tabs state={state}>
      <TabList className="tab-list" aria-label="Component page tabs">
        <Tab id="overview" csx={getTabColor(state.selectedId, 'overview')}>
          Overview
        </Tab>
        <Tab
          id="design-reference"
          csx={getTabColor(state.selectedId, 'design-reference')}
        >
          Design Reference
        </Tab>
        <Tab
          id="code-reference"
          csx={getTabColor(state.selectedId, 'code-reference')}
        >
          Code Reference
        </Tab>
      </TabList>
      {props.children}
    </Tabs>
  )
}
