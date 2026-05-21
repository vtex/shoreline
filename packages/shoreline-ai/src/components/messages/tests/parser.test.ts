import { describe, expect, it } from 'vitest'

import { parseMessagePart } from '../parser'

describe('parseMessagePart', () => {
  it('maps text parts', () => {
    expect(
      parseMessagePart({
        type: 'text',
        text: 'Hello',
      })
    ).toEqual({
      type: 'text',
      text: 'Hello',
    })
  })

  it('maps reasoning streaming status from running part status', () => {
    expect(
      parseMessagePart({
        type: 'reasoning',
        text: 'Thinking',
        status: { type: 'running' },
      })
    ).toEqual({
      type: 'reasoning',
      text: 'Thinking',
      status: 'streaming',
    })
  })

  it('maps image parts to resource', () => {
    expect(
      parseMessagePart({
        type: 'image',
        image: 'https://example.com/a.png',
        filename: 'a.png',
      })
    ).toEqual({
      type: 'resource',
      uri: 'https://example.com/a.png',
      name: 'a.png',
      mimeType: 'image/*',
    })
  })

  it('maps file parts to resource', () => {
    expect(
      parseMessagePart({
        type: 'file',
        data: 'vtex-artifact://file.pdf',
        filename: 'file.pdf',
        mimeType: 'application/pdf',
      })
    ).toEqual({
      type: 'resource',
      uri: 'vtex-artifact://file.pdf',
      name: 'file.pdf',
      mimeType: 'application/pdf',
    })
  })

  it('maps legacy data-resource fallback', () => {
    expect(
      parseMessagePart({
        type: 'data',
        name: 'resource',
        data: {
          uri: 'artifact://x',
          name: 'x',
          mimeType: 'application/pdf',
        },
      })
    ).toEqual({
      type: 'resource',
      uri: 'artifact://x',
      name: 'x',
      mimeType: 'application/pdf',
      description: undefined,
      size: undefined,
      metadata: undefined,
    })
  })
})
