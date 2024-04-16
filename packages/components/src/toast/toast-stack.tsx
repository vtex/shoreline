import type { CSSProperties } from 'react'
import React from 'react'
import type { DefaultToastOptions } from 'react-hot-toast/headless'
import { useToaster } from 'react-hot-toast/headless'

import { ToastAppear } from './toast-appear'
import { Toast } from './toast'

/**
 * Stack of toasts
 * @example
 * <ToastStack />
 */
export function ToastStack(props: ToastStackProps) {
  const {
    reverseOrder,
    position = 'bottom-right',
    toastOptions,
    gutter = 16,
    ...otherProps
  } = props

  const { toasts, handlers } = useToaster(toastOptions)

  return (
    <div
      data-sl-toast-stack
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
      {...otherProps}
    >
      {toasts.map((t, index) => {
        const toastPosition = t.position || position
        const offset = handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        })

        const positionStyle = getPositionStyle(toastPosition, offset)

        return (
          <ToastAppear
            id={t.id}
            key={t.id}
            onHeightUpdate={handlers.updateHeight}
            visible={t.visible}
            style={
              { ...positionStyle, '--sl-toast-index': index } as CSSProperties
            }
          >
            <Toast
              id={t.id}
              loading={t.type === 'loading'}
              variant={(t as any).variant as any}
            >
              {(t as any).message}
            </Toast>
          </ToastAppear>
        )
      })}
    </div>
  )
}

function getPositionStyle(
  position: ToastStackOptions['position'],
  offset: number
): CSSProperties {
  if (!position) return {}

  const top = position.includes('top')
  const verticalStyle: CSSProperties = top ? { top: 0 } : { bottom: 0 }
  const horizontalStyle: CSSProperties = position.includes('center')
    ? {
        justifyContent: 'center',
      }
    : position.includes('right')
    ? {
        justifyContent: 'flex-end',
      }
    : {}

  return {
    transform: `translateY(${offset * (top ? 1 : -1)}px)`,
    ...verticalStyle,
    ...horizontalStyle,
  }
}

export interface ToastStackOptions {
  /**
   * Postion of the toasts
   * @default 'bottom-right'
   */
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  /**
   * Options of each toast
   */
  toastOptions?: DefaultToastOptions
  /**
   * Wether should invert the order
   */
  reverseOrder?: boolean
  /**
   * Position distance
   * @default 16
   */
  gutter?: number
}

export type ToastStackProps = ToastStackOptions
