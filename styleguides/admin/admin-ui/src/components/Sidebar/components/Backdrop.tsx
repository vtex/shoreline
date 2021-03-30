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

  return (
    <Fragment>
      <Box
        csx={{
          width: 1,
          bg:
            !selectedItem?.expandable || reduced
              ? 'light.primary'
              : 'sidebar.light',
          transition: 'transform 240ms cubic-bezier(0.4, 0.14, 0.3, 1)',
          willChange: 'transform',
          transform: `scaleX(${
            selectedItem?.expandable ? (reduced ? 16 : 200) : 0
          })`,
          transformOrigin: 'left',
          zIndex: -1,
        }}
        onMouseEnter={showToggle}
        onMouseLeave={hideToggle}
      >
        {loading && <ItemSkeleton />}
      </Box>
      <Button
        csx={{
          position: 'relative',
          zIndex: 1,
          left: '0.5em',
          marginLeft: '-1.5rem',
          top: '1.2rem',
          cursor: 'pointer',
          border: '1px solid',
          borderRadius: '100%',
          borderColor: 'mid.tertiary',
          height: '1.5rem',
          width: '1.5rem',
          transition: '0.3',
          backgroundColor: 'light.primary',
          '&:hover': {
            backgroundColor: 'blue.secondary',
            borderColor: 'blue.secondary',
            '> div > svg': {
              color: 'blue',
            },
          },
          opacity: selectedItem?.expandable && toggleVisible ? 1 : 0,
          transitionDuration: 'pop',
        }}
        icon={
          <IconCaretSmall
            direction={reduced ? 'down' : 'up'}
            csx={{
              display: 'flex',
              justifyContent: 'center',
              transition: '0.3',
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
