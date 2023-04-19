import React from 'react'
import type { Meta } from '@storybook/react'

import { Stack } from '../../stack'
import { Button } from '../../button'
import type { ModalProps } from '../index'
import {
  Modal,
  useModalState,
  ModalHeader,
  ModalTitle,
  ModalDismiss,
  ModalContent,
  ModalFooter,
  ModalButton,
} from '../index'

import faker from 'faker'

import { DataView, DataViewHeader, useDataViewState } from '../../data-view'
import {
  Table,
  TBody,
  TBodyRow,
  THeadCell,
  THead,
  TBodyCell,
  useTableState,
  createColumns,
} from '../../table'
import { IconTrash, IconPencil, IconCopy } from '@vtex/phosphor-icons'
import { BulkActions, useBulkActions } from '../../bulk-actions'
import { usePaginationState, Pagination } from '../../pagination'
import { FlexSpacer } from '../../flex'
import {
  Page,
  PageHeader,
  PageHeaderTitle,
  PageHeaderTop,
  PageContent,
} from '../../page'
import { SelectionTree } from '../../selection-tree'
import { Alert } from '../../alert'
import { Dropdown, useDropdownState } from '../../dropdown'
import { Tooltip } from '../../tooltip'
import {
  useComboboxMultipleState,
  ComboboxMultipleField,
  ComboboxMultiplePopover,
} from '../../combobox'
import { ToastProvider, useToast } from '../../toast'
import { csx } from '@vtex/admin-ui-core'

export default {
  title: 'admin-ui-review/zindex',
  component: Table,
} as Meta

interface Item {
  id: string
  name: string
  lastSale: string
  price: number
  brand: string
}

const items: Item[] = [...Array(100).keys()].map((id) => {
  return {
    id: `${id}`,
    name: faker.commerce.productName(),
    lastSale: faker.date.recent().toDateString(),
    price: faker.datatype.number(),
    brand: faker.random.arrayElement(['mistery_id', 'cool_id']),
  }
})

const combolist = [
  'Apple',
  'Bacon',
  'Banana',
  'Broccoli',
  'Burger',
  'Cake',
  'Candy',
  'Carrot',
  'Cherry',
  'Chocolate',
  'Cookie',
  'Cucumber',
  'Donut',
  'Fish',
  'Fries',
  'Grape',
  'Green apple',
  'Hot dog',
  'Ice cream',
  'Kiwi',
  'Lemon',
  'Lollipop',
  'Onion',
  'Orange',
  'Pasta',
  'Pineapple',
  'Pizza',
  'Potato',
  'Salad',
  'Sandwich',
  'Steak',
  'Strawberry',
  'Tomato',
  'Watermelon',
]

const DummyCombobox = () => {
  const combobox = useComboboxMultipleState({
    list: combolist,
  })

  return (
    <>
      <ComboboxMultipleField
        state={combobox}
        id="combobox-multiple"
        label="Foods"
      />
      <ComboboxMultiplePopover state={combobox} />
    </>
  )
}

const DummyDropbox = () => {
  const dditems = [
    { id: 1, label: 'Yesterday' },
    { id: 2, label: '7 days ago' },
    { id: 3, label: '28 days ago' },
    { id: 4, label: 'One year ago' },
  ]

  const dropdownState = useDropdownState({
    items: dditems,
    itemToString: (item) => item?.label ?? '',
    initialSelectedItem: dditems[1],
  })

  return (
    <Dropdown
      items={dditems}
      state={dropdownState}
      label="Date"
      renderItem={(item) => item?.label}
    />
  )
}

function ToastDisclosure() {
  const toast = useToast()

  return (
    <Button
      onClick={() => {
        toast({
          message: 'Type here a longer message but not much longer than that',
          action: {
            label: 'Action',
            onClick: () => {
              alert('Some action!')
            },
          },
        })
      }}
    >
      Toast
    </Button>
  )
}

export function Bulk() {
  const view = useDataViewState()

  const pagination = usePaginationState({
    pageSize: 100,
    total: items.length,
  })

  const pageItems = React.useMemo(
    () => items.slice(pagination.range[0] - 1, pagination.range[1]),
    [pagination.currentPage]
  )

  const bulk = useBulkActions({
    totalItems: pagination.total,
    pageItems,
    pageSize: pageItems.length,
  })

  const columns = createColumns<Item>([
    {
      id: 'id',
      resolver: {
        type: 'bulk',
        state: bulk,
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
  ])

  const { getBodyCell, getHeadCell, getTable, data } = useTableState<Item>({
    status: view.status,
    columns,
    items: pageItems,
  })

  const modal = useModalState()

  return (
    <ToastProvider>
      <Page>
        <Modal state={modal}>
          <ModalHeader>
            <ModalTitle>Small content</ModalTitle>
            <ModalDismiss />
          </ModalHeader>
          <ModalContent>
            <p>
              Your payment has been successfully processed. We have emailed your
              receipt.
            </p>
            <Tooltip text="Basic tooltip" />
            <DummyDropbox />
            <DummyCombobox />
            <p>
              Your payment has been successfully processed. We have emailed your
              receipt.
            </p>
          </ModalContent>
          <ModalFooter>
            <ModalButton>Confirm</ModalButton>
          </ModalFooter>
        </Modal>
        <PageHeader onPopNavigation={() => alert('onPopNavigation')}>
          <PageHeaderTop>
            <PageHeaderTitle>Product #123 </PageHeaderTitle>
            <DummyDropbox />
            <Tooltip text="Basic tooltip" />
            <DummyCombobox />
          </PageHeaderTop>
        </PageHeader>

        <PageContent layout="wide">
          <div>
            <ToastDisclosure />
            <DummyDropbox />
            <DummyCombobox />
            <Tooltip text="Basic tooltip" />
            <Button onClick={modal.toggle}>Show modal</Button>
            <Alert variant="info" className={csx({ height: '10px' })}>
              Order successfully placed
            </Alert>
            <DataView state={view}>
              <DataViewHeader>
                <FlexSpacer />
                <Pagination state={pagination} />
              </DataViewHeader>
              <BulkActions state={bulk}>
                <Button variant="tertiary" icon={<IconPencil />}>
                  Edit
                </Button>
                <Button variant="tertiary" icon={<IconCopy />}>
                  Duplicate
                </Button>
                <Button variant="criticalTertiary" icon={<IconTrash />}>
                  Delete
                </Button>
              </BulkActions>
              <SelectionTree state={bulk.selectionTree}>
                <Table {...getTable()}>
                  <THead>
                    {columns.map((column) => {
                      return <THeadCell {...getHeadCell(column)} />
                    })}
                  </THead>
                  <TBody>
                    {data.map((item) => {
                      return (
                        <TBodyRow
                          key={item.id}
                          selected={bulk.isItemSelected(item)}
                        >
                          {columns.map((column) => {
                            return <TBodyCell {...getBodyCell(column, item)} />
                          })}
                        </TBodyRow>
                      )
                    })}
                  </TBody>
                </Table>
              </SelectionTree>
            </DataView>
          </div>
        </PageContent>
      </Page>
    </ToastProvider>
  )
}
// alert x
// bulk x
// combobox popover x
// combobox label x
// dropdown x
// filter popover
// menu
// page header x
// table cells x
// tooltip x
// image resolver
// toast x
//

export function HorizontalAndVerticalScroll() {
  const items = [...Array(100).keys()].map((id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      lastSale: faker.date.past().toDateString(),
      price: faker.commerce.price(),
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0FyiZM7bDPsDEMtg0Zs2HXNwe2xbVh55IZA&usqp=CAU',
    }
  })

  const modal = useModalState()

  const columns = createColumns([
    {
      id: 'name',
      header: 'Product Name',
      width: 200,
      fixed: true,
    },
    {
      id: 'image',
      header: 'Image',
      resolver: {
        type: 'image',
        preview: {
          display: true,
          size: 'regular',
          delay: 0,
        },
      },
      fixed: true,
    },

    {
      id: 'lastSale',
      header: 'Last Sale',
      width: 550,
    },
    {
      id: 'price',
      header: 'Price',
      resolver: {
        type: 'currency',
        locale: 'en-US',
        currency: 'USD',
      },
      width: 400,
    },
    {
      id: 'menu',
      resolver: {
        type: 'menu',
        actions: [
          {
            label: 'Edit',
            icon: <IconPencil />,
            onClick: (item) => {
              console.log(item)
            },
          },
          {
            label: 'Delete',
            icon: <IconTrash />,
            onClick: (item) => {
              console.log(item)
            },
          },
        ],
      },
    },
  ])

  const { getBodyCell, getHeadCell, getTable, data } = useTableState({
    columns,
    items,
  })

  return (
    <>
      <Modal state={modal}>
        <p>
          Your payment has been successfully processed. We have emailed your
          receipt.
        </p>
        <Tooltip text="Basic tooltip" />
        <DummyDropbox />
        <DummyCombobox />
      </Modal>
      <Button onClick={modal.toggle}>Show modal</Button>
      <Table
        {...getTable()}
        className={csx({ height: '100vh', width: '100vw' })}
      >
        <THead>
          {columns.map((column) => {
            return <THeadCell {...getHeadCell(column)} />
          })}
        </THead>
        <TBody>
          {data.map((item) => {
            return (
              <TBodyRow key={item.id}>
                {columns.map((column) => {
                  return <TBodyCell {...getBodyCell(column, item)} />
                })}
              </TBodyRow>
            )
          })}
        </TBody>
      </Table>
    </>
  )
}

export function TableInModal() {
  const items = [...Array(100).keys()].map((id) => {
    return {
      id: `${id}`,
      name: faker.commerce.productName(),
      lastSale: faker.date.past().toDateString(),
      price: faker.commerce.price(),
      image:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0FyiZM7bDPsDEMtg0Zs2HXNwe2xbVh55IZA&usqp=CAU',
    }
  })

  const modal = useModalState()

  const columns = createColumns([
    {
      id: 'name',
      header: 'Product Name',
      width: 200,
      fixed: true,
    },
    {
      id: 'image',
      header: 'Image',
      resolver: {
        type: 'image',
        preview: {
          display: true,
          size: 'regular',
          delay: 0,
        },
      },
    },

    {
      id: 'lastSale',
      header: 'Last Sale',
      width: 550,
    },
  ])

  const { getBodyCell, getHeadCell, getTable, data } = useTableState({
    columns,
    items,
  })

  return (
    <>
      <Modal state={modal}>
        <ModalContent>
          <Table
            {...getTable()}
            className={csx({ height: '100vh', width: '100vw' })}
          >
            <THead>
              {columns.map((column) => {
                return <THeadCell {...getHeadCell(column)} />
              })}
            </THead>
            <TBody>
              {data.map((item) => {
                return (
                  <TBodyRow key={item.id}>
                    {columns.map((column) => {
                      return <TBodyCell {...getBodyCell(column, item)} />
                    })}
                  </TBodyRow>
                )
              })}
            </TBody>
          </Table>
        </ModalContent>
      </Modal>
      <Button onClick={modal.toggle}>Show modal</Button>
    </>
  )
}
