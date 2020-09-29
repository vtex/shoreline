/** @jsx jsx */
import { jsx, SxStyleProp } from 'theme-ui'
import {
  Children,
  cloneElement,
  forwardRef,
  FunctionComponentElement,
  ReactNode,
  Ref,
  MouseEvent,
  useMemo,
  useCallback,
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
import { Text } from '../Text'
import { Button, ButtonProps } from '../Button'
import { IconClose } from '../../icons'
import { ModalProvider, useModalContext } from './context'

export { useDialogState as useModalState }

/**
 * Stateless Modal
 * Must be used with ModalDisclosure and useModalState.
 * Composites: Modal.Header, Modal.Content, Modal.Footer, & Modal.Button
 * @example
 * ```jsx
 * import { StatelessModal, useModalState, ModalDisclosure } from `@vtex/admin-ui`
 *
 * const state = useModalState()
 *
 * <ModalDisclosure {...state}>
 *  <button>Open Modal</button>
 * </ModalDisclosure>
 *
 * <StatelessModal state={state}>
 *  <StatelessModal.Content>
 *   Example
 *  </StatelessModal.Content>
 * </StatelessModal>
 * ```
 */
export function StatelessModal(props: StatelessModalProps) {
  const {
    children,
    state,
    size = 'regular',
    omitCloseButton = false,
    backdropSx = {},
    sx = {},
    onClose = () => null,
    ...baseProps
  } = props

  const handleClose = useCallback(() => {
    state.hide()
    onClose()
  }, [onClose, state])

  return (
    <DialogBackdrop
      sx={{ variant: 'overlay.modal.backdrop', ...backdropSx }}
      {...state}
    >
      <BaseDialog
        sx={{
          variant: `overlay.modal.${size}`,
          ...sx,
        }}
        {...state}
        {...baseProps}
      >
        <ModalProvider value={{ state, handleClose, omitCloseButton }}>
          {children}
        </ModalProvider>
      </BaseDialog>
    </DialogBackdrop>
  )
}

/**
 * Toggle StatelessModal visibility
 *
 * @example
 * ```jsx
 * import { useModalState, ModalDisclosure } from `@vtex/admin-ui`
 *
 * const state = useModalState()
 * <ModalDisclosure {...state}>
 *  <button>Open Modal</button>
 * </ModalDisclosure>
 * ```
 */
export function ModalDisclosure(
  props: DialogStateReturn & { children: FunctionComponentElement<unknown> }
) {
  const { children, ...baseProps } = props

  Children.only(children)

  return (
    <DialogDisclosure {...baseProps} ref={children.ref} {...children.props}>
      {(enhancedProps) => cloneElement(children, enhancedProps)}
    </DialogDisclosure>
  )
}

/**
 * Header of the modal
 * Renders a header element
 * @example
 * ```jsx
 * import { StatelessModal } from `@vtex/admin-ui`
 * <StatelessModal>
 *  <StatelessModal.Header title="Example">
 *    <Button>Cancel</Button>
 *  </StatelessModal.Header>
 * </StatelessModal>
 * ```
 */
StatelessModal.Header = function Header(props: ModalHeaderProps) {
  const { children, title = null, containerSx = {}, ...boxProps } = props
  const { omitCloseButton } = useModalContext()

  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return <Text el="h1">{title}</Text>
    }

    return title
  }, [title])

  return (
    <Box el="header" {...boxProps}>
      {renderTitle}
      <Box sx={containerSx} display="flex" items="center">
        {children}
        {!omitCloseButton && (
          <StatelessModal.Button
            closeModalOnClick
            variant="text"
            icon={<IconClose />}
            sx={{
              color: 'text',
            }}
          />
        )}
      </Box>
    </Box>
  )
}

/**
 * Content of the modal
 * Renders a section element
 * @example
 * ```jsx
 * import { StatelessModal } from `@vtex/admin-ui`
 * <StatelessModal>
 *  <StatelessModal.Content>
 *    <Button>Cancel</Button>
 *  </StatelessModal.Content>
 * </StatelessModal>
 * ```
 */
StatelessModal.Content = function Content(props: ModalContentProps) {
  return <Box el="section" {...props} />
}

/**
 * Footer of the modal
 * Renders a footer element
 * @example
 * ```jsx
 * import { StatelessModal } from `@vtex/admin-ui`
 * <StatelessModal>
 *  <StatelessModal.Footer>
 *    <Button>Cancel</Button>
 *  </StatelessModal.Footer>
 * </StatelessModal>
 * ```
 */
StatelessModal.Footer = function Footer(props: ModalFooterProps) {
  return <Box el="footer" {...props} />
}

/**
 * Button capable of close the modal when clicked
 * It implements an admin-ui/Button, with all its features
 * @example
 * ```jsx
 * import { StatelessModal, useModalState } from `@vtex/admin-ui`
 *
 * const state = useModalState()
 * <StatelessModal state={state}>
 *    <StatelessModal.Content>
 *      <StatelessModal.Button closeModalOnClick>Save</StatelessModal.Button>
 *    <StatelessModal.Content>
 * </StatelessModal>
 * ```
 */
StatelessModal.Button = forwardRef(function ModalButton(
  props: ModalButtonProps,
  ref: Ref<HTMLButtonElement>
) {
  const {
    closeModalOnClick = false,
    onClick = () => null,
    ...buttonProps
  } = props

  const { handleClose } = useModalContext()

  const handleClick = (event: MouseEvent<unknown, globalThis.MouseEvent>) => {
    onClick(event)

    if (closeModalOnClick) {
      handleClose()
    }
  }

  return <Button onClick={handleClick} ref={ref} {...buttonProps} />
})

export interface ModalHeaderProps extends Omit<BoxProps, 'title'> {
  /**
   * Title of the modal
   * @default null
   */
  title?: ReactNode
  /**
   * Styles of the buttons container
   * @default {}
   */
  containerSx?: SxStyleProp
}
export interface ModalButtonProps extends ButtonProps {
  /**
   * If it should close the modal on click
   * @default false
   */
  closeModalOnClick?: boolean
}

export type ModalContentProps = BoxProps
export type ModalFooterProps = BoxProps

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
   * If should omit the close button located on top-right
   * @default false
   */
  omitCloseButton?: boolean
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
  /**
   * Action to dispatch on close modal
   * @default ()=>null
   */
  onClose?: () => void
}
