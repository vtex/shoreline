import type { ReactNode, Ref } from 'react'
import React from 'react'
import { forwardRef, useSystem } from '@vtex/admin-core'

import { useModalContext } from '../context'
import type { SystemComponent } from '../../../types'

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
export const ModalFooter = forwardRef(function ModalFooter(
  props: ModalFooterProps,
  ref: Ref<HTMLDivElement>
) {
  const { csx, ...footerProps } = props
  const { size } = useModalContext()
  const { cn } = useSystem()

  const className = cn({
    minHeight: size === 'large' ? '5rem' : '3.5rem',
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
  })

  return <footer ref={ref} className={className} {...footerProps} />
})

export interface ModalFooterProps extends SystemComponent {
  children?: ReactNode
}
