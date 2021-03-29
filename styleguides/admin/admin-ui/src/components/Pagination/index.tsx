import React, { MouseEventHandler } from 'react'
import { BoxProps, Flex } from '@vtex/admin-primitives'
import { IconCaret } from '@vtex/admin-ui-icons'
import { Button } from '../Button'
import { Text } from '../Text'
import { Tooltip } from '../Tooltip'
import { StyleProp } from 'styleguides/admin/styles/dist'

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
    csx,
    ...boxProps
  } = props

  const isPrevDisabled = range[0] <= 1
  const isNextDisabled = range[1] >= total
  const displayedEndOfRange = range[1] <= total ? range[1] : total

  return (
    <Flex align="center" csx={{ ...csx }} {...boxProps}>
      {!loading && (
        <Text
          csx={{
            marginRight: '1.25rem',
            fontSize: '0.75rem',
            lineHeight: '1.125rem',
            color: 'dark.secondary',
            fontWeight: 'normal',
          }}
        >
          {range[0]} — {displayedEndOfRange} {preposition} {total} {subject}
        </Text>
      )}
      <Tooltip label={prevLabel}>
        <Button
          disabled={loading || isPrevDisabled}
          onClick={onClickPrev}
          csx={{ marginRight: '0.5rem', ...buttonCsx }}
          icon={<IconCaret direction="left" />}
        />
      </Tooltip>

      <Tooltip label={nextLabel}>
        <Button
          disabled={loading || isNextDisabled}
          onClick={onClickNext}
          csx={{ marginLeft: '0.5rem', ...buttonCsx }}
          icon={<IconCaret direction="right" />}
        />
      </Tooltip>
    </Flex>
  )
}

interface PaginationProps extends BoxProps<'div'> {
  total: string | number
  range: [string | number, string | number]
  preposition: string
  subject: string
  onClickPrev?: MouseEventHandler<any>
  onClickNext?: MouseEventHandler<any>
  prevLabel: string
  nextLabel: string
  loading?: boolean
  csx?: StyleProp
}
