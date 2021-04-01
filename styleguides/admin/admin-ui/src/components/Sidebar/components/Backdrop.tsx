import React, { Fragment } from 'react'
import { IconCaretSmall } from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'

import { Button } from '../../Button'
import { SidebarState } from '../hooks'
import { ItemSkeleton } from './Item/Skeleton'

/**
 * Components that acts as a spacer.
 */
export function SidebarBackdrop(props: SidebarBackdropProps) {
  const {
    state: {
      selectedItem,
      layout: { showToggle, hideToggle, reduced, toggleVisible, toggle },
    },
    loading = false,
  } = props

  const expandable = selectedItem?.expandable
  const active = expandable && !reduced

  return (
    <Fragment>
      <Box
        csx={{
          minWidth: expandable ? (reduced ? 16 : 200) : 0,
          transition: 'minWidth 200ms cubic-bezier(0.4, 0.14, 0.3, 1)',
          bg: active ? 'sidebar.light' : 'light.primary',
          borderRight: expandable ? 1 : 0,
          borderRightColor: 'mid.tertiary',
          borderRightStyle: 'solid',
        }}
        onMouseEnter={showToggle}
        onMouseLeave={hideToggle}
      >
        {loading && <ItemSkeleton />}
      </Box>

      <Button
        csx={{
          position: 'absolute',
          zIndex: 1,
          top: 82,
          left: expandable && reduced ? 60 : 244,
          cursor: 'pointer',
          border: '1px solid',
          borderRadius: '100%',
          borderColor: 'mid.tertiary',
          height: '1.5rem',
          width: '1.5rem',
          transition: 'display 125ms cubic-bezier(0.4, 0.14, 0.3, 1) 100ms',
          display: expandable && toggleVisible ? 'unset' : 'none',
          bg: 'light.primary',
          '&:hover': {
            bg: 'blue.secondary',
            borderColor: 'blue.secondary',
            '> div > svg': {
              color: 'blue',
            },
          },
        }}
        icon={
          <IconCaretSmall
            direction={reduced ? 'down' : 'up'}
            csx={{
              display: 'flex',
              justifyContent: 'center',
              transition: '125ms cubic-bezier(0.4, 0.14, 0.3, 1)',
              color: 'black',
              '> path': {
                strokeWidth: 2,
              },
            }}
          />
        }
        disabled={loading}
        onClick={toggle}
        onMouseEnter={showToggle}
        onMouseLeave={hideToggle}
      />
    </Fragment>
  )
}

export interface SidebarBackdropProps {
  state: SidebarState
  loading?: boolean
}
