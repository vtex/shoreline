import React from 'react'

import { Tabs, Tab, TabList, useTabState, colors } from '@vtex/admin-ui'
import TOC from '@theme/TOC'

import '@site/src/components/Page/styles.scss'

export type TabTocType = {
  overview: String[]
  designReference: String[]
  codeReference: String[]
}

export interface PageProps {
  tabToc: TabTocType
  children: Node
}

const getTabColor = (selectedId: string, tabId: string) => {
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

const tabName = {
  overview: 'Overview',
  designReference: 'Design Reference',
  codeReference: 'Code Reference',
}

export function Page(props: PageProps) {
  const state = useTabState({ selectedId: 'overview' })

  return (
    <Tabs state={state}>
      <TabList className="tab-list" aria-label="Component page tabs">
        {Object.keys(props.tabToc).map((key) => (
          <Tab id={key} csx={getTabColor(state.selectedId as string, key)}>
            {tabName[key as keyof Object]}
          </Tab>
        ))}
      </TabList>
      <div className="tab-container">
        {props.children}
        <TOC
          className="toc-container"
          toc={props.tabToc[state.selectedId as keyof TabTocType]}
        />
      </div>
    </Tabs>
  )
}
