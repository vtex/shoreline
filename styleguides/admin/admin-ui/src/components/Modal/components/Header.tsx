import React, { useMemo, ReactNode, forwardRef, Ref } from 'react'
import { StyleProp } from '@vtex/admin-ui-system'
import { IconClose } from '@vtex/admin-ui-icons'

import { useModalContext } from '../context'
import { ModalButton } from './Button'
import { Box } from '../../Box'
import { Overridable } from '../../../types'
import { useSystem } from '../../../system'
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
    containerStyleOverrides = {},
    styleOverrides = {},
    ...headerProps
  } = props

  const { cn } = useSystem()
  const { omitCloseButton, size } = useModalContext()
  const className = cn({
    ...styleOverrides,
    themeKey: `components.modal.header-${size}`,
  })

  const containerCn = cn({
    display: 'flex',
    alignItems: 'center',
    ...containerStyleOverrides,
  })

  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return <Box styles={{ text: 'headline' }}>{title}</Box>
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

export interface ModalHeaderProps extends Overridable {
  /**
   * Title of the modal
   * @default null
   */
  title?: ReactNode
  /**
   * Styles of the buttons container
   * @default {}
   */
  containerStyleOverrides?: StyleProp
  /**
   * component children
   */
  children?: ReactNode
}
