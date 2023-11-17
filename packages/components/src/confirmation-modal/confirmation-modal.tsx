import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Content } from '../content'
import { Modal, ModalHeader } from '../modal'
import { Flex } from '../flex'
import { Button } from '../button'
import { LocaleProvider } from '../locale'

const defaultMessages = {
  title: 'Confirm action',
  confirm: 'Confirm',
  cancel: 'Cancel',
}

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
    messages = defaultMessages,
    ...otherProps
  } = props

  return (
    <LocaleProvider locale={locale}>
      <Modal open={open} onClose={onClose} ref={ref} {...otherProps}>
        {messages.title ? <ModalHeader>{messages.title}</ModalHeader> : null}
        <Content>{children}</Content>
        <Content narrow>
          <Flex justify="end" columnGap="0.5rem">
            <Button onClick={onConfirm} variant="primary">
              {messages.confirm}
            </Button>
            <Button onClick={onCancel}>{messages.cancel}</Button>
          </Flex>
        </Content>
      </Modal>
    </LocaleProvider>
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
