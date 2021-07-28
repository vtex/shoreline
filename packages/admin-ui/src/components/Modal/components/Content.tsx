import type { ReactNode, Ref } from 'react'
import React, { useMemo, forwardRef } from 'react'
import { useSystem } from '@vtex/admin-core'

import { useModalContext } from '../context'
import { getScrollAreaSize } from '../util'
import type { SystemComponent } from '../../../types'

export const ModalContent = forwardRef(function ModalContent(
  props: ModalContentProps,
  ref: Ref<HTMLDivElement>
) {
  const { csx, ...contentProps } = props

  const { cn } = useSystem()
  const { hasHeader, hasFooter, size } = useModalContext()

  const scrollSize = useMemo(
    () => getScrollAreaSize(hasHeader, hasFooter, size),
    [hasHeader, hasFooter, size]
  )

  const className = cn({
    ...csx,
    themeKey: `components.modal.content${scrollSize}`,
  })

  return <section ref={ref} className={className} {...contentProps} />
})

export interface ModalContentProps extends SystemComponent {
  children?: ReactNode
}
