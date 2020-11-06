import React, { ReactNode } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

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
export function ModalFooter(props: ModalFooterProps) {
  const { styleOverrides, ...footerProps } = props
  const { size } = useModalContext()

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `components.modal.footer-${size}`,
  })

  return <footer className={className} {...footerProps} />
}

interface ModalFooterProps extends Overridable {
  children?: ReactNode
}
