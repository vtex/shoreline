import type { ReactNode } from 'react'
import React, { useEffect } from 'react'

import { IconCaretUp } from '@vtex/phosphor-icons'
import { MenuButton } from 'ariakit/menu'

import * as style from './filter.style'
import { AppliedItemsLabel } from './filter-applied-items-label'
import type { UseFilterMultipleReturn } from './filter-multiple/filter-multiple.state'
import type { UseFilterStateReturn } from './filter/filter.state'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { useFilterOptionalContext } from './filter-control/filter-optional-context'
import { Flex } from '../flex'

const asMulti = (state: any) => state as UseFilterMultipleReturn<any>

const convertAppliedToArray = (
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
) => {
  const singleSelectState = state as UseFilterStateReturn<any>

  return singleSelectState.appliedItem ? [singleSelectState.appliedItem] : []
}

export const FilterDisclosure = createComponent<
  typeof MenuButton,
  FilterDisclosureProps
>((props: FilterDisclosureProps) => {
  const { state, children, id, ...restProps } = props
  const { shouldOpenOnMount = () => false } = useFilterOptionalContext()

  const { menu } = state

  const appliedList =
    asMulti(state)?.appliedItems ?? convertAppliedToArray(state)

  useEffect(() => {
    if (shouldOpenOnMount()) {
      menu.show()
    }
  }, [])

  return useElement(MenuButton, {
    baseStyle: {
      ...style.disclosure,
      ...style.disclosureVariants({
        open: menu.mounted,
      }),
    },
    children: (
      <>
        {children}
        <AppliedItemsLabel appliedItems={appliedList} />
        <Flex csx={style.caretIcon(menu.mounted)}>
          <IconCaretUp size="small" />
        </Flex>
      </>
    ),
    state: menu,
    id,
    className: '__admin-ui-filter-disclosure',
    ...restProps,
  })
})

interface FilterDisclosureProps {
  state: UseFilterMultipleReturn<any> | UseFilterStateReturn<any>
  id?: string
  children: ReactNode
}
