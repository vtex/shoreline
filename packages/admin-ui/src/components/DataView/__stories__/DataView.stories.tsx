import React, { useMemo } from 'react'
import type { Meta } from '@storybook/react'
import {
  IconAction,
  IconDelete,
  IconFavorite,
  IconImport,
  IconLink,
} from '@vtex/admin-ui-icons'

import { DataView, useDataViewState } from '../index'
import { DataViewControls } from '../components/DataViewControls'
import { Button } from '../../Button'
import { Spinner } from '../../Spinner'
import { Toolbar, ToolbarItem, useToolbarState } from '../../Toolbar'
import { MenuDisclosure, useMenuState, StatelessMenu as Menu } from '../../Menu'

export default {
  title: 'admin-ui/DataView',
  component: DataView,
} as Meta

export function Basic() {
  const view = useDataViewState()

  return (
    <DataView state={view}>
      <p>Data View</p>
    </DataView>
  )
}

export function Controls() {
  const view = useDataViewState()

  return (
    <DataView state={view}>
      <DataViewControls>
        <Button size="small" variant="adaptative-dark">
          Export
        </Button>
        <Button size="small" variant="adaptative-dark">
          Import
        </Button>
      </DataViewControls>
      <p>Data View content</p>
    </DataView>
  )
}

export function ToolbarControls() {
  const view = useDataViewState()
  const toolbar = useToolbarState()
  const menu = useMenuState()

  return (
    <DataView state={view}>
      <DataViewControls>
        <Toolbar state={toolbar} aria-label="DataView Toolbar">
          <ToolbarItem>
            <Button size="small" variant="adaptative-dark">
              Export
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            <Button size="small" variant="adaptative-dark">
              Import
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            {(itemProps) => (
              <MenuDisclosure state={menu}>
                <Button
                  icon={<IconAction />}
                  variant="adaptative-dark"
                  size="small"
                  {...itemProps}
                >
                  More
                </Button>
              </MenuDisclosure>
            )}
          </ToolbarItem>
        </Toolbar>
      </DataViewControls>

      <p>Data View content</p>

      <Menu aria-label="more actions" state={menu}>
        <Menu.Item icon={<IconImport />}>Download</Menu.Item>
        <Menu.Item icon={<IconLink />}>Link to</Menu.Item>
        <Menu.Item icon={<IconFavorite />}>Favorite</Menu.Item>
        <Menu.Separator />
        <Menu.Item icon={<IconDelete />}>Delete</Menu.Item>
      </Menu>
    </DataView>
  )
}

export function Status() {
  const view = useDataViewState()

  const content = useMemo(() => {
    switch (view.status) {
      case 'loading': {
        return <Spinner size={50} />
      }

      case 'ready': {
        return <p>Data View Content</p>
      }

      default: {
        return null
      }
    }
  }, [view.status])

  return (
    <DataView state={view}>
      <DataViewControls>
        <Button
          size="small"
          variant="adaptative-dark"
          onClick={() => view.setStatus({ type: 'ready' })}
        >
          Ready
        </Button>
        <Button
          size="small"
          variant="adaptative-dark"
          onClick={() => view.setStatus({ type: 'loading' })}
        >
          Loading
        </Button>
        <Button
          size="small"
          variant="adaptative-dark"
          onClick={() =>
            view.setStatus({ type: 'empty', message: 'The view is empty' })
          }
        >
          Empty
        </Button>
        <Button
          size="small"
          variant="adaptative-dark"
          onClick={() =>
            view.setStatus({ type: 'error', message: 'Something went wrong' })
          }
        >
          Error
        </Button>
        <Button
          size="small"
          variant="adaptative-dark"
          onClick={() =>
            view.setStatus({
              type: 'not-found',
              message: 'Your query result was not found',
            })
          }
        >
          Not found
        </Button>
      </DataViewControls>
      {content}
    </DataView>
  )
}
