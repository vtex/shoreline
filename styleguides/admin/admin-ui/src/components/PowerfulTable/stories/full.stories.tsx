import React, { Fragment, useState } from 'react'
import { Meta } from '@storybook/react'

import { Button } from '../../Button'
import { Text } from '../../Text'
import { Card } from '../../Card'
import { StatefulTable } from '../Stateful'
import { Skeleton } from '../../Skeleton'
import { useTableState } from '../../Table'

export default {
  title: 'admin-ui/PowerfulTable/Stateful',
  component: StatefulTable,
} as Meta

export const Example = () => {
  const [loading, setLoading] = useState(false)
  const tableState = useTableState({
    columns: [
      {
        id: 'image',
        header: 'Image',
        resolver: {
          type: 'image',
        },
      },
      {
        id: 'description',
        header: 'Description',
        resolver: {
          type: 'root',
          render: function Description({ item, context }) {
            if (context.loading) {
              return <Skeleton csx={{ height: 24 }} />
            }

            return (
              <Fragment>
                <Text variant="highlight">{item.productName}</Text>
                <Text variant="body">{item.category}</Text>
              </Fragment>
            )
          },
        },
      },
      {
        id: 'inStock',
        header: 'In Stock',
        resolver: {
          type: 'plain',
        },
      },
      {
        id: 'skus',
        header: 'SKUs',
        resolver: {
          type: 'plain',
        },
      },
      {
        id: 'price',
        header: 'Price',
        resolver: {
          type: 'plain',
        },
      },
    ],
    loading,
    items: [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        productName: 'Orange',
        category: 'fruit',
        inStock: 380,
        skus: 0,
        price: 120,
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        productName: 'Lemon',
        category: 'fruit',
        inStock: 380,
        skus: 26,
        price: 120,
      },
      {
        id: 3,
        image:
          'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        productName: 'Tomato',
        category: 'fruit',
        inStock: 380,
        skus: 26,
        price: 120,
      },
      {
        id: 4,
        image:
          'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        productName: 'Eggs',
        category: 'protein',
        inStock: 380,
        skus: 0,
        price: 120,
        active: true,
      },
      {
        id: 5,
        image:
          'https://images.unsplash.com/photo-1587411768638-ec71f8e33b78?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        productName: 'Cucumber',
        category: 'veggetable',
        inStock: 380,
        skus: 26,
        price: 120,
      },
    ],
  })

  return (
    <Card csx={{ width: 560, display: 'flex', flexDirection: 'column' }}>
      <Button onClick={() => setLoading((l) => !l)}>Load</Button>
      <StatefulTable state={tableState} />
    </Card>
  )
}
