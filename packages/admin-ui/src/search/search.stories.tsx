import { Meta, Story } from '@storybook/react'
import React from 'react'

import { I18nProvider, Locales, locales } from '../i18n'
import { Search, SearchProps, useSearchState } from './index'

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
  const state = useSearchState()

  React.useEffect(() => {
    state.setLoading(args.loading)
  }, [args.loading])

  return (
    <I18nProvider locale={args.locale}>
      <Search csx={{ margin: 4, width: 400 }} {...args} state={state} />
    </I18nProvider>
  )
}

Playground.args = {
  disabled: false,
  placeholder: 'Search',
  loading: false,
  locale: 'en-US',
}
