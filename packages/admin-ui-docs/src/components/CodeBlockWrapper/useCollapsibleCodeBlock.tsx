import React, { useState } from 'react'

import { Button, IconCode } from '@vtex/admin-ui'

export function useCollapsibleCodeBlock() {
  const [isCodeVisible, setCodeVisible] = useState(false)

  const handleToggleCodeBlock = () => setCodeVisible((prev: boolean) => !prev)

  return {
    isCodeVisible,
    ToggleCodeButton: () => (
      <Button
        variant="neutralTertiary"
        icon={<IconCode />}
        onClick={handleToggleCodeBlock}
      >
        {isCodeVisible ? 'Hide' : 'Show'} Code
      </Button>
    ),
  }
}
