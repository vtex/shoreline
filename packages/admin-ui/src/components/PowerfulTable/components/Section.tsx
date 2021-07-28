import type { PropsWithoutRef } from 'react'
import React from 'react'

import type { SetProps } from '../../Set'
import { Set } from '../../Set'

export function TableSection(props: PropsWithoutRef<SetProps>) {
  const { spacing = 3, csx = {}, ...setProps } = props

  return (
    <Set
      spacing={spacing}
      csx={{ paddingY: '4', overflow: 'auto', ...csx }}
      {...setProps}
    />
  )
}
