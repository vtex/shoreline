import type { ComponentPropsWithoutRef } from 'react'
import React, { useCallback } from 'react'

/**
 * Controls toast appearance
 */
export function ToastAppear(props: ToastAppearProps) {
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
    <div data-sl-toast-appear data-visible={visible} ref={ref} {...divProps}>
      {children}
    </div>
  )
}

export interface ToastAppearProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Toast id
   */
  id: string
  /**
   * Callback of height update
   */
  onHeightUpdate: (id: string, height: number) => void
  /**
   * Wether is visible
   */
  visible?: boolean
}
