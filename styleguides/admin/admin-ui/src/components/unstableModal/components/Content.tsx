import React, { ReactNode } from 'react'
import { SxStyleProp } from '@theme-ui/core'
import { useCx } from '@vtex/admin-ui-system'

export function ModalContent(props: ModalContentProps) {
  const { styles, ...contentProps } = props
  const className = useCx({ styles }, 'components.modal.content')

  return <section className={className} {...contentProps} />
}

interface ModalContentProps {
  children?: ReactNode
  styles?: SxStyleProp
}
