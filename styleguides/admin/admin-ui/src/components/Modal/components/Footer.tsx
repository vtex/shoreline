import React, { ReactNode, Ref } from 'react'
import { forwardRef, useClassName } from '@vtex/admin-ui-system'

import { useModalContext } from '../context'
import { Overridable } from '../../../types'

/**
 * Footer of the modal
 * Renders a footer element
 * @example
 * ```jsx
 * import { StatelessModal } from `@vtex/admin-ui`
 * <StatelessModal>
 *  <StatelessModal.Footer>
 *    <Button>Cancel</Button>
 *  </StatelessModal.Footer>
 * </StatelessModal>
 * ```
 */
export const ModalFooter = forwardRef(function ModalFooter(
  props: ModalFooterProps,
  ref: Ref<HTMLDivElement>
) {
  const { styleOverrides, ...footerProps } = props
  const { size } = useModalContext()

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `components.modal.footer-${size}`,
  })

  return <footer ref={ref} className={className} {...footerProps} />
})

export interface ModalFooterProps extends Overridable {
  children?: ReactNode
}
