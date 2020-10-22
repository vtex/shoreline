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

interface BottomBarProps {
  children: ReactNode[]
}

interface BodyProps {
  children: ReactNode[]
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

const ModalButton = (props: ButtonProps) => {
  const { children, ...args } = props

  return (
    <Button sx={{ marginLeft: '1rem' }} {...args}>
      {children}
    </Button>
  )
}

const BottomBar = ({ children }: BottomBarProps) => {
  return <Flex variant="modal.actionsBar">{children}</Flex>
}

const Body = ({ children }: BodyProps) => {
  return <Box variant="modal.body">{children}</Box>
}

export const Modal = ({
  children,
  title,
  disclosure,
  modalState,
}: ModalProps) => {
  return (
    <Fragment>
      <DialogDisclosure {...modalState}>
        {(disclosureProps) => cloneElement(disclosure, { ...disclosureProps })}
      </DialogDisclosure>
      <DialogBackdrop
        {...modalState}
        css={modalState.animated && backdropAnimation}
        variant="modal.backdrop"
        as={Box}
      >
        <Dialog
          {...modalState}
          css={modalState.animated && surfaceAnimation}
          variant="modal.dialog"
          as={Box}
        >
          <Title handleClick={modalState.hide} title={title} />
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
  children: ReactNode[]
  /**
   * Modal disclosure
   */
  disclosure: FunctionComponentElement<unknown>
  /**
   * Modal title
   */
  title: string
  /**
   * Return of useModalState hook
   */
  modalState: DialogStateReturn
}

export { useDialogState as useModalState }
