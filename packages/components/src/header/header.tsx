import React, { forwardRef } from 'react'
import type { ContentProps } from '../content'
import { Content } from '../content'
import './header.css'

export const Header = forwardRef<HTMLDivElement, HeaderProps>(function Header(
  props,
  ref
) {
  const { children, ...otherProps } = props

  return (
    <Content data-sl-header {...otherProps} ref={ref}>
      {children}
    </Content>
  )
})

export type HeaderProps = ContentProps
