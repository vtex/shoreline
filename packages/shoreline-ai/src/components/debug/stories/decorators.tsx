import type { ReactNode } from 'react'
import {
  Button,
  DrawerContent,
  DrawerDismiss,
  DrawerHeader,
  DrawerHeading,
  DrawerPopover,
  DrawerProvider,
  DrawerTrigger,
  LocaleProvider,
} from '@vtex/shoreline'

import { useAIThread } from '../../../hooks/use-ai-thread'
import {
  MockRuntimeProvider,
  createMockStreamTransport,
} from '../../../test-utils'
import { AIStreamDebugPanel } from '../ai-stream-debug-panel'

const FAST_TRANSPORT = createMockStreamTransport({ delayMs: 0 })

/**
 * Storybook decorator: LocaleProvider + mock AI runtime with `debugStream`.
 * Pass `fast` to stream without delays (play stories).
 */
export function DebugStoryDecorator(props: {
  debugStream?: boolean
  fast?: boolean
  children: ReactNode
}) {
  const { debugStream = true, fast = false, children } = props

  return (
    <LocaleProvider locale="en-US">
      <MockRuntimeProvider
        debugStream={debugStream}
        transport={fast ? FAST_TRANSPORT : undefined}
      >
        <div style={{ maxWidth: 640, padding: 16, boxSizing: 'border-box' }}>
          {children}
        </div>
      </MockRuntimeProvider>
    </LocaleProvider>
  )
}

/** Sends a sample message to the mock runtime. */
export function SendSampleMessage(props: { text?: string }) {
  const { text = 'Hello' } = props
  const { sendMessage } = useAIThread()

  return (
    <Button variant="secondary" onClick={() => sendMessage({ text })}>
      {`Send ${text}`}
    </Button>
  )
}

/** Opens the debug panel in a Shoreline drawer. */
export function DebugDrawer() {
  return (
    <DrawerProvider>
      <DrawerTrigger asChild>
        <Button variant="secondary">Open stream debug</Button>
      </DrawerTrigger>
      <DrawerPopover size="medium">
        <DrawerHeader>
          <DrawerHeading>Stream debug</DrawerHeading>
          <DrawerDismiss />
        </DrawerHeader>
        <DrawerContent>
          <AIStreamDebugPanel title="Recorded runs" />
        </DrawerContent>
      </DrawerPopover>
    </DrawerProvider>
  )
}
