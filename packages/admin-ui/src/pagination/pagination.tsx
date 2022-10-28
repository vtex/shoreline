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

  const sizeVariant = resolveSize(total)

  const formatMessage = useMessageFormatter(messages)

  const currentPageLabel =
    numberOfPages <= 1 ? total : `${firstPosition} — ${lastPosition}`

  return useElement('div', {
    ...restProps,
    children: (
      <Inline align="center" hSpace="$space-2" spaceInside noWrap>
        {loading ? (
          <Skeleton csx={style.loading} />
        ) : (
          <Text
            tone="secondary"
            variant="detail"
            csx={{ ...style.label, ...style.variants({ size: sizeVariant }) }}
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
  });
})

function resolveSize(total: number) {
  if (total < 1000) return 'small'
  if (total < 10000) return 'medium'
  if (total < 100000) return 'large'

  return 'xlarge'
}

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
