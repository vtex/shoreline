/** @jsx jsx */
import { jsx } from 'theme-ui'
import { forwardRef, Ref, MouseEvent } from 'react'

import { Button, ButtonProps } from '../../Button'
import { useModalContext } from '../context'

/**
 * Button capable of close the modal when clicked
 * It implements an admin-ui/Button, with all its features
 * @example
 * ```jsx
 * import { StatelessModal, useModalState } from `@vtex/admin-ui`
 *
 * const state = useModalState()
 * <StatelessModal state={state}>
 *    <StatelessModal.Content>
 *      <StatelessModal.Button closeModalOnClick>Save</StatelessModal.Button>
 *    <StatelessModal.Content>
 * </StatelessModal>
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

  const handleClick = (event: MouseEvent<unknown, globalThis.MouseEvent>) => {
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
