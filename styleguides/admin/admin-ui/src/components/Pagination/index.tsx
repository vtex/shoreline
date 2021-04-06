import React from 'react'
import { BoxProps, Flex } from '@vtex/admin-primitives'
import { Set } from '../Set'
import { IconCaret } from '@vtex/admin-ui-icons'
import { Button } from '../Button'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { UsePaginationReturn } from './usePagination'

const buttonCsx = {
  color: 'dark.secondary',
  bg: 'transparent',
  ':hover': {
    bg: 'light.secondary',
  },
  ':active': {
    color: 'blue',
    bg: 'light.secondary',
  },
  ':disabled': {
    bg: 'transparent',
    color: 'mid.primary',
  },
}

export function Pagination(props: PaginationProps) {
  const {
    total,
    pagination: {
      state: { range },
      paginate,
    },
    preposition,
    subject,
    prevLabel,
    nextLabel,
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
            csx={buttonCsx}
            icon={<IconCaret direction="left" />}
          />
        </Tooltip>

        <Tooltip label={nextLabel}>
          <Button
            disabled={loading || isNextDisabled}
            onClick={() => paginate('next')}
            csx={buttonCsx}
            icon={<IconCaret direction="right" />}
          />
        </Tooltip>
      </Set>
    </Flex>
  )
}

interface PaginationProps extends BoxProps<'div'> {
  /**
   * Total amount of items
   */
  total: number
  /**
   * String displayed in between the end of the range and the total amount of items
   */
  preposition: string
  /**
   * String displayed in the end of the component
   */
  subject: string
  /**
   * Label used in previous button tooltip
   */
  prevLabel: string
  /**
   * Label used in next button tooltip
   */
  nextLabel: string
  /**
   * Whether the table is loading or not
   */
  loading?: boolean
  /**
   * Object used to show and control pagination component
   */
  pagination: UsePaginationReturn
}
