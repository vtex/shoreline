import { createRef } from 'react'
import { describe, expect, it, render } from '@vtex/shoreline-test-utils'

import { AIMessageReasoningContent } from '../ai-message-reasoning-content'
import { AIMessageReasoningRoot } from '../ai-message-reasoning-root'

describe('AIMessageReasoningContent', () => {
  it('forwards its ref to the element carrying the content attribute', () => {
    const ref = createRef<HTMLDivElement>()

    render(
      <AIMessageReasoningRoot>
        <AIMessageReasoningContent ref={ref}>body</AIMessageReasoningContent>
      </AIMessageReasoningRoot>
    )

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveAttribute('data-sl-ai-message-reasoning-content')
  })
})
