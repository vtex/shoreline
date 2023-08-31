import { useCopy } from '../hooks/use-copy'

export function useCopyCode() {
  const { isCopied, handleCopy } = useCopy()

  const label = isCopied ? 'Copied' : 'Copy code'

  return {
    isCodeCopied: isCopied,
    label,
    handleCopyCode: handleCopy,
  }
}
