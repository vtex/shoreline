import React from 'react'
import type { MouseEventHandler } from 'react'
import { csx } from '@vtex/admin-ui'

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
    <div className={csx(styles.container)}>
      {children}
      {state.isCodeBlockCollapsed && <div className={csx(styles.overlay)} />}
    </div>
  )
}

export default CodeBlockWrapper
