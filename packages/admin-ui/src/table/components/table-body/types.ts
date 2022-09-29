import type { StyleProp } from '@vtex/admin-ui-core'
import type { TableBodyRowState } from '../../hooks/use-table-state'

export type TableBodyProps = {
  csx?: StyleProp
} & React.ComponentPropsWithoutRef<'tbody'>

export interface TableBodyRowOptions<T> {
  state: TableBodyRowState<T>
  item: T
}

export type TableBodyRowProps<T = any> = TableBodyRowOptions<T> & {
  csx?: StyleProp
} & React.ComponentPropsWithoutRef<'tr'>

export type TableBodyRowContextProps<T = any> = Pick<
  TableBodyRowOptions<T>,
  'item'
> &
  Pick<TableBodyRowState<T>, 'resolveCell' | 'tableRef' | 'lastFixedColumn'>
