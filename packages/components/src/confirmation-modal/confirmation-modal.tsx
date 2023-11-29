import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Content } from '../content'
import { Modal, ModalHeader } from '../modal'
import { Flex } from '../flex'
import { Button } from '../button'
import { createMessageHook } from '../locale'
import { messages } from './messages'

const useMessage = createMessageHook(messages)

/**
 * Confirmation Modal containers allow merchants to confirm an action through an overlay window that opens on top of the current page.
 *
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
 *    <Text>Hello world</Text>
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
    ...otherProps
  } = props

  const getMessage = useMessage(messages)

  return (
    <Modal open={open} onClose={onClose} ref={ref} {...otherProps}>
      {getMessage('title') ? (
        <ModalHeader>{getMessage('title')}</ModalHeader>
      ) : null}
      <Content>{children}</Content>
      <Content narrow>
        <Flex justify="end" columnGap="0.5rem">
          <Button onClick={onCancel}>{getMessage('cancel')}</Button>
          <Button onClick={onConfirm} variant="primary">
            {getMessage('confirm')}
          </Button>
        </Flex>
      </Content>
    </Modal>
  )
})

export interface ConfirmationModalProps
  extends ComponentPropsWithoutRef<'div'> {
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
   * The BCP47 language code for the locale.
   * @link https://www.ietf.org/rfc/bcp/bcp47.txt
   * @default en-US
   */
  locale?: string
  messages?: {
    title?: string
    confirm?: string
    cancel?: string
  }
}
