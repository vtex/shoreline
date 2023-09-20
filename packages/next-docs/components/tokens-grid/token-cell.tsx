import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { useClipboard } from '../hooks/use-clipboard'
import { Cell } from './cell'
import { copyButtonTheme, tokenTheme } from './tokens-grid.css'
import { IconCopySimple } from '@vtex/admin-ui'

export function TokenCell(props: ComponentPropsWithoutRef<'div'>) {
  const { children, ...restProps } = props

  const { handleCopy } = useClipboard()

  const token = typeof children === 'string' ? children : ''

  return (
    <Cell {...restProps}>
      <span className={tokenTheme}>{children}</span>
      <button className={copyButtonTheme} onClick={() => handleCopy(token)}>
        <IconCopySimple width={12} height={12} />
      </button>
    </Cell>
  )
}
