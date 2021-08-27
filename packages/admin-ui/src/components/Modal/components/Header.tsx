import type { ReactNode, Ref } from 'react'
import React, { useMemo, forwardRef } from 'react'
import type { StyleProp } from '@vtex/onda-core'
import { IconClose } from '@vtex/admin-ui-icons'
import { Box } from '@vtex/admin-primitives'
import { tag } from '@vtex/admin-ui-react'

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

  const { omitCloseButton, size } = useModalContext()

  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return <Box csx={{ text: 'headline' }}>{title}</Box>
    }

    return title
  }, [title])

  return (
    <tag.header
      {...headerProps}
      ref={ref}
      csx={{
        height: size === 'large' ? 80 : 56,
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
        ...csx,
      }}
    >
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
    </tag.header>
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
