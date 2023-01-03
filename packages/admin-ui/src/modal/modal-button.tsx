import type { Ref } from 'react'
import React, { forwardRef } from 'react'
import { cx, csx } from '@vtex/admin-ui-core'
import { DialogDismiss, Button } from 'ariakit'

import type { ButtonProps } from '../button'
import { useButton } from '../button'
import type { AnyObject } from '@vtex/admin-ui-util'

const ModalButton = forwardRef(
  (props: ModalButtonProps, ref: Ref<HTMLButtonElement>) => {
    const { className = '', dismissModal = false, ...htmlProps } = props
    const { baseStyle = {}, ...buttonHtmlProps } = useButton(htmlProps)

    const buttonProps: AnyObject = {
      ref,
      className: cx(csx(baseStyle), className),
      ...buttonHtmlProps,
    }

    const Component = dismissModal ? DialogDismiss : Button

    return <Component {...buttonProps} />
  }
)

ModalButton.displayName = 'ModalButton'

type ModalButtonProps = ButtonProps & {
  dismissModal?: boolean
}

export { ModalButton }
export type { ModalButtonProps }
