import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Skeleton } from '../skeleton'
import { EmptyState } from '../empty-state'
import { Slot } from '../slot'
import {
  IconMagnifyingGlass,
  IconPlus,
  IconWarningCircle,
} from '@vtex/shoreline-icons'
import { Heading } from '../heading'
import { Button } from '../button'
import { Text } from '../text'
import { messages } from './messages'
import { createMessageHook } from '@vtex/shoreline-primitives'

const useMessage = createMessageHook(messages)

export const CollectionView = forwardRef<HTMLDivElement, CollectionViewProps>(
  function CollectionMessage(props, ref) {
    const { status, children, onError, onEmpty, messages, ...otherProps } =
      props

    const getMessage = useMessage(messages)

    if (status === 'loading') {
      return <Skeleton data-collection-view-skeleton {...otherProps} />
    }

    if (status === 'ready') {
      return (
        <div
          data-sl-collection-view
          data-sl-collection-view-ready
          ref={ref}
          {...otherProps}
        >
          {children}
        </div>
      )
    }

    const heading = getMessage(`${status}-heading`)
    const description = getMessage(`${status}-description`)
    const action = getMessage(`${status}-action`)

    function handleAction() {
      switch (status) {
        case 'error':
          return onError?.()

        case 'empty':
          return onEmpty?.()
      }
    }

    return (
      <div data-sl-collection-view ref={ref} {...otherProps}>
        <EmptyState size="medium">
          <Slot name="illustration">{getIcon(status)}</Slot>
          <Heading>{heading}</Heading>
          {description && <Text>{description}</Text>}
          {action && (
            <Slot>
              <Button onClick={handleAction} variant="primary">
                {status === 'empty' && <IconPlus />}
                {action}
              </Button>
            </Slot>
          )}
        </EmptyState>
      </div>
    )
  }
)

function getIcon(status: CollectionStatus) {
  switch (status) {
    case 'error':
      return <IconWarningCircle color="var(--sl-color-red-8)" />

    case 'empty':
      return <IconPlus color="var(--sl-color-gray-8)" />

    case 'not-found':
      return <IconMagnifyingGlass color="var(--sl-color-gray-8)" />

    default:
      return <IconMagnifyingGlass color="var(--sl-color-gray-8)" />
  }
}

export type CollectionStatus =
  | 'ready'
  | 'error'
  | 'loading'
  | 'empty'
  | 'not-found'
  | 'unauthorized'

export interface CollectionViewProps extends ComponentPropsWithoutRef<'div'> {
  status: CollectionStatus
  onError?: () => void
  onEmpty?: () => void
  messages?: CollectionMessages
}

type CollectionMessages = Partial<{
  [key in CollectionMessagesKeys]: string
}>

type CollectionMessagesKeys =
  | 'not-found-heading'
  | 'not-found-description'
  | 'empty-heading'
  | 'empty-description'
  | 'empty-action'
  | 'error-heading'
  | 'error-description'
  | 'error-action'
  | 'unauthorized-heading'
  | 'unauthorized-description'
