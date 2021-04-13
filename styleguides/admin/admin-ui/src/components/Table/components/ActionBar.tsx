import React, { PropsWithoutRef } from 'react'
import { Set, SetProps } from '../../Set'

export function TableActionBar(props: PropsWithoutRef<SetProps>) {
  const { spacing = 3, csx = {}, ...setProps } = props

  return <Set spacing={spacing} csx={{ paddingY: '4', ...csx }} {...setProps} />
}
