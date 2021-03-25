import React, { Fragment } from 'react'
import { Box } from '@vtex/admin-primitives'
import { IconSidebarCaret } from '@vtex/admin-ui-icons'

import { SCALES } from '../consts'
import { Button } from '../../Button'
import { SidebarState } from '../hooks'
import { Skeleton } from '../../Skeleton'

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

  return (
    <Fragment>
      <Box
        csx={{
          minWidth: expandable
            ? reduced
              ? '1rem'
              : SCALES.COLLAPSIBLE_AREA_WIDTH
            : '0rem',
          maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
          bg: !expandable || reduced ? 'light.primary' : 'sidebar.light',
          borderRight: expandable ? '1px solid' : '0px solid',
          borderColor: expandable ? 'mid.tertiary' : 'transparent',
          marginRight: expandable ? '0.25rem' : '0rem',
        }}
        onMouseEnter={showToggle}
        onMouseLeave={hideToggle}
      >
        {loading && <Skeleton />}
      </Box>

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
            transitionDuration: '.3s',
          }}
          icon={
            <IconSidebarCaret
              csx={{
                display: 'flex',
                justifyContent: 'center',
                transition: '0.3',
                transform: reduced ? 'rotate(180deg)' : 'rotate(0deg)',
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
