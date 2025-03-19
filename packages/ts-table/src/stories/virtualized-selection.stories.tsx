import { useMemo } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import { faker } from '@faker-js/faker'

import { useVirtualizerModel } from '../use-virtualizer-model'
import { getSelectionColumn, TsTable } from '../index'

export default {
  title: 'ts-table/ts-table',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

interface Service {
  name: string
  department: string
  price: string
}

const data: Service[] = Array(50000)
  .fill(1)
  .map((_, id) => {
    return {
      id: `${id}`,
      name: faker.company.name(),
      price: faker.commerce.price(),
      department: faker.commerce.department(),
    }
  })

export function VirtualizedSelection() {
  const columns = useMemo<Array<ColumnDef<Service>>>(
    () => [
      getSelectionColumn(),
      {
        accessorKey: 'name',
        header: 'Service name',
      },
      {
        accessorKey: 'price',
        header: 'Price',
      },
    ],
    []
  )

  const virtualizer = useVirtualizerModel({
    count: data.length,
  })

  return (
    <>
      <TsTable
        data={data}
        columns={columns}
        rowClick={{
          type: 'action',
          onClick: (row) => {
            alert(`You clicked: ${row.original.name}`)
          },
        }}
        virtualizer={virtualizer}
      />
      <div style={{ marginTop: '16px' }}>Number of rows: {data.length}</div>
    </>
  )
}
