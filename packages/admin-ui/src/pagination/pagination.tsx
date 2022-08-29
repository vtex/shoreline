import type { ComponentPropsWithRef } from 'react'
import React from 'react'
import { IconCaretRight, IconCaretLeft } from '@vtex/phosphor-icons'
import { createComponent, useElement } from '@vtex/admin-ui-react'

import { Inline } from '../inline'
import { Button } from '../button'
import { Text } from '../components/Text'
import { useMessageFormatter } from '../i18n'
import { messages } from './pagination.i18n'
import type { UsePaginationReturn } from './hooks/use-pagination-state'
import * as style from './pagination.style'
import { Skeleton } from '../components/Skeleton'

export const Pagination = createComponent<'div', PaginationOptions>((props) => {
  const {
    state: {
      range,
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
    ? range[1]
    : `${range[0]} — ${range[1]}`

  return useElement('div', {
    ...restProps,
    children: (
      <Inline align="center" hSpace="$m" spaceInside noWrap>
        {loading ? (
          <Skeleton csx={{ height: '0.75rem', width: '4rem' }} />
        ) : (
          <Text tone="secondary" variant="detail" csx={style.label}>
            {currentPageLabel} {formatMessage('preposition')} {total}
          </Text>
        )}
        <Inline align="center" noWrap spaceInside>
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
        </Inline>
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
