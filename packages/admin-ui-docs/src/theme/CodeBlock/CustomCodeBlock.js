import React from 'react'
import clsx from 'clsx'

import {
  CodeBlockWrapper,
  useCollapsibleCodeBlock,
  useCopyCodeBlock
} from '../../components/CodeBlockWrapper'

import styles from './styles.module.scss'

const MAX_CODE_TOKENS = 20

const CustomCodeBlock = (props) => {
  const {
    children,
    className,
    Component,
    ...remainingProps
  } = props

  const isCollapsibleModeOn = children.split(' ').length > MAX_CODE_TOKENS

  const { CopyCodeButton } = useCopyCodeBlock(children)
  const { isCodeVisible, ToggleCodeButton } = useCollapsibleCodeBlock()
  const isCodeBlockCollapsed = isCollapsibleModeOn && !isCodeVisible

  const updatedClassName = isCodeBlockCollapsed
    ? `${className} ${styles.collapsedCodeBlock}`
    : className

  return (
    <>
      <CodeBlockWrapper
        state={{
          isCollapsibleModeOn,
          isCodeBlockCollapsed,
        }}
      >
        <Component className={
          clsx(
            updatedClassName,
            styles.codeBlock,
          )}
          {...remainingProps}>
          {children}
        </Component>
      </CodeBlockWrapper>
      <div className={styles.codeBlockFooter}>
        <CopyCodeButton />
        {isCollapsibleModeOn && <ToggleCodeButton />}
      </div>
    </>
  )
}

export default CustomCodeBlock
