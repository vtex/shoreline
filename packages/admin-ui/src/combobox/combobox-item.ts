import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComboboxItemOptions } from 'ariakit/combobox'
import { useComboboxItem } from 'ariakit/combobox'
import type { HTMLProps } from 'react'
import type { AnyObject } from '..'

import * as style from './combobox.style'

export const ComboboxItem = createComponent<'div', ComboboxItemOptions>(
  (props) => {
    const htmlProps = useComboboxItem(props as AnyObject) as Omit<
      HTMLProps<'div'>,
      never
    >

    return useElement('div', {
      ...htmlProps,
      children: props.children,
      baseStyle: style.item,
    })
  }
)
