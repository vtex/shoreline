import React, { useMemo } from 'react'
import type { Meta } from '@storybook/react'
import {
  IconTrash,
  IconHeart,
  IconArrowLineDown,
  IconLink,
} from '@vtex/phosphor-icons'

import { DataView, useDataViewState } from '../index'
import { DataViewControls } from '../components/DataViewControls'
import { Button } from '../../../button'
import { Spinner } from '../../Spinner'
import {
  Toolbar,
  ToolbarButton,
  ToolbarItem,
  useToolbarState,
} from '../../Toolbar'
import {
  useMenuState,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuSeparator,
} from '../../Menu'

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
        <Button variant="neutralTertiary">Export</Button>
        <Button variant="neutralTertiary">Import</Button>
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
          <Button variant="neutralTertiary" as={ToolbarButton}>
            Export
          </Button>
          <Button variant="neutralTertiary" as={ToolbarButton}>
            Import
          </Button>
          <ToolbarItem>
            {(itemProps) => (
              <Menu state={menu}>
                <Button
                  variant="neutralTertiary"
                  as={MenuButton}
                  {...itemProps}
                >
                  More
                </Button>
                <MenuList aria-label="actions">
                  <MenuItem icon={<IconArrowLineDown />}>Download</MenuItem>
                  <MenuItem icon={<IconLink />}>Link to</MenuItem>
                  <MenuItem icon={<IconHeart />}>Favorite</MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<IconTrash />}>Delete</MenuItem>
                </MenuList>
              </Menu>
            )}
          </ToolbarItem>
        </Toolbar>
      </DataViewControls>

      <p>Data View content</p>
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
          variant="neutralTertiary"
          onClick={() => view.setStatus({ type: 'ready' })}
        >
          Ready
        </Button>
        <Button
          variant="neutralTertiary"
          onClick={() => view.setStatus({ type: 'loading' })}
        >
          Loading
        </Button>
        <Button
          variant="neutralTertiary"
          onClick={() =>
            view.setStatus({ type: 'empty', message: 'The view is empty' })
          }
        >
          Empty
        </Button>
        <Button
          variant="neutralTertiary"
          onClick={() =>
            view.setStatus({ type: 'error', message: 'Something went wrong' })
          }
        >
          Error
        </Button>
        <Button
          variant="neutralTertiary"
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
