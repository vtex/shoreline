import type { ReactNode, ComponentPropsWithRef } from 'react'
import React, { useMemo } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'
import { IconX } from '@vtex/phosphor-icons'
import { useElement, createComponent } from '@vtex/admin-ui-react'

import { Box } from '../../../box'
import { useModalContext } from './ModalContext'
import { ModalButton } from './ModalButton'

/**
 * Header of the modal
 * Renders a header element
 * @example
 * ```jsx
 * import { Modal } from `@vtex/admin-ui`
 *
 * <Modal>
 *  <ModalHeader title="Example">
 *    <Button>Cancel</Button>
 *  </ModalHeader>
 * </Modal>
 * ```
 */
export const ModalHeader = createComponent<'header', ModalHeaderOptions>(
  (props) => {
    const {
      children,
      title = null,
      containerCsx = {},
      csx = {},
      ...restProps
    } = props

    const { omitCloseButton, size } = useModalContext()

    const renderTitle = useMemo(() => {
      if (typeof title === 'string') {
        return <Box csx={{ text: '$title1' }}>{title}</Box>
      }

      return title
    }, [title])

    return useElement('header', {
      ...restProps,
      baseStyle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '$neutral',
        'button + button': {
          marginLeft: '$4',
        },
        paddingY: '$4',
        paddingX: '$6',
        h1: {
          lineHeight: 0,
        },
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        bg: '$primary',
        zIndex: 999,
        height: size === 'large' ? 80 : 56,
      },
      children: (
        <>
          {renderTitle}
          <Box
            csx={{
              display: 'flex',
              alignItems: 'center',
              ...containerCsx,
            }}
          >
            {children}
            {!omitCloseButton && (
              <ModalButton
                variant="neutralTertiary"
                closeModalOnClick
                icon={<IconX />}
              />
            )}
          </Box>
        </>
      ),
    })
  }
)

export interface ModalHeaderOptions {
  /**
   * Title of the modal
   * @default null
   */
  title?: ReactNode
  /**
   * Styles of the buttons container
   * @default {}
   */
  containerCsx?: StyleProp
}

export type ModalHeaderProps = ComponentPropsWithRef<typeof ModalHeader> &
  ModalHeaderOptions
