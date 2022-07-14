import React from 'react'

import { Tab, TabList, TabPanelList, useTabState } from '@vtex/admin-ui'
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

const tabName = {
  overview: 'Overview',
  designReference: 'Design',
  codeReference: 'Code',
}

export function Page(props: PageProps) {
  const tab = useTabState({ defaultSelectedId: 'overview' })

  return props.hasTabs ? (
    <>
      <TabList
        state={tab}
        className="tab-list"
        aria-label="Component page tabs"
      >
        {Object.keys(props.toc).map((key) => (
          <Tab
            id={key}
            csx={{
              '&[aria-selected="true"]': {
                color: '$pink40',
                borderColor: '$pink40',
              },
              ':hover': {
                color: '$pink40',
              },
            }}
          >
            {tabName[key as keyof Object]}
          </Tab>
        ))}
      </TabList>
      <div className="page-container">
        <TabPanelList state={tab}>{props.children}</TabPanelList>
        <TOC
          className="toc-container"
          toc={props.toc[tab.selectedId as keyof TocType]}
        />
      </div>
    </>
  ) : (
    <div className="page-container">
      <div className="panel-content">{props.children}</div>
      <TOC className="toc-container" toc={props.toc} />
    </div>
  )
}

export { Panel } from './Panel'
