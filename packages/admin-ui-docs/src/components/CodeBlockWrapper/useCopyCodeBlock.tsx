import React, { useState } from 'react'

import { Button, IconCopySimple } from '@vtex/admin-ui'

export function useCopyCodeBlock(code: string) {
  const [isCodeCopied, setCodeCopied] = useState(false)

  const handleCopyCode = () => {
    if (!navigator) {
      return
    }

    navigator.clipboard.writeText(code)

    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 1000)
  }

  return {
    isCodeCopied,
    CopyCodeButton: () => (
      <Button
        variant="neutralTertiary"
        icon={<IconCopySimple />}
        onClick={handleCopyCode}
      >
        {isCodeCopied ? 'Copied' : 'Copy code'}
      </Button>
    ),
  }
}
