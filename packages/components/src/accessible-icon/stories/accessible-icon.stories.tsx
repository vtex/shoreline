import React from 'react'
import { IconTrash } from '@vtex/shoreline-icons'

import { AccessibleIcon } from '../index'

export default {
  title: 'shoreline-components/accessible-icon',
}

export function Default() {
  return (
    <AccessibleIcon label="Trash">
      <IconTrash />
    </AccessibleIcon>
  )
}
