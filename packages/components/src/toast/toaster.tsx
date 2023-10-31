import type { CSSProperties, ComponentPropsWithoutRef } from 'react'
import React from 'react'
import type { DefaultToastOptions } from 'react-hot-toast/headless'
import { useToaster } from 'react-hot-toast/headless'

import { ToastWrapper } from './toast-wrapper'
import { Toast } from './toast-markup'
import type { ToastPosition } from './types'

export function Toaster(props: ToasterProps) {
  const {
    reverseOrder,
    position = 'bottom-right',
    toastOptions,
    gutter,
    ...otherProps
  } = props

  const { toasts, handlers } = useToaster(toastOptions)

  return (
    <div
      data-sl-toaster
      onMouseEnter={handlers.startPause}
      onMouseLeave={handlers.endPause}
      {...otherProps}
    >
      {toasts.map((t) => {
        const toastPosition = t.position || position
        const offset = handlers.calculateOffset(t, {
          reverseOrder,
          gutter,
          defaultPosition: position,
        })

        const positionStyle = getPositionStyle(toastPosition, offset)

        return (
          <ToastWrapper
            id={t.id}
            key={t.id}
            onHeightUpdate={handlers.updateHeight}
            visible={t.visible}
            style={positionStyle}
          >
            <Toast
              id={t.id}
              loading={t.type === 'loading'}
              variant={(t as any).variant as any}
            >
              {(t as any).message}
            </Toast>
          </ToastWrapper>
        )
      })}
    </div>
  )
}

function getPositionStyle(
  position: ToastPosition,
  offset: number
): CSSProperties {
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

export interface ToasterProps
  extends Omit<ComponentPropsWithoutRef<'div'>, 'children'> {
  position?: ToastPosition
  toastOptions?: DefaultToastOptions
  reverseOrder?: boolean
  gutter?: number
}
