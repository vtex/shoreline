import React, { Fragment } from 'react'
import { Meta } from '@storybook/react'

import { Text } from '../../Text'
import { Card } from '../../Card'
import { DisplayTable } from '../index'
import { Skeleton } from '../../Skeleton'

export default {
  title: 'beta/DisplayTable/Resolvers',
  component: DisplayTable,
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
            lead: 'Price',
          },
        ]}
        items={fruits}
      />
    </Card>
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
            id: 'image',
            lead: 'Image With Delay',
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
            lead: 'Image Without Preview',
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

export const Root = () => {
  return (
    <Card w={560} display="flex" direction="col">
      <DisplayTable
        columns={[
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
    </Card>
  )
}
