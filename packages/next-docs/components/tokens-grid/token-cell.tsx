import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { useCopy } from '../hooks/use-copy'
import { Cell } from './cell'
import { copyButtonTheme, tokenTheme } from './tokens-grid.css'
import { IconCopySimple, Stack } from '@vtex/admin-ui'

export function TokenCell(props: TokenCellProps) {
  const { name, variable, ...restProps } = props

  const { handleCopy } = useCopy()

  return (
    <Cell {...restProps}>
      <Stack>
        <div>
          <span data-is-name className={tokenTheme}>
            {name}
          </span>
          <button className={copyButtonTheme} onClick={() => handleCopy(name)}>
            <IconCopySimple width={12} height={12} />
          </button>
        </div>
        <div>
          <span className={tokenTheme}>{variable}</span>
          <button
            className={copyButtonTheme}
            onClick={() => handleCopy(variable)}
          >
            <IconCopySimple width={12} height={12} />
          </button>
        </div>
      </Stack>
    </Cell>
  )
}

interface TokenCellProps extends ComponentPropsWithoutRef<'div'> {
  name: string
  variable: string
}
