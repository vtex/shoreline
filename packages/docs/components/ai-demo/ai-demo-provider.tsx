'use client'

import { useMemo, type ReactNode } from 'react'
import { LocaleProvider } from '@vtex/shoreline'
import {
  AIProvider,
  createRuntimeBuilder,
  useRuntime,
  type AttachmentHandler,
  type StreamTransport,
} from '@vtex/shoreline-ai'

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

/**
 * Fake backend: streams a short reply word by word.
 */
const transport: StreamTransport = {
  async *run({ trigger }) {
    const first = trigger.message.parts[0]
    const question = first?.type === 'text' ? first.text : ''
    const words = `You asked: "${question}". This is a demo reply.`.split(' ')
    let text = ''

    for (const word of words) {
      await wait(60)
      text += `${text ? ' ' : ''}${word}`
      yield { parts: [{ type: 'text', text }], status: 'streaming' }
    }

    return { parts: [{ type: 'text', text }], status: 'ready' }
  },
}

/**
 * Fake upload: shows progress and keeps the file in memory.
 */
const attachments: AttachmentHandler = {
  maxCount: 5,
  maxSize: 5 * 1024 * 1024,
  async *add() {
    yield { progress: 0, status: 'uploading' }
    await wait(800)
    yield { progress: 1, status: 'ready' }
  },
  async send(pending) {
    return {
      type: 'resource',
      uri: URL.createObjectURL(pending.file),
      name: pending.name,
      mimeType: pending.contentType,
      size: pending.file.size,
    }
  },
  async remove() {},
}

/**
 * Wraps the docs examples of `@vtex/shoreline-ai` with a mock runtime, so
 * they work without a backend. In a real app you build the runtime from your
 * own transport. See the Runtime guide.
 */
export function AIDemoProvider(props: { children: ReactNode }) {
  const built = useMemo(
    () =>
      createRuntimeBuilder()
        .transport(transport)
        .attachments(attachments)
        .build(),
    []
  )
  const runtime = useRuntime(built)

  return (
    <LocaleProvider locale="en-US">
      <AIProvider runtime={runtime}>
        <div style={{ width: '100%', maxWidth: 720, margin: '0 auto' }}>
          {props.children}
        </div>
      </AIProvider>
    </LocaleProvider>
  )
}
