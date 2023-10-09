import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const Text = forwardRef(function Text(props: TextProps, ref: any) {
  const { children, variant, ...elementProps } = props

  const Element = props.as || 'span'

  return (
    <Element ref={ref} data-variant={variant} {...(elementProps as any)}>
      {children}
    </Element>
  )
})

interface ComponentProps {
  variant?:
    | 'body'
    | 'action'
    | 'emphasis'
    | 'caption1'
    | 'caption2'
    | 'display1'
    | 'display2'
    | 'display3'
    | 'display4'
}

type Heading = {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & ComponentProps &
  ComponentPropsWithoutRef<'h1'>
type Label = { as: 'label' } & ComponentProps &
  ComponentPropsWithoutRef<'label'>
type Paragraph = { as: 'p' } & ComponentProps & ComponentPropsWithoutRef<'p'>
type Div = { as: 'div' } & ComponentProps & ComponentPropsWithoutRef<'div'>
type Span = { as?: 'span' } & ComponentProps & ComponentPropsWithoutRef<'span'>

export type TextProps = Span | Heading | Label | Paragraph | Div
