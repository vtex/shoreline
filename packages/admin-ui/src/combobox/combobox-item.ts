import { createComponent, useElement } from '@vtex/admin-ui-react'
import { ComboboxItem as AriakitComboboxItem } from 'ariakit/combobox'

import * as style from './combobox.style'

export const ComboboxItem = createComponent<typeof AriakitComboboxItem>(
  (props) => {
    return useElement(AriakitComboboxItem, {
      ...props,
      baseStyle: style.item,
    })
  }
)
