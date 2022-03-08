import React from 'react'

import type { Meta } from '@storybook/react'

import { ComboboxField, ComboboxPopover, useComboboxState } from './index'

export default {
  title: 'admin-ui/Combobox',
} as Meta

export const Basic = () => {
  const state = useComboboxState({
    list: ['Brazil', 'France', 'Ukraine', 'Australia'],
  })

  return (
    <div>
      <ComboboxField id="basic-combobox" state={state} label="Country" />
      <ComboboxPopover state={state} />
    </div>
  )
}

// const searchItems = (search: string, delay = 500) => {
//   const items = [
//     { id: 1, value: 'Brazil', flag: '🇧🇷' },
//     { id: 2, value: 'France', flag: '🇫🇷' },
//     { id: 3, value: 'Ukraine', flag: '🇺🇦' },
//     { id: 4, value: 'Australia', flag: '🇦🇺' },
//   ]

//   console.log({ search })

//   const res = items.filter((item) =>
//     item.value.toLowerCase().startsWith(search.toLowerCase())
//   )

//   console.log({ res })

//   return new Promise<any[]>((resolve) =>
//     setTimeout(resolve, delay, res as any[])
//   )
// }

// // TODO fake a request
// export const Async = () => {
//   const combobox = useComboboxState({})

//   useEffect(() => {
//     console.log(combobox)

//     if (combobox.value === '') return
//     searchItems(combobox.value).then((res) => {
//       combobox.setList(res.map((i) => i.value))
//     })
//   }, [combobox.value, combobox.setList])

//   return (
//     <div>
//       <ComboboxField state={combobox} label="Countries" />
//       <ComboboxPopover state={combobox} />
//     </div>
//   )
// }
