import React from 'react'
import { Meta } from '@storybook/react'

import { PageHeader } from './index'
import { tag } from '@vtex/onda-react'
import { Button } from '../Button'

export default {
  title: 'admin-ui/PageHeader',
  component: PageHeader,
} as Meta

export function Basic() {
  return (
    <PageHeader>
      <PageHeader.Title>Product</PageHeader.Title>
    </PageHeader>
  )
}

export function WithBackLink() {
  return (
    <PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
      <PageHeader.Title>Product</PageHeader.Title>
    </PageHeader>
  )
}

export function WithActions() {
  return (
    <PageHeader>
      <PageHeader.Title>Products</PageHeader.Title>
      <PageHeader.Actions>
        <Button variant="secondary">Edit</Button>
        <Button>Create</Button>
      </PageHeader.Actions>
    </PageHeader>
  )
}

export function FullBlown() {
  return (
    <PageHeader onPopNavigation={() => alert('onPopNavigation()')}>
      <PageHeader.Title>Product</PageHeader.Title>
      <PageHeader.Actions>
        <Button variant="danger">Delete Item</Button>
      </PageHeader.Actions>
    </PageHeader>
  )
}

export function Shell() {
  return (
    <tag.div csx={{ width: '57.5rem', height: '37.5rem', display: 'flex' }}>
      <tag.aside
        csx={{
          bg: 'mid.tertiary',
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
          <PageHeader.Title>Product</PageHeader.Title>
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
                  bg: 'light.secondary',
                }}
              />
            ))}
        </tag.div>
      </tag.div>
    </tag.div>
  )
}
