import React, { useEffect } from 'react'

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

// fake request
const searchItems = (search: string, delay = 1000) => {
  const items = [
    { value: 'Brazil' },
    { value: 'Bahamas' },
    { value: 'Belarus' },
    { value: 'France' },
    { value: 'Ukraine' },
    { value: 'Australia' },
    { value: 'Afghanistan' },
    { value: 'Albania' },
    { value: 'Algeria' },
    { value: 'American Samoa' },
    { value: 'Andorra' },
    { value: 'Angola' },
    { value: 'Anguilla' },
    { value: 'Antarctica' },
    { value: 'Antigua and Barbuda' },
    { value: 'Argentina' },
    { value: 'Armenia' },
    { value: 'Aruba' },
    { value: 'Austria' },
    { value: 'Azerbaijan' },
  ]

  const res = items.filter((item) =>
    item.value.toLowerCase().startsWith(search.toLowerCase())
  )

  return new Promise<any[]>((resolve) =>
    setTimeout(resolve, delay, res as any[])
  )
}

export const Async = () => {
  const combobox = useComboboxState()

  useEffect(() => {
    if (combobox.deferredValue === '') {
      combobox.setList([])
    } else {
      combobox.setLoading(true)
      searchItems(combobox.deferredValue).then((res) => {
        combobox.setList(res.map((i) => i.value))
        combobox.setLoading(false)
      })
    }
  }, [combobox.deferredValue, combobox.setList])

  return (
    <div>
      <ComboboxField id="async-combobox" state={combobox} label="Country" />
      <ComboboxPopover state={combobox} />
    </div>
  )
}
