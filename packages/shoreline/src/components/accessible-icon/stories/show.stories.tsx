import { IconTrash } from '@vtex/shoreline-icons'

import { AccessibleIcon } from '../index'

export default {
  title: 'components/accessible-icon',
}

export function Show() {
  return (
    <AccessibleIcon label="Trash">
      <IconTrash />
    </AccessibleIcon>
  )
}
