import React from 'react'

import {
  CodeBlockWrapper,
  useCollapsibleCodeBlock
} from '../../components/CodeBlockWrapper'

import styles from './styles.module.css'

const MAX_CODE_TOKENS = 20

const CustomCodeBlock = (props) => {
  const {
    children,
    className,
    Component,
    ...remainingProps
  } = props

  const isCollapsibleModeOn = children.split(' ').length > MAX_CODE_TOKENS

  const { isCodeVisible, handleToggleCodeBlock } = useCollapsibleCodeBlock()
  const isCodeBlockCollapsed = isCollapsibleModeOn && !isCodeVisible

  const updatedClassName = isCodeBlockCollapsed
    ? `${className} ${styles.collapsedCodeBlock}`
    : className

  return (
    <CodeBlockWrapper
      state={{
        isCollapsibleModeOn,
        isCodeBlockCollapsed,
      }}
      onToggleCodeBlock={handleToggleCodeBlock}
    >
      <Component className={updatedClassName} {...remainingProps}>
        {children}
      </Component>
    </CodeBlockWrapper>
  )
}

export default CustomCodeBlock
