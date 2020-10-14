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
  createRef,
  ReactElement,
} from 'react'
import {
  useDialogState,
  Dialog as BaseDialog,
  DialogBackdrop,
  DialogDisclosure,
  DialogStateReturn,
  DialogOptions,
} from 'reakit/Dialog'

import { IconClose } from '../../icons'
import { Box, BoxProps } from '../Box'
import { Text } from '../Text'
import { Button, ButtonProps } from '../Button'
import { ModalProvider, useModalContext } from './context'

export { useDialogState as useModalState }

function isReactElement(
  child: ReactNode
): child is Omit<ReactElement, 'type'> & { type: { displayName: string } } {
  if ((child as ReactElement).type) {
    return true
  } else {
    return false
  }
}

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
  let hasHeader = false
  let hasFooter = false

  const handleClose = useCallback(() => {
    state.hide()
    onClose()
  }, [onClose, state])

  Children.forEach(children, function (child) {
    const displayName = isReactElement(child) && child.type.displayName

    if (displayName === 'Modal.Header' || displayName === 'Stateless.Modal') {
      hasHeader = true
      Object.assign(sx, { overflowY: 'hidden' })
    }

    if (displayName === 'Modal.Footer' || displayName === 'Stateless.Footer') {
      hasFooter = true
      Object.assign(sx, { overflowY: 'hidden' })
    }
  })

  return (
    <DialogBackdrop
      sx={{ variant: 'overlay.modal.backdrop', ...backdropSx }}
      {...state}
    >
      <BaseDialog
        sx={{
          variant: `overlay.modal.surface-${size}`,
          ...sx,
        }}
        {...state}
        {...baseProps}
      >
        <ModalProvider
          value={{
            state,
            handleClose,
            size,
            omitCloseButton,
            hasHeader,
            hasFooter,
          }}
        >
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
  const {
    children,
    title = null,
    containerSx = {},
    sx = {},
    ...boxProps
  } = props

  const { omitCloseButton, size } = useModalContext()

  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return <Text el="h1">{title}</Text>
    }

    return title
  }, [title])

  return (
    <Box
      el="header"
      sx={{ variant: `overlay.modal.header-${size}`, ...sx }}
      {...boxProps}
    >
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
  const { sx, ...boxProps } = props
  const contentRef = createRef<HTMLDivElement>()
  const { hasHeader, hasFooter, size } = useModalContext()

  let scrollSize = ''

  if (hasHeader && hasFooter) {
    if (size === 'small' || size === 'regular') {
      scrollSize = '-with-larger-scroll'
    } else {
      scrollSize = '-with-extra-large-scroll'
    }
  } else if (hasHeader || hasFooter) {
    scrollSize = `-with-${size}-scroll`
  }

  return (
    <Box
      ref={contentRef}
      sx={{
        variant: `overlay.modal.content${scrollSize}`,
        ...sx,
      }}
      {...boxProps}
    />
  )
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
  const { sx, ...boxProps } = props
  const { size } = useModalContext()

  return (
    <Box
      el="footer"
      sx={{ variant: `overlay.modal.footer-${size}`, ...sx }}
      {...boxProps}
    />
  )
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
export type ModalSize = 'small' | 'regular' | 'large'

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
  size?: ModalSize
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
