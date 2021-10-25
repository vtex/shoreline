import React, { useState } from 'react'
import type { Meta } from '@storybook/react'

import { Box } from '../Box'
import { Button } from '../Button'
import {
  unstableSearchBox as SearchBox,
  unstableUseSearchBoxState as useSearchBoxState,
} from './index'
import type { Locale } from './intl'

export default {
  title: 'admin-ui/SearchBox',
} as Meta

export function Basic() {
  const state = useSearchBoxState({
    id: 'basic',
    collection: [
      'Orders',
      'Products',
      'Pages',
      'Shipping',
      'Store Settings',
      'Transactions',
      'Billing',
      'Site Layout',
      'Promotions',
      'Tracking',
      'Coupons',
    ],
  })

  return (
    <Box
      csx={{
        width: 680,
      }}
    >
      <SearchBox state={state}>
        <SearchBox.Input />
        <SearchBox.Menu>
          <SearchBox.Suggestion />
        </SearchBox.Menu>
        <SearchBox.Footer />
      </SearchBox>
    </Box>
  )
}

export function HistorySize() {
  const state = useSearchBoxState({
    id: 'history',
    historySize: 2,
    collection: [
      'Orders',
      'Products',
      'Pages',
      'Shipping',
      'Store Settings',
      'Transactions',
      'Billing',
      'Site Layout',
      'Promotions',
      'Tracking',
      'Coupons',
    ],
  })

  return (
    <Box
      csx={{
        width: 680,
      }}
    >
      <SearchBox state={state}>
        <SearchBox.Input />
        <SearchBox.Menu>
          <SearchBox.Suggestion />
        </SearchBox.Menu>
        <SearchBox.Footer />
      </SearchBox>
    </Box>
  )
}

export function WithObjects() {
  type Item = {
    name: string
  }

  const state = useSearchBoxState({
    id: 'with-objects',
    collection: [
      { name: 'Orders' },
      { name: 'Products' },
      { name: 'Pages' },
      { name: 'Shipping' },
      { name: 'Store Settings' },
      { name: 'Transactions' },
      { name: 'Billing' },
      { name: 'Site Layout' },
      { name: 'Promotions' },
      { name: 'Tracking' },
      { name: 'Coupons' },
    ],
    itemToString: (a) => a?.name ?? '',
    compare: (a, b) => a.name === b.name,
  })

  return (
    <Box
      csx={{
        width: 680,
      }}
    >
      <SearchBox state={state}>
        <SearchBox.Input />
        <SearchBox.Menu>
          <SearchBox.Suggestion>
            {(item: Item) => item.name}
          </SearchBox.Suggestion>
        </SearchBox.Menu>
        <SearchBox.Footer />
      </SearchBox>
    </Box>
  )
}

export function WithCustomMatch() {
  type Item = {
    name: string
  }

  const state = useSearchBoxState({
    id: 'custom-match',
    collection: [
      { name: 'Orders', context: 'OMS' },
      { name: 'Products', context: 'Catalog' },
      { name: 'Pages', context: 'Page Front' },
      { name: 'Shipping', context: 'OMS' },
      { name: 'Store Settings', context: 'Page Front' },
      { name: 'Transactions', context: 'Payments' },
      { name: 'Billing', context: 'Payments' },
      { name: 'Site Layout', context: 'Store Front' },
      { name: 'Promotions', context: 'Catalog' },
      { name: 'Tracking', context: 'OMS' },
      { name: 'Coupons', context: 'Catalog' },
    ],
    itemToString: (a) => a?.name ?? '',
    compare: (a, b) => a.name === b.name,
    match: (params) => {
      const { inputValue, itemString, item } = params

      const startsWith = (target?: string, subString?: string) =>
        String(target).toLowerCase().startsWith(String(subString).toLowerCase())

      return (
        startsWith(itemString, inputValue) ||
        startsWith(item?.context, inputValue)
      )
    },
  })

  return (
    <Box
      csx={{
        width: 680,
      }}
    >
      <SearchBox state={state}>
        <SearchBox.Input />
        <SearchBox.Menu>
          <SearchBox.Suggestion>
            {(item: Item) => item.name}
          </SearchBox.Suggestion>
        </SearchBox.Menu>
        <SearchBox.Footer />
      </SearchBox>
    </Box>
  )
}

export function WithScroll() {
  const state = useSearchBoxState({
    id: 'with-scroll',
    collection: [
      'Orders',
      'Products',
      'Pages',
      'Shipping',
      'Store Settings',
      'Transactions',
      'Billing',
      'Site Layout',
      'Promotions',
      'Tracking',
      'Coupons',
      'a',
      'aa',
      'aaa',
      'aaaa',
      'aaaaa',
      'aaaaaa',
      'aaaaaaa',
      'aaaaaaaaa',
      'aaaaaaaaaaa',
      'aaaaaaaaaaaa',
      'aaaaaaaaaaaaa',
      'aaaaaaaaaaaaaa',
      'aaaaaaaaaaaaaaa',
      'aaaaaaaaaaaaaaaa',
      'aaaaaaaaaaaaaaaaa',
    ],
  })

  return (
    <Box
      csx={{
        width: 680,
      }}
    >
      <SearchBox state={state}>
        <SearchBox.Input />
        <SearchBox.Menu>
          <SearchBox.Suggestion />
        </SearchBox.Menu>
        <SearchBox.Footer />
      </SearchBox>
    </Box>
  )
}

export function Intl() {
  const [locale, setLocale] = useState<Locale>('en-US')
  const state = useSearchBoxState({
    id: 'basic',
    collection: [
      'Orders',
      'Products',
      'Pages',
      'Shipping',
      'Store Settings',
      'Transactions',
      'Billing',
      'Site Layout',
      'Promotions',
      'Tracking',
      'Coupons',
    ],
  })

  const toggleLocale = () => {
    if (locale === 'pt-BR') {
      setLocale('en-US')
    }

    if (locale === 'en-US') {
      setLocale('pt-BR')
    }
  }

  return (
    <Box>
      <Button onClick={toggleLocale}>Toggle locale</Button>
      <Box
        csx={{
          width: 680,
        }}
      >
        <SearchBox state={state} locale={locale}>
          <SearchBox.Input />
          <SearchBox.Menu>
            <SearchBox.Suggestion />
          </SearchBox.Menu>
          <SearchBox.Footer />
        </SearchBox>
      </Box>
    </Box>
  )
}

export function IntlFallback() {
  const [locale, setLocale] = useState('en-US')
  const state = useSearchBoxState({
    id: 'basic',
    collection: [
      'Orders',
      'Products',
      'Pages',
      'Shipping',
      'Store Settings',
      'Transactions',
      'Billing',
      'Site Layout',
      'Promotions',
      'Tracking',
      'Coupons',
    ],
  })

  const toggleLocale = () => {
    if (locale === 'en-US') {
      setLocale('na-NA')
    }

    if (locale === 'na-NA') {
      setLocale('en-US')
    }
  }

  return (
    <Box>
      <Button onClick={toggleLocale}>
        {locale === 'en-US'
          ? "Toggle unexistent locale (take a look at your browser's console)"
          : 'Toggle locale'}
      </Button>
      <Box
        csx={{
          width: 680,
        }}
      >
        <SearchBox state={state} locale={locale as Locale}>
          <SearchBox.Input />
          <SearchBox.Menu>
            <SearchBox.Suggestion />
          </SearchBox.Menu>
          <SearchBox.Footer />
        </SearchBox>
      </Box>
    </Box>
  )
}
