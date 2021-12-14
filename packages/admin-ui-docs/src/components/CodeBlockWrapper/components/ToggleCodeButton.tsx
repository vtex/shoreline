import React from 'react'
import type { MouseEventHandler } from 'react'

import { Button, IconCode } from '@vtex/admin-ui'
import type { StyleProp } from '@vtex/admin-ui'

interface ToggleCodeButtonProps {
  csx: StyleProp
  onToggleCodeBlock: MouseEventHandler<HTMLButtonElement>
}

const ToggleCodeButton = (props: ToggleCodeButtonProps) => {
  const { onToggleCodeBlock, ...remainingProps } = props

  return (
    <Button
      variant="secondary"
      icon={<IconCode />}
      size="small"
      onClick={onToggleCodeBlock}
      {...remainingProps}
    >
      Show/Hide Code
    </Button>
  )
}

export default ToggleCodeButton
