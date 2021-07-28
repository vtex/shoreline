import type { ReactNode } from 'react'
import React, { useCallback } from 'react'
import { useSystem } from '@vtex/admin-core'
import type { StyleProp } from '@vtex/admin-core'

import type { ModalStateReturn } from './state'
import { ModalProvider } from './context'
import type { AbstractModalProps } from './components'
import {
  AbstractModal,
  AbstractModalBackdrop,
  ModalHeader,
  ModalButton,
  ModalFooter,
  ModalContent,
} from './components'
import type { ModalSize } from './types'
import { useComponentsExistence } from './util'
import type { SystemComponent } from '../../types'

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
    backdropCsx = {},
    csx = {},
    onClose = () => null,
    ...baseProps
  } = props

  const { cn } = useSystem()

  const handleClose = useCallback(() => {
    state.hide()
    onClose()
  }, [onClose, state])

  const backdropCn = cn({
    ...backdropCsx,
    themeKey: 'components.modal.backdrop',
  })

  const { hasHeader, hasFooter, scrollStyle } = useComponentsExistence(children)

  const modalCn = cn({
    ...scrollStyle,
    ...csx,
    themeKey: `components.modal.surface-${size}`,
  })

  return (
    <AbstractModalBackdrop className={backdropCn} {...state}>
      <AbstractModal className={modalCn} {...state} {...baseProps}>
        <ModalProvider
          value={{
            state,
            hasHeader,
            hasFooter,
            handleClose,
            size,
            omitCloseButton,
          }}
        >
          {children}
        </ModalProvider>
      </AbstractModal>
    </AbstractModalBackdrop>
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
StatelessModal.Header = ModalHeader

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
StatelessModal.Content = ModalContent

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
StatelessModal.Footer = ModalFooter

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
StatelessModal.Button = ModalButton

export interface StatelessModalProps
  extends AbstractModalProps,
    SystemComponent {
  /**
   * Component children
   */
  children: ReactNode
  /**
   * Return of useModalState hook
   */
  state: ModalStateReturn
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
   * Backdrop styles
   * @default {}
   */
  backdropCsx?: StyleProp
  /**
   * Action to dispatch on close modal
   * @default ()=>null
   */
  onClose?: () => void
}
