import React, { useRef } from 'react'

import { Text } from '../index'

export default {
  title: 'components/text/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function AsChild() {
  return (
    <>
      <Text as="div">div</Text>
      <Text as="p">p</Text>
      <Text as="label">label</Text>
    </>
  )
}

export function Ref() {
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
