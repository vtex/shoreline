import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { IconCaretSmall } from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'

import { Button } from '../../Button'
import { Item, SidebarState } from '../hooks'
import { ItemSkeleton } from './Item/Skeleton'

const laziness = 120

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

  const expandable = selectedItem?.expandable
  const active = expandable && !reduced
  const { minWidth, left } = useLazyMeasures({
    reduced,
    selectedItem,
  })

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
          left,
          opacity: expandable && toggleVisible ? 1 : 0,
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
        disabled={loading || !expandable}
        onClick={toggle}
        onMouseEnter={showToggle}
        onMouseLeave={hideToggle}
      />
    </Fragment>
  )
}

interface UseLazyMeasuresParams {
  reduced: boolean
  selectedItem: Item | null
}

function useLazyMeasures(params: UseLazyMeasuresParams) {
  const { reduced, selectedItem } = params
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

  const left = useMemo(() => {
    return lazySelectedItem?.expandable && lazyReduced
      ? distance.reduced
      : distance.expanded
  }, [lazySelectedItem, lazyReduced])

  return {
    minWidth,
    left,
  }
}

export interface SidebarBackdropProps {
  state: SidebarState
  loading?: boolean
}
