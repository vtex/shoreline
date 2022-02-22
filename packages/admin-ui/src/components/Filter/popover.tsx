import { createComponent, useElement } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'
import { Popover as ReakitPopover } from 'reakit/Popover'
import { Role } from 'reakit'

export const Popover = createComponent<typeof ReakitPopover>((props) => {
  return useElement(ReakitPopover, {
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

export const PopoverFooter = createComponent<typeof Role>((props) => {
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
