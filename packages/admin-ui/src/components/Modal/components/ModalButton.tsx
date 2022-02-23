import type { Ref, MouseEvent } from 'react'
import React, { forwardRef } from 'react'

import type { ButtonProps } from '../../../button'
import { Button } from '../../../button'
import { useModalContext } from './ModalContext'

/**
 * Button capable of close the modal when clicked
 * It implements an admin-ui/Button, with all its features
 *
 * @example
 * ```jsx
 * import { Modal, useModalState } from `@vtex/admin-ui`
 *
 * const state = useModalState()
 *
 * <Modal state={state}>
 *    <ModalContent>
 *      <ModalButton closeModalOnClick>Save</ModalButton>
 *    <ModalContent>
 * </Modal>
 * ```
 */
export const ModalButton = forwardRef(function ModalButton(
  props: ModalButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    closeModalOnClick = false,
    onClick = () => null,
    ...buttonProps
  } = props

  const { handleClose } = useModalContext()

  const handleClick = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    onClick(event)

    if (closeModalOnClick) {
      handleClose()
    }
  }

  return <Button onClick={handleClick} ref={ref} {...buttonProps} />
})

export interface ModalButtonProps extends ButtonProps {
  /**
   * If it should close the modal on click
   * @default false
   */
  closeModalOnClick?: boolean
}
