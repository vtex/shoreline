import React, { useMemo } from 'react'
import type { Meta } from '@storybook/react'
import {
  IconDelete,
  IconFavorite,
  IconImport,
  IconLink,
} from '@vtex/admin-ui-icons'

import { DataView, useDataViewState } from '../index'
import { DataViewControls } from '../components/DataViewControls'
import { ButtonGhost } from '../../ButtonGhost'
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
        <ButtonGhost>Export</ButtonGhost>
        <ButtonGhost>Import</ButtonGhost>
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
          <ButtonGhost as={ToolbarButton}>Export</ButtonGhost>
          <ButtonGhost as={ToolbarButton}>Import</ButtonGhost>
          <ToolbarItem>
            {(itemProps) => (
              <Menu state={menu}>
                <ButtonGhost as={MenuButton} {...itemProps}>
                  More
                </ButtonGhost>
                <MenuList aria-label="actions">
                  <MenuItem icon={<IconImport />}>Download</MenuItem>
                  <MenuItem icon={<IconLink />}>Link to</MenuItem>
                  <MenuItem icon={<IconFavorite />}>Favorite</MenuItem>
                  <MenuSeparator />
                  <MenuItem icon={<IconDelete />}>Delete</MenuItem>
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
        <ButtonGhost onClick={() => view.setStatus({ type: 'ready' })}>
          Ready
        </ButtonGhost>
        <ButtonGhost onClick={() => view.setStatus({ type: 'loading' })}>
          Loading
        </ButtonGhost>
        <ButtonGhost
          onClick={() =>
            view.setStatus({ type: 'empty', message: 'The view is empty' })
          }
        >
          Empty
        </ButtonGhost>
        <ButtonGhost
          onClick={() =>
            view.setStatus({ type: 'error', message: 'Something went wrong' })
          }
        >
          Error
        </ButtonGhost>
        <ButtonGhost
          onClick={() =>
            view.setStatus({
              type: 'not-found',
              message: 'Your query result was not found',
            })
          }
        >
          Not found
        </ButtonGhost>
      </DataViewControls>
      {content}
    </DataView>
  )
}
