import React, { MouseEventHandler } from 'react'
import { BoxProps, Flex } from '@vtex/admin-primitives'
import { Set } from '../Set'
import { IconCaret } from '@vtex/admin-ui-icons'
import { Button } from '../Button'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'

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
    range,
    preposition,
    subject,
    onClickPrev,
    onClickNext,
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
            onClick={onClickPrev}
            csx={buttonCsx}
            icon={<IconCaret direction="left" />}
          />
        </Tooltip>

        <Tooltip label={nextLabel}>
          <Button
            disabled={loading || isNextDisabled}
            onClick={onClickNext}
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
   * Range of displayed items in current table page
   */
  range: [number, number]
  /**
   * String displayed in between the end of the range and the total amount of items
   */
  preposition: string
  /**
   * String displayed in the end of the component
   */
  subject: string
  /**
   * Function fired when previous button is clicked
   */
  onClickPrev?: MouseEventHandler<any>
  /**
   * Function fired when next button is clicked
   */
  onClickNext?: MouseEventHandler<any>
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
}
