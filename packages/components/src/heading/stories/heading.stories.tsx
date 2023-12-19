import React from 'react'

import { Heading } from '../index'

export default {
  title: 'shoreline-components/heading',
}

export function Default() {
  return <Heading>Headline</Heading>
}

export function Levels() {
  return (
    <div>
      <Heading level={1}>Headline 1</Heading>
      <Heading level={2}>Headline 2</Heading>
      <Heading level={3}>Headline 3</Heading>
      <Heading level={4}>Headline 4</Heading>
      <Heading level={5}>Headline 5</Heading>
      <Heading level={6}>Headline 6</Heading>
    </div>
  )
}

export function Variants() {
  return (
    <div>
      <Heading variant="display1">Display 1</Heading>
      <Heading variant="display2">Display 2</Heading>
      <Heading variant="display3">Display 3</Heading>
      <Heading variant="display4">Display 4</Heading>
    </div>
  )
}
