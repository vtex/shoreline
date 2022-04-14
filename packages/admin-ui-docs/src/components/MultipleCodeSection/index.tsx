import React from 'react'
import type { ReactNode } from 'react'

import {
  Tabs,
  Tab,
  TabList,
  useTabState,
  experimental_Filter as Filter,
  experimental_useFilterState as useFilterState,
} from '@vtex/admin-ui'

import { PageSection } from '../PageSection'

import './styles.scss'

export interface MultipleCodeSectionProps {
  children: ReactNode
  id: string
  options: string[]
  optionsTitle: string
  title: string
}

export function MultipleCodeSection(props: MultipleCodeSectionProps) {
  const tabState = useTabState()
  const items = props.options.map((option) => ({
    id: option.toLowerCase(),
    label: option,
  }))

  const filterState = useFilterState({
    label: props.optionsTitle,
    initialApplied: items[0].id,
    items,
    onChange: ({ selected }) => tabState.select(selected as string),
  })

  return (
    <PageSection
      id={props.id}
      title={props.title}
      actionElement={
        <div className="code-selector">
          <Filter state={filterState} />
        </div>
      }
    >
      <Tabs state={tabState}>
        <TabList fluid aria-label="Live code tabs" csx={{ display: 'none' }}>
          {props.options.map((option) => (
            <Tab id={option.toLowerCase()}>{option}</Tab>
          ))}
        </TabList>
        {props.children}
      </Tabs>
    </PageSection>
  )
}
