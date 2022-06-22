import React from 'react'
import type { Meta } from '@storybook/react'
import { tag } from '@vtex/admin-ui-react'

import { PageHeader } from '../index'
import { Button } from '../../button'
import { Tabs, useTabState, TabPanel } from '../../components/Tabs'
import { useMenuState } from '../../components/Menu'
import { IconHeart, IconLink, IconTrash, IconTruck } from '@vtex/phosphor-icons'
import type { PageHeaderMenuOptions } from '../page-header'

export default {
  title: 'admin-ui-review/page/page-header',
  component: PageHeader,
} as Meta

export function Basic() {
  return <PageHeader title="Product" />
}

export function WithBackLink() {
  return (
    <PageHeader
      title="Product"
      onPopNavigation={() => alert('onPopNavigation()')}
    />
  )
}

export function WithActions() {
  return (
    <PageHeader
      title="Product"
      actionsOptions={[
        { variant: 'secondary', children: 'Edit' },
        { children: 'Create' },
      ]}
    />
  )
}

export function WithTabs() {
  const tabs = useTabState({ selectedId: '1' })

  const tabsOptions = [
    {
      id: '1',
      csx: { padding: 3 },
      children: 'Label',
    },
    {
      id: '2',
      csx: { padding: 3 },
      children: 'Label',
    },
    {
      id: '3',
      csx: { padding: 3 },
      children: 'Label',
    },
  ]

  return (
    <>
      <Tabs state={tabs}>
        <PageHeader title="Product" tabsOptions={tabsOptions} />
        <TabPanel id="1" csx={{ padding: 3 }}>
          <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
        </TabPanel>
        <TabPanel id="2" csx={{ padding: 3 }}>
          <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
        </TabPanel>
        <TabPanel id="3" csx={{ padding: 3 }}>
          <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
        </TabPanel>
      </Tabs>
    </>
  )
}

export function WithMenu() {
  const tabs = useTabState({ selectedId: '1' })
  const state = useMenuState()

  const tabsOptions = [
    {
      id: '1',
      csx: { padding: 3 },
      children: 'Label',
    },
    {
      id: '2',
      csx: { padding: 3 },
      children: 'Label',
    },
    {
      id: '3',
      csx: { padding: 3 },
      children: 'Label',
    },
  ]

  const menuOptions: PageHeaderMenuOptions = {
    state,
    hideOnClick: true,
    menuItemOptions: [
      {
        icon: <IconTruck />,
        children: 'Download',
      },
      {
        icon: <IconLink />,
        children: 'Link to',
      },
      {
        icon: <IconHeart />,
        children: 'Favorite',
      },
      {
        icon: <IconTrash />,
        children: 'Delete',
        tone: 'critical',
      },
    ],
  }

  return (
    <>
      <Tabs state={tabs}>
        <PageHeader
          title="Product"
          tabsOptions={tabsOptions}
          menuOptions={menuOptions}
        />
        <TabPanel id="1" csx={{ padding: 3 }}>
          <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
        </TabPanel>
        <TabPanel id="2" csx={{ padding: 3 }}>
          <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
        </TabPanel>
        <TabPanel id="3" csx={{ padding: 3 }}>
          <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
        </TabPanel>
      </Tabs>
    </>
  )
}

export function FullBlown() {
  const tabs = useTabState({ selectedId: '1' })
  const state = useMenuState()

  const tabsOptions = [
    {
      id: '1',
      csx: { padding: 3 },
      children: 'Label',
    },
    {
      id: '2',
      csx: { padding: 3 },
      children: 'Label',
    },
    {
      id: '3',
      csx: { padding: 3 },
      children: 'Label',
    },
  ]

  const menuOptions: PageHeaderMenuOptions = {
    state,
    hideOnClick: true,
    menuItemOptions: [
      {
        icon: <IconTruck />,
        children: 'Download',
      },
      {
        icon: <IconLink />,
        children: 'Link to',
      },
      {
        icon: <IconHeart />,
        children: 'Favorite',
      },
      {
        icon: <IconTrash />,
        children: 'Delete',
        tone: 'critical',
      },
    ],
  }

  return (
    <Tabs state={tabs}>
      <PageHeader
        title="Product"
        actionsOptions={[
          { variant: 'critical', children: 'Delete Item' },
          { variant: 'secondary', children: 'Edit' },
          { children: 'Create' },
        ]}
        tabsOptions={tabsOptions}
        menuOptions={menuOptions}
      />
      <TabPanel id="1" csx={{ padding: 3 }}>
        <Button onClick={() => tabs.select('3')}>Go to Tab 3!</Button>
      </TabPanel>
      <TabPanel id="2" csx={{ padding: 3 }}>
        <Button onClick={() => tabs.select('1')}>Go to Tab 1!</Button>
      </TabPanel>
      <TabPanel id="3" csx={{ padding: 3 }}>
        <Button onClick={() => tabs.select('2')}>Go to Tab 2!</Button>
      </TabPanel>
    </Tabs>
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
        <PageHeader
          title="Product"
          onPopNavigation={() => alert('onPopNavigation()')}
        />
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
