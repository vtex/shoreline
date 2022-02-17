import { jsx } from '@vtex/admin-ui-react'
import { focusVisible } from '@vtex/admin-ui-core'
import { Popover as ReakitPopover } from 'reakit/Popover'

export const Popover = jsx(ReakitPopover)({
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
})

export const PopoverFooter = jsx('div')({
  borderTop: '$neutral',
  padding: 3,
  display: 'flex',
  justifyContent: 'end',
  'button:not(:first-child)': {
    marginLeft: 2,
  },
})

export {
  PopoverDisclosure,
  usePopoverState,
  PopoverStateReturn,
} from 'reakit/Popover'
