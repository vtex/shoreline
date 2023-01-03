import type { ComponentPropsWithoutRef, Ref } from 'react'
import React, { forwardRef } from 'react'
import { IconX } from '@vtex/phosphor-icons'
import { ModalButton } from './modal-button'

const ModalDismiss = forwardRef(
  (props: ModalDismissProps, ref: Ref<HTMLButtonElement>) => {
    const { className = '', ...htmlProps } = props

    return (
      <ModalButton
        {...htmlProps}
        ref={ref}
        dismissModal
        className={className}
        variant="neutralTertiary"
        icon={<IconX />}
        bleedX
        bleedY
      />
    )
  }
)

ModalDismiss.displayName = 'ModalDismiss'

type ModalDismissProps = ComponentPropsWithoutRef<'button'>

export { ModalDismiss }
export type { ModalDismissProps }
