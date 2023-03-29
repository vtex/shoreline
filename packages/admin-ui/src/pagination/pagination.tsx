import type { ComponentPropsWithRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { IconCaretRight, IconCaretLeft } from '@vtex/phosphor-icons'

import { Inline } from '../inline'
import { Button } from '../button'
import { Flex } from '../flex'
import { Text } from '../components/Text'
import { useMessageFormatter } from '../i18n'
import { messages } from './pagination.i18n'
import type { UsePaginationReturn } from './hooks/use-pagination-state'
import { Skeleton } from '../skeleton'
import { labelTheme, loadingTheme } from './pagination.css'

export const Pagination = forwardRef(function Pagination(
  props: PaginationProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    state: {
      range: [firstPosition, lastPosition],
      paginate,
      prevDisabled,
      nextDisabled,
      total,
      numberOfPages,
      onNextPage,
      onPrevPage,
    },
    loading,
    ...htmlProps
  } = props

  const sizeVariant = resolveSize(total)

  const formatMessage = useMessageFormatter(messages)

  const currentPageLabel =
    numberOfPages <= 1 ? total : `${firstPosition} — ${lastPosition}`

  return (
    <div ref={ref} {...htmlProps}>
      <Inline align="center" hSpace="$space-2" spaceInside noWrap>
        {loading ? (
          <Skeleton className={loadingTheme} />
        ) : (
          <Text
            tone="secondary"
            variant="detail"
            data-size={sizeVariant}
            className={labelTheme}
          >
            {formatMessage('pagination', {
              currentPage: currentPageLabel,
              total,
            })}
          </Text>
        )}

        <Flex align="center">
          <Button
            aria-label={formatMessage('prevLabel')}
            variant="neutralTertiary"
            disabled={loading || prevDisabled}
            onClick={() => {
              onPrevPage?.()
              paginate({ type: 'prev' })
            }}
            icon={<IconCaretLeft />}
          />

          <Button
            aria-label={formatMessage('nextLabel')}
            variant="neutralTertiary"
            disabled={loading || nextDisabled}
            onClick={() => {
              onNextPage?.()
              paginate({ type: 'next' })
            }}
            icon={<IconCaretRight />}
          />
        </Flex>
      </Inline>
    </div>
  )
})

function resolveSize(total: number) {
  if (total < 1000) return 'small'
  if (total < 10000) return 'medium'
  if (total < 100000) return 'large'

  return 'xlarge'
}

export type PaginationProps = ComponentPropsWithRef<'div'> & {
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
