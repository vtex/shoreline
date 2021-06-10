import React from 'react'
import { Meta } from '@storybook/react'

import {
  unstableCombobox as Combobox,
  unstableUseComboboxState as useComboboxState,
} from './index'

import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { Input } from '../Input'

export default {
  title: 'admin-ui/Combobox',
} as Meta

export const Native = () => {
  const state = useComboboxState({
    id: 'with-strings',
    label: <Paragraph>Admin Pages</Paragraph>,
    recordLabel: <Paragraph>Last Searches</Paragraph>,
    collection: [
      'Orders',
      'Products',
      'Pages',
      'Shipping',
      'Store Settings',
      'Transactions',
      'Billing',
    ],
  })

  return (
    <Combobox state={state} label="Choose an element">
      <Combobox.Input
        placeholder="Start typing to search"
        csx={{
          border: '1px solid grey',
          padding: '10px',
          borderRadius: '4px',
        }}
      />
      <Combobox.Menu
        csx={{
          bg: 'light.primary',
          listStyle: 'none',
          borderRadius: 4,
          marginTop: 2,
          width: 500,
          border:
            state.combobox.isOpen && state.collection.value.length > 0
              ? 'default'
              : 'none',
          '>:last-child': {
            borderBottom: 'none',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          },
          '>:first-child': {
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          },
        }}
      >
        {(item: any, index: number, highlighted: boolean) => (
          <Combobox.Option
            key={`${item}-${index}`}
            item={item}
            index={index}
            csx={{
              paddingX: 3,
              height: 40,
              borderBottom: '1px solid #E0E2E7',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              bg: highlighted ? 'light.secondary' : 'light.primary',
            }}
          />
        )}
      </Combobox.Menu>
    </Combobox>
  )
}

export const NativeWithObjects = () => {
  const state = useComboboxState({
    id: 'with-objects',
    label: <Paragraph>Admin Pages</Paragraph>,
    recordLabel: <Paragraph>Last Searches</Paragraph>,
    compare: (a, b) => a.name === b.name,
    collection: [
      { id: 1, name: 'Orders', description: 'Control your orders' },
      { id: 2, name: 'Products', description: 'Manage products' },
      { id: 3, name: 'Pages', description: 'Configure the site' },
      { id: 4, name: 'Shipping', description: 'Choose shipping methods' },
      { id: 5, name: 'Store Settings', description: 'Configure your store' },
      { id: 6, name: 'Transactions', description: 'Handle transactions' },
      { id: 7, name: 'Billing', description: 'Setup billing' },
    ],
    render: (item) => (
      <div>
        <Heading>{item.name}</Heading>
        <Paragraph>{item.description}</Paragraph>
      </div>
    ),
    itemToString: (item) => item?.name ?? '',
  })

  return (
    <Combobox state={state} label="Choose an element">
      <Combobox.Input
        placeholder="Start typing to search"
        csx={{
          border: '1px solid grey',
          padding: '10px',
          borderRadius: '4px',
        }}
      />
      <Combobox.Menu
        csx={{
          bg: 'light.primary',
          listStyle: 'none',
          borderRadius: 4,
          marginTop: 2,
          width: 500,
          border:
            state.combobox.isOpen && state.collection.value.length > 0
              ? 'default'
              : 'none',
          '>:last-child': {
            borderBottom: 'none',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          },
          '>:first-child': {
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          },
        }}
      >
        {(item: any, index: number, highlighted: boolean) => (
          <Combobox.Option
            key={`${item}-${index}`}
            item={item}
            index={index}
            csx={{
              paddingX: 3,
              height: 80,
              borderBottom: '1px solid #E0E2E7',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              bg: highlighted ? 'light.secondary' : 'light.primary',
            }}
          />
        )}
      </Combobox.Menu>
    </Combobox>
  )
}

export const UsingAdminUI = () => {
  const state = useComboboxState({
    id: 'with-admin-ui',
    label: <Paragraph>Admin Pages</Paragraph>,
    recordLabel: <Paragraph>Last Searches</Paragraph>,
    compare: (a, b) => a.name === b.name,
    collection: [
      { id: 1, name: 'Orders', description: 'Control your orders' },
      { id: 2, name: 'Products', description: 'Manage products' },
      { id: 3, name: 'Pages', description: 'Configure the site' },
      { id: 4, name: 'Shipping', description: 'Choose shipping methods' },
      { id: 5, name: 'Store Settings', description: 'Configure your store' },
      { id: 6, name: 'Transactions', description: 'Handle transactions' },
      { id: 7, name: 'Billing', description: 'Setup billing' },
    ],
    render: (item) => (
      <div>
        <Heading>{item.name}</Heading>
        <Paragraph>{item.description}</Paragraph>
      </div>
    ),
    itemToString: (item) => item?.name ?? '',
  })

  return (
    <Combobox state={state} label="Choose an element">
      <Combobox.Input
        id="search-input"
        label="Search Pages"
        as={Input}
        onClear={() => {
          state.combobox.setInputValue('')
          state.combobox.openMenu()
        }}
      />
      <Combobox.Menu
        csx={{
          bg: 'light.primary',
          listStyle: 'none',
          borderRadius: 4,
          marginTop: 2,
          width: 500,
          border:
            state.combobox.isOpen && state.collection.value.length > 0
              ? 'default'
              : 'none',
          '>:last-child': {
            borderBottom: 'none',
            borderBottomLeftRadius: 4,
            borderBottomRightRadius: 4,
          },
          '>:first-child': {
            borderTopLeftRadius: 4,
            borderTopRightRadius: 4,
          },
        }}
        emptyView={
          <>
            <h1>No result matches your search criteria</h1>
            <h2>Please, search for a different term</h2>
          </>
        }
      >
        {(item: any, index: number, highlighted: boolean) => (
          <Combobox.Option
            key={`${item}-${index}`}
            item={item}
            index={index}
            csx={{
              paddingX: 3,
              height: 80,
              borderBottom: '1px solid #E0E2E7',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              bg: highlighted ? 'light.secondary' : 'light.primary',
            }}
          />
        )}
      </Combobox.Menu>
    </Combobox>
  )
}
