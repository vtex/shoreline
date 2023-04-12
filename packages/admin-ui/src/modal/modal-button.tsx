import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import type { DialogDismissOptions } from 'ariakit'
import { useDialogDismiss } from 'ariakit'

import type { ButtonProps } from '../button'
import { Button } from '../button'

const ModalButton = forwardRef(
  (props: ModalButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { dismissModal = false, ...restProps } = props
    const { children } = restProps

    const dismissProps = useDialogDismiss(restProps as DialogDismissOptions)
    const buttonProps = dismissModal ? { ...dismissProps, children } : restProps

    return <Button ref={ref} {...buttonProps} />
  }
)

ModalButton.displayName = 'ModalButton'

type ModalButtonProps = ButtonProps & {
  dismissModal?: boolean
}

export { ModalButton }
export type { ModalButtonProps }
