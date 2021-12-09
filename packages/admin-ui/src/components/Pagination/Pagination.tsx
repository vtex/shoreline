import type { ComponentPropsWithRef } from 'react'
import React, { Fragment } from 'react'
import { IconCaret } from '@vtex/admin-ui-icons'
import { jsx } from '@vtex/admin-ui-react'

import { Set } from '../Set'
import { Button } from '../Button'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import type { UsePaginationReturn } from './hooks/usePaginationState'

export const Pagination = jsx('div')(
  {
    display: 'flex',
    alignItems: 'center',
  },
  {
    options: [
      'subject',
      'preposition',
      'prevLabel',
      'nextLabel',
      'loading',
      'state',
    ],
    useOptions(options: PaginationOptions, props) {
      const {
        state: { range, paginate, prevDisabled, nextDisabled, total },
        preposition = 'of',
        subject = 'results',
        prevLabel = 'Back',
        nextLabel = 'Next',
        loading,
      } = options

      return {
        ...props,
        children: (
          <Fragment>
            {!loading && (
              <Text
                tone="secondary"
                variant="small"
                csx={{ marginRight: '1.25rem', whiteSpace: 'nowrap' }}
              >
                {range[0]} — {range[1]} {preposition} {total} {subject}
              </Text>
            )}
            <Set spacing={2}>
              <Tooltip label={prevLabel}>
                <Button
                  variant="adaptative-dark"
                  disabled={loading || prevDisabled}
                  onClick={() => paginate({ type: 'prev' })}
                  size="small"
                  icon={<IconCaret direction="left" />}
                />
              </Tooltip>

              <Tooltip label={nextLabel}>
                <Button
                  variant="adaptative-dark"
                  disabled={loading || nextDisabled}
                  onClick={() => paginate({ type: 'next' })}
                  size="small"
                  icon={<IconCaret direction="right" />}
                />
              </Tooltip>
            </Set>
          </Fragment>
        ),
      }
    },
  }
)

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
