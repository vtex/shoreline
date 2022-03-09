import { useElement } from '@vtex/admin-ui-react'

import * as style from '../components/Radio/Radio.style'

export const StyledRadio = ({ checked }: { checked: boolean }) => {
  return useElement('input', {
    baseStyle: {
      ...style.baseline,
      ':after': style.checkmark,
      ':checked': style.checked,
      ...style.regular,
    },
    checked,
    type: 'radio',
    readOnly: true,
  })
}
