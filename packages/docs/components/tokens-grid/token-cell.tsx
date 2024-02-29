import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { useClipboard } from '../hooks/use-clipboard'
import { Cell } from './cell'

import { IconCopySimple } from '@vtex/shoreline-icons'
import styles from './token-cell.module.css'

export function TokenCell(props: ComponentPropsWithoutRef<'div'>) {
  const { children, ...restProps } = props

  const { handleCopy } = useClipboard()

  const token = typeof children === 'string' ? children : ''

  return (
    <Cell {...restProps}>
      <span className={styles.token}>{children}</span>
      <button className={styles.copyButton} onClick={() => handleCopy(token)}>
        <IconCopySimple width={16} height={16} />
      </button>
    </Cell>
  )
}
