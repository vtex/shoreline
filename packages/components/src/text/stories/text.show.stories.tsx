import React, { useRef } from 'react'

import { Text } from '../index'
import { Stack } from '../../stack'

export default {
  title: 'components/text',
}

export function Show() {
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
