import { useState } from 'react'

export function useClipboard() {
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
