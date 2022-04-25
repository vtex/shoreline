import React from 'react'

import { Tabs, Tab, TabList, useTabState, colors } from '@vtex/admin-ui'
import TOC from '@theme/TOC'

import '@site/src/components/Page/styles.scss'

export type TocType = {
  overview: String[]
  designReference: String[]
  codeReference: String[]
}

export interface PageProps {
  hasTabs?: boolean
  toc: TocType
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
  designReference: 'Design',
  codeReference: 'Code',
}

export function Page(props: PageProps) {
  const state = useTabState({ selectedId: 'overview' })

  const hasToc = state.currentId !== 'designReference'

  return props.hasTabs ? (
    <Tabs state={state}>
      <TabList className="tab-list" aria-label="Component page tabs">
        {Object.keys(props.toc).map((key) => (
          <Tab id={key} csx={getTabColor(state.selectedId as string, key)}>
            {tabName[key as keyof Object]}
          </Tab>
        ))}
      </TabList>
      <div className="page-container">
        {props.children}
        {hasToc ? (
          <TOC
            className="toc-container"
            toc={props.toc[state.selectedId as keyof TocType]}
          />
        ) : null}
      </div>
    </Tabs>
  ) : (
    <div className="page-container">
      <div className="panel-content">{props.children}</div>
      <TOC className="toc-container" toc={props.toc} />
    </div>
  )
}

export { Panel } from './Panel'
