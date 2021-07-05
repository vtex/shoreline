import { useSystem, StyleObject } from '@vtex/admin-core'
import React from 'react'

import { __options, __stylesheet } from './symbols'
import { Sync } from './useStylesheet'

/**
 * "as" prop
 * @memberof types
 * @template P Props
 */
export type As<P = any> = React.ElementType<P>

/**
 * Render prop type
 * @memberof types
 * @template P Props
 */
export type RenderProp<P = {}> = (props: P) => React.ReactElement<P>

/**
 * @memberof types
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
 * @memberof types
 * @template P Props
 */
export type ExtractHTMLAttributes<P> = Pick<
  HTMLAttributesWithRef,
  Extract<keyof HTMLAttributesWithRef, keyof P>
>

/**
 * Generic component props with "as" prop
 * @memberof types
 * @template P Additional props
 * @template T React component or string element
 */
export type PropsWithAs<P, T extends As> = P &
  Omit<React.ComponentPropsWithoutRef<T>, 'as' | 'state' | keyof P> & {
    csx?: StyleObject
    css?: any
    as?: T
    children?: React.ReactNode | RenderProp<ExtractHTMLAttributes<any>>
  }

export interface OndaComponent<Type extends As, Options, Variants> {
  <PolymorphicType extends As>(
    props: PropsWithAs<Options, PolymorphicType> & {
      as: PolymorphicType
    } & VariantsCall<Variants>
  ): JSX.Element
  (props: PropsWithAs<Options, Type> & VariantsCall<Variants>): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsWithAs<Options, Type> & VariantsCall<Variants>>
  [__stylesheet]: StyleObject
  [__options]: string[]
}

export interface ForElements<
  Type extends As,
  Options extends {},
  Variants extends {}
> {
  /**
   * Prioritize autocomplete for elements
   * @example
   * const Button = jsx.button()
   * 
   * <Button href="" /> // 🚨 type error
   * <Button as="a" href="" /> // ✅ all good
   */
  <
    E extends IntrinsicElementsKeys = Type extends IntrinsicElementsKeys
      ? Type
      : never
  >(
    props: PropsWithAs<Options, E> & VariantsCall<Variants>
  ): JSX.Element
  <PolymorphicType extends As>(
    props: PropsWithAs<Options, PolymorphicType> & {
      as: PolymorphicType
    } & VariantsCall<Variants>
  ): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsWithAs<Options, Type> & VariantsCall<Variants>>
  [__stylesheet]: StyleObject
  [__options]: string[]
}

export interface ForComponents<
  Type extends As,
  Options extends {},
  Variants extends {}
> {
  <PolymorphicType extends As>(
    props: PropsWithAs<Options, PolymorphicType> & {
      as: PolymorphicType
    } & VariantsCall<Variants>
  ): JSX.Element
  (props: PropsWithAs<Options, Type> & VariantsCall<Variants>): JSX.Element
  displayName?: string
  defaultProps?: Partial<PropsWithAs<Options, Type> & VariantsCall<Variants>>
  [__stylesheet]: StyleObject
  [__options]: string[]
}

export type IntrinsicElementsKeys = keyof JSX.IntrinsicElements
export type ComponentInfer<T> = T extends
  | IntrinsicElementsKeys
  | React.ComponentType<any>
  ? T
  : never

// export interface ForComponents<DefaultElement, Options = {}, Variants = {}>
//   extends React.ForwardRefExoticComponent<
//     Omit<
//       React.ComponentPropsWithRef<ComponentInfer<DefaultElement>>,
//       keyof Variants | keyof Options | 'as'
//     > &
//       VariantsCall<Variants>
//   > {
//   // React components have higher priority here for autocomplete
//   <
//     TT extends React.ComponentType = DefaultElement extends React.ComponentType
//       ? DefaultElement
//       : never
//   >(
//     props: VariantsCall<Variants> & {
//       as?: TT
//       css?: any
//       csx?: StyleObject
//     } & Omit<
//         React.ComponentPropsWithRef<TT>,
//         keyof Variants | keyof Options | 'as'
//       > &
//       Csx
//   ): JSX.Element

//   // JSX elements
//   <
//     Elm extends IntrinsicElementsKeys = DefaultElement extends IntrinsicElementsKeys
//       ? DefaultElement
//       : never
//   >(
//     props: VariantsCall<Variants> & {
//       as: Elm
//       css?: any
//       csx?: StyleObject
//     } & Omit<JSX.IntrinsicElements[Elm], keyof Variants | keyof Options | 'as'>
//   ): JSX.Element
//   displayName?: string
//   [__stylesheet]: StyleObject
//   [__options]: string[]
// }

// export interface ForElements<DefaultElement, Options = {}, Variants = {}>
//   extends React.ForwardRefExoticComponent<
//     Omit<
//       React.ComponentPropsWithRef<ComponentInfer<DefaultElement>>,
//       keyof Variants | keyof Options | 'as'
//     > &
//       VariantsCall<Variants>
//   > {
//   // JSX elements
//   <
//     Elm extends IntrinsicElementsKeys = DefaultElement extends IntrinsicElementsKeys
//       ? DefaultElement
//       : never
//   >(
//     props: VariantsCall<Variants> & {
//       as: Elm
//       css?: any
//       csx?: StyleObject
//     } & Omit<
//         JSX.IntrinsicElements[Elm],
//         keyof Variants | keyof Options | 'as'
//       > &
//       Csx
//   ): JSX.Element

//   // React components have higher priority here for autocomplete
//   <
//     TT extends React.ComponentType = DefaultElement extends React.ComponentType
//       ? DefaultElement
//       : never
//   >(
//     props: VariantsCall<Variants> & {
//       as?: TT
//       css?: any
//       csx?: StyleObject
//     } & Omit<
//         React.ComponentPropsWithRef<TT>,
//         keyof Variants | keyof Options | 'as'
//       >
//   ): JSX.Element
//   displayName?: string
//   [__stylesheet]: StyleObject
//   [__options]: string[]
// }

export interface Configuration<Type extends As, Options, Variants> {
  options?: string[]
  useOptions?: (
    options: Options,
    props: React.ComponentPropsWithoutRef<Type>,
    system: ReturnType<typeof useSystem>
  ) => React.ComponentPropsWithoutRef<Type>
  sync?: Sync<Variants>[]
}

export type VariantsCall<Variants> = {
  [k in keyof Variants]?: keyof Variants[k]
}
