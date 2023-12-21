import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { DialogHeading } from '@ariakit/react'

import type { HeadingProps } from '../heading'
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
 *          <ModalHeading>Heading</ModalHeading>
 *          <ModalDismiss />
 *        </ModalHeader>
 *      </Modal>
 *    </>
 *  )
 * }
 * ```
 */
export const ModalHeading = forwardRef<HTMLHeadingElement, ModalHeadingProps>(
  function ModalHeading(props, ref) {
    const { children, variant = 'display2', ...otherProps } = props

    return (
      <Heading asChild ref={ref} variant={variant} {...otherProps}>
        <DialogHeading data-sl-modal-title>{children}</DialogHeading>
      </Heading>
    )
  }
)

export type ModalHeadingProps = ComponentPropsWithoutRef<'h1'> &
  Pick<HeadingProps, 'variant'>
