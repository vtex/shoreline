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
import { StyleObject } from '@vtex/admin-core'

function PopoverDisclosure(props: PopoverDisclosureProps) {
  const { children, state } = props

  Children.only(children)

  return (
    <ReakitPopoverDisclosure {...state} ref={children.ref} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </ReakitPopoverDisclosure>
  )
}

function FilterDisclosure(props: TableFilterDisclosureProps) {
  const {
    children,
    state: { filtersAmount, popoverState, ...buttonProps },
  } = props

  return (
    <PopoverDisclosure state={popoverState}>
      <StatelessTable.Toolbar.Button {...buttonProps}>
        <Flex align="center">
          {children}
          {Boolean(filtersAmount) && (
            <Box
              csx={{
                marginLeft: '0.25rem',
                paddingX: '0.375rem',
                paddingY: '0.125rem',
                borderRadius: '2rem',
                fontSize: '0.625rem',
                bg: 'blue.default',
                color: 'light.primary',
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
            zIndex: 999,
            top: '2.625rem',
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

  const disclosureState = useMemo(
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
      popoverState,
    }),
    [filterBarState.statements, popoverState]
  )

  const tableFilterBarState = {
    filterBarState,
    popoverState,
  }

  return {
    filterBarState: tableFilterBarState,
    disclosureState,
  }
}

export const TableFilterBar = Object.assign(_TableFilterBar, {
  Disclosure: FilterDisclosure,
})

export interface TableFilterProps<T, V extends { value: T }>
  extends Omit<FilterBarProps<T, V>, 'state'> {
  /**
   * Table's filter bar state
   */
  state: TableFilterBarState<V>
}

export interface TableFilterDisclosureProps extends SystemComponent {
  /**
   * Object that manages the Table Disclosure state
   */
  state: TableFilterDisclosureState
  /**
   * Element that will be displayed inside the Button
   */
  children?: ReactNode
  /**
   * Button onClick handler
   */
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export interface UseTableFilterBarStateParams<T> {
  /**
   * Params that will be passed to the usePopoverState
   */
  poopoverInitialState?: SealedInitialState<PopoverInitialState>
  /**
   * Params that will be pass to the useFilterBarState
   */
  filterBarParams: UseFilterBarStateParams<T>
}

export interface TableFilterBarState<T> {
  filterBarState: UseFilterBarStateReturn<T>
  popoverState: PopoverStateReturn
}

interface PopoverDisclosureProps {
  state: PopoverStateReturn
  children: FunctionComponentElement<unknown>
}

interface TableFilterDisclosureState {
  filtersAmount?: number
  icon: ReactNode
  csx: StyleObject
  popoverState: PopoverStateReturn
}
