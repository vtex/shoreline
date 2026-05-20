import type { AIMessagePart, StreamStatus } from '../types/public'
import type { RuntimeRunInput, StreamTransport } from '../runtime/types'

const DEFAULT_ASSISTANT_REPLY =
  'This is a default VTEX-style assistant reply from the Storybook mock transport.'

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

/**
 * Minimal accumulator matching VTEX {@link AIMessageAccumulator} snapshot shape.
 */
class MockMessageAccumulator {
  private text = ''
  private reasoning: (AIMessagePart & { type: 'reasoning' }) | null = null

  appendTextDelta(chunk: string): void {
    this.text += chunk
  }

  setTextFull(text: string): void {
    this.text = text
  }

  setReasoning(text: string, status: 'streaming' | 'complete'): void {
    this.reasoning = { type: 'reasoning', text, status }
  }

  snapshot(): AIMessagePart[] {
    const parts: AIMessagePart[] = []

    if (this.reasoning) {
      parts.push(this.reasoning)
    }

    if (this.text) {
      parts.push({ type: 'text', text: this.text })
    }

    return parts
  }
}

function buildReplyText(input: RuntimeRunInput): string {
  const userText = input.trigger.message.parts
    .filter(
      (part): part is AIMessagePart & { type: 'text' } => part.type === 'text'
    )
    .map((part) => part.text)
    .join('')
    .trim()

  if (!userText) {
    return DEFAULT_ASSISTANT_REPLY
  }

  return `You said: "${userText}". ${DEFAULT_ASSISTANT_REPLY}`
}

/**
 * Simulates {@link createStreamTransport} without SSE: streams text chunks
 * then a final snapshot, yielding {@link RuntimeSnapshot} like the VTEX adapter.
 */
export function createMockStreamTransport(): StreamTransport {
  return {
    async *run(input: RuntimeRunInput) {
      const reply = buildReplyText(input)
      const accumulator = new MockMessageAccumulator()

      accumulator.setReasoning('Reviewing your message (mock)…', 'streaming')
      yield {
        parts: accumulator.snapshot(),
        status: 'streaming' satisfies StreamStatus,
      }

      await delay(120)
      accumulator.setReasoning('Reviewing your message (mock)…', 'complete')

      const tokens = reply.split(/(\s+)/).filter(Boolean)

      for (const token of tokens) {
        accumulator.appendTextDelta(token)
        await delay(35)
        yield { parts: accumulator.snapshot(), status: 'streaming' }
      }

      accumulator.setTextFull(reply)
      yield { parts: accumulator.snapshot(), status: 'streaming' }

      return {
        parts: accumulator.snapshot(),
        status: 'ready',
      }
    },
  }
}
