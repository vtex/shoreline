import { useElement } from '@vtex/admin-ui-react'

import * as style from '../../radio/radio.style'

export const FilterRadio = (props: FilterRadioProps) => {
  const { checked } = props

  return useElement('input', {
    baseStyle: {
      ...style.radioButtonStyle,
      ariaChecked: undefined,
      marginRight: '$s',
    },
    checked,
    type: 'radio',
    readOnly: true,
  })
}

interface FilterRadioProps {
  checked: boolean
}
