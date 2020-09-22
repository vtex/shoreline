/* eslint-disable react/jsx-handler-names */
/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import { Children, cloneElement, ReactNode } from 'react'
import {
  useDialogState,
  Dialog as BaseDialog,
  DialogBackdrop,
  DialogDisclosure,
  DialogStateReturn,
} from 'reakit/Dialog'
import { ButtonProps } from 'reakit/ts'

import { Box } from '../Box'
import { Text } from '../Text'
import { Button } from '../Button'
import { IconClose } from '../../icons'

export { useDialogState as useModalState }

function Header({
  children,
  title,
}: {
  children: ReactNode
  title?: ReactNode
}) {
  return (
    <Box
      display="flex"
      justify="between"
      items="center"
      py="9"
      px="13"
      bbc="muted.4"
      bbw="1"
      bbs="solid"
    >
      <Text variant="subtitle" sx={{ lineHeight: 0 }}>
        {title}
      </Text>
      {children}
    </Box>
  )
}

function ButtonClose(
  props: Omit<ButtonProps, 'variant' | 'icon' | 'iconPosition' | 'sx'>
) {
  return (
    <Button
      {...props}
      variant="subtle"
      icon={IconClose}
      sx={{ color: 'text' }}
    />
  )
}

function Footer({ children }: { children: ReactNode }) {
  return (
    <Box
      display="flex"
      justify="between"
      items="center"
      py="9"
      px="13"
      btc="muted.4"
      btw="1"
      bts="solid"
    >
      {children}
    </Box>
  )
}

function Content({ children }: { children: ReactNode }) {
  return (
    <Box pt="9" px="13" pb="13">
      {children}
    </Box>
  )
}

export function Disclosure({ children, ...props }: any) {
  // ensure we only have one children
  Children.only(children)

  return (
    <DialogDisclosure {...props} ref={children.ref} {...children.props}>
      {(disclosureProps) => cloneElement(children, disclosureProps)}
    </DialogDisclosure>
  )
}

export function Modal({
  children,
  size = 'regular',
  title,
  state,
  ...props
}: ModalProps) {
  const styles: SxStyleProp = {
    outline: 'none',
    bg: 'background',
    borderRadius: 3,
    borderColor: 'muted.4',
    borderStyle: 'solid',
    borderWidth: 1,
    width: {
      small: 320,
      regular: 560,
      large: 800,
    }[size],
  }

  const backdropStyles: SxStyleProp = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    bg: 'text',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999,
  }

  return (
    <DialogBackdrop sx={backdropStyles} {...state}>
      <BaseDialog sx={styles} {...state} {...props}>
        <Header title={title}>
          <ButtonClose onClick={state.hide} />
        </Header>
        {children}
      </BaseDialog>
    </DialogBackdrop>
  )
}

Modal.Content = Content
Modal.Footer = Footer

export interface ModalProps {
  children: any
  size?: 'small' | 'regular' | 'large'
  title?: ReactNode
  state: DialogStateReturn
}
