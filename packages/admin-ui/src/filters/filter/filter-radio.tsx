import { csx, cx } from '@vtex/admin-ui-core'
import { useElement } from '@vtex/admin-ui-react'

import { radioTheme } from '../../radio/radio.css'

export const FilterRadio = (props: FilterRadioProps) => {
  const { checked } = props

  return useElement('input', {
    className: cx(
      radioTheme,
      csx({ ariaChecked: undefined, marginRight: '$space-2' })
    ),
    checked,
    type: 'radio',
    readOnly: true,
  })
}

interface FilterRadioProps {
  checked: boolean
}
