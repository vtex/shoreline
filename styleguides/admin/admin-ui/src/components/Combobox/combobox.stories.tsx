import React from 'react'
import { Meta } from '@storybook/react'

import { Combobox } from './index'

import { useComboboxState } from './hooks/useComboboxState'
import { Heading } from '../Heading'
import { Paragraph } from '../Paragraph'
import { Input } from '../Input'

export default {
  title: 'admin-ui/Combobox',
} as Meta

export const Native = () => {
  const state = useComboboxState({
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

// export const Backup = () => {
//   const [inputItems, setInputItems] = useState(pagesSource.items)
//   const state = useCombobox({
//     items: inputItems,
//     onInputValueChange: ({ inputValue }) => {
//       setInputItems(
//         pagesSource.items.filter((item) =>
//           item.toLowerCase().startsWith(String(inputValue).toLowerCase())
//         )
//       )
//     },
//     // onSelectedItemChange: (pro) => {
//     //   setLastSearches((ls) => [pro.selectedItem, ...ls])
//     // }
//   })

//   return (
//     <Combobox state={state} label="Choose an element">
//       <Combobox.Input
//         csx={{
//           border: '1px solid grey',
//           padding: '10px',
//           borderRadius: '4px',
//         }}
//       />
//       <Combobox.Menu
//         csx={{
//           bg: 'light.primary',
//           listStyle: 'none',
//           borderRadius: 4,
//           marginTop: 4,
//           width: 500,
//           border: state.isOpen ? 'default' : 'none',
//         }}
//       >
//         {inputItems.map((item, index) => (
//           <Combobox.Option key={`${item}-${index}`} item={item} index={index} />
//         ))}
//       </Combobox.Menu>
//     </Combobox>
//   )
// }

// export const WithPortals = () => {
//   const [inputItems, setInputItems] = useState(pagesSource.items)
//   const state = useCombobox({
//     items: inputItems,
//     onInputValueChange: ({ inputValue }) => {
//       setInputItems(
//         pagesSource.items.filter((item) =>
//           item.toLowerCase().startsWith(String(inputValue).toLowerCase())
//         )
//       )
//     },
//     // onSelectedItemChange: (pro) => {
//     //   setLastSearches((ls) => [pro.selectedItem, ...ls])
//     // }
//   })

//   return (
//     <Combobox state={state} label="Choose an element">
//       <Combobox.Input
//         csx={{
//           border: '1px solid grey',
//           padding: '10px',
//           borderRadius: '4px',
//         }}
//       />
//       <Combobox.Menu
//         csx={{
//           bg: 'light.primary',
//           listStyle: 'none',
//           borderRadius: 4,
//           marginTop: 4,
//           width: 500,
//           border: state.isOpen ? 'default' : 'none',
//         }}
//       >
//         {inputItems.map((item, index) => (
//           <Combobox.Option key={`${item}-${index}`} item={item} index={index} />
//         ))}
//       </Combobox.Menu>
//     </Combobox>
//   )
// }

// export const AdminUI = () => {
//   const [inputItems, setInputItems] = useState(pagesSource.items)
//   const state = useCombobox({
//     items: inputItems,
//     onInputValueChange: ({ inputValue }) => {
//       setInputItems(
//         pagesSource.items.filter((item) =>
//           item.toLowerCase().startsWith(String(inputValue).toLowerCase())
//         )
//       )
//     },
//     // onSelectedItemChange: (pro) => {
//     //   setLastSearches((ls) => [pro.selectedItem, ...ls])
//     // }
//   })

//   return (
//     <Combobox state={state} label="Choose an element">
//       <div {...state.getComboboxProps()}>
//         <Combobox.Input
//           state={state}
//           as={Base as any}
//           label="Search something"
//         />
//       </div>
//       <Combobox.Popover>
//         <Combobox.List state={state}>
//           {inputItems.map((item, index) => (
//             <Combobox.Option
//               key={`${item}-${index}`}
//               state={state}
//               item={item}
//               index={index}
//             />
//           ))}
//         </Combobox.List>
//       </Combobox.Popover>
//     </Combobox>
//   )
// }

// export const Custom = () => {
//   const focus = {
//     ':focus:not([data-focus-visible-added])': {
//       outline: 'none',
//       boxShadow: 'none',
//     },
//     ':focus': {
//       outline: 'none',
//       boxShadow: 'focus',
//     },
//   }

//   const Input = forwardRef(function Input(props: any, ref: any) {
//     const { onClear, ...rest } = props
//     const { cn } = useSystem()

//     return (
//       <Fragment>
//         <IconSearch
//           csx={{
//             color: 'blue',
//             size: 28,
//             position: 'absolute',
//             top: 4,
//             left: 4,
//           }}
//         />
//         <input
//           className={cn({
//             height: 64,
//             width: 500,
//             fontSize: 16,
//             borderRadius: 4,
//             paddingX: 56,
//             border: 'default',
//             ...focus,
//           })}
//           ref={ref}
//           placeholder="Search"
//           {...rest}
//         />
//         {rest.value !== '' && (
//           <Button
//             csx={{
//               position: 'absolute',
//               right: 4,
//               top: 3,
//             }}
//             variant="tertiary"
//             icon={<IconCancel />}
//             onClick={onClear}
//           />
//         )}
//       </Fragment>
//     )
//   })

//   const [inputItems, setInputItems] = useState(pagesSource.items)
//   const state = useCombobox({
//     items: inputItems,
//     onInputValueChange: ({ inputValue }) => {
//       setInputItems(
//         pagesSource.items.filter((item) =>
//           item.toLowerCase().startsWith(String(inputValue).toLowerCase())
//         )
//       )
//     },
//     // onSelectedItemChange: (pro) => {
//     //   setLastSearches((ls) => [pro.selectedItem, ...ls])
//     // }
//   })

//   return (
//     <Combobox state={state} label="Choose an element">
//       <Box
//         csx={{ position: 'relative', width: 500 }}
//         {...state.getComboboxProps()}
//       >
//         <Combobox.Input
//           state={state}
//           as={Input}
//           onClear={() => {
//             state.setInputValue('')
//             state.openMenu()
//           }}
//         />
//       </Box>
//       <Combobox.Popover>
//         <Combobox.List state={state}>
//           {inputItems.map((item, index) => (
//             <Combobox.Option
//               key={`${item}-${index}`}
//               state={state}
//               item={item}
//               index={index}
//             />
//           ))}
//         </Combobox.List>
//       </Combobox.Popover>
//     </Combobox>
//   )
// }
