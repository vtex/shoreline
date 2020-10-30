import React, { ReactNode, useMemo } from 'react'
import { SxStyleProp } from '@theme-ui/core'
import { useClassName } from '@vtex/admin-ui-system'

import { useModalContext } from '../context'
import { getScrollAreaSize } from '../util'

export function ModalContent(props: ModalContentProps) {
  const { styles, ...contentProps } = props

  const { hasHeader, hasFooter, size } = useModalContext()

  const scrollSize = useMemo(
    () => getScrollAreaSize(hasHeader, hasFooter, size),
    [hasHeader, hasFooter, size]
  )

  const className = useClassName({
    props: { styles },
    themeKey: `components.modal.content${scrollSize}`,
  })

  return <section className={className} {...contentProps} />
}

interface ModalContentProps {
  children?: ReactNode
  styles?: SxStyleProp
}
