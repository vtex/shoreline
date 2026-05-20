import { ComposerPrimitive } from '@assistant-ui/react'
import { forwardRef } from '@vtex/shoreline-utils'

import { ComposerMessagesProvider } from './composer-messages-context'
import { AIComposerSkeleton } from './ai-composer-skeleton'
import type { AIComposerProps } from './types'

/**
 * Root composer form wired to Assistant-UI `ComposerRuntime`.
 *
 * @status experimental
 */
export const AIComposer = forwardRef<HTMLFormElement, AIComposerProps>(
  function AIComposer(props, ref) {
    const { loading = false, messages, children, ...formProps } = props

    if (loading) {
      return <AIComposerSkeleton />
    }

    return (
      <ComposerMessagesProvider messages={messages}>
        <ComposerPrimitive.Root ref={ref} data-sl-ai-composer {...formProps}>
          {children}
        </ComposerPrimitive.Root>
      </ComposerMessagesProvider>
    )
  }
)
