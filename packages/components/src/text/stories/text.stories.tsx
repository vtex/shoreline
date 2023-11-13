import '../../../dist/styles.min.css'
import React, { useRef } from 'react'

import { Text } from '../index'

import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/text',
}

export function Default() {
  return <Text>Text</Text>
}

export function as() {
  return (
    <>
      <Text as="h1">Heading 1</Text>
      <Text as="h2">Heading 2</Text>
      <Text as="h3">Heading 3</Text>
      <Text as="h4">Heading 4</Text>
      <Text as="h5">Heading 5</Text>
      <Text as="h6">Heading 6</Text>
      <Text as="div">div</Text>
      <Text as="p">p</Text>
      <Text as="label">label</Text>
    </>
  )
}

export function ref() {
  const refHeading = useRef<HTMLHeadingElement>(null)
  const refLabel = useRef<HTMLLabelElement>(null)

  return (
    <>
      <Text as="h1" ref={refHeading}>
        Heading 1
      </Text>

      <Text as="label" ref={refLabel}>
        label
      </Text>
    </>
  )
}

export function variants() {
  return (
    <Stack>
      <Text variant="body">Body</Text>
      <Text variant="action">Action</Text>
      <Text variant="caption1">Caption 1</Text>
      <Text variant="caption2">Caption 2</Text>
      <Text variant="display1">Display 1</Text>
      <Text variant="display2">Display 2</Text>
      <Text variant="display3">Display 3</Text>
      <Text variant="display4">Display 4</Text>
      <Text variant="emphasis">Emphasis</Text>
    </Stack>
  )
}
