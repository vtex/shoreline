import type React from 'react'
import type { StyleProp } from '@vtex/admin-ui-core'

/**
 * "as" prop
 * @template P Props
 */
export type As<Props = any> = React.ElementType<Props>

/**
 * Call for styles
 */
export interface CsxCall {
  /**
   * Csx property
   * @default {}
   */
  csx?: StyleProp
  /**
   * Fixup for emotion css
   * !🚨 Dont use it
   * @private
   */
  css?: any
}

/**
 * Render prop type
 * @template P Props
 */
export type RenderProp<Props = {}> = (props: Props) => React.ReactElement<Props>

/**
 * @template T Element type
 */
export type HTMLAttributesWithRef<T = any> = React.HTMLAttributes<T> &
  React.RefAttributes<T>

/**
 * Returns only the HTML attributes inside P
 * ```ts
 * type OnlyId = ExtractHTMLAttributes<{ id: string; foo: string }>;
 * type HTMLAttributes = ExtractHTMLAttributes<any>;
 * ```
 * @template Props HTML Props
 */
export type ExtractHTMLAttributes<Props> = Pick<
  HTMLAttributesWithRef,
  Extract<keyof HTMLAttributesWithRef, keyof Props>
>
