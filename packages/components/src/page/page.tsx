import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Container } from '../content'
import './page.css'

export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  props,
  ref
) {
  const { children, ...otherProps } = props

  return (
    <Container data-sl-page ref={ref} {...otherProps}>
      {children}
    </Container>
  )
})

export interface PageProps extends ComponentPropsWithoutRef<'div'> {
  className?: string
}
