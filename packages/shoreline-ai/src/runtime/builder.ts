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

class RuntimeBuilderImpl<HasTransport extends boolean = false>
  implements RuntimeBuilder<HasTransport>
{
  private _transport: StreamTransport | null = null
  private _attachmentHandler: AttachmentHandler | undefined

  transport(transport: StreamTransport): RuntimeBuilder<true> {
    this._transport = transport

    return this as unknown as RuntimeBuilder<true>
  }

  attachments(handler: AttachmentHandler): RuntimeBuilder<HasTransport> {
    this._attachmentHandler = handler

    return this
  }

  build(this: RuntimeBuilder<true>): BuiltRuntime {
    const self = this as unknown as RuntimeBuilderImpl<true>

    if (!self._transport) {
      throw new Error(
        'createRuntimeBuilder: transport() is required before build()'
      )
    }

    return {
      transport: self._transport,
      attachmentHandler: self._attachmentHandler,
    }
  }
}

export function createRuntimeBuilder(): RuntimeBuilder {
  return new RuntimeBuilderImpl()
}
