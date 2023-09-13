import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'

import { FilterListbox } from '../filter-listbox'
import { FilterPopover } from '../filter-popover'

import { FilterOptionCheckbox } from '../filter-multiple/filter-option-checkbox'
import type { FilterControlState } from './filter-control-state'
import { FilterFooter } from '../filter-footer'
import { MenuButton } from 'ariakit'

import { messages } from '../messages'
import { useMessageFormatter } from '../../i18n'

import { Button } from '../../button'
import { Flex } from '../../flex'
import { IconCaretUp, IconCheck } from '@vtex/phosphor-icons'
import { csx } from '@vtex/admin-ui-core'
import {
  caretIconTheme,
  filterControlDisclosureTheme,
  filterControlOptionTheme,
} from '../filter.style'

export const FilterControl = forwardRef(function FilterControl(
  props: FilterControlProps,
  ref: Ref<HTMLDivElement>
) {
  const { state, ...htmlProps } = props
  const { combobox, menu, onChange } = state

  const formatMessage = useMessageFormatter(messages)

  return (
    <div {...htmlProps} ref={ref}>
      <MenuButton
        className={filterControlDisclosureTheme}
        data-variant="neutralTertiary"
        data-size="normal"
        state={menu}
      >
        {formatMessage('moreFilters')}
        <Flex className={caretIconTheme} data-open={menu.mounted}>
          <IconCaretUp size="small" />
        </Flex>
      </MenuButton>
      <FilterPopover state={state}>
        <FilterListbox
          className={csx({
            '> * > *:not(:first-child)': {
              marginTop: '$space-0',
            },
          })}
        >
          {state.items.map((item) => (
            <FilterOptionCheckbox
              id={item.id}
              label={item.label}
              className={filterControlOptionTheme}
              data-selected={combobox.isSelected(item)}
            >
              {item.label}
              {combobox.isSelected(item) && <IconCheck />}
            </FilterOptionCheckbox>
          ))}
        </FilterListbox>
        <FilterFooter>
          <Button onClick={onChange}>{formatMessage('apply')}</Button>
        </FilterFooter>
      </FilterPopover>
    </div>
  )
})

interface FilterControlProps extends ComponentPropsWithoutRef<'div'> {
  state: FilterControlState
}
