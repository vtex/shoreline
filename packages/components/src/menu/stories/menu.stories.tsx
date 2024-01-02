import './style.css'
import React from 'react'
import {
  IconDotsThreeVertical,
  IconPencil,
  IconTrash,
  IconArchive,
  IconCaretDownSmall,
} from '@vtex/shoreline-icons'
import { Virtual, VirtualItem } from '@vtex/shoreline-primitives'

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
            Open <IconCaretDownSmall />
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
      <Stack horizontal space="5rem">
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
            <Button variant="primary" size="large">
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
            <IconButton variant="primary" label="more actions" size="large">
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
      </Stack>

      <Stack horizontal>
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
            <Button variant="tertiary" size="large">
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
            <IconButton variant="tertiary" label="more actions" size="large">
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
            Create promotion <IconCaretDownSmall />
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
            Create promotion <IconCaretDownSmall />
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
          <Button size="large" variant="primary">
            Create promotion <IconCaretDownSmall />
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
          <Button variant="tertiary" size="large">
            Create promotion <IconCaretDownSmall />
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
            Create promotion <IconCaretDownSmall />
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
            Create promotion <IconCaretDownSmall />
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

export function Virtualization() {
  return (
    <MenuProvider>
      <MenuTrigger asChild>
        <Button>Menu</Button>
      </MenuTrigger>
      <Menu>
        <Virtual
          dynamic
          count={5000}
          style={{
            width: `200px`,
          }}
        >
          <VirtualItem asChild>
            {({ index }) => {
              return <MenuItem>Item {index}</MenuItem>
            }}
          </VirtualItem>
        </Virtual>
      </Menu>
    </MenuProvider>
  )
}
