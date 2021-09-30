import { jsx } from '@vtex/admin-ui-react'

export const PageActions = jsx('div')({
  display: 'flex',
  alignItems: 'center',
  '* + *': {
    marginLeft: 4,
  },
})
