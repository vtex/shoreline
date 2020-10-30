import React, { ReactNode, useMemo } from 'react'
import { useClassName } from '@vtex/admin-ui-system'

import { useModalContext } from '../context'
import { getScrollAreaSize } from '../util'
import { Overridable } from '../../../types'

export function ModalContent(props: ModalContentProps) {
  const { styleOverrides, ...contentProps } = props

  const { hasHeader, hasFooter, size } = useModalContext()

  const scrollSize = useMemo(
    () => getScrollAreaSize(hasHeader, hasFooter, size),
    [hasHeader, hasFooter, size]
  )

  const className = useClassName({
    props: { styles: styleOverrides },
    themeKey: `components.modal.content${scrollSize}`,
  })

  return <section className={className} {...contentProps} />
}

interface ModalContentProps extends Overridable {
  children?: ReactNode
}
