import React, { Fragment } from 'react'
import { IconCaretSmall } from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'

import { Button } from '../../Button'
import { SidebarState } from '../hooks'
import { ItemSkeleton } from './Item/Skeleton'

const width = {
  expanded: '12.5rem',
  reduced: '1rem',
  hidden: '0rem',
}

const distance = {
  expanded: '15.25rem',
  reduced: '3.75rem',
}

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
          minWidth: selectedItem?.expandable
            ? reduced
              ? width.reduced
              : width.expanded
            : width.hidden,
          transition: 'min-width 200ms cubic-bezier(0.4, 0.14, 0.3, 1)',
          bg:
            selectedItem?.expandable && !reduced
              ? 'sidebar.light'
              : 'light.primary',
          borderRight: selectedItem?.expandable ? 1 : 0,
          borderRightColor: 'mid.tertiary',
          borderRightStyle: 'solid',
        }}
        onMouseEnter={showToggle}
        onMouseLeave={hideToggle}
      >
        {loading && <ItemSkeleton />}
      </Box>

      <Button
        title="toggle sidebar collapse"
        name="toggle sidebar collapse"
        csx={{
          left:
            selectedItem?.expandable && reduced
              ? distance.reduced
              : distance.expanded,
          opacity: selectedItem?.expandable && toggleVisible ? 1 : 0,
          position: 'absolute',
          zIndex: 1,
          top: '4.6875rem',
          cursor: 'pointer',
          border: '1px solid',
          borderRadius: '100%',
          borderColor: 'mid.tertiary',
          height: '1.5rem',
          width: '1.5rem',
          transition:
            'left 200ms cubic-bezier(0.4, 0.14, 0.3, 1), opacity 175ms cubic-bezier(0.4, 0.14, 0.3, 1)',
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
        disabled={loading || !selectedItem?.expandable}
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
