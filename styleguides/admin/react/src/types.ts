import React from 'react'
import { StyleObject } from '@vtex/admin-core'

/**
 * "as" prop
 * @template P Props
 */
export type As<Props = any> = React.ElementType<Props>

/**
 * Generic component props with "as" prop
 * @template Props Additional props
 * @template T React component or string element
 */
export type PropsWithAs<Props, T extends As> = Props &
  Omit<React.ComponentPropsWithoutRef<T>, 'as' | keyof Props> & {
    /**
     * Render as other element or component
     */
    as?: T
    /**
     * Csx property
     * @default {}
     */
    csx?: StyleObject
    /**
     * Fixup for emotion css
     * !🚨 Dont use it
     * @private
     */
    css?: any
    /**
     * children that accepts any valid ReactNode or a render function
     */
    children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>
  }

/**
 * Call for styles
 */
 export interface CsxCall {
  /**
   * Csx property
   * @default {}
   */
  csx?: StyleObject
  /**
   * Fixup for emotion css
   * !🚨 Dont use it
   * @private
   */
  css?: any
}

/**
 * Prop call for variants
 * @template Variants Component/Element variants
 */
export type VariantsCall<Variants extends {}> = {
  [k in keyof Variants]?: keyof Variants[k]
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
