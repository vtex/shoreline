import { useElement } from '@vtex/admin-ui-react'

import * as style from '../components/Radio/Radio.style'

export const FilterRadio = (props: FilterRadioProps) => {
  const { checked } = props

  return useElement('input', {
    baseStyle: {
      ...style.baseline,
      ':after': style.checkmark,
      ':checked': style.checked,
      ...style.regular,
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
