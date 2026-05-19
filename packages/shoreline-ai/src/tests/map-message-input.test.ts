import { describe, expect, it } from 'vitest'

import {
  mapAIMessageInputToContent,
  normalizeAIMessageInput,
} from '../runtime/map-message-input'

describe('mapAIMessageInputToContent', () => {
  it('maps text shorthand', () => {
    expect(mapAIMessageInputToContent({ text: 'Hi' })).toEqual([
      { type: 'text', text: 'Hi' },
    ])
  })

  it('maps text, file, and image parts', () => {
    const content = mapAIMessageInputToContent({
      parts: [
        { type: 'text', text: 'See file' },
        {
          type: 'file',
          uri: 'blob:abc',
          name: 'doc.pdf',
          mimeType: 'application/pdf',
        },
        {
          type: 'image',
          uri: 'data:image/png;base64,x',
          name: 'scan.png',
        },
      ],
    })

    expect(content).toEqual([
      { type: 'text', text: 'See file' },
      {
        type: 'file',
        data: 'blob:abc',
        mimeType: 'application/pdf',
        filename: 'doc.pdf',
      },
      {
        type: 'image',
        image: 'data:image/png;base64,x',
        filename: 'scan.png',
      },
    ])
  })

  it('normalizes text shorthand to parts', () => {
    expect(normalizeAIMessageInput({ text: 'Hello' })).toEqual([
      { type: 'text', text: 'Hello' },
    ])
  })
})
