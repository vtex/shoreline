import { useState } from 'react'

export function useCopy() {
  const [isCopied, setCopied] = useState(false)

  const handleCopy = (str: string) => {
    if (!navigator) {
      return
    }

    navigator.clipboard.writeText(str)

    setCopied(true)
    setTimeout(() => setCopied(false), 1000)
  }

  return {
    isCopied,
    handleCopy,
  }
}
