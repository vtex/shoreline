import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Flex } from '../flex'
import { Content } from '../content'

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
 *          <ModalHeading>Title</ModalHeading>
 *        </ModalHeader>
 *      </Modal>
 *    </>
 *  )
 * }
 * ```
 */
export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function ModalHeader(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Content asChild data-sl-modal-header narrow ref={ref} {...otherProps}>
        <header>
          <Flex justify="space-between" align="center">
            {children}
          </Flex>
        </header>
      </Content>
    )
  }
)

export type ModalHeaderProps = ComponentPropsWithoutRef<'div'>
