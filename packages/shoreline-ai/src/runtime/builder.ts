/**
 * createRuntimeBuilder — composes StreamTransport + optional AttachmentHandler.
 *
 * @status experimental
 */

import type {
  AttachmentHandler,
  BuiltRuntime,
  RuntimeBuilder,
  StreamTransport,
} from './types'

class RuntimeBuilderImpl implements RuntimeBuilder {
  private _transport: StreamTransport | null = null
  private _attachmentHandler: AttachmentHandler | undefined

  transport(transport: StreamTransport): RuntimeBuilder {
    this._transport = transport

    return this
  }

  attachments(handler: AttachmentHandler): RuntimeBuilder {
    this._attachmentHandler = handler

    return this
  }

  build(): BuiltRuntime {
    if (!this._transport) {
      throw new Error(
        'createRuntimeBuilder: transport() is required before build()'
      )
    }

    return {
      transport: this._transport,
      attachmentHandler: this._attachmentHandler,
    }
  }
}

export function createRuntimeBuilder(): RuntimeBuilder {
  return new RuntimeBuilderImpl()
}
