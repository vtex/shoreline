import React from 'react'

import type { HeadingProps } from '../index'
import { Heading } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/heading',
}

type HeadingPermutation = {
  level: HeadingProps['level']
  variant: HeadingProps['variant']
}

function generatePermutations(
  levels: Array<HeadingPermutation['level']>,
  variants: Array<HeadingPermutation['variant']>
) {
  const permutations: HeadingPermutation[] = []

  for (const level of levels) {
    for (const variant of variants) {
      permutations.push({ level, variant })
    }
  }

  return permutations
}

const levels: Array<HeadingPermutation['level']> = [1, 2, 3, 4, 5, 6]
const variants: Array<HeadingPermutation['variant']> = [
  'context',
  'display1',
  'display2',
  'display3',
  'display4',
]

const permutations = generatePermutations(levels, variants)

function generateHeadingPermutations() {
  return permutations.map(({ level, variant }) => (
    <Heading level={level} variant={variant}>
      {`Level ${level}/Variant ${variant}`}
    </Heading>
  ))
}

export function Show() {
  const headingElements = generateHeadingPermutations()

  return (
    <Stack>
      <Stack>
        <Heading level={1}>Headline 1</Heading>
        <Heading level={2}>Headline 2</Heading>
        <Heading level={3}>Headline 3</Heading>
        <Heading level={4}>Headline 4</Heading>
        <Heading level={5}>Headline 5</Heading>
        <Heading level={6}>Headline 6</Heading>
      </Stack>
      <Stack>
        <Heading variant="display1">Display 1</Heading>
        <Heading variant="display2">Display 2</Heading>
        <Heading variant="display3">Display 3</Heading>
        <Heading variant="display4">Display 4</Heading>
      </Stack>
      <Stack>{headingElements}</Stack>
    </Stack>
  )
}
