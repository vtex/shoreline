import React, {
  Children,
  cloneElement,
  FunctionComponentElement,
  MouseEventHandler,
  ReactNode,
  useMemo,
} from 'react'
import {
  Popover,
  PopoverStateReturn,
  PopoverInitialState,
  PopoverDisclosure as ReakitPopoverDisclosure,
  usePopoverState,
} from 'reakit'
import { SealedInitialState } from 'reakit-utils/ts'
import { IconFilter } from '@vtex/admin-ui-icons'
import { Flex, Box } from '@vtex/admin-primitives'

import {
  FilterBarProps,
  UseFilterBarStateParams,
  UseFilterBarStateReturn,
} from '../../FilterBar/typings'
import { FilterBar, useFilterBarState } from '../../FilterBar'
import { StatelessTable } from '../'
import { SystemComponent } from '../../../types'

function PopoverDisclosure(props: PopoverDisclosure) {
  const { children, state } = props

  Children.only(children)

  return (
    <ReakitPopoverDisclosure {...state} ref={children.ref} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </ReakitPopoverDisclosure>
  )
}

function FilterButton(props: FilterButton) {
  const { children, state, filtersAmount, ...buttonProps } = props

  return (
    <PopoverDisclosure state={state}>
      <StatelessTable.Toolbar.Button {...buttonProps}>
        <Flex align="center">
          {children}
          {Boolean(filtersAmount) && (
            <Box
              csx={{
                marginLeft: '0.25rem',
                paddingX: '0.375rem',
                paddingY: '0.125rem',
                borderRadius: '32px',
                bg: 'blue.default',
                color: 'white',
              }}
            >
              {filtersAmount}
            </Box>
          )}
        </Flex>
      </StatelessTable.Toolbar.Button>
    </PopoverDisclosure>
  )
}

function _TableFilterBar<T, V extends { value: T }>(
  props: TableFilterProps<T, V>
) {
  const {
    state: { filterBarState, popoverState },
    ...filterBarProps
  } = props

  return (
    <>
      <Popover {...popoverState}>
        <FilterBar
          state={filterBarState}
          csx={{
            position: 'absolute',
            top: '42px',
            left: '50%',
            width: '70%',
            minWidth: '40.875rem',
            maxWidth: '53.125rem',
            transform: 'translateX(-50%)',
          }}
          {...filterBarProps}
        />
      </Popover>
    </>
  )
}

export function useTableFilterBarState<T>(
  params: UseTableFilterBarStateParams<T>
) {
  const { poopoverInitialState, filterBarParams } = params

  const popoverState = usePopoverState(poopoverInitialState)

  const filterBarState = useFilterBarState(filterBarParams)

  const buttonProps = useMemo(
    () => ({
      icon: (
        <IconFilter
          csx={{
            transform: `rotate(90deg)`,
          }}
        />
      ),
      csx:
        Boolean(filterBarState.statements.length) || popoverState.visible
          ? {
              color: 'blue.default',
            }
          : {},
      filtersAmount: filterBarState.statements.length,
      state: popoverState,
    }),
    [filterBarState.statements, popoverState]
  )

  return {
    popoverState,
    filterBarState,
    buttonProps,
  }
}

export const TableFilterBar = Object.assign(_TableFilterBar, {
  Disclosure: FilterButton,
})

export interface TableFilterProps<T, V extends { value: T }>
  extends Omit<FilterBarProps<T, V>, 'state'> {
  state: TableFilterBarState<V>
}

export interface TableFilterBarState<T> {
  filterBarState: UseFilterBarStateReturn<T>
  popoverState: PopoverStateReturn
}

export interface UseTableFilterBarStateParams<T> {
  poopoverInitialState?: SealedInitialState<PopoverInitialState>
  filterBarParams: UseFilterBarStateParams<T>
}

interface PopoverDisclosure {
  state: PopoverStateReturn
  children: FunctionComponentElement<unknown>
}

export interface FilterButton
  extends Pick<PopoverDisclosure, 'state'>,
    SystemComponent {
  children: ReactNode
  onClick?: MouseEventHandler<HTMLButtonElement>
  filtersAmount?: number
}
