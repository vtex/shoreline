import { Text } from '@vtex/shoreline'
import { useEffect, useLayoutEffect, useMemo, type ReactNode } from 'react'

import {
  AIComposer,
  AIComposerActions,
  AIComposerAction,
  AIComposerField,
  AIComposerFooter,
  AIComposerInput,
} from '../../composer'
import { AIMessages } from '../../messages'
import { useAIThread } from '../../../hooks/use-ai-thread'
import type { AIMessage } from '../../../types/public'
import {
  AIThread,
  AIThreadEmpty,
  AIThreadScrollToBottom,
  AIThreadViewport,
  AIThreadViewportFooter,
} from '../index'

export const threadStoryShellStyle = {
  height: '100%',
  minHeight: 0,
  flex: 1,
  maxWidth: 640,
  padding: 16,
  boxSizing: 'border-box' as const,
}

export type CreateMockThreadMessagesOptions = {
  longText?: boolean
}

export function createMockThreadMessages(
  count: number,
  options: CreateMockThreadMessagesOptions = {}
): AIMessage[] {
  const { longText = false } = options

  return Array.from({ length: count }, (_, index) => {
    const messageIndex = index + 1
    const isUser = index % 2 === 0

    const baseUser = `User message ${messageIndex}`
    const baseAssistant = `Assistant reply ${messageIndex}`
    const userText = longText
      ? `${baseUser} — ${'lorem '.repeat(12)}`
      : baseUser
    const assistantText = longText
      ? `${baseAssistant} — ${'response '.repeat(16)}`
      : baseAssistant

    return {
      id: `msg-${messageIndex}`,
      role: isUser ? 'user' : 'assistant',
      createdAt: '2026-05-20T12:00:00.000Z',
      parts: [{ type: 'text', text: isUser ? userText : assistantText }],
    }
  })
}

export function Welcome() {
  return (
    <AIThreadEmpty>
      <div
        style={{
          display: 'flex',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text variant="display3">Welcome</Text>
      </div>
    </AIThreadEmpty>
  )
}

export function ComposerFooter(props: {
  placeholder?: string
  loading?: boolean
  showScrollToBottom?: boolean
}) {
  const { placeholder, loading = false, showScrollToBottom = false } = props

  return (
    <AIThreadViewportFooter>
      {showScrollToBottom ? <AIThreadScrollToBottom /> : null}
      <AIComposer loading={loading}>
        <AIComposerField>
          <AIComposerInput placeholder={placeholder} />
          <AIComposerFooter>
            <AIComposerActions>
              <AIComposerAction />
            </AIComposerActions>
          </AIComposerFooter>
        </AIComposerField>
      </AIComposer>
    </AIThreadViewportFooter>
  )
}

export function ThreadHistorySeed(props: {
  messages: AIMessage[]
  children: ReactNode
}) {
  const { messages, children } = props
  const { loadMessages } = useAIThread()

  useEffect(() => {
    if (messages.length > 0) {
      loadMessages(messages)
    }
  }, [loadMessages, messages])

  return <>{children}</>
}

export function ViewportScrolledUpOnMount() {
  useLayoutEffect(() => {
    const viewport = document.querySelector('[data-sl-ai-thread-viewport]')

    if (viewport instanceof HTMLElement) {
      viewport.scrollTop = 0
      viewport.dispatchEvent(new Event('scroll', { bubbles: true }))
    }
  }, [])

  return null
}

export function scrollThreadViewportToTop(root: HTMLElement): void {
  const viewport = root.querySelector('[data-sl-ai-thread-viewport]')

  if (viewport instanceof HTMLElement) {
    viewport.scrollTop = 0
    viewport.dispatchEvent(new Event('scroll', { bubbles: true }))
  }
}

export function isThreadViewportNearBottom(
  viewport: HTMLElement,
  threshold = 8
): boolean {
  return (
    viewport.scrollTop + viewport.clientHeight >=
    viewport.scrollHeight - threshold
  )
}

export function getThreadViewport(root: HTMLElement): HTMLElement | null {
  const viewport = root.querySelector('[data-sl-ai-thread-viewport]')

  return viewport instanceof HTMLElement ? viewport : null
}

export type NormativeThreadTreeOptions = {
  composerLoading?: boolean
  history?: AIMessage[]
  showEmpty?: boolean
  showMessages?: boolean
  showScrollToBottom?: boolean
  scrollUpOnMount?: boolean
  composerPlaceholder?: string
}

export function NormativeThreadTree(props: NormativeThreadTreeOptions) {
  const {
    composerLoading = false,
    history = [],
    showEmpty = false,
    showMessages = true,
    showScrollToBottom = true,
    scrollUpOnMount = false,
    composerPlaceholder,
  } = props

  const tree = (
    <AIThread>
      <AIThreadViewport
        autoScroll
        scrollToBottomOnInitialize={!scrollUpOnMount}
      >
        {showEmpty ? <Welcome /> : null}
        {showMessages ? (
          <div
            data-story-messages
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--sl-space-4)',
              padding: 'var(--sl-space-4)',
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            <AIMessages />
          </div>
        ) : null}
        <ComposerFooter
          placeholder={composerPlaceholder}
          loading={composerLoading}
          showScrollToBottom={showScrollToBottom}
        />
      </AIThreadViewport>
    </AIThread>
  )

  if (history.length === 0) {
    return (
      <>
        {scrollUpOnMount ? <ViewportScrolledUpOnMount /> : null}
        {tree}
      </>
    )
  }

  return (
    <ThreadHistorySeed messages={history}>
      {scrollUpOnMount ? <ViewportScrolledUpOnMount /> : null}
      {tree}
    </ThreadHistorySeed>
  )
}

export function ConversationLabTree(props: { messageCount: number }) {
  const { messageCount } = props
  const messages = useMemo(
    () =>
      createMockThreadMessages(messageCount, { longText: messageCount > 6 }),
    [messageCount]
  )

  return (
    <NormativeThreadTree
      history={messages}
      showEmpty={messageCount === 0}
      showMessages={messageCount > 0}
    />
  )
}
