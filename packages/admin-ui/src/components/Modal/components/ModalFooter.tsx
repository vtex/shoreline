import type { ComponentPropsWithRef } from 'react'
import { createComponent, useElement } from '@vtex/admin-ui-react'

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
export const ModalFooter = createComponent<'footer'>((props) => {
  const { size } = useModalContext()

  return useElement('footer', {
    ...props,
    baseStyle: {
      borderTopWidth: '1px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTop: '$neutral',
      position: 'sticky',
      bottom: 0,
      left: 0,
      right: 0,
      bg: '$primary',
      padding: '$6',
      flexDirection: 'column-reverse',
      '> button': {
        width: '$full',
      },
      '* + button': {
        marginLeft: 0,
        marginBottom: '$4',
      },
      minHeight: size === 'large' ? '5rem' : '3.5rem',
      ...(size === 'small'
        ? {
            borderTopWidth: '0px',
            pt: 0,
            '>button': {
              width: '$full',
            },
          }
        : {}),

      '@tablet': {
        '> button': {
          width: '$full',
        },
        '* + button': {
          marginLeft: 0,
          marginBottom: '$4',
        },
        flexDirection: 'column-reverse',
      },
      '@desktop': {
        '> button': {
          width: 'inherit',
        },
        '* + button': {
          marginLeft: '$4',
          marginBottom: 0,
        },
        flexDirection: 'row',
      },
    },
  })
})

export type ModalFooterProps = ComponentPropsWithRef<typeof ModalFooter>
