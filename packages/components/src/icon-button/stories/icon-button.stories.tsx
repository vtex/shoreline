import React, { useState } from 'react'
import { IconTrash } from '@vtex/shoreline-icons'
import { AccessibleIcon } from '../../accessible-icon'
import { Stack } from '../../stack'
import { IconButton } from '../index'

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

export function Composition() {
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
