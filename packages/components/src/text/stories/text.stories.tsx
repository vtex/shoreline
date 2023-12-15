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
      <Text as="div">div</Text>
      <Text as="p">p</Text>
      <Text as="label">label</Text>
    </>
  )
}

export function ref() {
  const refParagraph = useRef<HTMLParagraphElement>(null)
  const refLabel = useRef<HTMLLabelElement>(null)

  return (
    <>
      <Text as="p" ref={refParagraph}>
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
