import React from 'react'
import { IconArrowUpRightSmall } from '@vtex/shoreline-icons'

import { Button } from '../../index'

export default {
  title: 'components/button/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function AsLink() {
  return (
    <Button asChild>
      <a href="https://vtex.com" target="_blank" rel="noreferrer">
        Preview site <IconArrowUpRightSmall />
      </a>
    </Button>
  )
}
