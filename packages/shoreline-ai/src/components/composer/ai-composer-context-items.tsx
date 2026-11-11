import { forwardRef } from '@vtex/shoreline'

import type { AIComposerContextItemsProps } from './types'

/**
 * Band of context items above the composer field. Place it as a sibling
 * before `AIComposerField`.
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
  return <ul ref={ref} data-sl-ai-composer-context-items {...props} />
})
