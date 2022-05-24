import type { Meta, Story } from '@storybook/react'
import React, { useState } from 'react'

import type { Locales } from '../i18n'
import { I18nProvider, locales } from '../i18n'
import type { SearchProps } from './index'
import { Search, useSearchState } from './index'

export default {
  title: 'admin-ui-review/search',
  component: Search,
  argTypes: {
    locale: {
      options: locales,
      control: { type: 'select' },
    },
  },
} as Meta

interface PlaygroundProps extends SearchProps {
  loading: boolean
  locale: Locales
}

export const Playground: Story<PlaygroundProps> = (args) => {
  const { getInputProps } = useSearchState()

  return (
    <I18nProvider locale={args.locale}>
      <Search
        csx={{ margin: 4, width: 400 }}
        {...args}
        loading={args.loading}
        {...getInputProps()}
      />
    </I18nProvider>
  )
}

Playground.args = {
  disabled: false,
  placeholder: 'Search',
  loading: false,
  locale: 'en-US',
}

export const WithoutHook = () => {
  const [value, setValue] = useState('')

  return (
    <Search
      csx={{ margin: 4, width: 400 }}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      onClear={() => setValue('')}
    />
  )
}
