import React from 'react'
import type { MouseEventHandler } from 'react'

import { tag } from '@vtex/admin-ui'

import ToggleCodeButton from './ToggleCodeButton'

import styles from '../styles'

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
  const { children, onToggleCodeBlock: handleToggleCodeBlock, state } = props

  return (
    <tag.div csx={styles.container}>
      {children}
      {state.isCollapsibleModeOn && (
        <ToggleCodeButton
          onToggleCodeBlock={handleToggleCodeBlock}
          csx={styles.toggleCodeButton}
        />
      )}
      {state.isCodeBlockCollapsed && <tag.div csx={styles.overlay} />}
    </tag.div>
  )
}

export default CodeBlockWrapper
