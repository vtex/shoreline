import React, { Fragment, useState } from 'react'
import { Meta } from '@storybook/react'
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd'
import faker from 'faker'
import { IconDrag } from '@vtex/admin-ui-icons'

import { DataGrid } from '../index'
import { useDataGridState } from '../hooks/useDataGridState'

export default {
  title: 'admin-ui/DataGrid/Dnd',
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
            return <IconDrag />
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
    <DataGrid state={datagrid}>
      <DataGrid.Table csx={{ width: 'unset' }}>
        <DataGrid.Table.Head />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(droppableProvided) => (
              <DataGrid.Table.Body ref={droppableProvided.innerRef}>
                {(render) => (
                  <Fragment>
                    {render(({ key, item, index }) => (
                      <Draggable draggableId={key} index={index}>
                        {(draggableProvided, draggableSnapshot) => (
                          <DataGrid.Table.Body.Row
                            id={key}
                            item={item}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.draggableProps}
                            {...draggableProvided.dragHandleProps}
                            csx={{
                              ...draggableProvided.draggableProps.style,
                              boxShadow: draggableSnapshot.isDragging
                                ? 'menu'
                                : 'none',
                            }}
                          />
                        )}
                      </Draggable>
                    ))}
                    {droppableProvided.placeholder}
                  </Fragment>
                )}
              </DataGrid.Table.Body>
            )}
          </Droppable>
        </DragDropContext>
      </DataGrid.Table>
    </DataGrid>
  )
}
