import React, { ComponentPropsWithoutRef, forwardRef } from 'react'
import { Container } from '../content'

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
