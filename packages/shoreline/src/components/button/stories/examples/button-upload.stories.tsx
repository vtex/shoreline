import React from 'react'
import { IconArrowUp } from '@vtex/shoreline-icons'
import { VisuallyHidden } from '@vtex/shoreline-primitives'

import { Button } from '../../index'

export default {
  title: 'components/button/examples',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function UploadButton() {
  return (
    <>
      <Button asChild>
        <label htmlFor="file-input">
          <IconArrowUp /> Upload file
        </label>
      </Button>
      <VisuallyHidden>
        <input id="file-input" type="file" />
      </VisuallyHidden>
    </>
  )
}
