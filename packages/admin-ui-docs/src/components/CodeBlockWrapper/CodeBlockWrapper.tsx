import React from 'react'
import type { MouseEventHandler } from 'react'
import { Box } from '@vtex/admin-ui'

import styles from './styles'

interface CodeBlockWrapperState {
  isCodeBlockCollapsed: Boolean
  isCollapsibleModeOn: Boolean
}

interface CodeBlockWrapperProps {
  children: Node
  onToggleCodeBlock: MouseEventHandler<HTMLButtonElement>
  state: CodeBlockWrapperState
}

const CodeBlockWrapper = (props: CodeBlockWrapperProps) => {
  const { children, state } = props

  return (
    <Box csx={styles.container}>
      {children}
      {state.isCodeBlockCollapsed && <Box csx={styles.overlay} />}
    </Box>
  )
}

export default CodeBlockWrapper
