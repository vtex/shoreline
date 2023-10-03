import React, { useState } from 'react'

import '../../../shoreline/styles.css'

import { Flex } from '../../flex'
import { Bleed } from '../../bleed'
import { Stack } from '../../stack'
import { AccessibleIcon } from '../../accessible-icon'
import { Button } from '../index'
import { IconTrash } from '@vtex/shoreline-icons'

export default {
  title: 'shoreline-components/button',
}

export function Default() {
  return <Button>Create</Button>
}

export function WithIcon() {
  return (
    <Stack>
      <Button>
        <IconTrash />
        Delete
        <IconTrash />
      </Button>
      <Button>
        <IconTrash />
        Delete
      </Button>
      <Button>
        Delete
        <IconTrash />
      </Button>
      <Button>
        <AccessibleIcon label="Delete">
          <IconTrash />
        </AccessibleIcon>
      </Button>
    </Stack>
  )
}

export function Loading() {
  const [loading, setLoading] = useState(true)

  return (
    <Button onClick={() => setLoading((l) => !l)} loading={loading}>
      <IconTrash />
      Create
    </Button>
  )
}

export function Bleeding() {
  return (
    <header
      style={{
        padding: 'var(--sl-space-8) var(--sl-space-10)',
        backgroundColor: 'pink',
      }}
    >
      <Flex justify="space-between" align="center">
        <h1>Orders</h1>
        <Bleed>
          <Button>Create</Button>
        </Bleed>
        <Bleed>
          <Button>Create</Button>
        </Bleed>
      </Flex>
    </header>
  )
}
