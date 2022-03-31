import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComboboxItemOptions } from 'ariakit/combobox'
import { useComboboxItem } from 'ariakit/combobox'
import type { HTMLProps } from 'react'

import * as style from './combobox.style'

export const ComboboxItem = createComponent<'div', ComboboxItemOptions>(
  (props) => {
    // weird, the input of the hook should be exactly ComboboxItemOptions
    const htmlProps = useComboboxItem(props as any) as Omit<
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
