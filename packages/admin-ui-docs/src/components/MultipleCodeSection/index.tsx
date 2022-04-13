import React from 'react'
import type { ReactNode } from 'react'

import {
  Tabs,
  Tab,
  TabList,
  TabPanel,
  useTabState,
  experimental_Filter as Filter,
  experimental_useFilterState as useFilterState,
} from '@vtex/admin-ui'

import { PageSection } from '../PageSection'
import CodeBlock from '../../theme/CodeBlock'

import './styles.scss'

type OptionType = {
  id: string
  label: string
  code: string
  columnsCount: number
}

export interface MultipleCodeSectionProps {
  children: ReactNode
  hasVariants: boolean
  id: string
  isLive: boolean
  language: string
  layout: 'grid' | null
  options: OptionType[]
  optionsTitle: string
  title: string
}

export function MultipleCodeSection(props: MultipleCodeSectionProps) {
  const tabState = useTabState()
  const filterState = useFilterState({
    label: props.optionsTitle,
    initialApplied: props.options[0].id,
    onChange: ({ selected }) => tabState.select(selected as string),
    items: props.options,
  })

  const codeClassName = props.language ? `language-${props.language}` : ''

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
            <Tab id={option.id}>{option.id}</Tab>
          ))}
        </TabList>
        {props.options.map((option) => (
          <TabPanel id={option.id}>
            <CodeBlock
              className={codeClassName}
              columnsCount={option.columnsCount}
              children={option.code}
              live={props.isLive}
              layout={props.layout}
            />
          </TabPanel>
        ))}
        {props.children && (
          <div className="children-container">{props.children}</div>
        )}
      </Tabs>
    </PageSection>
  )
}
