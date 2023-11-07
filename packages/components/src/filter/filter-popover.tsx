import React, { forwardRef } from 'react'
import type { PopoverProps } from '../popover'
import { Popover } from '../popover'
import { Content } from '../content'
import { Stack } from '../stack'
import { FilterClear } from './filter-clear'
import { FilterApply } from './filter-apply'
import { Button } from '../button'

export const FilterPopover = forwardRef<HTMLDivElement, FilterPopoverProps>(
  function FilterPopover(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Popover data-sl-filter-popover ref={ref} {...otherProps}>
        <Content>
          <Stack fluid>
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
