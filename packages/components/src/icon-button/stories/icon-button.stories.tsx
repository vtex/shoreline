import '../../../shoreline/styles.css'

import React, { useState } from 'react'
import { IconButton } from '../index'
import { Stack } from '../../stack'
import { IconTrash } from '@vtex/shoreline-icons'

export default {
  title: 'shoreline-components/icon-button',
}

export function Default() {
  return (
    <IconButton label="Delete">
      <IconTrash />
    </IconButton>
  )
}

export function Size() {
  return (
    <Stack>
      <IconButton label="Delete">
        <IconTrash />
      </IconButton>
      <IconButton label="Delete" size="large">
        <IconTrash />
      </IconButton>
    </Stack>
  )
}

export function Loading() {
  const [loading, setLoading] = useState(true)

  return (
    <IconButton
      label="Delete"
      onClick={() => setLoading((l) => !l)}
      loading={loading}
    >
      <IconTrash />
    </IconButton>
  )
}
