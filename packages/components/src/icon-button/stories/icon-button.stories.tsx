import React, { useState } from 'react'
import { IconTrash } from '@vtex/shoreline-icons'

import { Stack } from '../../stack'
import type { IconButtonProps } from '../index'
import { IconButton } from '../index'
import { Grid, GridCell } from '../../grid'

export default {
  title: 'components/icon-button',
}

const sizes: Array<IconButtonProps['size']> = ['normal', 'large']
const variants: Array<IconButtonProps['variant']> = [
  'critical',
  'criticalTertiary',
  'primary',
  'secondary',
  'tertiary',
]

function generatePermutations() {
  const permutations: Array<{
    size: IconButtonProps['size']
    variant: IconButtonProps['variant']
  }> = []

  for (const size of sizes) {
    for (const variant of variants) {
      permutations.push({ size, variant })
    }
  }

  return permutations
}

export function Show() {
  const permutations = generatePermutations()

  return (
    <Grid columns={`repeat(${variants.length}, 1fr)`}>
      {permutations.map((permutation) => {
        return (
          <GridCell>
            <IconButton
              key={`${permutation.size}-${permutation.variant}`}
              label="Delete"
              size={permutation.size}
              variant={permutation.variant}
            >
              <IconTrash />
            </IconButton>
          </GridCell>
        )
      })}
      <GridCell>
        <IconButton label="Delete" onClick={() => null} loading>
          <IconTrash />
        </IconButton>
      </GridCell>
    </Grid>
  )
}
