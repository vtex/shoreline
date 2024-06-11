import { IconArrowUpRightSmall, IconArrowUp } from '../../../icons'

import { Button } from '../index'
import { VisuallyHidden } from '../../visually-hidden'

export default {
  title: 'components/button',
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
