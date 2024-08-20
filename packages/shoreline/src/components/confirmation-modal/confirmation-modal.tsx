import type { ComponentPropsWithoutRef } from 'react'
import type React from 'react'
import { forwardRef } from 'react'
import { Button } from '../button'
import { createMessageHook } from '../locale'
import {
  Modal,
  ModalContent,
  ModalDismiss,
  ModalFooter,
  ModalHeader,
  ModalHeading,
} from '../modal'
import { messages } from './messages'

const useMessage = createMessageHook(messages)

/**
 * Confirmation Modals appear after users attempt to trigger an action with an effect that is irreversible or hard to reverse, such as deleting items.
 * @status stable
 * @example
 *  const [open, setOpen] = useState(false)
 *
 *  const handleClose = () => {
 *   setOpen(false)
 *  }
 *
 *  <Button onClick={() => setOpen((open) => !open)}>
 *    Open confirmation modal
 *  </Button>
 *  <ConfirmationModal
 *    open={open}
 *    onClose={handleClose}
 *    onConfirm={handleClose}
 *    onCancel={handleClose}
 *  >
 *    <Text variant="body">Hello world</Text>
 *  </ConfirmationModal>
 */
export const ConfirmationModal = forwardRef<
  HTMLDivElement,
  ConfirmationModalProps
>(function ConfirmationModal(props, ref) {
  const {
    children,
    open,
    onClose,
    onConfirm,
    onCancel,
    locale = 'en-US',
    messages,
    disabled = false,
    critical = false,
    ...otherProps
  } = props

  const getMessage = useMessage(messages)

  const title = getMessage('title')
  const cancel = getMessage('cancel')
  const confirm = getMessage('confirm')

  return (
    <Modal
      data-sl-confirmation-modal
      open={open}
      onClose={onClose}
      ref={ref}
      {...otherProps}
      size="small"
    >
      {title ? (
        <ModalHeader>
          <ModalHeading>{title}</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
      ) : null}
      <ModalContent>{children}</ModalContent>
      <ModalFooter data-sl-confirmation-modal-footer>
        <Button onClick={onCancel} size="large" aria-label={cancel}>
          {cancel}
        </Button>
        <Button
          onClick={onConfirm}
          size="large"
          variant={critical ? 'critical' : 'primary'}
          aria-label={confirm}
          disabled={disabled}
        >
          {confirm}
        </Button>
      </ModalFooter>
    </Modal>
  )
})

export interface ConfirmationModalOptions {
  /**
   * Callback fired when the backdrop or close button is clicked.
   */
  onClose?: (event: Event) => void
  /**
   * Callback fired when the ok button is clicked.
   */
  onConfirm?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * Callback fired when the cancel button is clicked.
   */
  onCancel?: React.MouseEventHandler<HTMLButtonElement>
  /**
   * Whether the modal is open or not.
   * @default false
   */
  open?: boolean
  /**
   * Whether the confirm actions is disabled.
   * @default false
   */
  disabled?: boolean
  /**
   * Whether the confirm actions is critical.
   * @default false
   */
  critical?: boolean
  /**
   * The BCP47 language code for the locale.
   * @link https://www.ietf.org/rfc/bcp/bcp47.txt
   * @default en-US
   */
  locale?: string
  /**
   * Object containing all messages to be displayed internally in the modal. They include "title", "ok" and "cancel".
   */
  messages?: {
    /**
     * The title of the modal.
     */
    title?: string
    /**
     * The text of the confirm button.
     */
    confirm?: string
    /**
     * The text of the cancel button.
     */
    cancel?: string
  }
}

export type ConfirmationModalProps = ConfirmationModalOptions &
  ComponentPropsWithoutRef<'div'>
