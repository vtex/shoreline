import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { DialogHeading } from '@ariakit/react'

import { Heading } from '../heading'

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
export const ModalTitle = forwardRef<HTMLHeadingElement, ModalTitleProps>(
  function ModalTitle(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Heading asChild ref={ref} variant="display2" {...otherProps}>
        <DialogHeading data-sl-modal-title>{children}</DialogHeading>
      </Heading>
    )
  }
)

export type ModalTitleProps = ComponentPropsWithoutRef<'h1'>
