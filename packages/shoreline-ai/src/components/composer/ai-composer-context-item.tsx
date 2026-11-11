import { useId } from 'react'
import { IconButton, IconXSmall, Text } from '@vtex/shoreline'
import { forwardRef } from '@vtex/shoreline'

import { IconPushPin } from '../icons/icon-push-pin'
import { useComposerMessagesContext } from './composer-messages-context'
import type { AIComposerContextItemProps } from './types'

/**
 * One removable context item. Long text truncates with an ellipsis.
 *
 * @status experimental
 * @example
 * <AIComposerContextItem onRemove={() => remove(id)}>Order 1042</AIComposerContextItem>
 */
export const AIComposerContextItem = forwardRef<
  HTMLLIElement,
  AIComposerContextItemProps
>(function AIComposerContextItem(props, ref) {
  const { icon, onRemove, children, ...liProps } = props
  const getMessage = useComposerMessagesContext()
  const labelId = useId()

  return (
    <li ref={ref} data-sl-ai-composer-context-item {...liProps}>
      <span data-sl-ai-composer-context-item-icon>
        {icon ?? <IconPushPin />}
      </span>
      <Text
        id={labelId}
        variant="caption1"
        title={typeof children === 'string' ? children : undefined}
      >
        {children}
      </Text>
      {onRemove && (
        <IconButton
          variant="tertiary"
          label={getMessage('removeContext')}
          aria-describedby={labelId}
          onClick={onRemove}
          data-sl-ai-composer-context-item-remove
        >
          <IconXSmall />
        </IconButton>
      )}
    </li>
  )
})
