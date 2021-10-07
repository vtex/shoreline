import type { ReactNode } from 'react'
import React, { useCallback } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'
import type { DialogOptions } from 'reakit/Dialog'
import { Dialog, DialogBackdrop } from 'reakit/Dialog'
import { tag } from '@vtex/admin-ui-react'

import type { ModalStateReturn } from '../state'
import { ModalProvider } from './ModalContext'
import type { ModalSize } from '../types'
import { useComponentsExistence } from '../util'
import type { SystemComponent } from '../../../types'

const widths = {
  mobile: 'calc(100% - 16px)',
  small: 320,
  regular: 560,
  large: 800,
}

/**
 * Stateless Modal
 * Must be used with ModalDisclosure and useModalState.
 * Composites: ModalHeader, ModalContent, ModalFooter, & ModalButton
 *
 * @example
 * ```jsx
 * import { Modal, useModalState, ModalDisclosure } from `@vtex/admin-ui`
 *
 * const state = useModalState()
 *
 * <ModalDisclosure {...state}>
 *  <button>Open Modal</button>
 * </ModalDisclosure>
 *
 * <Modal state={state}>
 *  <ModalHeader title="Title" />
 *  <ModalContent>
 *   Example
 *  </ModalContent>
 * </StatelessModal>
 * ```
 */
export function Modal(props: ModalProps) {
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

  const handleClose = useCallback(() => {
    state.hide()
    onClose()
  }, [onClose, state])

  const { hasHeader, hasFooter, scrollStyle } = useComponentsExistence(children)

  const width = {
    small: [widths.mobile, widths.mobile, widths.small],
    regular: [widths.mobile, widths.mobile, widths.regular],
    large: [widths.mobile, widths.mobile, widths.large],
  }[size]

  return (
    <tag.div
      as={DialogBackdrop}
      csx={{
        ...backdropCsx,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: ['flex-end', 'flex-end', 'center'],
        alignItems: 'center',
        bg: 'dialog.modalBackdrop',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        opacity: 0,
        transition: 'fade',
        '&[data-enter]': {
          opacity: 1,
        },
      }}
      state={state}
    >
      <tag.div
        as={Dialog}
        csx={{
          width,
          outline: 'none',
          bg: 'base',
          borderRadius: 3,
          borderColor: 'base',
          borderStyle: 'solid',
          borderWidth: 1,
          position: 'relative',
          overflowY: 'auto',
          overflowX: 'hidden',
          maxHeight: '3/4',
          margin: 2,
          opacity: 0,
          transform: 'translate3d(0, 48px, 0)',
          transition: 'pop',
          '&[data-enter]': {
            opacity: 1,
            transform: 'translate3d(0, 0, 0)',
          },
          ...scrollStyle,
          ...csx,
        }}
        state={state}
        {...baseProps}
      >
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
      </tag.div>
    </tag.div>
  )
}

export interface ModalProps
  extends Pick<DialogOptions, 'hideOnEsc' | 'hideOnClickOutside'>,
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
