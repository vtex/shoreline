import React from 'react'
import type { ReactNode } from 'react'

import {
  Tabs,
  Tab,
  TabList,
  useTabState,
  experimental_Filter as Filter,
  experimental_useFilterState as useFilterState,
  VisuallyHidden,
} from '@vtex/admin-ui'

import { Section } from '../Section'

import './styles.scss'

export interface MultipleCodeSectionProps {
  children: ReactNode
  options: string[]
  optionsTitle: string
}

const FIRST_ELEMENT = 0

export function MultipleCodeSection(props: MultipleCodeSectionProps) {
  const tabState = useTabState()
  const { children, options, optionsTitle } = props

  const items = options.map((option) => ({
    id: option.toLowerCase(),
    label: option,
  }))

  const filterState = useFilterState({
    label: optionsTitle,
    items,
    onChange: ({ selected }) => {
      if (!selected) return

      tabState.select(selected.id)
    },
  })

  return (
    <Section
      actionElement={
        <div className="code-selector">
          <Filter state={filterState} />
        </div>
      }
    >
      {React.Children.map(children, (child, index) =>
        index === FIRST_ELEMENT ? child : null
      )}
      <Tabs state={tabState}>
        <VisuallyHidden>
          <TabList fluid aria-label="Live code tabs">
            {options.map((option) => (
              <Tab id={option.toLowerCase()}>{option}</Tab>
            ))}
          </TabList>
        </VisuallyHidden>
        {React.Children.map(children, (child, index) =>
          index === FIRST_ELEMENT ? null : child
        )}
      </Tabs>
    </Section>
  )
}
