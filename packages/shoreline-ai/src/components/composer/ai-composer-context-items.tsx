import { Children } from 'react'
import { forwardRef } from '@vtex/shoreline'

import type { AIComposerContextItemsProps } from './types'

/**
 * Band of context items. Place it inside `AIComposerHeader`, before
 * `AIComposerField`. It renders nothing when it has no children.
 *
 * @status experimental
 * @example
 * <AIComposerContextItems>
 *   <AIComposerContextItem onRemove={remove}>Order 1042</AIComposerContextItem>
 * </AIComposerContextItems>
 */
export const AIComposerContextItems = forwardRef<
  HTMLUListElement,
  AIComposerContextItemsProps
>(function AIComposerContextItems(props, ref) {
  if (Children.toArray(props.children).length === 0) return null

  return <ul ref={ref} data-sl-ai-composer-context-items {...props} />
})
