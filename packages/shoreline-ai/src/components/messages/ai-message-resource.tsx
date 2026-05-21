import type { ComponentPropsWithoutRef } from 'react'
import {
  MessagePartPrimitive,
  useAuiState,
  useMessagePartImage,
} from '@assistant-ui/react'
import { IconFileText, Text, forwardRef } from '@vtex/shoreline'

export type AIMessageResourceImageProps = ComponentPropsWithoutRef<'div'>
export type AIMessageResourceFileProps = ComponentPropsWithoutRef<'div'>

/**
 * Image resource preview inside a message part scope.
 *
 * @status experimental
 */
export const AIMessageResourceImage = forwardRef<
  HTMLDivElement,
  AIMessageResourceImageProps
>(function AIMessageResourceImage(props, ref) {
  const { image } = useMessagePartImage()

  return (
    <div ref={ref} data-sl-ai-message-resource data-type="image" {...props}>
      <div data-sl-ai-message-resource-image>
        <MessagePartPrimitive.Image src={image} alt="" />
      </div>
    </div>
  )
})

/**
 * File resource row inside a message part scope.
 *
 * @status experimental
 */
export const AIMessageResourceFile = forwardRef<
  HTMLDivElement,
  AIMessageResourceFileProps
>(function AIMessageResourceFile(props, ref) {
  const filename = useAuiState((state) =>
    state.part.type === 'file' ? state.part.filename : 'file'
  )
  const mimeType = useAuiState((state) =>
    state.part.type === 'file' ? state.part.mimeType : undefined
  )

  return (
    <div ref={ref} data-sl-ai-message-resource data-type="file" {...props}>
      <div data-sl-ai-message-resource-icon>
        <IconFileText />
      </div>
      <div data-sl-ai-message-resource-info>
        <Text variant="caption1" color="muted">
          {filename ?? 'file'}
        </Text>
        {mimeType ? (
          <Text variant="caption2" color="base-soft">
            {mimeType}
          </Text>
        ) : null}
      </div>
    </div>
  )
})

/**
 * Read-only resource chip — image preview or file row.
 *
 * @status experimental
 */
export const AIMessageResource = forwardRef<
  HTMLDivElement,
  ComponentPropsWithoutRef<'div'>
>(function AIMessageResource(props, ref) {
  const partType = useAuiState((state) => state.part.type)

  if (partType === 'image') {
    return <AIMessageResourceImage ref={ref} {...props} />
  }

  return <AIMessageResourceFile ref={ref} {...props} />
})
