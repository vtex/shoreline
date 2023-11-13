import { Table } from '@vtex/shoreline-dac'
import { SimpleTable } from '@vtex/shoreline-components'

async function getData() {
  const res = await fetch('https://api.github.com/orgs/vtex/repos?per_page=100')
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function Home() {
  return (
    <Table
      getData={getData}
      component={SimpleTable}
      columns={[
        {
          accessorKey: 'name',
          header: 'Name',
        },
        {
          accessorKey: 'language',
          header: 'Language',
        },
        {
          accessorKey: 'created_at',
          header: 'Created At',
        },
      ]}
    />
  )
}
