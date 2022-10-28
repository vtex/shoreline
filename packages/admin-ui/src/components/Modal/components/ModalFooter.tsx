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
      bottom: '$space-0',
      left: '$space-0',
      right: '$space-0',
      bg: '$primary',
      padding: '$space-6',
      flexDirection: 'column-reverse',
      '> button': {
        width: 'full',
      },
      '* + button': {
        marginLeft: '$space-0',
        marginBottom: '$space-4',
      },
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

      '@tablet': {
        '> button': {
          width: 'full',
        },
        '* + button': {
          marginLeft: '$space-0',
          marginBottom: '$space-4',
        },
        flexDirection: 'column-reverse',
      },
      '@desktop': {
        '> button': {
          width: 'inherit',
        },
        '* + button': {
          marginLeft: '$space-4',
          marginBottom: '$space-0',
        },
        flexDirection: 'row',
      },
    },
  });
})

export type ModalFooterProps = ComponentPropsWithRef<typeof ModalFooter>
