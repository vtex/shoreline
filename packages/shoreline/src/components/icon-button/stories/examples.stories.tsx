import { IconTrash } from '@vtex/shoreline-icons'
import { AccessibleIcon } from '../../accessible-icon'

import { Stack } from '../../stack'
import { IconButton } from '../index'

export default {
  title: 'components/icon-button',
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
}

export function AsAnchor() {
  return (
    <Stack>
      <IconButton label="Preview" asChild>
        <a href="https://vtex.com" target="_blank" rel="noreferrer">
          <AccessibleIcon label="Preview">
            <IconTrash />
          </AccessibleIcon>
        </a>
      </IconButton>
    </Stack>
  )
}
