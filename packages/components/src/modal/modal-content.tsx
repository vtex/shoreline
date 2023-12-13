import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import './modal-content.css'
import { Content } from '../content'

/**
 * Content of the Modal
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
 *        <ModalContent>Content</ModalContent>
 *      </Modal>
 *    </>
 *  )
 * }
 * ```
 */
export const ModalContent = forwardRef<HTMLDivElement, ModalContentProps>(
  function ModalContent(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Content data-sl-modal-content ref={ref} {...otherProps}>
        {children}
      </Content>
    )
  }
)

export type ModalContentProps = ComponentPropsWithoutRef<'div'>
