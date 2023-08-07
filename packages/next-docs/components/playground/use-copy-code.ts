import { useState } from 'react'

export function useCopyCode() {
  const [isCodeCopied, setCodeCopied] = useState(false)

  const handleCopyCode = (code: string) => {
    if (!navigator) {
      return
    }

    navigator.clipboard.writeText(code)

    setCodeCopied(true)
    setTimeout(() => setCodeCopied(false), 1000)
  }

  const label = isCodeCopied ? 'Copied' : 'Copy code'

  return {
    isCodeCopied,
    label,
    handleCopyCode,
  }
}
