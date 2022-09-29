import React from 'react'
import type { Meta } from '@storybook/react'
import faker from 'faker'

import {
  Table,
  TableBody,
  TableBodyRow,
  TableHead,
  createColumns,
  TableHeadCell,
  TableBodyCell,
} from '../index'
import { useTableState } from '../hooks/use-table-state'

export default {
  title: 'admin-ui-review/table/complexity',
  component: Table,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const items = [...Array(100).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  }
})

const columns = createColumns<Item>([
  {
    id: 'name',
    header: 'Product Name',
  },
  {
    id: 'lastSale',
    header: 'Last Sale',
  },
  {
    id: 'price',
    header: 'Price',
    resolver: {
      type: 'currency',
      locale: 'en-US',
      currency: 'USD',
    },
  },
])

// const Example = React.memo(() => {
//   const {
//     getBodyState,
//     getBodyRowState,
//     getHeadState,
//     getCellState,
//     getTableState,
//   } = useTableState<Item>({
//     columns,
//     items,
//   })

//   return (
//     <Table {...getTableState()}>
//       <TableHead {...getHeadState()} />
//       <TableBody {...getBodyState()}>
//         {({ item }) => {
//           return (
//             <TableBodyRow item={item} {...getBodyRowState()}>
//               <TableCell {...getCellState()} />
//             </TableBodyRow>
//           )
//         }}
//       </TableBody>
//     </Table>
//   )
// })

export function Full() {
  const [count, setCount] = React.useState(0)

  const { getBodyRowState, getHeadState, getTableState, data, getRowKey } =
    useTableState<Item>({
      columns,
      items,
    })

  const [name, lastSale, price] = columns

  return (
    <>
      <button
        onClick={() => {
          setCount((p) => p + 1)
        }}
      >
        click {count}
      </button>

      <Table {...getTableState()}>
        <TableHead state={getHeadState()}>
          <TableHeadCell column={name} />
          <TableHeadCell column={lastSale} />
          <TableHeadCell column={price} />
        </TableHead>
        <TableBody>
          {data.map((item) => {
            const key = String(getRowKey(item))

            return (
              <TableBodyRow item={item} key={key} state={getBodyRowState()}>
                <TableBodyCell column={name} />
                <TableBodyCell column={lastSale} />
                <TableBodyCell column={price} />
              </TableBodyRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}
