import { describe, expect, it } from 'vitest'
import type { Attachment } from '@assistant-ui/react'

import { toAIAttachment } from '../to-ai-attachment'

const file = new File(['x'], 'a.png', { type: 'image/png' })
const base = { id: 'a1', name: 'a.png', contentType: 'image/png', file }

describe('toAIAttachment', () => {
  it('maps an uploading attachment with its progress', () => {
    const attachment = {
      ...base,
      type: 'image',
      status: { type: 'running', reason: 'uploading', progress: 0.25 },
    } as Attachment

    expect(toAIAttachment(attachment)).toEqual({
      id: 'a1',
      name: 'a.png',
      type: 'image',
      contentType: 'image/png',
      file,
      status: 'uploading',
      progress: 0.25,
    })
  })

  it('maps an upload error with its message', () => {
    const attachment = {
      ...base,
      type: 'image',
      status: { type: 'incomplete', reason: 'error', message: 'bad' },
    } as Attachment

    expect(toAIAttachment(attachment)).toMatchObject({
      status: 'error',
      error: 'bad',
    })
  })

  it('maps pending-send and complete attachments to ready', () => {
    const waiting = {
      ...base,
      type: 'image',
      status: { type: 'requires-action', reason: 'composer-send' },
    } as Attachment
    const done = {
      id: 'a2',
      name: 'b.txt',
      type: 'custom',
      status: { type: 'complete' },
      content: [],
    } as Attachment

    expect(toAIAttachment(waiting).status).toBe('ready')
    expect(toAIAttachment(done)).toMatchObject({
      status: 'ready',
      type: 'file',
    })
  })
})
