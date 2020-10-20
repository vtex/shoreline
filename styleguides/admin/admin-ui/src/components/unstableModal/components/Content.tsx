import React, { ReactNode } from 'react'
import { SxStyleProp } from '@theme-ui/core'
import { useClassName } from '@vtex/admin-ui-system'

export function ModalContent(props: ModalContentProps) {
  const { styles, ...contentProps } = props
  const className = useClassName({
    props: { styles },
    themeKey: 'components.modal.content',
  })

  return <section className={className} {...contentProps} />
}

interface ModalContentProps {
  children?: ReactNode
  styles?: SxStyleProp
}
