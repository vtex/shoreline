import React, { Fragment, useState } from 'react'
import type { Meta } from '@storybook/react'
import type { DropResult } from 'react-beautiful-dnd'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import faker from 'faker'
import { IconDotsSixVertical } from '@vtex/phosphor-icons'

import { DataGrid, DataGridBody, DataGridHead, DataGridBodyRow } from '../index'
import { useDataGridState } from '../hooks/use-table-state'

export default {
  title: 'admin-ui-review/table/Dnd',
  component: DataGrid,
} as Meta

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
  const datagrid = useDataGridState<Item>({
    columns: [
      {
        id: 'draggable',
        header: '',
        width: 36,
        resolver: {
          type: 'root',
          render: function RenderIcon() {
            return <IconDotsSixVertical />
          },
        },
      },
      {
        id: 'name',
        width: 200,
        header: 'Product Name',
      },
      {
        id: 'lastSale',
        width: 200,
        header: 'Last Sale',
      },
      {
        id: 'price',
        header: 'Price',
        width: 100,
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
    <DataGrid state={datagrid} csx={{ width: 'unset' }}>
      <DataGridHead />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(droppableProvided) => (
            <DataGridBody ref={droppableProvided.innerRef}>
              {(render) => (
                <Fragment>
                  {render(({ key, item, index }) => {
                    return (
                      <Draggable draggableId={key} index={index}>
                        {(draggableProvided, draggableSnapshot) => (
                          <DataGridBodyRow
                            id={key}
                            item={item}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            csx={{
                              ...draggableProvided.draggableProps.style,
                              boxShadow: draggableSnapshot.isDragging
                                ? '$overlay.center'
                                : 'none',
                            }}
                          />
                        )}
                      </Draggable>
                    )
                  })}
                  {droppableProvided.placeholder}
                </Fragment>
              )}
            </DataGridBody>
          )}
        </Droppable>
      </DragDropContext>
    </DataGrid>
  )
}
