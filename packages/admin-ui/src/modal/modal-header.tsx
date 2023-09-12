import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { useAtom } from 'jotai'

import { modalHeaderTheme } from './modal.style'
import { isHeaderFixedAtom, isContentScrollableAtom } from './util'

/**
 * Component responsible for rendering the Modal header
 * @example
 * <Modal>
 *  <ModalHeader>
 *    <ModalTitle>Title</ModalTitle>
 *  </ModalHeader>
 * </Modal>
 */
const ModalHeader = forwardRef(
  (props: ModalHeaderProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...htmlProps } = props

    const [isContentScrollable] = useAtom(isContentScrollableAtom)
    const [isHeaderFixed] = useAtom(isHeaderFixedAtom)

    const isCompact = !isContentScrollable
    const hasShadow = isContentScrollable && isHeaderFixed

    return (
      <header
        {...htmlProps}
        ref={ref}
        className={cx(modalHeaderTheme, className)}
        data-compact={isCompact}
        data-has-shadow={hasShadow}
      />
    )
  }
)

ModalHeader.displayName = 'ModalHeader'

type ModalHeaderProps = ComponentPropsWithoutRef<'header'>

export { ModalHeader }
export type { ModalHeaderProps }
