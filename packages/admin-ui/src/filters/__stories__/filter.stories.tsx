import React, { useEffect } from 'react'
import type { Meta, Story } from '@storybook/react'

import { FilterDisclosure } from '../filter-disclosure'
import { FilterPopover } from '../filter-popover'

import { FilterFooter } from '../filter-footer'
import { FilterListbox } from '../filter-listbox'

import { useFilterMultipleState } from '../filter-multiple/filter-multiple.state'
import { FilterOptionCheckbox } from '../filter-multiple/filter-option-checkbox'

import { useFilterState } from '../filter/filter.state'

import { FilterOptionRadio } from '../filter/filter-option-radio'
import { FilterGroup } from '../filter-group'
import { useFilterGroupState } from '../filter-group.state'
import { I18nProvider } from '@react-aria/i18n'

export default {
  title: 'admin-ui/Filters',
  component: FilterGroup,
} as Meta

function PlaygroundExample({ args }: any) {
  const state = useFilterMultipleState()

  return (
    <>
      <FilterDisclosure state={state}>Status</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterListbox state={state}>
          {args.items.map((item: { label: string; id: string }) => (
            <FilterOptionCheckbox {...item} state={state}>
              {item.label}
            </FilterOptionCheckbox>
          ))}
        </FilterListbox>
        <FilterFooter state={state} />
      </FilterPopover>
    </>
  )
}

export const Playground: Story = (args) => {
  return <PlaygroundExample args={args} />
}

Playground.args = {
  items: [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
    { label: 'Half empty', id: '#4' },
    { label: 'Unknown', id: '#5' },
    { label: 'Overflowing', id: '#6' },
    { label: 'Less than empty', id: '#7' },
    { label: 'Almost empty', id: '#8' },
    { label: 'Almost full', id: '#9' },
  ],
  label: 'Status',
}

export function SingleFromScrach() {
  const filterState = useFilterState()

  return (
    <>
      <FilterDisclosure state={filterState}>Example</FilterDisclosure>

      <FilterPopover state={filterState}>
        <FilterListbox state={filterState}>
          <FilterOptionRadio id="#1" state={filterState}>
            Full
          </FilterOptionRadio>
          <FilterOptionRadio id="#2" state={filterState}>
            Empty
          </FilterOptionRadio>
          <FilterOptionRadio id="#3" state={filterState}>
            Half full
          </FilterOptionRadio>
        </FilterListbox>
        <FilterFooter state={filterState} />
      </FilterPopover>
    </>
  )
}

export function MultipleFromScratch() {
  const items = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
  ]

  const filterState = useFilterMultipleState()

  return (
    <>
      <FilterDisclosure state={filterState}>Example</FilterDisclosure>

      <FilterPopover state={filterState}>
        <FilterListbox state={filterState}>
          {items.map((item) => (
            <FilterOptionCheckbox id={item.id} state={filterState} value={item}>
              {item.label}
            </FilterOptionCheckbox>
          ))}
        </FilterListbox>
        <FilterFooter state={filterState} />
      </FilterPopover>
    </>
  )
}

export function BasicFilterGroup() {
  const list1 = [
    { label: 'Full', id: '#1' },
    { label: 'Empty', id: '#2' },
    { label: 'Half full', id: '#3' },
    { label: 'Half empty', id: '#4' },
    { label: 'Unknown', id: '#5' },
    { label: 'Half empty', id: '#10' },
  ]

  const list2 = [
    { label: 'Rio de Janeiro', value: { grade: 10 }, id: '#1' },
    { label: 'New York', value: { grade: 9 }, id: '#2' },
    { label: 'Paris', value: { grade: 9 }, id: '#3' },
    { label: 'Tokyo', value: { grade: 9 }, id: '#4' },
  ]

  const state = useFilterMultipleState()
  const state2 = useFilterState()

  useEffect(() => {
    // initial value example
    state2.setAppliedItem({
      label: 'Rio de Janeiro',
      value: { grade: 10 },
      id: '#1',
    })
  }, [])

  const filterGroupState = useFilterGroupState({
    filterStates: [state2, state],
  })

  return (
    <FilterGroup state={filterGroupState}>
      <FilterDisclosure state={state}>Status</FilterDisclosure>

      <FilterPopover state={state}>
        <FilterListbox state={state}>
          {list1.map((item) => (
            <FilterOptionCheckbox {...item} state={state}>
              {item.label}
            </FilterOptionCheckbox>
          ))}
        </FilterListbox>
        <FilterFooter state={state} />
      </FilterPopover>

      <FilterDisclosure state={state2}>City</FilterDisclosure>

      <FilterPopover state={state2}>
        <FilterListbox state={state2}>
          {list2.map((item) => (
            <FilterOptionRadio {...item} state={state2}>
              {item.label}
            </FilterOptionRadio>
          ))}
        </FilterListbox>
        <FilterFooter state={state2} />
      </FilterPopover>
    </FilterGroup>
  )
}

export function Interationalization() {
  const state = useFilterState()

  const filterGroupState = useFilterGroupState({
    filterStates: [state],
  })

  return (
    <I18nProvider locale="pt-BR">
      <FilterGroup state={filterGroupState}>
        <FilterDisclosure state={state}>Status</FilterDisclosure>

        <FilterPopover state={state}>
          <FilterListbox state={state}>
            <FilterOptionRadio id="#1" state={state}>
              Available
            </FilterOptionRadio>
            <FilterOptionRadio id="#2" state={state}>
              Unavailable
            </FilterOptionRadio>
          </FilterListbox>
          <FilterFooter state={state} />
        </FilterPopover>
      </FilterGroup>
    </I18nProvider>
  )
}
