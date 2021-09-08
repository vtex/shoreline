import type { ReactNode, ComponentPropsWithRef } from 'react'
import React, { useMemo } from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'
import { IconClose } from '@vtex/admin-ui-icons'
import { tag, jsx } from '@vtex/admin-ui-react'

import { Box } from '../../Box'
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
export const ModalHeader = jsx.header(
  {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'mid.tertiary',
    borderStyle: 'solid',
    'button + button': {
      marginLeft: 4,
    },
    paddingY: 4,
    paddingX: 6,
    borderTopWidth: '0px',
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 1,
    h1: {
      variant: 'text.subtitle',
      lineHeight: 0,
    },
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    bg: 'light.primary',
    zIndex: 999,
  },
  {
    options: ['title', 'containerCsx'],
    useOptions(options: ModalHeaderOptions, props) {
      const { title = null, containerCsx = {} } = options
      const { children, csx = {}, ...headerProps } = props

      const { omitCloseButton, size } = useModalContext()

      const renderTitle = useMemo(() => {
        if (typeof title === 'string') {
          return <Box csx={{ text: 'headline' }}>{title}</Box>
        }

        return title
      }, [title])

      return {
        ...headerProps,
        csx: {
          height: size === 'large' ? 80 : 56,
          ...csx,
        },
        children: (
          <>
            {renderTitle}
            <tag.div
              csx={{
                display: 'flex',
                alignItems: 'center',
                ...containerCsx,
              }}
            >
              {children}
              {!omitCloseButton && (
                <ModalButton
                  closeModalOnClick
                  variant="adaptative-dark"
                  icon={<IconClose />}
                />
              )}
            </tag.div>
          </>
        ),
      }
    },
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
