import * as React from 'react'
import type { SimpleTableProps } from '@vtex/shoreline-components'

export async function Table<T>(props: TableProps<T>) {
  const { getData, component: Comp, ...rest } = props
  const data = await getData()

  return <Comp data={data} {...rest} />
}

interface TableProps<T> extends Omit<SimpleTableProps<T>, 'data'> {
  getData: () => Promise<T[]>
  component: any
}
