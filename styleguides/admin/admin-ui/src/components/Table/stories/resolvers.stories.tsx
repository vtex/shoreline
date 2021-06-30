import React, { Fragment, useMemo } from 'react'
import { Meta } from '@storybook/react'

import { Text } from '../../Text'
import { StatefulTable } from '../../PowerfulTable/index'
import { Skeleton } from '../../Skeleton'
import { useTableState } from '../useTableState'

export default {
  title: 'admin-ui/Table/Resolvers',
  component: StatefulTable,
} as Meta

export const Plain = () => {
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

  const tableState = useTableState({
    columns: [
      {
        id: 'product-name',
        header: 'ProductName',
        acessor: 'productName',
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
          render: function Render({ data }) {
            return (
              <Text
                variant="highlight"
                csx={{
                  color: Number(data) > 0 ? 'blue' : 'red',
                }}
              >
                {data}
              </Text>
            )
          },
        },
      },
      {
        id: 'price',
        header: 'Price',
      },
    ],
    items: fruits,
  })

  return <StatefulTable state={tableState} />
}

export const Selection = () => {
  const fruits = useMemo(
    () => [
      {
        id: 1,
        productName: 'Orange',
        inStock: 380,
        skus: 20,
        price: 120,
        flag: true,
      },
      {
        id: 2,
        productName: 'Lemon',
        inStock: 380,
        skus: 26,
        price: 120,
        flag: false,
      },
      {
        id: 3,
        productName: 'Tomato',
        inStock: 380,
        skus: 26,
        price: 120,
        flag: true,
      },
    ],
    []
  )

  const tableState = useTableState({
    columns: [
      {
        id: 'id',
        resolver: {
          type: 'selection',
          mapId: (item) => item.productName,
        },
      },
      {
        id: 'productName',
        header: 'Product name',
      },
      {
        id: 'inStock',
        header: 'In stock',
      },
      {
        id: 'skus',
        header: 'SKUs',
      },
      {
        id: 'price',
        header: 'Price',
      },
    ],
    items: fruits,
  })

  return <StatefulTable state={tableState} />
}

export const SelectionInit = () => {
  const fruits = useMemo(
    () => [
      {
        id: 1,
        productName: 'Orange',
        inStock: 380,
        skus: 20,
        price: 120,
        flag: true,
      },
      {
        id: 2,
        productName: 'Lemon',
        inStock: 380,
        skus: 26,
        price: 120,
        flag: false,
      },
      {
        id: 3,
        productName: 'Tomato',
        inStock: 380,
        skus: 26,
        price: 120,
        flag: true,
      },
    ],
    []
  )

  const tableState = useTableState({
    columns: [
      {
        id: 'id',
        resolver: {
          type: 'selection',
          mapId: (item) => item.productName,
          isSelected: (item) => !!item.flag,
          onSelect: (currentSelected) => {
            // eslint-disable-next-line no-console
            console.log(currentSelected)
          },
        },
      },
      {
        id: 'productName',
        header: 'Product name',
      },
      {
        id: 'inStock',
        header: 'In stock',
      },
      {
        id: 'skus',
        header: 'SKUs',
      },
      {
        id: 'price',
        header: 'Price',
      },
    ],
    items: fruits,
  })

  return <StatefulTable state={tableState} />
}

export function SelectionWithRowClick() {
  const tableState = useTableState({
    columns: [
      {
        id: 'checkboxes',
        resolver: { type: 'selection', mapId: (item) => item.id },
      },
      {
        id: 'location',
        header: 'Location',
        width: 148,
      },
      {
        id: 'date',
        header: 'Date',
        width: 148,
      },
      {
        id: 'status',
        header: 'Status',
        width: 156,
      },
    ],
    items: [
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
    ],
    onRowClick: ({ location }) => {
      alert(`${location} was clicked`)
    },
  })

  return <StatefulTable state={tableState} />
}
export const Currency = () => {
  const currencies = [
    {
      id: 1,
      brl: 120,
      usd: 24,
      cny: 100,
    },
  ]

  const tableState = useTableState({
    columns: [
      {
        id: 'brl',
        header: 'Preço',
        resolver: {
          type: 'currency',
          locale: 'pt-BR',
          currency: 'BRL',
        },
      },
      {
        id: 'usd',
        header: 'Price',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
      {
        id: 'cny',
        header: '价格',
        resolver: {
          type: 'currency',
          locale: 'zh-CN',
          currency: 'CNY',
        },
      },
    ],
    items: currencies,
  })

  return <StatefulTable state={tableState} />
}

export const Date = () => {
  const dates = [
    {
      id: 1,
      pt: '5/7/2020, 13:04',
      ar: '5/7/2020, 13:04',
      en: '5/7/2020, 13:04',
      cn: '5/7/2020, 13:04',
    },
  ]

  const tableState = useTableState({
    columns: [
      {
        id: 'pt',
        header: 'Data',
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
        header: 'تاريخ',
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
        header: 'Date',
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
        header: '日期',
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
    ],
    items: dates,
  })

  return <StatefulTable state={tableState} />
}

export const Image = () => {
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

  const tableState = useTableState({
    dir: 'ltr',
    columns: [
      {
        id: 'image',
        header: 'Image',
        resolver: {
          type: 'image',
        },
      },
      {
        id: 'image',
        header: 'Image With Delay',
        resolver: {
          type: 'image',
          preview: {
            display: true,
            size: 'regular',
            delay: 450,
          },
        },
      },
      {
        id: 'image',
        header: 'Image Without Preview',
        resolver: {
          type: 'image',
          preview: {
            display: false,
            size: 'regular',
            delay: 0,
          },
        },
      },
      {
        id: 'productName',
        header: 'Name',
      },
      {
        id: 'stock',
        header: 'Stock',
      },
      {
        id: 'price',
        header: 'Stock',
        resolver: {
          type: 'currency',
          locale: 'en-US',
          currency: 'USD',
        },
      },
    ],
    items: fruits,
  })

  return <StatefulTable state={tableState} />
}

export const Root = () => {
  const state = useTableState({
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
                <br />
                <Text variant="body">{item.category}</Text>
              </Fragment>
            )
          },
        },
      },
      {
        id: 'inStock',
        header: 'In Stock',
      },
    ],
    items: [
      {
        id: 1,
        image:
          'https://images.unsplash.com/photo-1587735243615-c03f25aaff15?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1600&q=80',
        productName: 'Orange',
        category: 'fruit',
        inStock: 380,
      },
      {
        id: 2,
        image:
          'https://images.unsplash.com/flagged/photo-1587302164675-820fe61bbd55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80',
        productName: 'Lemon',
        category: 'fruit',
        inStock: 380,
      },
    ],
  })

  return <StatefulTable state={state} />
}
