import React from 'react'
import type { BoxProps } from '@vtex/admin-primitives'
import { Flex } from '@vtex/admin-primitives'
import { IconCaret } from '@vtex/admin-ui-icons'

import { Set } from '../Set'
import { Button } from '../Button'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import type { UsePaginationReturn } from './usePaginationState'

export function Pagination(props: PaginationProps) {
  const {
    state: { range, paginate, prevDisabled, nextDisabled, total },
    preposition = 'of',
    subject = 'results',
    prevLabel = 'Back',
    nextLabel = 'Next',
    loading,
    csx = {},
    ...boxProps
  } = props

  return (
    <Flex align="center" csx={csx} {...boxProps}>
      {!loading && (
        <Text
          feedback="secondary"
          variant="small"
          csx={{ marginRight: '1.25rem', whiteSpace: 'nowrap' }}
        >
          {range[0]} — {range[1]} {preposition} {total} {subject}
        </Text>
      )}
      <Set spacing={2}>
        <Tooltip label={prevLabel}>
          <Button
            disabled={loading || prevDisabled}
            onClick={() => paginate({ type: 'prev' })}
            variant="adaptative-dark"
            size="small"
            icon={<IconCaret direction="left" />}
          />
        </Tooltip>

        <Tooltip label={nextLabel}>
          <Button
            disabled={loading || nextDisabled}
            onClick={() => paginate({ type: 'next' })}
            variant="adaptative-dark"
            size="small"
            icon={<IconCaret direction="right" />}
          />
        </Tooltip>
      </Set>
    </Flex>
  )
}

interface PaginationProps extends BoxProps<'div'> {
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
