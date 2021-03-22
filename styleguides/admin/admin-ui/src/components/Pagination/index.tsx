import React, { MouseEventHandler } from 'react'
import { Flex } from '@vtex/admin-primitives'
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

export function Pagination(props: Props) {
  const {
    total,
    numberOfItemsFrom,
    numberOfItemsTo,
    textOf,
    textResults,
    onClickPrev,
    onClickNext,
    tooltipLabelPrev,
    tooltipLabelNext,
    loading,
  } = props

  const isPrevDisabled = numberOfItemsFrom <= 1
  const isNextDisabled = numberOfItemsTo >= total

  return (
    <Flex align="center">
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
          {numberOfItemsFrom} — {numberOfItemsTo} {textOf} {total} {textResults}
        </Text>
      )}
      <Tooltip label={tooltipLabelPrev}>
        <Button
          disabled={loading || isPrevDisabled}
          onClick={onClickPrev}
          csx={{ marginRight: '0.5rem', ...buttonCsx }}
          icon={<IconCaret direction="left" />}
        />
      </Tooltip>

      <Tooltip label={tooltipLabelNext}>
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

interface Props {
  total: string | number
  numberOfItemsFrom: string | number
  numberOfItemsTo: string | number
  textOf: string
  textResults: string
  onClickPrev?: MouseEventHandler<any>
  onClickNext?: MouseEventHandler<any>
  tooltipLabelPrev: string
  tooltipLabelNext: string
  loading?: boolean
}
