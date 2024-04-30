import React from 'react'
import { IconTrash } from '@vtex/shoreline-icons'

import { AccessibleIcon } from '../index'

export default {
  title: 'primitives/accessible-icon',
}

export function Show() {
  return (
    <AccessibleIcon label="Trash">
      <IconTrash />
    </AccessibleIcon>
  )
}
