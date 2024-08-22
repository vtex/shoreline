import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import {
  IconMagnifyingGlass,
  IconPlus,
  IconPlusCircle,
  IconProhibit,
  IconWarningCircle,
} from '../../icons'
import { Button } from '../button'
import {
  EmptyState,
  EmptyStateActions,
  EmptyStateIllustration,
} from '../empty-state'
import { Heading } from '../heading'
import { createMessageHook } from '../locale'
import { Skeleton } from '../skeleton'
import { Text } from '../text'
import { messages } from './messages'

const useMessage = createMessageHook(messages)

/**
 * A collection view is a component that renders a collection based on its status
 * @status stable
 * @example
 * <Collection>
 *    <CollectionView status="loading" />
 * </Collection>
 */
export const CollectionView = forwardRef<HTMLDivElement, CollectionViewProps>(
  function CollectionMessage(props, ref) {
    const { status, children, onError, onEmpty, messages, ...otherProps } =
      props

    const getMessage = useMessage(messages)

    if (status === 'loading') {
      return (
        <div data-sl-collection-view-skeleton>
          <Skeleton {...otherProps} />
        </div>
      )
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

    const handleActionByStatus: Record<string, (() => void) | undefined> = {
      error: onError,
      empty: onEmpty,
    }
    const handleAction = handleActionByStatus[status]
    const heading = getMessage(`${status}-heading`)
    const description = getMessage(`${status}-description`)
    const action = handleAction && getMessage(`${status}-action`)

    const actionVariant = status === 'empty' ? 'primary' : 'secondary'

    return (
      <div data-sl-collection-view ref={ref} {...otherProps}>
        <EmptyState size="large">
          <EmptyStateIllustration data-sl-collection-view-illustration>
            {getIcon(status)}
          </EmptyStateIllustration>
          <Heading
            data-sl-collection-view-heading
            style={{ textAlign: 'center' }}
          >
            {heading}
          </Heading>
          {description && (
            <Text data-sl-collection-view-description>{description}</Text>
          )}
          {action && (
            <EmptyStateActions>
              <Button
                data-sl-collection-view-action
                onClick={handleAction}
                variant={actionVariant}
              >
                {status === 'empty' && <IconPlus />}
                {action}
              </Button>
            </EmptyStateActions>
          )}
        </EmptyState>
      </div>
    )
  }
)

function getIcon(status: CollectionViewOptions['status']) {
  switch (status) {
    case 'error':
      return <IconWarningCircle color="var(--sl-color-red-8)" />

    case 'empty':
      return <IconPlusCircle color="var(--sl-color-gray-8)" />

    case 'not-found':
      return <IconMagnifyingGlass color="var(--sl-color-gray-8)" />

    default:
      return <IconProhibit color="var(--sl-color-gray-8)" />
  }
}

export interface CollectionViewOptions {
  /**
   * Represents the status of a collection and indicates what should be rendered
   * @default 'ready'
   */
  status: 'ready' | 'error' | 'loading' | 'empty' | 'not-found' | 'unauthorized'
  /**
   * On status error action callback
   */
  onError?: () => void
  /**
   * On status empty action callback
   */
  onEmpty?: () => void
  /**
   * Collection internal messages
   */
  messages?: CollectionMessages
}

export type CollectionViewProps = CollectionViewOptions &
  ComponentPropsWithoutRef<'div'>

type CollectionMessages = Partial<{
  [key in CollectionMessagesKeys]: string
}>

/**
 * Collection internal messages intl keys
 */
type CollectionMessagesKeys =
  | 'not-found-heading'
  | 'not-found-description'
  | 'empty-heading'
  | 'empty-description'
  | 'empty-action'
  | 'error-heading'
  | 'error-action'
  | 'unauthorized-heading'
  | 'unauthorized-description'
