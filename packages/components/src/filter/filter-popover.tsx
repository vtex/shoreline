import React, { forwardRef } from 'react'

import type { PopoverProps } from '../popover'
import { Popover } from '../popover'
import { Content } from '../content'
import { Stack } from '../stack'
import { FilterClear } from './filter-clear'
import { FilterApply } from './filter-apply'
import { Button } from '../button'
import { Combobox } from '../combobox'
import { useSearchable } from './use-searchable'

export const FilterPopover = forwardRef<HTMLDivElement, FilterPopoverProps>(
  function FilterPopover(props, ref) {
    const { children, ...otherProps } = props

    const searchable = useSearchable()

    return (
      <Popover data-sl-filter-popover ref={ref} {...otherProps}>
        <Content>
          <Stack fluid>
            {searchable && (
              <div>
                <Combobox
                  data-sl-filter-popover-combobox
                  autoSelect
                  placeholder="Search..."
                />
              </div>
            )}
            {children}
            <footer>
              <FilterClear asChild>
                <Button>Clear</Button>
              </FilterClear>
              <FilterApply asChild>
                <Button variant="primary">Apply</Button>
              </FilterApply>
            </footer>
          </Stack>
        </Content>
      </Popover>
    )
  }
)

export type FilterPopoverProps = PopoverProps
