import { type AnyObject, style } from '@vtex/shoreline-utils'
import type { ComponentPropsWithoutRef } from 'react'
import { forwardRef } from 'react'

/**
 * Text component
 * @example
 * <Text variant="context" color="#000000">Hello world</Text>
 */
export const Text = forwardRef(function Text(props: TextProps, ref: any) {
  const {
    children,
    variant = 'context',
    color = 'var(--sl-fg-base)',
    style: styleObject = {},
    ...otherProps
  } = props

  const Element = props.as || 'span'

  return (
    <Element
      data-sl-text
      ref={ref}
      data-variant={variant}
      style={style({
        '--sl-text-color': color,
        ...styleObject,
      })}
      {...(otherProps as AnyObject)}
    >
      {children}
    </Element>
  )
})

export interface TextOptions {
  /**
   * Text color
   * @default var(--sl-fg-base)
   */
  color?: string
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

interface Label extends TextOptions, ComponentPropsWithoutRef<'label'> {
  as: 'label'
}

interface Paragraph extends TextOptions, ComponentPropsWithoutRef<'p'> {
  as: 'p'
}

interface Div extends TextOptions, ComponentPropsWithoutRef<'div'> {
  as: 'div'
}

interface Li extends TextOptions, ComponentPropsWithoutRef<'li'> {
  as: 'li'
}

interface Span extends TextOptions, ComponentPropsWithoutRef<'span'> {
  as?: 'span'
}

export type TextProps = Span | Label | Paragraph | Div | Li
