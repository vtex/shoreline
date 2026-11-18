import { ComposerPrimitive, useAuiEvent } from '@assistant-ui/react'
import { Text, forwardRef } from '@vtex/shoreline'
import {
  type RefObject,
  memo,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'

import { getRuntimeCore } from '../../runtime/runtime-core'
import type { AIAttachment } from '../../types/public'
import { useAIContextInternal } from '../provider/ai-context'
import { AIComposerAttachment } from './ai-composer-attachment'
import { useComposerMessagesContext } from './composer-messages-context'
import { toAIAttachment } from '../../utils/to-ai-attachment'
import type { AIComposerAttachmentsProps } from './types'

const DefaultAttachment = memo(function DefaultAttachment({
  attachment,
}: {
  attachment: AIAttachment
}) {
  return <AIComposerAttachment attachment={attachment} />
})

const TILE_SELECTOR = ':scope > [data-sl-ai-composer-attachment]'

/**
 * Keeps the attachments on one row: hides the tiles that do not fit (unless
 * `expanded`) and reports how many are hidden, leaving room for the "+N"
 * button (5rem, the same size as a tile).
 */
function useAttachmentsRow(
  listRef: RefObject<HTMLDivElement | null>,
  expanded: boolean,
  onHiddenCount: (count: number) => void
) {
  useLayoutEffect(() => {
    const list = listRef.current

    if (!list) return

    const measure = () => {
      const tiles = Array.from(
        list.querySelectorAll<HTMLElement>(TILE_SELECTOR)
      )

      for (const tile of tiles) tile.hidden = false

      const style = getComputedStyle(list)
      const gap = Number.parseFloat(style.columnGap) || 0
      const available =
        list.clientWidth -
        (Number.parseFloat(style.paddingLeft) || 0) -
        (Number.parseFloat(style.paddingRight) || 0)
      const widths = tiles.map((tile) => tile.offsetWidth)
      const total = widths.reduce(
        (sum, width, index) => sum + width + (index ? gap : 0),
        0
      )
      const rem =
        Number.parseFloat(
          getComputedStyle(document.documentElement).fontSize
        ) || 16
      const reserved = rem * 5

      let visible = tiles.length

      if (total > available) {
        let used = 0

        visible = 0

        for (const width of widths) {
          const next = used + (visible ? gap : 0) + width

          if (next + gap + reserved > available) break

          used = next
          visible++
        }
      }

      tiles.forEach((tile, index) => {
        const overflowing = index >= visible

        tile.hidden = !expanded && overflowing
        // Only the tiles the expansion reveals animate, in order.
        tile.toggleAttribute('data-overflow', overflowing)

        if (overflowing) {
          tile.style.setProperty(
            '--sl-ai-composer-enter-index',
            String(index - visible)
          )
        } else {
          tile.style.removeProperty('--sl-ai-composer-enter-index')
        }
      })

      onHiddenCount(tiles.length - visible)
    }

    measure()

    const mutations = new MutationObserver(measure)

    mutations.observe(list, { childList: true })

    const resizes =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure)

    resizes?.observe(list)

    return () => {
      mutations.disconnect()
      resizes?.disconnect()
    }
  }, [listRef, expanded, onHiddenCount])
}

const ROW_EASING = 'cubic-bezier(0.2, 0.8, 0.2, 1)'

/**
 * Animates the row's height when it expands or collapses, so the card grows
 * smoothly instead of jumping. `fromHeight` is the height measured in the
 * click handler, before the DOM changed.
 */
function useAnimatedRowHeight(
  listRef: RefObject<HTMLDivElement | null>,
  expanded: boolean,
  fromHeight: RefObject<number | null>
) {
  useLayoutEffect(() => {
    const list = listRef.current
    const from = fromHeight.current

    fromHeight.current = null

    if (!list || from === null || typeof list.animate !== 'function') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const to = list.getBoundingClientRect().height

    if (from === to) return

    const animation = list.animate(
      [
        { height: `${from}px`, overflow: 'hidden' },
        { height: `${to}px`, overflow: 'hidden' },
      ],
      { duration: 260, easing: ROW_EASING }
    )

    return () => animation.cancel()
  }, [expanded])
}

/**
 * Lists pending composer attachments on one row, with a default tile renderer.
 * The tiles that do not fit collapse into a "+N" button that expands the list.
 *
 * @status experimental
 */
export const AIComposerAttachments = forwardRef<
  HTMLDivElement,
  AIComposerAttachmentsProps
>(function AIComposerAttachments(props, ref) {
  const { children, ...divProps } = props
  const getMessage = useComposerMessagesContext()
  const { attachmentErrors } = getRuntimeCore(useAIContextInternal().runtime)
  const [typeRejected, setTypeRejected] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [hiddenCount, setHiddenCount] = useState(0)
  const listRef = useRef<HTMLDivElement>(null)
  const heightBeforeToggle = useRef<number | null>(null)

  useImperativeHandle(ref, () => listRef.current as HTMLDivElement)
  useAttachmentsRow(listRef, expanded, setHiddenCount)
  useAnimatedRowHeight(listRef, expanded, heightBeforeToggle)

  // With nothing left to hide, the list is no longer "expanded".
  useEffect(() => {
    if (hiddenCount === 0) setExpanded(false)
  }, [hiddenCount])

  // The engine refuses a file type the handler does not accept before any
  // chip exists, so the notice is the only feedback the user gets.
  useAuiEvent('composer.attachmentAddError', (event) => {
    if (event.reason === 'not-accepted') setTypeRejected(true)
  })
  useAuiEvent('composer.attachmentAdd', () => setTypeRejected(false))

  return (
    <div
      ref={listRef}
      data-sl-ai-composer-attachments
      data-expanded={expanded ? '' : undefined}
      {...divProps}
    >
      <ComposerPrimitive.Attachments>
        {({ attachment }) => {
          const mapped = toAIAttachment(
            attachment,
            getMessage,
            attachmentErrors.get(attachment.id)
          )

          return children ? (
            children({ attachment: mapped })
          ) : (
            <DefaultAttachment attachment={mapped} />
          )
        }}
      </ComposerPrimitive.Attachments>
      {hiddenCount > 0 && (
        <button
          type="button"
          data-sl-ai-composer-attachments-more
          aria-expanded={expanded}
          aria-label={expanded ? undefined : getMessage('showAllAttachments')}
          onClick={() => {
            heightBeforeToggle.current =
              listRef.current?.getBoundingClientRect().height ?? null
            setExpanded((open) => !open)
          }}
        >
          {/* The key restarts the cross-fade when the label changes. */}
          <span
            key={expanded ? 'less' : 'more'}
            data-sl-ai-composer-attachments-more-label
          >
            {expanded ? getMessage('showFewerAttachments') : `+${hiddenCount}`}
          </span>
        </button>
      )}
      {typeRejected && (
        <div role="alert" data-sl-ai-composer-attachments-notice>
          <Text variant="caption2" color="var(--sl-fg-critical)">
            {getMessage('attachmentTypeNotAllowed')}
          </Text>
        </div>
      )}
    </div>
  )
})
