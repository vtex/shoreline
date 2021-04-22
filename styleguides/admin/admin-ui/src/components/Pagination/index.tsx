import React from 'react'
import { BoxProps, Flex } from '@vtex/admin-primitives'
import { Set } from '../Set'
import { IconCaret } from '@vtex/admin-ui-icons'
import { Button } from '../Button'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { UsePaginationReturn } from './usePaginationState'

export function Pagination(props: PaginationProps) {
  const {
    total,
    state: { range, paginate },
    preposition = 'of',
    subject = 'results',
    prevLabel = 'Back',
    nextLabel = 'Next',
    loading,
    csx = {},
    ...boxProps
  } = props

  const isPrevDisabled = range[0] <= 1
  const isNextDisabled = range[1] >= total
  const displayedStartOfRange = range[0] <= total ? range[0] : total
  const displayedEndOfRange = range[1] <= total ? range[1] : total

  return (
    <Flex align="center" csx={csx} {...boxProps}>
      {!loading && (
        <Text
          feedback="secondary"
          variant="small"
          csx={{ marginRight: '1.25rem' }}
        >
          {displayedStartOfRange} — {displayedEndOfRange} {preposition} {total}{' '}
          {subject}
        </Text>
      )}
      <Set spacing={2}>
        <Tooltip label={prevLabel}>
          <Button
            disabled={loading || isPrevDisabled}
            onClick={() => paginate('prev')}
            variant="adaptative-dark"
            size="small"
            icon={<IconCaret direction="left" />}
          />
        </Tooltip>

        <Tooltip label={nextLabel}>
          <Button
            disabled={loading || isNextDisabled}
            onClick={() => paginate('next')}
            variant="adaptative-dark"
            size="small"
            icon={<IconCaret direction="right" />}
          />
        </Tooltip>
      </Set>
    </Flex>
  )
}

export * from './usePaginationState'

interface PaginationProps extends BoxProps<'div'> {
  /**
   * Total amount of items
   */
  total: number
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
