import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { useAtom } from 'jotai'

import { modalHeaderTheme } from './modal.css'
import { isScrollableAtom, isScrollingAtom } from './util'

/**
 * Component responsible for rendering the ModalHeader
 * @example
 * <Modal>
 *  <ModalHeader>
 *    <ModalHeading>Title</ModalHeading>
 *  </ModalHeader>
 * </Modal>
 */
const ModalHeader = forwardRef(
  (props: ModalHeaderProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...htmlProps } = props

    const [scrollable] = useAtom(isScrollableAtom)
    const [scrolling] = useAtom(isScrollingAtom)

    return (
      <header
        {...htmlProps}
        ref={ref}
        className={cx(modalHeaderTheme, className)}
        data-compact={!scrollable}
        data-has-shadow={scrollable && scrolling}
      />
    )
  }
)

ModalHeader.displayName = 'ModalHeader'

type ModalHeaderProps = ComponentPropsWithoutRef<'header'>

export { ModalHeader }
export type { ModalHeaderProps }
