import { createComponent, useElement } from '@vtex/admin-ui-react'
import { ComboboxItem as AriakitComboboxItem } from 'ariakit/combobox'

import * as style from './combobox.style'

export const ComboboxItem = createComponent<typeof AriakitComboboxItem>(
  (props) => {
    // TODO: Check the type error that forbids onClick param
    const { onClick, ...restProps } = props as any

    const onClickObj: any = { onClick }

    return useElement(AriakitComboboxItem, {
      ...restProps,
      ...onClickObj,
      baseStyle: style.item,
    })
  }
)
