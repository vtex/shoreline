import React from 'react'
import type { Meta } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'

import { PageHeader, PageTitle, PageActions } from '../index'
import { Button } from '../../button'

export default {
  title: 'admin-ui/Page/PageHeader',
  component: PageHeader,
} as Meta

export function Basic() {
  return (
    <PageHeader>
      <PageTitle>Product</PageTitle>
    </PageHeader>
  )
}

export function WithBackLink() {
  return (
    <PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
      <PageTitle>Product</PageTitle>
    </PageHeader>
  )
}

export function WithActions() {
  return (
    <PageHeader>
      <PageTitle>Products</PageTitle>
      <PageActions>
        <Button variant="secondary">Edit</Button>
        <Button>Create</Button>
      </PageActions>
    </PageHeader>
  )
}

export function FullBlown() {
  return (
    <PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
      <PageTitle>Product</PageTitle>
      <PageActions>
        <Button variant="danger">Delete Item</Button>
      </PageActions>
    </PageHeader>
  )
}

export function Shell() {
  return (
    <tag.div csx={{ width: '57.5rem', height: '37.5rem', display: 'flex' }}>
      <tag.aside
        csx={{
          bg: '$secondary',
          width: 320,
        }}
      >
        sidebar
      </tag.aside>
      <tag.div
        csx={{
          flex: 1,
        }}
      >
        <PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
          <PageTitle>Product</PageTitle>
        </PageHeader>
        <tag.div
          csx={{
            overflow: 'auto',
            height: '33rem',
          }}
        >
          {Array(20)
            .fill(1)
            .map((_, id) => (
              <tag.div
                key={id}
                csx={{
                  height: 100,
                  marginTop: 3,
                  marginX: 2,
                  bg: '$secondary',
                }}
              />
            ))}
        </tag.div>
      </tag.div>
    </tag.div>
  )
}
