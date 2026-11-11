import { forwardRef } from '@vtex/shoreline'

import type { AIComposerHeaderProps } from './types'

/**
 * Neutral slot above the composer field. It only handles position: the field
 * overlaps it by `--sl-ai-composer-overlap` (the pill radius). It has no
 * background, border or padding, so the app draws whatever it needs inside it
 * and reads the variable as `padding-bottom` to stay clear of the pill.
 *
 * @status experimental
 * @example
 * <AIComposer>
 *   <AIComposerHeader>
 *     <AIComposerContextItems>…</AIComposerContextItems>
 *   </AIComposerHeader>
 *   <AIComposerField>…</AIComposerField>
 * </AIComposer>
 */
export const AIComposerHeader = forwardRef<
  HTMLDivElement,
  AIComposerHeaderProps
>(function AIComposerHeader(props, ref) {
  return <div ref={ref} data-sl-ai-composer-header {...props} />
})
