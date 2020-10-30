/** @jsx jsx */
import { jsx, SxStyleProp } from '@theme-ui/core'
import { useMemo, ReactNode } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { useModalContext } from '../context'
import { IconClose } from '../../../icons'
import { ModalButton } from './Button'
import { unstableBox as Box } from '../../unstableBox'
import { Overridable } from '../../../types'
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
export function ModalHeader(props: ModalHeaderProps) {
  const {
    children,
    title = null,
    containerStyleOverrides = {},
    styleOverrides = {},
  } = props

  const { omitCloseButton, size } = useModalContext()
  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `components.modal.header-${size}`,
  })

  const containerCn = useClassName({
    props: {
      styles: {
        display: 'flex',
        alignItems: 'center',
        ...containerStyleOverrides,
      },
    },
  })

  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return <Box text="headline">{title}</Box>
    }

    return title
  }, [title])

  return (
    <header className={className}>
      {renderTitle}
      <div className={containerCn}>
        {children}
        {!omitCloseButton && (
          <ModalButton
            closeModalOnClick
            variant="text"
            icon={<IconClose />}
            sx={{
              color: 'text',
            }}
          />
        )}
      </div>
    </header>
  )
}

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
  containerStyleOverrides?: SxStyleProp
  /**
   * component children
   */
  children?: ReactNode
}
