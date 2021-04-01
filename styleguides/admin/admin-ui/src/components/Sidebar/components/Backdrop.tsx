import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { IconCaretSmall } from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'

import { Button } from '../../Button'
import { SidebarState } from '../hooks'
import { ItemSkeleton } from './Item/Skeleton'

const laziness = 120

const width = {
  expanded: 200,
  reduced: 16,
  hidden: 0,
}
const distance = {
  expanded: 244,
  reduced: 60,
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

  const expandable = selectedItem?.expandable
  const active = expandable && !reduced
  const [lazyReduced, setLazyReduced] = useState(reduced)
  const [lazySelectedItem, setLazySelectedItem] = useState(selectedItem)

  useEffect(
    function lazilyReduce() {
      if (reduced) {
        setTimeout(() => {
          setLazyReduced(reduced)
        }, laziness)
      } else {
        setLazyReduced(reduced)
      }
    },
    [reduced]
  )

  useEffect(
    function lazilySelect() {
      if (selectedItem?.expandable) {
        setLazySelectedItem(selectedItem)
      } else {
        setTimeout(() => {
          setLazySelectedItem(selectedItem)
        }, laziness)
      }
    },
    [selectedItem]
  )

  const minWidth = useMemo(() => {
    return lazySelectedItem?.expandable
      ? lazyReduced
        ? width.reduced
        : width.expanded
      : width.hidden
  }, [lazySelectedItem, lazyReduced])

  return (
    <Fragment>
      <Box
        csx={{
          minWidth,
          transition: 'min-width 200ms cubic-bezier(0.4, 0.14, 0.3, 1)',
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
          left: expandable && reduced ? distance.reduced : distance.expanded,
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
