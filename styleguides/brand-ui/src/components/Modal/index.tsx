/** @jsx jsx */
import { jsx, Text, Flex, Box } from 'theme-ui'
import {
  Fragment,
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
import { DialogStateReturn } from 'reakit/ts'

import { Button, ButtonProps } from '../Button'
import { IconClose } from '../../icons/Close'

const backdropAnimation = css`
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`

const surfaceAnimation = css`
  transition: opacity 250ms ease-in-out;
  opacity: 0;
  &[data-enter] {
    opacity: 1;
  }
`

interface TitleProps {
  title: string
}

interface BottomBarProps {
  children: ReactNode | ReactNode[]
  variant?: 'modal' | 'dialog'
}

interface BodyProps {
  children: ReactNode | ReactNode[]
  variant?: 'modal' | 'dialog'
}

const Title = ({ title }: TitleProps) => {
  return (
    <Box variant="modal.title">
      <Text sx={{ fontSize: '.875rem' }}>{title}</Text>
    </Box>
  )
}

const ModalButton = (props: ButtonProps) => {
  const { children, ...args } = props

  return (
    <Button sx={{ marginLeft: '1rem' }} {...args}>
      {children}
    </Button>
  )
}

const BottomBar = ({ children, variant = 'modal' }: BottomBarProps) => {
  return <Flex variant={`modal.bottomBar.${variant}`}>{children}</Flex>
}

const Body = ({ children, variant = 'modal' }: BodyProps) => {
  return <Box variant={`modal.body.${variant}`}>{children}</Box>
}

export const Modal = ({
  children,
  title = '',
  disclosure,
  state,
  onClose,
  variant = 'modal',
}: ModalProps) => {
  const handleClose = () => {
    state.hide()
    if (onClose) {
      onClose()
    }
  }

  return (
    <Fragment>
      <DialogDisclosure {...state}>
        {(disclosureProps) => cloneElement(disclosure, { ...disclosureProps })}
      </DialogDisclosure>
      <DialogBackdrop
        {...state}
        css={state.animated && backdropAnimation}
        variant="modal.backdrop"
        as={Box}
      >
        <Dialog
          {...state}
          css={state.animated && surfaceAnimation}
          variant={`modal.box.${variant}`}
          as={Box}
          hideOnClickOutside={false}
        >
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
            onClick={handleClose}
          />
          {variant === 'modal' && <Title title={title} />}
          {children}
        </Dialog>
      </DialogBackdrop>
    </Fragment>
  )
}

Modal.Body = Body
Modal.BottomBar = BottomBar
Modal.Button = ModalButton

export interface ModalProps {
  /**
   * Modal content children
   */
  children: ReactNode | ReactNode[]
  /**
   * Modal disclosure
   */
  disclosure: FunctionComponentElement<unknown>
  /**
   * Return of useModalState hook
   */
  state: DialogStateReturn
  /**
   * Modal title, does not work on dialog variant
   */
  title?: string
  /**
   * Function to be run after the modal is closed
   */
  onClose?: () => void
  /**
   * Modal variant
   * @default 'modal'
   */
  variant?: 'modal' | 'dialog'
}

export { useDialogState as useModalState }
