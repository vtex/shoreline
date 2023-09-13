import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx } from '@vtex/admin-ui-core'
import { useAtom } from 'jotai'

import { isContentScrollableAtom } from './util'
import { modalFooterTheme } from './modal.style'

/**
 * Component responsible for rendering the modal footer
 * @example
 * <Modal>
 *  <ModalFooter>
 *    <ModalButton>Okay</ModalButton>
 *  </ModalFooter>
 * </Modal>
 */
const ModalFooter = forwardRef(
  (props: ModalFooterProps, ref: Ref<HTMLDivElement>) => {
    const { className = '', ...htmlProps } = props
    const [isContentScrollable] = useAtom(isContentScrollableAtom)

    const isCompact = !isContentScrollable

    return (
      <footer
        {...htmlProps}
        ref={ref}
        className={cx(modalFooterTheme, className)}
        data-compact={isCompact}
      />
    )
  }
)

ModalFooter.displayName = 'ModalFooter'

type ModalFooterProps = ComponentPropsWithoutRef<'footer'>

export { ModalFooter }
export type { ModalFooterProps }
