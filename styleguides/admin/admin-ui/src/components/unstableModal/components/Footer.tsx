/** @jsx jsx */
import { jsx, SxStyleProp } from '@theme-ui/core'
import { ReactNode } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { useModalContext } from '../context'

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
  const { styles, ...footerProps } = props
  const { size } = useModalContext()

  const className = useClassName({
    props: { styles },
    themeKey: `components.modal.footer-${size}`,
  })

  return <footer className={className} {...footerProps} />
}

interface ModalFooterProps {
  children?: ReactNode
  styles?: SxStyleProp
}
