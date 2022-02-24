import { Role } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'

import { PickerPopover } from '../../picker'

export const FilterPopover = createComponent<typeof PickerPopover>((props) => {
  return useElement(PickerPopover, {
    baseStyle: {
      boxShadow: '$overlay.bottom',
      border: '$neutral',
      borderRadius: 'default',
      bg: '$primary',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minWidth: 200,
      minHeight: 200,
      ...focusVisible('neutral'),
    },
    ...props,
  })
})

export const FilterPopoverFooter = createComponent<typeof Role>((props) => {
  return useElement(Role, {
    baseStyle: {
      borderTop: '$neutral',
      padding: 3,
      display: 'flex',
      justifyContent: 'end',
      'button:not(:first-child)': {
        marginLeft: 2,
      },
    },
    ...props,
  })
})
