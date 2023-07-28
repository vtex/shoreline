import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalDismiss,
  ModalHeader,
  ModalTitle,
  cx,
} from '@vtex/admin-ui'
import { IconDotsThreeVertical } from '@vtex/phosphor-icons'
import type { ActionsState } from './use-actions'
import { backdropTheme, modalTheme } from './actions.css'

export function Actions(props: ActionsProps) {
  const { state, children, className = '', ...restProps } = props

  return (
    <>
      <Button
        icon={<IconDotsThreeVertical />}
        variant="neutralTertiary"
        onClick={state.toggle}
      />

      <Modal
        state={state}
        className={cx(modalTheme, className)}
        backdropProps={{
          className: backdropTheme,
        }}
        {...restProps}
      >
        <ModalHeader>
          <ModalTitle>{state.title}</ModalTitle>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
      </Modal>
    </>
  )
}

interface ActionsProps extends ComponentPropsWithoutRef<'div'> {
  state: ActionsState
}
