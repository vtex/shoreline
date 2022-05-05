import { createComponent, useElement } from '@vtex/admin-ui-react'
import type { ComboboxItemOptions } from 'ariakit/combobox'
import { useComboboxItem } from 'ariakit/combobox'
import type { HTMLProps } from 'react'
import type { AnyObject } from '@vtex/admin-ui-util'

// TODO this intermediary component is a workaround for typing conflits
// on ariakit we should investigate the typing issues

export const ComboboxItem = createComponent<
  'div',
  ComboboxItemOptions & { style: any }
>((props) => {
  const htmlProps = useComboboxItem(props as AnyObject) as Omit<
    HTMLProps<'div'>,
    never
  >

  return useElement('div', {
    ...htmlProps,
    children: props.children,
    baseStyle: props.style || {},
  })
})
