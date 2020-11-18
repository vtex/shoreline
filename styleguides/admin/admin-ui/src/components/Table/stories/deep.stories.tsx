import React, { useMemo, useState } from 'react'
import { Meta } from '@storybook/react'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import faker from 'faker'
import { SxStyleProp } from '@vtex/admin-ui-system'
import { IconDrag } from '@vtex/admin-ui-icons'

import { Table } from '../index'
import { useTable } from '../useTable'

export default {
  title: 'alpha/Table/Deep',
  component: Table,
} as Meta

export function LowerLevel() {
  interface Item {
    id: string
    name: string
    lastSale: string
    price: string
  }

  const items = useMemo<Item[]>(() => {
    return [...Array(10).keys()].map((id) => {
      return {
        id: `${id}`,
        name: faker.commerce.productName(),
        lastSale: faker.date.past().toDateString(),
        price: faker.commerce.price(),
      } as Item
    })
  }, [])

  const table = useTable<Item>({
    columns: [
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
    ],
    items,
  })

  return (
    <Table styleOverrides={{ width: 560 }}>
      <Table.Head>
        <Table.Row>
          {table.columns.map((column) => {
            const content = table.resolveHeader({ column })

            return (
              <Table.Cell key={column.id as string} column={column}>
                {content}
              </Table.Cell>
            )
          })}
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {table.data.map((item) => (
          <Table.Row id={item.id} key={item.id}>
            {table.columns.map((column) => {
              const content = table.resolveCell({ item, column })

              return (
                <Table.Cell
                  id={`${item.id}-${column.id}`}
                  key={`${item.id}-${column.id}`}
                  column={column}
                >
                  {content}
                </Table.Cell>
              )
            })}
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export function Windowing() {
  interface Item {
    id: number
    location: string
    date: string
    status: string
    name: string
  }

  const fakeCollection = useMemo<Item[]>(() => {
    return [...Array(1000).keys()].map((id) => {
      return {
        id,
        location: faker.address.city(),
        date: faker.date.past().toDateString(),
        status: faker.commerce.department(),
        name: faker.commerce.productName(),
      } as Item
    })
  }, [])

  const table = useTable<Item>({
    columns: [
      {
        id: 'location',
        header: 'Location',
      },
      {
        id: 'date',
        header: 'Date',
      },
      {
        id: 'status',
        header: 'Status',
      },
      {
        id: 'name',
        header: 'Name',
      },
    ],
    items: fakeCollection,
  })

  const VirtualRow = ({ data, index, style }: ListChildComponentProps) => {
    const item = data[index]

    return (
      <Table.Row
        element="div"
        key={item.id}
        styleOverrides={style as SxStyleProp}
      >
        {table.columns.map((column) => {
          const content = table.resolveCell({ item, column })

          return (
            <Table.Cell element="div" key={column.id as string} column={column}>
              {content}
            </Table.Cell>
          )
        })}
      </Table.Row>
    )
  }

  return (
    <Table styleOverrides={{ width: 560 }}>
      <Table.Head>
        <Table.Row>
          {table.columns.map((column) => {
            const content = table.resolveHeader({ column })

            return (
              <Table.Cell key={column.id as string} column={column}>
                {content}
              </Table.Cell>
            )
          })}
        </Table.Row>
      </Table.Head>
      <FixedSizeList
        height={560}
        itemSize={80}
        itemCount={1000}
        width={560}
        itemKey={(index, items) => {
          const item = items[index]

          return `row-${item.id}`
        }}
        itemData={table.data}
        innerElementType={Table.Body}
      >
        {VirtualRow}
      </FixedSizeList>
    </Table>
  )
}

interface Item {
  id: string
  name: string
  lastSale: string
  price: string
}

const fakeData = [...Array(10).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.past().toDateString(),
    price: faker.commerce.price(),
  } as Item
})

export function Dnd() {
  const [items, setItems] = useState(fakeData)
  const table = useTable<Item>({
    columns: [
      {
        id: 'draggable',
        header: '',
        width: 36,
        resolver: {
          type: 'root',
          render: function RenderIcon() {
            return <IconDrag />
          },
        },
      },
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
    ],
    items,
  })

  function reorder(list: Item[], startIndex: number, endIndex: number) {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)

    result.splice(endIndex, 0, removed)

    return result
  }

  function onDragEnd(result: DropResult) {
    if (!result.destination) {
      return
    }

    const orderedItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    setItems(orderedItems)
  }

  return (
    <Table density="compact" styleOverrides={{ width: 800 }}>
      <Table.Head>
        <Table.Row>
          {table.columns.map((column) => {
            const content = table.resolveHeader({ column })

            return (
              <Table.Cell key={column.id as string} column={column}>
                {content}
              </Table.Cell>
            )
          })}
        </Table.Row>
      </Table.Head>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <Table.Body ref={droppableProvided.innerRef}>
              {table.data.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(draggableProvided, draggableSnapshot) => (
                    <Table.Row
                      id={item.id}
                      key={item.id}
                      ref={draggableProvided.innerRef}
                      {...draggableProvided.draggableProps}
                      {...draggableProvided.dragHandleProps}
                      styleOverrides={{
                        ...draggableProvided.draggableProps.style,
                        boxShadow: draggableSnapshot.isDragging
                          ? 'menu'
                          : 'none',
                      }}
                    >
                      {table.columns.map((column) => {
                        const content = table.resolveCell({ item, column })

                        return (
                          <Table.Cell
                            id={`${item.id}-${column.id}`}
                            key={`${item.id}-${column.id}`}
                            column={column}
                          >
                            {content}
                          </Table.Cell>
                        )
                      })}
                    </Table.Row>
                  )}
                </Draggable>
              ))}
              {droppableProvided.placeholder}
            </Table.Body>
          )}
        </Droppable>
      </DragDropContext>
    </Table>
  )
}
