import React, { Fragment, ReactNode } from 'react'
import { Meta } from '@storybook/react'
import {
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
  useDialogState,
} from 'reakit/Dialog'
import { Box } from '@vtex/admin-primitives'

import {
  unstableSearchBox as SearchBox,
  unstableUseSearchBoxState as useSearchBoxState,
} from './index'
import { IconSearch } from '@vtex/admin-ui-icons'
import { Paragraph } from '../Paragraph'
import { useSystem, darken } from '@vtex/admin-core'

export default {
  title: 'admin-ui/SearchBox',
} as Meta

export function Basic() {
  const state = useSearchBoxState({
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

export function ScrollTest() {
  const state = useSearchBoxState({
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

interface ClassNamesProps {
  children: (params: {
    disclosure: string
    backdrop: string
    dialog: string
  }) => ReactNode
}

function ClassNames(props: ClassNamesProps) {
  const { children } = props
  const { cn } = useSystem()
  const disclosure = cn({
    width: 224,
    height: 32,
    bg: 'light.secondary',
    color: 'dark.secondary',
    borderRadius: 4,
    text: 'body',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    'svg + p': {
      marginLeft: 2,
    },
    cursor: 'pointer',
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
    },
    ':hover': {
      bg: darken('light.secondary', 0.02),
    },
    ':active': {
      bg: darken('light.secondary', 0.03),
    },
  })

  const dialog = cn({
    position: 'absolute',
    top: 12,
    width: 680,
    left: '50%',
    marginLeft: -340,
    input: {
      fontFamily: 'sans',
    },
    ':focus': {
      outline: 'none',
    },
  })

  const backdrop = cn({
    bg: 'transparent',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 9999,
  })

  return (
    <Fragment>
      {children({
        disclosure,
        backdrop,
        dialog,
      })}
    </Fragment>
  )
}

export function WithinADialog() {
  const dialogState = useDialogState()
  const state = useSearchBoxState({
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
    <ClassNames>
      {({ disclosure, dialog, backdrop }) => (
        <>
          <DialogDisclosure {...dialogState} className={disclosure}>
            <IconSearch />
            <Paragraph>Search VTEX</Paragraph>
          </DialogDisclosure>
          <DialogBackdrop {...dialogState} className={backdrop}>
            <Dialog
              {...dialogState}
              aria-label="Search modal"
              className={dialog}
            >
              <SearchBox state={state}>
                <SearchBox.Input />
                <SearchBox.Menu>
                  <SearchBox.Suggestion />
                </SearchBox.Menu>
                <SearchBox.Footer />
              </SearchBox>
            </Dialog>
          </DialogBackdrop>
        </>
      )}
    </ClassNames>
  )
}
