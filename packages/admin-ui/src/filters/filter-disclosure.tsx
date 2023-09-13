import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef, useEffect } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { IconCaretUp } from '@vtex/phosphor-icons'
import { MenuButton } from 'ariakit/menu'

import { AppliedItemsLabel } from './filter-applied-items-label'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'
import type { UseFilterStateReturn } from './filter/filter.state'
import { useFilterOptionalContext } from './filter-control/filter-optional-context'
import { caretIconTheme, filterDisclosureTheme } from './filter.style'
import { Flex } from '../flex'

const asMulti = (state: any) => state as UseFilterMultipleReturn<any>

const convertAppliedToArray = (
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
) => {
  const singleSelectState = state as UseFilterStateReturn<any>

  return singleSelectState.appliedItem ? [singleSelectState.appliedItem] : []
}

export const FilterDisclosure = forwardRef(function FilterDisclosure(
  props: FilterDisclosureProps,
  ref: Ref<HTMLButtonElement>
) {
  const { state, children, id, className = '', ...restProps } = props
  const { shouldOpenOnMount = () => false } = useFilterOptionalContext()

  const { menu } = state

  const appliedList =
    asMulti(state)?.appliedItems ?? convertAppliedToArray(state)

  useEffect(() => {
    if (shouldOpenOnMount()) {
      menu.show()
    }
  }, [])

  const resolvedClassName = cx('__admin-ui-filter-disclosure', className)

  return (
    <MenuButton
      ref={ref}
      state={menu}
      id={id}
      className={cx(filterDisclosureTheme, resolvedClassName)}
      data-open={menu.mounted}
      {...restProps}
    >
      {children}
      <AppliedItemsLabel appliedItems={appliedList} />
      <Flex className={caretIconTheme} data-open={menu.mounted}>
        <IconCaretUp size="small" />
      </Flex>
    </MenuButton>
  )
})

interface FilterDisclosureProps extends ComponentPropsWithoutRef<'button'> {
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
}
