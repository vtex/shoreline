import { Checkbox as ReakitCheckbox } from 'reakit/Checkbox'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import * as style from './switch.style'
import type { SwitchOptions } from './types'

export const SwitchButton = createComponent<
  typeof ReakitCheckbox,
  Omit<SwitchOptions, 'label' | 'error' | 'errorText' | 'helpText'>
>((props) => {
  const { state, ...htmlProps } = props

  return useElement(ReakitCheckbox, {
    role: 'switch',
    baseStyle: {
      ...style.track,
      ':after': style.thumb,
      '&:checked': style.checked,
    },
    ...state,
    ...htmlProps,
  })
})
