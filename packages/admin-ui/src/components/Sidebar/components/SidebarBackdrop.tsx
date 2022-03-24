import type { Ref } from 'react'
import React, { Fragment, forwardRef } from 'react'
import { IconCaretRight } from '@vtex/phosphor-icons'
import { tag } from '@vtex/admin-ui-react'

import { Button } from '../../Button'
import type { SidebarState } from '../hooks/useSidebarState'
import { SidebarItemSkeleton } from './SidebarItemSkeleton'
import { SCALES } from '../consts'

const width = {
  expanded: SCALES.COLLAPSIBLE_AREA_WIDTH,
  reduced: '1.25rem',
  hidden: '0rem',
}

const distance = {
  expanded: '15.125rem',
  reduced: '4.125rem',
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

  const showSidebarItemSkeleton =
    loading && selectedItem?.expandable && !reduced

  return (
    <Fragment>
      <tag.div
        ref={ref}
        csx={{
          maxWidth: SCALES.COLLAPSIBLE_AREA_WIDTH,
          minWidth: selectedItem?.expandable
            ? reduced
              ? width.reduced
              : width.expanded
            : width.hidden,
          transition: 'min-width 200ms cubic-bezier(0.4, 0.14, 0.3, 1)',
          bg: '$secondary',
          borderRight: selectedItem?.expandable ? '$neutral' : 'none',
        }}
      >
        {showSidebarItemSkeleton && <SidebarItemSkeleton />}
      </tag.div>

      {!loading ? (
        <tag.div
          csx={{
            position: 'absolute',
            zIndex: 9999,
            top: '4.85rem',
            height: '1.75rem',
            width: '1.75rem',
            bg: '$primary',
            left:
              selectedItem?.expandable && reduced
                ? distance.reduced
                : distance.expanded,
            borderRadius: '100%',
            transition:
              'left 200ms cubic-bezier(0.4, 0.14, 0.3, 1), opacity 150ms cubic-bezier(0.4, 0.14, 0.3, 1)',
            opacity: selectedItem?.expandable && toggleVisible ? 1 : 0,
          }}
        >
          <Button
            title="toggle sidebar collapse"
            name="toggle sidebar collapse"
            variant="adaptative-dark"
            csx={{
              borderRadius: '100%',
              border: '$neutral',
              height: '100%',
              width: '100%',
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
                }}
              />
            }
            disabled={loading || !selectedItem?.expandable}
            onClick={toggle}
            onMouseEnter={showToggle}
            onMouseLeave={hideToggle}
          />
        </tag.div>
      ) : null}
    </Fragment>
  )
})

export interface SidebarBackdropProps {
  state: SidebarState
  loading?: boolean
}
