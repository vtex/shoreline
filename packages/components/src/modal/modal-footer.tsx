import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Content } from '../content'
import './modal-footer.css'

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
