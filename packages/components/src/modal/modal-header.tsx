import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { DialogDismiss, DialogHeading } from '@ariakit/react'
import { Flex } from '../flex'
import { IconButton } from '../icon-button'
import { IconX } from '@vtex/shoreline-icons'
import { Bleed } from '../bleed'
import { Header } from '../header'

export const ModalHeader = forwardRef<HTMLDivElement, ModalHeaderProps>(
  function Modal(props, ref) {
    const { children, ...otherProps } = props

    return (
      <Header data-sl-modal-header narrow {...otherProps} ref={ref}>
        <Flex justify="space-between">
          <DialogHeading data-sl-modal-title>{children}</DialogHeading>
          <Bleed vertical horizontal>
            <IconButton variant="tertiary" label="close" asChild>
              <DialogDismiss>
                <IconX />
              </DialogDismiss>
            </IconButton>
          </Bleed>
        </Flex>
      </Header>
    )
  }
)

export type ModalHeaderProps = ComponentPropsWithoutRef<'div'>
