import '../../../shoreline/styles.css'
import '@vtex/shoreline-visual'

import React, { useRef } from 'react'

import { Text } from '../index'
import * as styles from './style.css'
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
      <Text as="h1" className={styles.asStoryTheme}>
        Heading 1
      </Text>
      <Text as="h2" className={styles.asStoryTheme}>
        Heading 2
      </Text>
      <Text as="h3" className={styles.asStoryTheme}>
        Heading 3
      </Text>
      <Text as="h4" className={styles.asStoryTheme}>
        Heading 4
      </Text>
      <Text as="h5" className={styles.asStoryTheme}>
        Heading 5
      </Text>
      <Text as="h6" className={styles.asStoryTheme}>
        Heading 6
      </Text>
      <Text as="div" className={styles.asStoryTheme}>
        div
      </Text>
      <Text as="p" className={styles.asStoryTheme}>
        p
      </Text>
      <Text as="label" className={styles.asStoryTheme}>
        label
      </Text>
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
