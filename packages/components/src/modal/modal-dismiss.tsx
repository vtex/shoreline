import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { DialogDismiss } from '@ariakit/react'

import { IconButton } from '../icon-button'
import { IconX } from '@vtex/shoreline-icons'
import { Bleed } from '../bleed'

/**
 * Header of the Modal
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
 *        <ModalHeader>
 *          <ModalTitle>Title</ModalTitle>
 *          <ModalDismiss />
 *        </ModalHeader>
 *      </Modal>
 *    </>
 *  )
 * }
 * ```
 */
export const ModalDismiss = forwardRef<HTMLButtonElement, ModalDismissProps>(
  function ModalDismiss(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Bleed right>
        <IconButton
          data-sl-modal-dismiss-button
          variant="tertiary"
          label="close"
          asChild
          {...otherProps}
          ref={ref}
        >
          <DialogDismiss>
            <IconX />
          </DialogDismiss>
        </IconButton>
      </Bleed>
    )
  }
)

export type ModalDismissProps = ComponentPropsWithoutRef<'button'>
