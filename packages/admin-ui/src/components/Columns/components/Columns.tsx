import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { jsx } from '@vtex/admin-ui-react'
import type { ResponsiveValue } from '@vtex/admin-ui-react'

import { ColumnsProvider } from './ColumnsContext'

export const Columns = jsx('div')(
  {
    display: 'flex',
    flexWrap: 'wrap',
  },
  {
    options: ['spacing'],
    useOptions(options: ColumnsOptions, props) {
      const { spacing = 1 } = options
      const { children, ...divProps } = props

      return {
        ...divProps,
        children: (
          <ColumnsProvider value={{ spacing }}>{children}</ColumnsProvider>
        ),
      }
    },
  }
)

export interface ColumnsOptions {
  spacing?: ResponsiveValue<number>
}

export type ColumnsProps = ComponentPropsWithRef<typeof Columns> &
  ColumnsOptions
