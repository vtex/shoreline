import { IconTrash } from '../../../icons'
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
    <div>
      <h3>Default</h3>
      <Grid columns={`repeat(${variants.length}, 1fr)`}>
        {permutations.map((permutation) => {
          return (
            <GridCell key={`${permutation.size}-${permutation.variant}`}>
              <IconButton
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
      <h3>Rounded</h3>
      <Grid columns={`repeat(${variants.length}, 1fr)`}>
        {permutations.map((permutation) => {
          return (
            <GridCell
              key={`rounded-${permutation.size}-${permutation.variant}`}
            >
              <IconButton
                label="Delete"
                size={permutation.size}
                variant={permutation.variant}
                rounded
              >
                <IconTrash />
              </IconButton>
            </GridCell>
          )
        })}
        <GridCell>
          <IconButton label="Delete" onClick={() => null} loading rounded>
            <IconTrash />
          </IconButton>
        </GridCell>
      </Grid>
    </div>
  )
}
