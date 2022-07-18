import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { IconCaretRight, IconCaretLeft } from '@vtex/phosphor-icons'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Inline } from '../../inline'
import { Button } from '../../button'
import { Text } from '../Text'
import { Tooltip } from '../../tooltip'
import type { UsePaginationReturn } from './hooks/usePaginationState'

export const Pagination = createComponent<'div', PaginationOptions>((props) => {
  const {
    state: { range, paginate, prevDisabled, nextDisabled, total },
    preposition = 'of',
    subject = 'results',
    prevLabel = 'Back',
    nextLabel = 'Next',
    loading,
    ...restProps
  } = props

  return useElement('div', {
    baseStyle: {
      display: 'flex',
      alignItems: 'center',
    },
    ...restProps,
    children: (
      <Fragment>
        {!loading && (
          <Text
            tone="secondary"
            variant="detail"
            csx={{ marginRight: '1.25rem', whiteSpace: 'nowrap' }}
          >
            {range[0]} — {range[1]} {preposition} {total} {subject}
          </Text>
        )}
        <Inline align="center" noWrap>
          <Tooltip text={prevLabel}>
            <Button
              variant="neutralTertiary"
              disabled={loading || prevDisabled}
              onClick={() => paginate({ type: 'prev' })}
              icon={<IconCaretLeft />}
            />
          </Tooltip>

          <Tooltip text={nextLabel}>
            <Button
              variant="neutralTertiary"
              disabled={loading || nextDisabled}
              onClick={() => paginate({ type: 'next' })}
              icon={<IconCaretRight />}
            />
          </Tooltip>
        </Inline>
      </Fragment>
    ),
  })
})

export interface PaginationOptions {
  /**
   * String displayed in between the end of the range and the total amount of items
   * @default 'of'
   */
  preposition?: string
  /**
   * String displayed in the end of the component
   * @default 'results'
   */
  subject?: string
  /**
   * Label used in previous button tooltip
   * @default 'Back'
   */
  prevLabel?: string
  /**
   * Label used in next button tooltip
   * @default 'Next'
   */
  nextLabel?: string
  /**
   * Whether the table is loading or not
   * @default false
   */
  loading?: boolean
  /**
   * Object used to show and control pagination component
   */
  state: UsePaginationReturn
}

export type PaginationProps = ComponentPropsWithRef<typeof Pagination>
