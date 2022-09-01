import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { IconCaretRight, IconCaretLeft } from '@vtex/phosphor-icons'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Inline } from '../inline'
import { Button } from '../button'
import { Flex } from '../flex'
import { Text } from '../components/Text'
import { useMessageFormatter } from '../i18n'
import { messages } from './pagination.i18n'
import type { UsePaginationReturn } from './hooks/use-pagination-state'
import * as style from './pagination.style'
import { Skeleton } from '../skeleton'

export const Pagination = createComponent<'div', PaginationOptions>((props) => {
  const {
    state: {
      range: [firstPosition, lastPosition],
      paginate,
      prevDisabled,
      nextDisabled,
      total,
      numberOfPages,
    },
    loading,
    ...restProps
  } = props

  const formatMessage = useMessageFormatter(messages)

  const hasOnlyOnePage = numberOfPages === 1
  const currentPageLabel = hasOnlyOnePage
    ? total
    : `${firstPosition} — ${lastPosition}`

  return useElement('div', {
    ...restProps,
    children: (
      <Inline align="center" hSpace="$m" spaceInside noWrap>
        {loading ? (
          <Skeleton csx={style.loading} />
        ) : (
          <Text tone="secondary" variant="detail" csx={style.label}>
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
            onClick={() => paginate({ type: 'prev' })}
            icon={<IconCaretLeft />}
          />

          <Button
            aria-label={formatMessage('nextLabel')}
            variant="neutralTertiary"
            disabled={loading || nextDisabled}
            onClick={() => paginate({ type: 'next' })}
            icon={<IconCaretRight />}
          />
        </Flex>
      </Inline>
    ),
  })
})

export interface PaginationOptions {
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
