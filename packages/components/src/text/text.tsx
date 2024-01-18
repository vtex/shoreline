import type { AnyObject } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef } from 'react'
import React, { forwardRef } from 'react'

/**
 * Text component
 * @example
 * <Text variant="context">Hello world</Text>
 */
export const Text = forwardRef(function Text(props: TextProps, ref: any) {
  const { children, variant = 'context', ...otherProps } = props

  const Element = props.as || 'span'

  return (
    <Element
      data-sl-text
      ref={ref}
      data-variant={variant}
      {...(otherProps as AnyObject)}
    >
      {children}
    </Element>
  )
})

interface ComponentProps {
  /**
   * Text variant
   * @default 'context'
   */
  variant?:
    | 'context'
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

interface Label extends ComponentProps, ComponentPropsWithoutRef<'label'> {
  as: 'label'
}

interface Paragraph extends ComponentProps, ComponentPropsWithoutRef<'p'> {
  as: 'p'
}

interface Div extends ComponentProps, ComponentPropsWithoutRef<'div'> {
  as: 'div'
}

interface Li extends ComponentProps, ComponentPropsWithoutRef<'li'> {
  as: 'li'
}

interface Span extends ComponentProps, ComponentPropsWithoutRef<'span'> {
  as?: 'span'
}

export type TextProps = Span | Label | Paragraph | Div | Li
