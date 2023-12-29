import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'
import { Container } from '../content'

export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  props,
  ref
) {
  const { children, ...otherProps } = props

  return (
    <Container data-sl-page ref={ref} tabIndex={0} {...otherProps}>
      {children}
    </Container>
  )
})

export type PageProps = ComponentPropsWithoutRef<'div'>
