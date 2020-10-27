import React, { Fragment } from 'react'
import { Meta } from '@storybook/react'

import { Text } from '../../Text'
import { StatefulTable } from '../index'
import { Skeleton } from '../../Skeleton'
import { unstableThemeProvider as ThemeProvider } from '../../unstableThemeProvider'

export default {
  title: 'alpha/Table/Resolvers',
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

  return (
    <ThemeProvider>
      <StatefulTable
        columns={[
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
            header: 'Price',
          },
        ]}
        items={fruits}
      />
    </ThemeProvider>
  )
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

  return (
    <ThemeProvider>
      <StatefulTable
        columns={[
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
        ]}
        items={currencies}
      />
    </ThemeProvider>
  )
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

  return (
    <ThemeProvider>
      <StatefulTable
        columns={[
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
        ]}
        items={dates}
      />
    </ThemeProvider>
  )
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

  return (
    <ThemeProvider>
      <StatefulTable
        dir="ltr"
        columns={[
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
        ]}
        items={fruits}
      />
    </ThemeProvider>
  )
}

export const Root = () => {
  return (
    <ThemeProvider>
      <StatefulTable
        columns={[
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
            header: 'In Stock',
          },
        ]}
        items={[
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
        ]}
      />
    </ThemeProvider>
  )
}
