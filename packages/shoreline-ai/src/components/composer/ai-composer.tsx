import { ComposerPrimitive } from '@assistant-ui/react'
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
        <ComposerPrimitive.Root
          ref={ref}
          data-sl-ai-composer
          data-layout={layout}
          {...formProps}
        >
          {children}
        </ComposerPrimitive.Root>
      </ComposerMessagesProvider>
    )
  }
)
