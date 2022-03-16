import type { HTMLAttributes, ReactNode } from 'react'
import React from 'react'
import type { PickerStateReturn } from '../picker'
import { PickerDisclosure } from '../picker'
import * as style from './filter-disclosure.style'

export const FilterDisclosure = (
  props: FilterDisclosureProps & HTMLAttributes<HTMLElement>
) => {
  const { state, children, ...labelProps } = props

  return (
    <PickerDisclosure
      state={state}
      csx={style.baseline}
      tabIndex={0}
      {...labelProps}
    >
      {children}
    </PickerDisclosure>
  )
}

interface FilterDisclosureProps {
  state: PickerStateReturn
  children: ReactNode
}
