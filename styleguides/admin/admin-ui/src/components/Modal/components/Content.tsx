import React, { ReactNode, useMemo, forwardRef, Ref } from 'react'

import { useModalContext } from '../context'
import { getScrollAreaSize } from '../util'
import { Overridable } from '../../../types'
import { useSystem } from '../../../system'

export const ModalContent = forwardRef(function ModalContent(
  props: ModalContentProps,
  ref: Ref<HTMLDivElement>
) {
  const { styleOverrides, ...contentProps } = props

  const { cn } = useSystem()
  const { hasHeader, hasFooter, size } = useModalContext()

  const scrollSize = useMemo(
    () => getScrollAreaSize(hasHeader, hasFooter, size),
    [hasHeader, hasFooter, size]
  )

  const className = cn({
    ...styleOverrides,
    themeKey: `components.modal.content${scrollSize}`,
  })

  return <section ref={ref} className={className} {...contentProps} />
})

export interface ModalContentProps extends Overridable {
  children?: ReactNode
}
