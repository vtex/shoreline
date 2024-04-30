import React, { useState } from 'react'
import { IconTrash } from '@vtex/shoreline-icons'
import { AccessibleIcon } from '@vtex/shoreline-primitives'

import { Stack } from '../../stack'
import { IconButton } from '../index'

export default {
  title: 'components/icon-button/examples',
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
