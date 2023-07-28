import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import {
  Button,
  Modal,
  ModalContent,
  ModalDismiss,
  ModalHeader,
  ModalTitle,
  modalTheme,
} from '@vtex/admin-ui'
import { IconDotsThreeVertical } from '@vtex/phosphor-icons'
import type { TopbarOptionsState } from './use-options'
import { backdropTheme } from './options.css'

export function Options(props: OptionsProps) {
  const { state, children } = props

  return (
    <>
      <Button
        icon={<IconDotsThreeVertical />}
        variant="neutralTertiary"
        onClick={state.toggle}
      />

      <Modal
        state={state}
        className={modalTheme}
        backdropProps={{
          className: backdropTheme,
        }}
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

interface OptionsProps extends ComponentPropsWithoutRef<'div'> {
  state: TopbarOptionsState
}
