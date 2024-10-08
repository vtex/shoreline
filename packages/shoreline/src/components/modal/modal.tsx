import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'
import { Dialog } from '@ariakit/react'

import { Container } from '../content'
import { style } from '@vtex/shoreline-utils'

/**
 * Modal displays content related to a minor job within a page's main job. It demands complete attention and blocks interactions outside the overlay.
 * @status stable
 * @example
 * ```jsx
 * function Example() {
 *  const [open, setOpen] = React.useState(false)
 *
 *  return (
 *    <>
 *      <Button onClick={() => setOpen(true)}>Open modal</Button>
 *      <Modal
 *        open={open}
 *        onClose={() => {
 *          setOpen(false)
 *        }}
 *      >
 *        <ModalContent>Content</ModalContent>
 *      </Modal>
 *    </>
 *  )
 * }
 * ```
 */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(
  function Modal(props, ref) {
    const {
      children,
      portal = true,
      size = 'medium',
      style: styleOverride,
      ...otherProps
    } = props

    return (
      <Dialog
        data-sl-modal
        ref={ref}
        backdrop={<div data-sl-modal-backdrop />}
        portal={portal}
        data-size={size}
        style={style({ zIndex: 'var(--sl-z-4)', ...styleOverride })}
        {...otherProps}
      >
        <Container data-sl-modal-container>{children}</Container>
      </Dialog>
    )
  }
)

export interface ModalOptions {
  /**
   * Callback fired when the backdrop or close button is clicked.
   */
  onClose?: (event: Event) => void
  /**
   * Whether the modal is open or not
   * @default false
   */
  open?: boolean
  /**
   * Whether to render the modal inside a portal or not
   * @default true
   */
  portal?: boolean
  /**
   * Modal size
   * @default medium
   */
  size?: 'small' | 'medium' | 'large'
}

export type ModalProps = ModalOptions & ComponentPropsWithoutRef<'div'>
