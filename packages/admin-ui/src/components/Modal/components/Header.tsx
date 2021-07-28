import type { ReactNode, Ref } from 'react'
import React, { useMemo, forwardRef } from 'react'
import { useSystem } from '@vtex/admin-core'
import type { StyleProp } from '@vtex/admin-core'
import { IconClose } from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'

import { useModalContext } from '../context'
import { ModalButton } from './Button'
import type { SystemComponent } from '../../../types'

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
export const ModalHeader = forwardRef(function ModalHeader(
  props: ModalHeaderProps,
  ref: Ref<HTMLDivElement>
) {
  const {
    children,
    title = null,
    containerCsx = {},
    csx = {},
    ...headerProps
  } = props

  const { cn } = useSystem()
  const { omitCloseButton, size } = useModalContext()
  const className = cn({
    ...csx,
    themeKey: `components.modal.header-${size}`,
  })

  const containerCn = cn({
    display: 'flex',
    alignItems: 'center',
    ...containerCsx,
  })

  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return <Box csx={{ text: 'headline' }}>{title}</Box>
    }

    return title
  }, [title])

  return (
    <header {...headerProps} ref={ref} className={className}>
      {renderTitle}
      <div className={containerCn}>
        {children}
        {!omitCloseButton && (
          <ModalButton
            closeModalOnClick
            variant="adaptative-dark"
            icon={<IconClose />}
          />
        )}
      </div>
    </header>
  )
})

export interface ModalHeaderProps extends SystemComponent {
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
  /**
   * component children
   */
  children?: ReactNode
}
