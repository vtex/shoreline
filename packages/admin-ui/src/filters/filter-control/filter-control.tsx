import { Role } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import React from 'react'

import { FilterListbox } from '../filter-listbox'
import { FilterPopover } from '../filter-popover'

import { FilterOptionCheckbox } from '../filter-multiple/filter-option-checkbox'
import type { FilterControlState } from './filter-control-state'
import { FilterFooter } from '../filter-footer'
import { MenuButton } from 'ariakit'

import * as style from '../filter.style'
import { messages } from '../filter.i18n'
import { useMessageFormatter } from '../../i18n'

import { Button } from '../../button'
import { IconCaretUp, IconCheck } from '../..'

export const FilterControl = createComponent<typeof Role, FilterControlProps>(
  (props) => {
    const { state } = props
    const { combobox, menu, onChange } = state

    const formatMessage = useMessageFormatter(messages.actions)

    return useElement(Role, {
      children: (
        <>
          <Button
            as={MenuButton as any}
            icon={
              <IconCaretUp size="small" csx={style.caretIcon(menu.mounted)} />
            }
            state={menu}
            variant="neutralTertiary"
            iconPosition="end"
          >
            {formatMessage('moreFilters')}
          </Button>

          <FilterPopover state={state}>
            <FilterListbox>
              {state.items.map((item) => (
                <FilterOptionCheckbox
                  id={item.id}
                  label={item.label}
                  csx={{
                    ...style.visibilitySelectorItem,
                    ...style.visibilitySelectorItemVariants({
                      selected: combobox.isSelected(item),
                    }),
                  }}
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
        </>
      ),
      ...props,
    })
  }
)

interface FilterControlProps {
  state: FilterControlState
}
