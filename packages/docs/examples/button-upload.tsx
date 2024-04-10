import React from 'react'
import { Button, IconArrowUp, VisuallyHidden } from '@vtex/shoreline'

export default function Example() {
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
