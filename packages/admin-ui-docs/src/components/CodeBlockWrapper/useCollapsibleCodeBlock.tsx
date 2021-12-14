import { useState } from 'react'

export default function useCollapsibleCodeBlock() {
  const [isCodeVisible, setCodeVisible] = useState(false)

  return {
    isCodeVisible,
    handleToggleCodeBlock: () => setCodeVisible((prev: boolean) => !prev),
  }
}
