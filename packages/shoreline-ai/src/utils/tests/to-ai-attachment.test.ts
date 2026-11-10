import { describe, expect, it } from 'vitest'
import type { Attachment } from '@assistant-ui/react'

import type { AttachmentErrorReason } from '../../runtime/bridge/attachment-bridge'
import { toAIAttachment as map } from '../to-ai-attachment'

const getMessage = (id: string, variables?: Record<string, string | number>) =>
  `${id}:${JSON.stringify(variables ?? {})}`

const toAIAttachment = (
  attachment: Attachment,
  reason?: AttachmentErrorReason
) => map(attachment, getMessage, reason)

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

  it('builds the error text from the reason when the handler gave none', () => {
    const failed = {
      ...base,
      type: 'image',
      status: { type: 'incomplete', reason: 'error' },
    } as Attachment

    expect(toAIAttachment(failed, { code: 'too-large', max: 2048 }).error).toBe(
      'attachmentTooLarge:{"max":"2.0 KB"}'
    )
    expect(toAIAttachment(failed, { code: 'too-many', max: 3 }).error).toBe(
      'attachmentTooMany:{"max":3}'
    )
    expect(toAIAttachment(failed, { code: 'upload-failed' }).error).toBe(
      'attachmentUploadFailed:{}'
    )
    expect(toAIAttachment(failed).error).toBeUndefined()
  })

  it('keeps the handler message as is even when a reason exists', () => {
    const attachment = {
      ...base,
      type: 'image',
      status: {
        type: 'incomplete',
        reason: 'error',
        message: 'Server said no',
      },
    } as Attachment

    expect(toAIAttachment(attachment, { code: 'upload-failed' }).error).toBe(
      'Server said no'
    )
  })
})
