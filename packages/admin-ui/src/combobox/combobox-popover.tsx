import React from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { ComboboxPopoverBase } from './combobox-popover-base'
import { ComboboxItem } from './combobox-item'

export const ComboboxPopover = createComponent<typeof ComboboxPopoverBase>(
  (props) =>
    useElement(ComboboxPopoverBase, {
      ...props,
      children: props.state.matches.map((value) => (
        <ComboboxItem key={value} value={value} />
      )),
    })
)
