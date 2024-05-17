import { IconArrowUp } from '@vtex/shoreline-icons'
import { VisuallyHidden } from '../../visually-hidden'

import { Button } from '../index'

export default {
  title: 'components/button',
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
