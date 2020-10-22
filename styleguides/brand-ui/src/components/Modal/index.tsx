/** @jsx jsx */
import { jsx, Text, Flex, Box } from 'theme-ui'
import {
  Fragment,
  MouseEvent,
  cloneElement,
  ReactNode,
  FunctionComponentElement,
} from 'react'
import {
  useDialogState,
  Dialog,
  DialogDisclosure,
  DialogBackdrop,
} from 'reakit/Dialog'
import { css } from '@emotion/core'

import { Button } from '../Button'
import { IconClose } from '../../icons/Close'

const backdropAnimation = css`
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`

const surfaceAnimation = css`
  transition: opacity 250ms ease-in-out, transform 250ms ease-in-out 50ms;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`

interface TitleProps {
  handleClick: () => void
  title: string
}

interface ActionsBarProps {
  handleClose: () => void
  handleConfirm: (event: MouseEvent<unknown, globalThis.MouseEvent>) => void
  confirmLabel: string
}

const Title = ({ title, handleClick }: TitleProps) => {
  return (
    <Box variant="modal.title">
      <Button
        icon={() => <IconClose size={39} />}
        sx={{
          position: 'absolute',
          right: '1.25rem',
          top: '1.25rem',
          color: 'secondary.base',
          padding: '0',
          height: 'auto',
        }}
        variant="tertiary"
        onClick={handleClick}
      />
      <Text sx={{ fontSize: '.875rem' }}>{title}</Text>
    </Box>
  )
}

const ActionsBar = ({
  handleClose,
  handleConfirm,
  confirmLabel,
}: ActionsBarProps) => {
  const handleClick = (event: MouseEvent<unknown, globalThis.MouseEvent>) => {
    handleConfirm(event)
    handleClose()
  }

  return (
    <Flex variant="modal.actionsBar">
      <Button
        variant="tertiary"
        sx={{
          bg: 'transparent',
          color: 'secondary.base',
          marginX: '1rem',
        }}
        onClick={handleClose}
      >
        Cancel
      </Button>
      <Button variant="primary" onClick={handleClick}>
        {confirmLabel}
      </Button>
    </Flex>
  )
}

export const Modal = ({
  children,
  title,
  disclosure,
  onConfirm,
  confirmLabel = 'Confirm',
}: ModalProps) => {
  const dialog = useDialogState({ animated: true })

  const handleClose = () => {
    dialog.hide()
  }

  return (
    <Fragment>
      <DialogDisclosure {...dialog}>
        {(disclosureProps) => cloneElement(disclosure, { ...disclosureProps })}
      </DialogDisclosure>
      <DialogBackdrop
        {...dialog}
        css={backdropAnimation}
        variant="modal.backdrop"
        as={Box}
      >
        <Dialog
          {...dialog}
          aria-label="Welcome"
          css={surfaceAnimation}
          variant="modal.dialog"
          as={Box}
        >
          <Title handleClick={handleClose} title={title} />
          <Box variant="modal.body">{children}</Box>
          <ActionsBar
            handleClose={handleClose}
            handleConfirm={onConfirm}
            confirmLabel={confirmLabel}
          />
        </Dialog>
      </DialogBackdrop>
    </Fragment>
  )
}

export interface ModalProps {
  /**
   * Modal content children
   */
  children: ReactNode
  /**
   * Modal disclosure
   */
  disclosure: FunctionComponentElement<unknown>
  /**
   * Modal title
   */
  title: string
  /**
   * Function run when the `confirm` button is clicked
   */
  onConfirm: () => void
  /**
   * Confirm button label
   */
  confirmLabel?: string
}
