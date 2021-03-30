import React, { Fragment, useEffect } from 'react'
import { IconCaretSmall } from '@vtex/admin-ui-icons'
import { useSystem } from '@vtex/admin-core'
import { motion, useMotionValue } from 'framer-motion'

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

  const expandable = selectedItem?.expandable ?? loading
  const { cn } = useSystem()

  const width = useMotionValue(
    selectedItem?.expandable ? (reduced ? 16 : 200) : 0
  )

  useEffect(() => {
    if (selectedItem?.expandable) {
      if (reduced) width.set(16)
      else width.set(256)
    } else width.set(0)
  }, [reduced, selectedItem])

  return (
    <Fragment>
      <motion.div
        style={{
          width,
        }}
        className={cn({
          bg: !expandable || reduced ? 'light.primary' : 'sidebar.light',
          borderRight: expandable ? '1px solid' : '0px solid',
          borderColor: expandable ? 'mid.tertiary' : 'transparent',
          marginRight: expandable ? '0.25rem' : '0rem',
          transition: 'callout',
        })}
        onMouseEnter={showToggle}
        onMouseLeave={hideToggle}
      >
        {loading && <ItemSkeleton />}
      </motion.div>

      {expandable && (
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
            opacity: toggleVisible ? 1 : 0,
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
      )}
    </Fragment>
  )
}

export interface SidebarBackdropProps {
  state: SidebarState
  loading?: boolean
}
