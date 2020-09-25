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
  DialogOptions,
} from 'reakit/Dialog'

import { Box, BoxProps } from '../Box'
import { Text, TextProps } from '../Text'
import { Button } from '../Button'
import { IconClose } from '../../icons'

export { useDialogState as useModalState }

export function StatelessModal(props: StatelessModalProps) {
  const {
    children,
    state,
    size = 'regular',
    hideCloseButton = false,
    backdropSx = {},
    sx = {},
    ...baseProps
  } = props

  return (
    <DialogBackdrop
      sx={{ variant: 'overlay.modal.backdrop', ...backdropSx }}
      {...state}
    >
      <BaseDialog
        sx={{ variant: `overlay.modal.${size}`, ...sx }}
        {...state}
        {...baseProps}
      >
        {!hideCloseButton && (
          <Button
            onClick={state.hide}
            variant="text"
            icon={<IconClose />}
            sx={{
              color: 'text',
              position: 'absolute',
              top: 5,
              right: 9,
            }}
          />
        )}
        {children}
      </BaseDialog>
    </DialogBackdrop>
  )
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

StatelessModal.Title = function Title(props: TextProps) {
  return <Text el="h1" {...props} />
}

StatelessModal.Header = function Header(props: BoxProps) {
  return <Box el="header" {...props} />
}

StatelessModal.Content = function Content(props: BoxProps) {
  return <Box el="section" {...props} />
}

StatelessModal.Footer = function Footer(props: BoxProps) {
  return <Box el="footer" {...props} />
}

export interface StatelessModalProps
  extends Pick<DialogOptions, 'hideOnEsc' | 'hideOnClickOutside'> {
  /**
   * Component children
   */
  children: ReactNode
  /**
   * Return of useModalState hook
   */
  state: DialogStateReturn
  /**
   * Label of the modal
   */
  'aria-label': string
  /**
   * Modal size
   * @default regular
   */
  size?: 'small' | 'regular' | 'large'
  /**
   * If should hide the close button located on top-right
   * @default false
   */
  hideCloseButton?: boolean
  /**
   * Modal box styles
   * @default {}
   */
  sx?: SxStyleProp
  /**
   * Backdrop styles
   * @default {}
   */
  backdropSx?: SxStyleProp
}
