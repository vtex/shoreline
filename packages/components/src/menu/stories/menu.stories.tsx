import './style.css'
import React from 'react'
import {
  IconCaretDown,
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
  IconArchive,
} from '@vtex/shoreline-icons'

import {
  Menu,
  MenuItem,
  MenuProvider,
  MenuSeparator,
  MenuTrigger,
} from '../index'
import { Button } from '../../button'
import { IconButton } from '../../icon-button'
import { Stack } from '../../stack'

export default {
  title: 'shoreline-components/menu',
}

export function Default() {
  return (
    <div className="base-story">
      <MenuProvider>
        <MenuTrigger>Open</MenuTrigger>
        <Menu>
          <MenuItem>New Tab</MenuItem>
          <MenuItem>New Item</MenuItem>
          <MenuSeparator />
          <MenuItem>Downloads</MenuItem>
        </Menu>
      </MenuProvider>
    </div>
  )
}

export function Composition() {
  return (
    <div className="base-story">
      <MenuProvider placement="bottom-end">
        <MenuTrigger asChild>
          <Button>
            Open <IconCaretDown />
          </Button>
        </MenuTrigger>
        <Menu asChild>
          <div style={{ border: '5px solid red' }}>
            <MenuItem>New Tab</MenuItem>
            <MenuItem>New Item</MenuItem>
            <MenuSeparator />
            <MenuItem asChild>
              <a href="htpps://vtex.com" target="_blank" rel="noreferrer">
                Downloads
              </a>
            </MenuItem>
          </div>
        </Menu>
      </MenuProvider>
    </div>
  )
}

export function MoreActions() {
  return (
    <Stack className="base-story">
      <Stack direction="row" space="5rem">
        <MenuProvider>
          <MenuTrigger asChild>
            <Button variant="primary">
              <IconDotsThreeVertical /> More actions
            </Button>
          </MenuTrigger>
          <Menu>
            <MenuItem>
              <IconPencil /> Edit
            </MenuItem>
            <MenuItem>
              <IconArchive />
              Archive
            </MenuItem>
            <MenuSeparator />
            <MenuItem critical>
              <IconTrash />
              Delete
            </MenuItem>
          </Menu>
        </MenuProvider>

        <MenuProvider>
          <MenuTrigger asChild>
            <IconButton variant="primary" label="more actions">
              <IconDotsThreeVertical />
            </IconButton>
          </MenuTrigger>
          <Menu>
            <MenuItem>
              <IconPencil /> Edit
            </MenuItem>
            <MenuItem>
              <IconArchive />
              Archive
            </MenuItem>
            <MenuSeparator />
            <MenuItem critical>
              <IconTrash />
              Delete
            </MenuItem>
          </Menu>
        </MenuProvider>

        <MenuProvider>
          <MenuTrigger asChild>
            <Button variant="primary" disabled>
              <IconDotsThreeVertical /> More actions
            </Button>
          </MenuTrigger>
          <Menu>
            <MenuItem>
              <IconPencil /> Edit
            </MenuItem>
            <MenuItem>
              <IconArchive />
              Archive
            </MenuItem>
            <MenuSeparator />
            <MenuItem critical>
              <IconTrash />
              Delete
            </MenuItem>
          </Menu>
        </MenuProvider>
      </Stack>

      <Stack direction="row">
        <MenuProvider>
          <MenuTrigger asChild>
            <Button variant="tertiary">
              <IconDotsThreeVertical /> More actions
            </Button>
          </MenuTrigger>
          <Menu>
            <MenuItem>
              <IconPencil /> Edit
            </MenuItem>
            <MenuItem>
              <IconArchive />
              Archive
            </MenuItem>
            <MenuSeparator />
            <MenuItem critical>
              <IconTrash />
              Delete
            </MenuItem>
          </Menu>
        </MenuProvider>

        <MenuProvider>
          <MenuTrigger asChild>
            <IconButton variant="tertiary" label="more actions">
              <IconDotsThreeVertical />
            </IconButton>
          </MenuTrigger>
          <Menu>
            <MenuItem>
              <IconPencil /> Edit
            </MenuItem>
            <MenuItem>
              <IconArchive />
              Archive
            </MenuItem>
            <MenuSeparator />
            <MenuItem critical>
              <IconTrash />
              Delete
            </MenuItem>
          </Menu>
        </MenuProvider>

        <MenuProvider>
          <MenuTrigger asChild>
            <Button variant="tertiary" disabled>
              <IconDotsThreeVertical /> More actions
            </Button>
          </MenuTrigger>
          <Menu>
            <MenuItem>
              <IconPencil /> Edit
            </MenuItem>
            <MenuItem>
              <IconArchive />
              Archive
            </MenuItem>
            <MenuSeparator />
            <MenuItem critical>
              <IconTrash />
              Delete
            </MenuItem>
          </Menu>
        </MenuProvider>
      </Stack>
    </Stack>
  )
}

export function CustomLabel() {
  return (
    <Stack className="base-story">
      <MenuProvider>
        <MenuTrigger asChild>
          <Button variant="primary">
            Create promotion <IconCaretDown />
          </Button>
        </MenuTrigger>
        <Menu>
          <MenuItem>Regular</MenuItem>
          <MenuItem>Buy together</MenuItem>
          <MenuItem>More for less</MenuItem>
          <MenuItem>Progressive discount</MenuItem>
        </Menu>
      </MenuProvider>
      <MenuProvider>
        <MenuTrigger asChild>
          <Button variant="tertiary">
            Create promotion <IconCaretDown />
          </Button>
        </MenuTrigger>
        <Menu>
          <MenuItem>Regular</MenuItem>
          <MenuItem>Buy together</MenuItem>
          <MenuItem>More for less</MenuItem>
          <MenuItem>Progressive discount</MenuItem>
        </Menu>
      </MenuProvider>
    </Stack>
  )
}

export function ItemVariants() {
  return (
    <Stack className="base-story">
      <MenuProvider>
        <MenuTrigger asChild>
          <Button variant="primary">
            Create promotion <IconCaretDown />
          </Button>
        </MenuTrigger>
        <Menu>
          <MenuItem>Regular</MenuItem>
          <MenuItem>Buy together</MenuItem>
          <MenuItem>More for less</MenuItem>
          <MenuItem disabled>Progressive discount</MenuItem>
        </Menu>
      </MenuProvider>
      <MenuProvider>
        <MenuTrigger asChild>
          <Button variant="tertiary">
            Create promotion <IconCaretDown />
          </Button>
        </MenuTrigger>
        <Menu>
          <MenuItem critical>Regular</MenuItem>
          <MenuItem critical>Buy together</MenuItem>
          <MenuItem critical>More for less</MenuItem>
          <MenuItem critical disabled>
            Progressive discount
          </MenuItem>
        </Menu>
      </MenuProvider>
    </Stack>
  )
}
