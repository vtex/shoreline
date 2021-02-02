import React, { ReactNode, Ref } from 'react'
import { forwardRef } from '@vtex/admin-core'

import { useModalContext } from '../context'
import { Overridable } from '../../../types'
import { useSystem } from '@vtex/admin-core'

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
  const { cn } = useSystem()

  const className = cn({
    ...styleOverrides,
    themeKey: `components.modal.footer-${size}`,
  })

  return <footer ref={ref} className={className} {...footerProps} />
})

export interface ModalFooterProps extends Overridable {
  children?: ReactNode
}
