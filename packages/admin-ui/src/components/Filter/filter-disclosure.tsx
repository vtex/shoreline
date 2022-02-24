import type { HTMLAttributes, ReactNode } from 'react'
import React from 'react'
import type { PickerStateReturn } from '../../picker'
import { PickerDisclosure } from '../../picker'
import * as style from '../Button/Button.style'

export const FilterDisclosure = (props: FilterDisclosureProps) => {
  const { state, labelProps, children } = props

  return (
    <PickerDisclosure
      state={state}
      csx={{
        ...style.baseline,
        ...style.regular({ icon: 'end' }),
        ...style.svg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        text: '$action1',
        bg: '$action.neutral.secondary',
        color: '$secondary',
        ':hover': {
          bg: '$action.neutral.secondaryHover',
          color: '$secondary',
        },
        ':active': {
          bg: '$action.neutral.secondaryPressed',
          color: '$secondary',
        },
      }}
      {...labelProps}
    >
      {children}
    </PickerDisclosure>
  )
}

interface FilterDisclosureProps {
  state: PickerStateReturn
  labelProps: HTMLAttributes<HTMLElement>
  children: ReactNode
}
