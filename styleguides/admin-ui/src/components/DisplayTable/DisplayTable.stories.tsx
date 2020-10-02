import React, { Fragment, useState } from 'react'
import { Meta } from '@storybook/react'

import { Button } from '../Button'
import { Text } from '../Text'
import { Card } from '../Card'
import { DisplayTable, defineColumns, TableDir } from './index'

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
        render: function Description(item) {
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

export const PlainResolver = () => {
  const fruits = [
    {
      id: 1,
      productName: 'Orange',
      inStock: 380,
      skus: 0,
      price: 120,
    },
    {
      id: 2,
      productName: 'Lemon',
      inStock: 380,
      skus: 26,
      price: 120,
    },
    {
      id: 3,
      productName: 'Tomato',
      inStock: 380,
      skus: 26,
      price: 120,
    },
  ]

  return (
    <Card w={560} display="flex" direction="col">
      <DisplayTable
        columns={[
          {
            id: 'product-name',
            lead: 'ProductName',
            acessor: 'productName',
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
              render: function Render(data) {
                return (
                  <Text
                    variant="highlight"
                    c={Number(data) > 0 ? 'primary.base' : 'danger.base'}
                  >
                    {data}
                  </Text>
                )
              },
            },
          },
          {
            id: 'price',
            lead: 'Price',
          },
        ]}
        items={fruits}
      />
    </Card>
  )
}

export const CurrencyResolver = () => {
  const currencies = [
    {
      id: 1,
      brl: 120,
      usd: 24,
      cny: 100,
    },
  ]

  return (
    <Card w={560} display="flex" direction="col">
      <DisplayTable
        columns={[
          {
            id: 'brl',
            lead: 'Preço',
            resolver: {
              type: 'currency',
              locale: 'pt-BR',
              currency: 'BRL',
            },
          },
          {
            id: 'usd',
            lead: 'Price',
            resolver: {
              type: 'currency',
              locale: 'en-US',
              currency: 'USD',
            },
          },
          {
            id: 'cny',
            lead: '价格',
            resolver: {
              type: 'currency',
              locale: 'zh-CN',
              currency: 'CNY',
            },
          },
        ]}
        items={currencies}
      />
    </Card>
  )
}

export const DateResolver = () => {
  const dates = [
    {
      id: 1,
      pt: '5/7/2020, 13:04',
      ar: '5/7/2020, 13:04',
      en: '5/7/2020, 13:04',
      cn: '5/7/2020, 13:04',
    },
  ]

  return (
    <Card w={560} display="flex" direction="col">
      <DisplayTable
        columns={[
          {
            id: 'pt',
            lead: 'Data',
            resolver: {
              type: 'date',
              locale: 'pt-BR',
              options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            },
          },
          {
            id: 'ar',
            lead: 'تاريخ',
            resolver: {
              type: 'date',
              locale: 'ar-AE',
              options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            },
          },
          {
            id: 'en',
            lead: 'Date',
            resolver: {
              type: 'date',
              locale: 'en-US',
              options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            },
          },
          {
            id: 'cn',
            lead: '日期',
            resolver: {
              type: 'date',
              locale: 'zh-CN',
              options: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              },
            },
          },
        ]}
        items={dates}
      />
    </Card>
  )
}

export const ImageResolver = () => {
  const fruits = [
    {
      id: 1,
      image:
        'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
      productName: 'Orange',
      stock: 26900,
      price: 120,
    },
    {
      id: 2,
      image:
        'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      productName: 'Lemon',
      stock: 12905,
      price: 120,
    },
    {
      id: 3,
      image:
        'https://images.unsplash.com/photo-1587486938113-d6d38d424efa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
      productName: 'Tomato',
      stock: 199001,
      price: 120,
    },
  ]

  return (
    <Card w={560} display="flex" direction="col">
      <DisplayTable
        dir="ltr"
        columns={[
          {
            id: 'image',
            lead: 'Image',
            resolver: {
              type: 'image',
            },
          },
          {
            id: 'productName',
            lead: 'Name',
          },
          {
            id: 'stock',
            lead: 'Stock',
          },
          {
            id: 'price',
            lead: 'Stock',
            resolver: {
              type: 'currency',
              locale: 'en-US',
              currency: 'USD',
            },
          },
        ]}
        items={fruits}
      />
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

export const Variable = () => {
  const [loading, setLoading] = useState(false)
  const [rtl, setRtl] = useState<TableDir>('ltr')

  const variableSizeItems = [
    {
      id: 1,
      location: 'São Paulo, SP',
      date: '8/7/2020, 23:29',
      status: `Delivered`,
    },
    {
      id: 2,
      location: 'São Paulo, SP',
      date: '6/7/2020, 21:12',
      status: `Arrived at São Paulo`,
    },
    {
      id: 3,
      location: 'São Paulo, SP',
      date: '5/7/2020, 13:04',
      status: `On its way from Rio de Janeiro to São Paulo`,
    },
    {
      id: 4,
      location: 'Itaquaquecetuba, SP',
      date: '4/7/2020, 14:48',
      status: `Object dispatched at the post office`,
    },
  ]

  return (
    <Card w={512}>
      <Button variant="subtle" onClick={() => setLoading((l) => !l)}>
        Toggle Loading
      </Button>
      <Button
        variant="subtle"
        onClick={() => setRtl((dir) => (dir === 'rtl' ? 'ltr' : 'rtl'))}
      >
        Toggle RTL
      </Button>
      <DisplayTable
        dir={rtl}
        density="variable"
        columns={[
          {
            id: 'location',
            width: 128,
            lead: 'Location',
            resolver: {
              type: 'plain',
            },
          },
          {
            id: 'date',
            lead: 'Date',
            width: 128,
            resolver: {
              type: 'plain',
            },
          },
          {
            id: 'status',
            width: 148,
            lead: 'Status',
            resolver: {
              type: 'plain',
            },
          },
        ]}
        loading={loading}
        items={variableSizeItems}
      />
      <Button variant="text">Go to carrier’s tracking page</Button>
    </Card>
  )
}

export const RTL = () => {
  const rtlItems = [
    {
      id: 1,
      location: 'ساو باولو- اس بي',
      date: '8/7/2020, 23:29',
      status: `تم التوصيل`,
    },
    {
      id: 2,
      location: 'ساو باولو- اس بي',
      date: '6/7/2020, 21:12',
      status: `وصل إلى ساو باولو`,
    },
    {
      id: 3,
      location: 'ساو باولو- اس بي',
      date: '5/7/2020, 13:04',
      status: `في طريقها من ريو دي جانيرو إلى ساو باولو`,
    },
    {
      id: 4,
      location: 'ساو باولو- اس بي',
      date: '4/7/2020, 14:48',
      status: `إرسال الكائن في مكتب البريد`,
    },
  ]

  return (
    <Card w={512}>
      <DisplayTable
        dir="rtl"
        density="compact"
        columns={[
          {
            id: 'location',
            width: 128,
            lead: 'موقعك',
            resolver: {
              type: 'plain',
            },
          },
          {
            id: 'date',
            lead: 'تاريخ',
            width: 136,
            resolver: {
              type: 'date',
              locale: 'ar-AE',
              options: {
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                day: 'numeric',
                month: 'numeric',
                year: 'numeric',
              },
            },
          },
          {
            id: 'status',
            width: 148,
            lead: 'الحالة',
            resolver: {
              type: 'plain',
            },
          },
        ]}
        items={rtlItems}
      />
    </Card>
  )
}
