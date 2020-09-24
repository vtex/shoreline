/* eslint-disable react/jsx-handler-names */
/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  Children,
  cloneElement,
  FunctionComponentElement,
  ReactNode,
} from 'react'
import {
  useDialogState,
  Dialog as BaseDialog,
  DialogBackdrop,
  DialogDisclosure,
  DialogStateReturn,
} from 'reakit/Dialog'
import { ButtonProps } from 'reakit/ts'
import { rgba } from 'polished'

import colors from '../../theme/config/colors'
import { Box, BoxProps } from '../Box'
import { Text } from '../Text'
import { Button } from '../Button'
import { IconClose } from '../../icons'

export { useDialogState as useModalState }

export function Modal({
  children,
  size = 'regular',
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
    backgroundColor: rgba(colors.text, 0.95),
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
        {children}
      </BaseDialog>
    </DialogBackdrop>
  )
}

interface HeaderProps extends Omit<BoxProps, 'title'> {
  title?: ReactNode
  hide?: () => void
}

function Header(props: HeaderProps) {
  const { children, title, hide, ...boxProps } = props

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
      {...boxProps}
    >
      {title && (
        <Text variant="subtitle" sx={{ lineHeight: 0 }}>
          {title}
        </Text>
      )}
      {children}
      {hide && <ButtonClose onClick={hide} />}
    </Box>
  )
}

function ButtonClose(
  props: Omit<ButtonProps, 'variant' | 'icon' | 'iconPosition' | 'sx'>
) {
  return (
    <Button
      {...props}
      variant="text"
      icon={<IconClose />}
      sx={{ color: 'text' }}
    />
  )
}

function Footer(props: BoxProps) {
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
      {...props}
    />
  )
}

function Content(props: BoxProps) {
  return <Box pt="9" px="13" pb="13" {...props} />
}

interface ModalDisclosureProps extends DialogStateReturn {
  children: FunctionComponentElement<unknown>
}

export function ModalDisclosure(props: ModalDisclosureProps) {
  const { children, ...baseProps } = props

  Children.only(children)

  return (
    <DialogDisclosure {...baseProps} ref={children.ref} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </DialogDisclosure>
  )
}

Modal.Header = Header
Modal.Content = Content
Modal.Footer = Footer

export interface ModalProps {
  children: ReactNode
  size?: 'small' | 'regular' | 'large'
  state: DialogStateReturn
}
