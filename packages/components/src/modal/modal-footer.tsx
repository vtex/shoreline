import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Content } from '../content'

/**
 * Footer of the Modal
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
 *        <ModalFooter>
 *          <Button>Ok</Button>
 *        </ModalFooter>
 *      </Modal>
 *    </>
 *  )
 * }
 * ```
 */
export const ModalFooter = forwardRef<HTMLDivElement, ModalFooterProps>(
  function ModalFooter(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Content data-sl-modal-footer narrow ref={ref} {...otherProps}>
        {children}
      </Content>
    )
  }
)

export type ModalFooterProps = ComponentPropsWithoutRef<'div'>
