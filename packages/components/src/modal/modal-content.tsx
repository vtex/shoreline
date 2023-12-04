import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

import { Content } from '../content'
import './modal-content.css'

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
