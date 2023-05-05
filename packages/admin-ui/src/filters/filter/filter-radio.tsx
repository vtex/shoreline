import React from 'react'

import { radioTheme } from '../../radio/radio.css'

export const FilterRadio = (props: FilterRadioProps) => {
  const { checked } = props

  return (
    <input className={radioTheme} checked={checked} type="radio" readOnly />
  )
}

interface FilterRadioProps {
  checked: boolean
}
