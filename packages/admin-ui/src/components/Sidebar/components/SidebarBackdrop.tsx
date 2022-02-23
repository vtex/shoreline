import type { Ref } from 'react'
import React, { Fragment, forwardRef } from 'react'
import { IconCaretRight } from '@vtex/phosphor-icons'
import { tag } from '@vtex/admin-ui-react'

import { Button } from '../../../button'
import type { SidebarState } from '../hooks/useSidebarState'
import { SidebarItemSkeleton } from './SidebarItemSkeleton'

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
 * Component that acts as a spacer
 */
export const SidebarBackdrop = forwardRef(function SidebarBackdrop(
  props: SidebarBackdropProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    state: {
      selectedItem,
      layout: { showToggle, hideToggle, reduced, toggleVisible, toggle },
    },
    loading = false,
  } = props

  return (
    <Fragment>
      <tag.div
        ref={ref}
        csx={{
          minWidth: selectedItem?.expandable
            ? reduced
              ? width.reduced
              : width.expanded
            : width.hidden,
          transition: 'min-width 200ms cubic-bezier(0.4, 0.14, 0.3, 1)',
          bg: '$secondary',
          borderRight: selectedItem?.expandable ? '$neutral' : 'none',
        }}
        onMouseEnter={showToggle}
        onMouseLeave={hideToggle}
      >
        {loading && <SidebarItemSkeleton />}
      </tag.div>

      <Button
        title="toggle sidebar collapse"
        name="toggle sidebar collapse"
        variant="tertiary"
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
          borderRadius: '100%',
          border: '$neutral',
          height: '1.5rem',
          width: '1.5rem',
          transition:
            'left 200ms cubic-bezier(0.4, 0.14, 0.3, 1), opacity 175ms cubic-bezier(0.4, 0.14, 0.3, 1)',
          bg: '$primary',
        }}
        icon={
          <IconCaretRight
            mirrored={!reduced}
            size="small"
            csx={{
              display: 'flex',
              justifyContent: 'center',
              transition: '125ms cubic-bezier(0.4, 0.14, 0.3, 1)',
              color: '$primary',
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
})

export interface SidebarBackdropProps {
  state: SidebarState
  loading?: boolean
}
