import type { AnyObject } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

export const Text = forwardRef(function Text(props: TextProps, ref: any) {
  const { children, variant = 'body', ...textProps } = props

  const Element = props.as || 'span'

  return (
    <Element
      data-sl-text
      ref={ref}
      data-variant={variant}
      {...(textProps as AnyObject)}
    >
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

interface Heading extends ComponentProps, ComponentPropsWithoutRef<'h1'> {
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

interface Label extends ComponentProps, ComponentPropsWithoutRef<'label'> {
  as: 'label'
}

interface Paragraph extends ComponentProps, ComponentPropsWithoutRef<'p'> {
  as: 'p'
}

interface Div extends ComponentProps, ComponentPropsWithoutRef<'div'> {
  as: 'div'
}
interface Span extends ComponentProps, ComponentPropsWithoutRef<'span'> {
  as?: 'span'
}

export type TextProps = Span | Heading | Label | Paragraph | Div
