import React, { Fragment, useState } from 'react'
import { Meta } from '@storybook/react'

import { Button } from '../../Button'
import { Text } from '../../Text'
import { Card } from '../../Card'
import { DisplayTable, defineColumns } from '../index'
import { Skeleton } from '../../Skeleton'

export default {
  title: 'beta/DisplayTable',
  component: DisplayTable,
} as Meta

interface Item {
  id: number
  image: string
  productName: string
  category: string
  inStock: number
  skus: number
  price: number
}

export const Sample = () => {
  const [loading, setLoading] = useState(false)

  const items = [
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
  ]

  const columns = defineColumns<Item>([
    {
      id: 'image',
      lead: 'Image',
      resolver: {
        type: 'image',
      },
    },
    {
      id: 'description',
      lead: 'Description',
      resolver: {
        type: 'root',
        render: function Description({ item, context }) {
          if (context.loading) {
            return <Skeleton sx={{ height: 24 }} />
          }

          return (
            <Fragment>
              <Text variant="highlight">{item.productName}</Text>
              <br />
              <Text variant="body">{item.category}</Text>
            </Fragment>
          )
        },
      },
    },
    {
      id: 'inStock',
      lead: 'In Stock',
      resolver: {
        type: 'plain',
      },
    },
    {
      id: 'skus',
      lead: 'SKUs',
      resolver: {
        type: 'plain',
      },
    },
    {
      id: 'price',
      lead: 'Price',
      resolver: {
        type: 'plain',
      },
    },
  ])

  return (
    <Card w={560} display="flex" direction="col">
      <Button onClick={() => setLoading((l) => !l)}>Load</Button>
      <DisplayTable columns={columns} loading={loading} items={items} />
    </Card>
  )
}

// export const Widths = () => {
//   const [loading, setLoading] = useState(false)

//   const columns = defineColumns<Item>([
//     {
//       id: 'image',
//       lead: 'Image',
//       width: [60, 60, 76],
//       resolver: {
//         type: 'image',
//       },
//     },
//     {
//       id: 'description',
//       lead: 'Description',
//       resolver: {
//         type: 'root',
//         render: function Description(item) {
//           return (
//             <Fragment>
//               <Text variant="highlight">{item.productName}</Text>
//               <br />
//               <Text variant="body">{item.category}</Text>
//             </Fragment>
//           )
//         },
//       },
//     },
//     {
//       id: 'product-name',
//       lead: 'ProductName',
//       acessor: 'productName',
//       resolver: {
//         type: 'plain',
//       },
//     },
//     {
//       id: 'inStock',
//       lead: 'In Stock',
//       resolver: {
//         type: 'plain',
//       },
//     },
//     {
//       id: 'skus',
//       lead: 'SKUs',
//       resolver: {
//         type: 'plain',
//       },
//     },
//     {
//       id: 'price',
//       lead: 'Price',
//       resolver: {
//         type: 'currency',
//         locale: 'pt-BR',
//         currency: 'BRL',
//       },
//     },
//   ])

//   return (
//     <Card w={560} display="flex" direction="col">
//       <Button variant="subtle" onClick={() => setLoading((l) => !l)}>
//         Toggle Loading
//       </Button>
//       <DisplayTable columns={columns} loading={loading} items={items} />
//     </Card>
//   )
// }
