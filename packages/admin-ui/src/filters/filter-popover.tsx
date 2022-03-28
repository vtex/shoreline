import { Role } from 'reakit'
import { createComponent, useElement } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'

import { Menu } from 'ariakit'

export const FilterPopover = createComponent<typeof Menu>((props) => {
  return useElement(Menu, {
    baseStyle: {
      text: '$body',
      boxShadow: '$overlay.bottom',
      border: '$neutral',
      borderRadius: 'default',
      bg: '$primary',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: 256,
      zIndex: 999,
      ...focusVisible('neutral'),
    },
    ...props,
  })
})

export const FilterPopoverFooter = createComponent<
  typeof Role,
  FilterPopoverFooterProps
>((props) => {
  const { isContentScrollable = false, ...restProps } = props

  return useElement(Role, {
    baseStyle: {
      borderTop: isContentScrollable ? '$neutral' : 'none',
      padding: '$l',
      paddingTop: isContentScrollable ? undefined : 0,
      display: 'flex',
      justifyContent: 'end',
      'button:not(:first-child)': {
        marginLeft: '$l',
      },
    },
    ...restProps,
  })
})

interface FilterPopoverFooterProps {
  isContentScrollable?: boolean
}
