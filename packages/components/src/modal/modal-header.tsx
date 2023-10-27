import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { DialogHeading } from '@ariakit/react'
import { Flex } from '../flex'
import { IconButton } from '../icon-button'
import { IconX } from '@vtex/shoreline-icons'
import { Bleed } from '../bleed'
import { Content } from '../content'

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function Modal(props, ref) {
    const { children, onClose, ...otherProps } = props

    return (
      <Content data-sl-modal-header narrow {...otherProps} ref={ref}>
        <Flex justify="space-between">
          <DialogHeading data-sl-title>{children}</DialogHeading>
          <Bleed vertical horizontal>
            <IconButton
              bleed-x
              bleed-y
              variant="tertiary"
              label="close"
              onClick={onClose}
            >
              <IconX />
            </IconButton>
          </Bleed>
        </Flex>
      </Content>
    )
  }
)

export interface ModalHeaderProps extends ComponentPropsWithoutRef<'div'> {
  onClose?: () => void
}
