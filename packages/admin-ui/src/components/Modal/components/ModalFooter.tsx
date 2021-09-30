import type { ComponentPropsWithRef } from 'react'
import { jsx } from '@vtex/admin-ui-react'

import { useModalContext } from './ModalContext'

/**
 * Footer of the modal
 * Renders a footer element
 * @example
 * ```jsx
 * import { Modal } from `@vtex/admin-ui`
 *
 * <Modal>
 *  <ModalFooter>
 *    <Button>Cancel</Button>
 *  </ModalFooter>
 * </Modal>
 * ```
 */
export const ModalFooter = jsx('footer')(
  {
    borderTopWidth: '1px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: 'mid.tertiary',
    borderStyle: 'solid',
    borderBottomWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    position: 'sticky',
    bottom: 0,
    left: 0,
    right: 0,
    bg: 'light.primary',
    padding: 6,
    flexDirection: ['column-reverse', 'column-reverse', 'row'],
    '>button': {
      width: ['full', 'full', 'inherit'],
    },
    '* + button': {
      marginLeft: [0, 0, 4],
      marginBottom: [4, 4, 0],
    },
  },
  {
    useOptions(_, props) {
      const { csx, ...footerProps } = props
      const { size } = useModalContext()

      return {
        ...footerProps,
        csx: {
          minHeight: size === 'large' ? '5rem' : '3.5rem',
          ...(size === 'small'
            ? {
                borderTopWidth: '0px',
                pt: 0,
                '>button': {
                  width: 'full',
                },
              }
            : {}),
          ...csx,
        },
      }
    },
  }
)

export type ModalFooterProps = ComponentPropsWithRef<typeof ModalFooter>
