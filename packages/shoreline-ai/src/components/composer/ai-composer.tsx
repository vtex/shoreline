import { ComposerPrimitive, useAuiState } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline'

import { ComposerMessagesProvider } from './composer-messages-context'
import { AIComposerSkeleton } from './ai-composer-skeleton'
import type { AIComposerProps } from './types'

/**
 * Root composer form. It sends the draft and the attachments of the provider.
 *
 * @status experimental
 * @example
 * <AIComposer layout="inline">
 *   <AIComposerField>
 *     <AIComposerInput />
 *   </AIComposerField>
 * </AIComposer>
 */
export const AIComposer = forwardRef<HTMLFormElement, AIComposerProps>(
  function AIComposer(props, ref) {
    const {
      layout = 'stacked',
      loading = false,
      messages,
      children,
      ...formProps
    } = props

    if (loading) {
      return <AIComposerSkeleton layout={layout} />
    }

    return (
      <ComposerMessagesProvider messages={messages}>
        <AIComposerRoot ref={ref} layout={layout} {...formProps}>
          {children}
        </AIComposerRoot>
      </ComposerMessagesProvider>
    )
  }
)

/**
 * The form itself. `inline` has no row for tiles, so while the draft has
 * attachments the layout falls back to `stacked`, and returns to `inline`
 * when the last one is removed.
 */
const AIComposerRoot = forwardRef<
  HTMLFormElement,
  Omit<AIComposerProps, 'loading' | 'messages'>
>(function AIComposerRoot(props, ref) {
  const { layout = 'stacked', children, ...formProps } = props
  const hasAttachments = useAuiState((s) => s.composer.attachments.length > 0)

  return (
    <ComposerPrimitive.Root
      ref={ref}
      data-sl-ai-composer
      data-layout={hasAttachments ? 'stacked' : layout}
      {...formProps}
    >
      {children}
    </ComposerPrimitive.Root>
  )
})
