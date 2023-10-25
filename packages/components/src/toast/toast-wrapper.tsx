import type { ComponentPropsWithoutRef } from 'react'
import React, { useCallback } from 'react'

export function ToastWrapper(props: ToastWrapperProps) {
  const { id, onHeightUpdate, children, visible = false, ...divProps } = props

  const ref = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return

      const updateHeight = () => {
        const height = el.getBoundingClientRect().height

        onHeightUpdate(id, height)
      }

      updateHeight()
      new MutationObserver(updateHeight).observe(el, {
        subtree: true,
        childList: true,
        characterData: true,
      })
    },
    [id, onHeightUpdate]
  )

  return (
    <div data-sl-toast-wrapper data-visible={visible} ref={ref} {...divProps}>
      {children}
    </div>
  )
}

export interface ToastWrapperProps extends ComponentPropsWithoutRef<'div'> {
  id: string
  onHeightUpdate: (id: string, height: number) => void
  visible?: boolean
}
