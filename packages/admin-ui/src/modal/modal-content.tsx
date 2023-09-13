import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { useCallback, useRef, forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { useAtom } from 'jotai'
import { useForkRef, useSafeLayoutEffect } from '@vtex/admin-ui-hooks'

import { modalContentTheme } from './modal.style'
import {
  isContentScrollableAtom,
  isElementScrollable,
  isHeaderFixedAtom,
  FIXED_HEADER_THRESHOLD,
} from './util'

/**
 * Component responsible for rendering the modal content
 * @example
 * <Modal>
 *  <ModalContent>
 *    Your content
 *  </ModalContent>
 * </Modal>
 */
const ModalContent = forwardRef(
  (props: ModalContentProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', children, ...htmlProps } = props
    const innerRef = useRef<HTMLDivElement>(null)
    const [, setContentScrollable] = useAtom(isContentScrollableAtom)
    const [, setHeaderFixed] = useAtom(isHeaderFixedAtom)

    const handleScroll = useCallback(() => {
      const scrollTop = innerRef.current?.scrollTop ?? 0
      const isFixed = scrollTop > FIXED_HEADER_THRESHOLD

      setHeaderFixed(isFixed)
    }, [])

    useSafeLayoutEffect(() => {
      const div = innerRef.current

      if (div) {
        setContentScrollable(() => isElementScrollable(div))
      }
    })

    useSafeLayoutEffect(() => {
      const div = innerRef.current

      div?.addEventListener('scroll', handleScroll)

      return () => {
        div?.removeEventListener('scroll', handleScroll)
      }
    }, [handleScroll])

    return (
      <div
        ref={useForkRef(innerRef, ref)}
        className={cx(modalContentTheme, className)}
        {...htmlProps}
      >
        {children}
      </div>
    )
  }
)

ModalContent.displayName = 'ModalContent'

type ModalContentProps = ComponentPropsWithoutRef<'div'>

export { ModalContent }
export type { ModalContentProps }
