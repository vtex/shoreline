import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { DialogDismiss, DialogHeading } from '@ariakit/react'
import { IconX } from '@vtex/shoreline-icons'

import { Flex } from '../flex'
import { IconButton } from '../icon-button'
import { Bleed } from '../bleed'
import { Content } from '../content'
import './modal-header.css'
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
 *        <ModalHeader>Title</ModalHeader>
 *      </Modal>
 *    </>
 *  )
 * }
 * ```
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function Modal(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Content asChild data-sl-modal-header narrow ref={ref} {...otherProps}>
        <header>
          <Flex justify="space-between">
            <Heading asChild variant="display2">
              <DialogHeading data-sl-modal-title>{children}</DialogHeading>
            </Heading>
            <Bleed vertical horizontal>
              <IconButton variant="tertiary" label="close" asChild>
                <DialogDismiss>
                  <IconX />
                </DialogDismiss>
              </IconButton>
            </Bleed>
          </Flex>
        </header>
      </Content>
    )
  }
)

export type ModalHeaderProps = ComponentPropsWithoutRef<'div'>
