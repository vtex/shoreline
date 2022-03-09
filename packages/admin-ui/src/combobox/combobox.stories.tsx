import React, { useEffect } from 'react'

import type { Meta, Story } from '@storybook/react'

import { ComboboxField, ComboboxPopover, useComboboxState } from './index'
import type { Locales } from '../i18n'
import { I18nProvider, locales } from '../i18n'

import {
  ComboboxMultiple,
  ComboboxMultiplePopover,
  useComboboxMultipleState,
} from './combobox-multiple'

export default {
  title: 'admin-ui/Combobox',
} as Meta

function Example() {
  const combobox = useComboboxState({
    list: ['Brazil', 'France', 'Ukraine', 'Australia'],
  })

  return (
    <div>
      <ComboboxField id="basic-combobox" state={combobox} label="Country" />
      <ComboboxPopover state={combobox} />
    </div>
  )
}

export const Basic = () => {
  return <Example />
}

export const I18n: Story<{
  locale: Locales
}> = ({ locale }) => {
  return (
    <I18nProvider locale={locale}>
      <Example />
    </I18nProvider>
  )
}

I18n.argTypes = {
  locale: {
    type: 'select' as any,
    options: locales,
  },
}

export const Error = () => {
  const combobox = useComboboxState()

  useEffect(() => {
    combobox.setError(true)
    combobox.setVisible(true)
  }, [])

  return (
    <div>
      <ComboboxField id="basic-combobox" state={combobox} label="Country" />
      <ComboboxPopover state={combobox} />
    </div>
  )
}

export const Loading = () => {
  const combobox = useComboboxState()

  useEffect(() => {
    combobox.setLoading(true)
    combobox.setVisible(true)
  }, [])

  return (
    <div>
      <ComboboxField id="basic-combobox" state={combobox} label="Country" />
      <ComboboxPopover state={combobox} />
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

const list = [
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

export function Multiple() {
  const id = 'combobox-multiple'

  const combobox = useComboboxMultipleState({
    defaultSelected: ['Bacon'],
    list,
  })

  return (
    <div>
      <label htmlFor={id}>Your favorite food</label>
      <ComboboxMultiple
        state={combobox}
        id={id}
        placeholder="e.g., Apple, Burger"
      />
      <ComboboxMultiplePopover state={combobox} />
    </div>
  )
}
