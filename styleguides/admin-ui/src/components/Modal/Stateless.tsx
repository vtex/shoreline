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
 * Modal Header
 */
StatelessModal.Header = function Header(
  props: Omit<BoxProps, 'title'> & {
    /**
     * Title of the modal
     * @default null
     */
    title?: ReactNode
    /**
     * Styles of the button container
     * @default {}
     */
    containerSx?: SxStyleProp
  }
) {
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
            size="small"
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

StatelessModal.Content = function Content(props: BoxProps) {
  return <Box el="section" {...props} />
}

StatelessModal.Footer = function Footer(props: BoxProps) {
  return <Box el="footer" {...props} />
}

/**
 * Button capable of close the modal when clicked
 * It's a fully capable admin-ui/Button
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
  props: ButtonProps & {
    /**
     * If it should close the modal on click
     * @default false
     */
    closeModalOnClick?: boolean
  },
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
